"use client"

import { CVData } from "@/lib/cv-types"
import { Mail, Phone, MapPin, Link, ExternalLink } from "lucide-react"

interface CVPreviewProps {
  data: CVData
}

export function CVPreview({ data }: CVPreviewProps) {
  const { personalInfo, education, experience, skills, projects } = data

  const hasContent =
    personalInfo.name ||
    education.length > 0 ||
    experience.length > 0 ||
    skills.technical.length > 0 ||
    skills.soft.length > 0 ||
    skills.languages.length > 0 ||
    projects.length > 0

  return (
    <div className="h-[700px] overflow-auto rounded-lg border border-border bg-background shadow-sm">
      <div className="min-h-full bg-background p-8">
        {!hasContent ? (
          <div className="flex h-full min-h-[600px] items-center justify-center text-center">
            <div>
              <p className="text-lg font-medium text-muted-foreground">
                Your CV preview will appear here
              </p>
              <p className="mt-2 text-sm text-muted-foreground/70">
                Start filling out the form to see your CV take shape
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Header / Personal Info */}
            {personalInfo.name && (
              <div className="border-b border-border pb-4">
                <h1 className="text-2xl font-bold text-foreground">{personalInfo.name}</h1>
                <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  {personalInfo.email && (
                    <span className="flex items-center gap-1">
                      <Mail className="h-3.5 w-3.5" />
                      {personalInfo.email}
                    </span>
                  )}
                  {personalInfo.phone && (
                    <span className="flex items-center gap-1">
                      <Phone className="h-3.5 w-3.5" />
                      {personalInfo.phone}
                    </span>
                  )}
                  {personalInfo.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {personalInfo.location}
                    </span>
                  )}
                  {personalInfo.linkedin && (
                    <span className="flex items-center gap-1">
                      <Link className="h-3.5 w-3.5" />
                      {personalInfo.linkedin}
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Experience */}
            {experience.length > 0 && (
              <div className="border-t border-border pt-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                  Experience
                </h2>
                <div className="space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{exp.role || "Role"}</h3>
                          <p className="text-sm text-muted-foreground">{exp.company || "Company"}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      {exp.bullets.filter(Boolean).length > 0 && (
                        <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-foreground">
                          {exp.bullets
                            .filter(Boolean)
                            .map((bullet, i) => (
                              <li key={i}>{bullet}</li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education.length > 0 && (
              <div className="border-t border-border pt-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                  Education
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {edu.degree || "Degree"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {edu.university || "University"}
                          {edu.grade && ` | ${edu.grade}`}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {(skills.technical.length > 0 ||
              skills.soft.length > 0 ||
              skills.languages.length > 0) && (
              <div className="border-t border-border pt-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                  Skills
                </h2>
                <div className="space-y-2 text-sm">
                  {skills.technical.length > 0 && (
                    <p>
                      <span className="font-medium text-foreground">Technical: </span>
                      <span className="text-muted-foreground">{skills.technical.join(", ")}</span>
                    </p>
                  )}
                  {skills.soft.length > 0 && (
                    <p>
                      <span className="font-medium text-foreground">Soft Skills: </span>
                      <span className="text-muted-foreground">{skills.soft.join(", ")}</span>
                    </p>
                  )}
                  {skills.languages.length > 0 && (
                    <p>
                      <span className="font-medium text-foreground">Languages: </span>
                      <span className="text-muted-foreground">{skills.languages.join(", ")}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <div className="border-t border-border pt-6">
                <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">
                  Projects
                </h2>
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div key={proj.id}>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-foreground">{proj.name || "Project"}</h3>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                      {proj.description && (
                        <p className="mt-1 text-sm text-muted-foreground">{proj.description}</p>
                      )}
                      {proj.techStack.length > 0 && (
                        <p className="mt-1 text-sm">
                          <span className="text-muted-foreground">Tech: </span>
                          <span className="text-foreground">{proj.techStack.join(", ")}</span>
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}