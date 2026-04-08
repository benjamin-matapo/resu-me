const STOP_WORDS = new Set([
  "a", "an", "the", "in", "at", "of", "for", "with", "and", "or",
  "to", "is", "are", "was", "were", "have", "has", "be", "been",
  "by", "from", "as", "on", "that", "this", "it", "its", "will",
  "we", "you", "our", "their", "they", "them", "what", "which",
  "who", "whom", "when", "where", "why", "how", "all", "each",
  "every", "both", "few", "more", "most", "other", "some", "such",
  "no", "nor", "not", "only", "own", "same", "so", "than", "too",
  "very", "can", "just", "should", "now",
])

export interface KeywordResult {
  score: number
  matched: string[]
  missing: string[]
}

export function extractKeywords(text: string): string[] {
  const cleaned = text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2 && !STOP_WORDS.has(word))

  const wordFreq = new Map<string, number>()
  for (const word of cleaned) {
    wordFreq.set(word, (wordFreq.get(word) || 0) + 1)
  }

  const unigrams = Array.from(wordFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([word]) => word)

  const bigrams: string[] = []
  for (let i = 0; i < cleaned.length - 1; i++) {
    const bigram = `${cleaned[i]} ${cleaned[i + 1]}`
    bigrams.push(bigram)
  }

  const bigramFreq = new Map<string, number>()
  for (const bigram of bigrams) {
    bigramFreq.set(bigram, (bigramFreq.get(bigram) || 0) + 1)
  }

  const topBigrams = Array.from(bigramFreq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word]) => word)

  return [...unigrams, ...topBigrams]
}

export function calculateMatchScore(
  cvText: string,
  jdKeywords: string[]
): KeywordResult {
  const cvLower = cvText.toLowerCase()

  const matched: string[] = []
  const missing: string[] = []

  for (const keyword of jdKeywords) {
    if (cvLower.includes(keyword.toLowerCase())) {
      matched.push(keyword)
    } else {
      missing.push(keyword)
    }
  }

  const score = jdKeywords.length > 0
    ? Math.round((matched.length / jdKeywords.length) * 100)
    : 0

  return { score, matched, missing }
}

export interface Suggestion {
  keyword: string
  suggestion: string
  section: string
}

const TECHNICAL_KEYWORDS = new Set([
  "javascript", "typescript", "python", "java", "c++", "c#", "ruby", "go",
  "rust", "php", "swift", "kotlin", "react", "angular", "vue", "node",
  "express", "django", "flask", "spring", "sql", "mongodb", "postgresql",
  "mysql", "redis", "elasticsearch", "docker", "kubernetes", "aws",
  "azure", "gcp", "git", "github", "gitlab", "ci/cd", "devops", "agile",
  "scrum", "rest", "api", "graphql", "microservices", "machine learning",
  "deep learning", "ai", "data science", "analytics", "tensorflow",
  "pytorch", "html", "css", "sass", "webpack", "vite", "npm", "yarn",
])

const MANAGEMENT_KEYWORDS = new Set([
  "lead", "manage", "team", "coordinate", "mentor", "coach", "supervise",
  "direct", "oversee", "strategic", "planning", "budget", "hire",
])

export function generateSuggestions(missing: string[]): Suggestion[] {
  return missing.slice(0, 5).map((keyword) => {
    const keywordLower = keyword.toLowerCase()
    let section = "Skills"
    let suggestion = `Consider adding "${keyword}" to your skills or experience section.`

    if (Array.from(TECHNICAL_KEYWORDS).some((tk) => keywordLower.includes(tk))) {
      section = "Skills"
      suggestion = `Add "${keyword}" to your technical skills section.`
    } else if (Array.from(MANAGEMENT_KEYWORDS).some((mk) => keywordLower.includes(mk))) {
      section = "Experience"
      suggestion = `Highlight leadership experiences where you demonstrated "${keyword}".`
    }

    return { keyword, suggestion, section }
  })
}
