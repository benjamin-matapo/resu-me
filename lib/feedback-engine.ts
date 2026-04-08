import { calculateMatchScore } from "./keywords"

export type FeedbackCategory = "formatting" | "ats" | "keywords" | "bullets" | "clarity"
export type FeedbackSeverity = "error" | "warning" | "info"

export interface FeedbackItem {
  id: string
  category: FeedbackCategory
  severity: FeedbackSeverity
  title: string
  message: string
  suggestion: string
  line?: string
}

const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/
const PHONE_REGEX = /[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{3,6}[-\s\.]?[0-9]{3,6}/
const WEAK_VERBS = ["responsible for", "helped with", "assisted with", "worked on", "assisted", "helped"]
const PASSIVE_VOICE = /\b(was|were|been|being)\s+\w+ed\b/gi
const METRIC_REGEX = /\d+[%$€£]|\d+\s*(k|m|b)|percent|percentage/i

function id(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function generateFeedback(cvText: string, jdText?: string): FeedbackItem[] {
  const issues: FeedbackItem[] = []
  const cvLower = cvText.toLowerCase()
  const words = cvText.split(/\s+/)

  if (words.length > 900) {
    issues.push({
      id: id(),
      category: "formatting",
      severity: "error",
      title: "CV is too long",
      message: `Your CV has ${words.length} words. Most recruiters spend less than 30 seconds scanning a CV.`,
      suggestion: "Aim for 300-600 words. Remove redundant information and focus on achievements.",
    })
  } else if (words.length < 200 && cvText.length > 0) {
    issues.push({
      id: id(),
      category: "formatting",
      severity: "warning",
      title: "CV may be too short",
      message: `Your CV has only ${words.length} words. Consider adding more detail to your achievements.`,
      suggestion: "Include specific metrics, outcomes, and context for each role.",
    })
  }

  if (!EMAIL_REGEX.test(cvText)) {
    issues.push({
      id: id(),
      category: "ats",
      severity: "error",
      title: "Missing contact email",
      message: "Recruiters need a way to contact you. A professional email is essential.",
      suggestion: "Add a professional email address at the top of your CV.",
    })
  }

  if (!PHONE_REGEX.test(cvText)) {
    issues.push({
      id: id(),
      category: "ats",
      severity: "warning",
      title: "Missing phone number",
      message: "Your CV doesn't contain a phone number, making it harder for recruiters to reach you.",
      suggestion: "Add a phone number with country code if applying internationally.",
    })
  }

  const hasExperience = /experience|work history|employment/i.test(cvText)
  const hasEducation = /education|qualification|degree/i.test(cvText)
  const hasSkills = /skills|competencies|expertise/i.test(cvText)

  if (!hasExperience) {
    issues.push({
      id: id(),
      category: "formatting",
      severity: "error",
      title: "Missing Experience section",
      message: "Standard section headings help ATS systems parse your CV correctly.",
      suggestion: 'Add a clearly labelled "Experience" or "Work Experience" section.',
    })
  }

  if (!hasEducation) {
    issues.push({
      id: id(),
      category: "formatting",
      severity: "warning",
      title: "Missing Education section",
      message: "Most roles expect to see educational background.",
      suggestion: 'Add an "Education" section with your qualifications.',
    })
  }

  if (!hasSkills) {
    issues.push({
      id: id(),
      category: "formatting",
      severity: "warning",
      title: "Missing Skills section",
      message: "A dedicated skills section helps recruiters quickly identify your strengths.",
      suggestion: "Add a skills section highlighting your key technical and soft skills.",
    })
  }

  const bullets = cvText.split(/[•\-\*]|\n+/).filter((b) => b.trim().length > 10)
  const shortBullets = bullets.filter((b) => b.trim().split(/\s+/).length < 8)
  if (shortBullets.length > 0) {
    issues.push({
      id: id(),
      category: "bullets",
      severity: "warning",
      title: "Short bullet points detected",
      message: `${shortBullets.length} bullet point(s) may not provide enough context.`,
      suggestion: "Expand bullet points with specific metrics, outcomes, or context.",
    })
  }

  const passiveMatches = cvText.match(PASSIVE_VOICE) || []
  if (passiveMatches.length > 4) {
    issues.push({
      id: id(),
      category: "clarity",
      severity: "warning",
      title: "Excessive passive voice",
      message: `Found ${passiveMatches.length} instances of passive voice constructions.`,
      suggestion: "Use active voice to describe your achievements. e.g., 'Led the team' instead of 'Was the team lead'.",
    })
  }

  for (const weakVerb of WEAK_VERBS) {
    if (cvLower.includes(weakVerb)) {
      issues.push({
        id: id(),
        category: "bullets",
        severity: "warning",
        title: "Weak action verb detected",
        message: `The phrase "${weakVerb}" could be more impactful.`,
        suggestion: `Replace with stronger verbs like "led", "delivered", "achieved", "implemented", or "created".`,
      })
    }
  }

  const metrics = cvText.match(METRIC_REGEX) || []
  if (metrics.length < 2) {
    issues.push({
      id: id(),
      category: "clarity",
      severity: "info",
      title: "Few quantifiable achievements",
      message: "Your CV contains few numbers or metrics that demonstrate impact.",
      suggestion: "Add quantifiable achievements like 'Increased sales by 25%' or 'Reduced processing time by 3 hours'.",
    })
  }

  if (jdText) {
    const jdKeywords = jdText
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3)
      .filter((w, i, arr) => arr.indexOf(w) === i)
      .slice(0, 30)

    const { score, missing } = calculateMatchScore(cvText, jdKeywords)

    if (score < 60) {
      issues.push({
        id: id(),
        category: "keywords",
        severity: "warning",
        title: "Low keyword match with job description",
        message: `Your CV only matches ${score}% of key terms from the job description.`,
        suggestion: `Consider incorporating: ${missing.slice(0, 5).join(", ")}`,
      })
    }

    const isSenior = /senior|lead|principal|staff|manager|director/i.test(jdText)
    if (isSenior) {
      const hasLeadership = /led|managed|mentored|coached|directed|oversaw/i.test(cvLower)
      if (!hasLeadership) {
        issues.push({
          id: id(),
          category: "keywords",
          severity: "info",
          title: "Senior role - highlight leadership",
          message: "This role appears to be senior-level. Consider emphasizing leadership experience.",
          suggestion: "Include examples of team leadership, mentoring, or strategic contributions.",
        })
      }
    }
  }

  return issues
}
