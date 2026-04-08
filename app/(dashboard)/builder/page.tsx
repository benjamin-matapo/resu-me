"use client"

import { useState, useCallback } from "react"
import { CVData, initialCVData } from "@/lib/cv-types"
import { downloadPDF } from "@/lib/pdf-export"
import { BuilderProgress } from "@/components/builder/builder-progress"
import { PersonalInfoStep } from "@/components/builder/personal-info-step"
import { EducationStep } from "@/components/builder/education-step"
import { ExperienceStep } from "@/components/builder/experience-step"
import { SkillsStep } from "@/components/builder/skills-step"
import { ProjectsStep } from "@/components/builder/projects-step"
import { CVPreview } from "@/components/builder/cv-preview"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, Download } from "lucide-react"

const steps = [
  { id: 1, name: "Personal Info" },
  { id: 2, name: "Education" },
  { id: 3, name: "Experience" },
  { id: 4, name: "Skills" },
  { id: 5, name: "Projects" },
]

export default function BuilderPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [cvData, setCVData] = useState<CVData>(initialCVData)

  const updateCVData = useCallback((updates: Partial<CVData>) => {
    setCVData((prev) => ({ ...prev, ...updates }))
  }, [])

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleDownload = (format: "pdf" | "docx") => {
    if (format === "pdf") {
      const filename = cvData.personalInfo.name
        ? `${cvData.personalInfo.name.replace(/\s+/g, "_")}_CV.pdf`
        : "cv.pdf"
      downloadPDF(cvData, filename)
    } else {
      console.log(`DOCX download would be triggered here for: ${format}`)
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="border-b border-border bg-muted/30 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            CV Builder
          </h1>
          <p className="mt-2 text-muted-foreground">
            Create a professional, ATS-optimised CV in minutes
          </p>
          <div className="mt-6">
            <BuilderProgress steps={steps} currentStep={currentStep} />
          </div>
        </div>
      </div>

      <div className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Form Panel */}
            <div className="rounded-lg border border-border bg-card p-6">
              {currentStep === 1 && (
                <PersonalInfoStep
                  data={cvData.personalInfo}
                  onUpdate={(personalInfo) => updateCVData({ personalInfo })}
                />
              )}
              {currentStep === 2 && (
                <EducationStep
                  data={cvData.education}
                  onUpdate={(education) => updateCVData({ education })}
                />
              )}
              {currentStep === 3 && (
                <ExperienceStep
                  data={cvData.experience}
                  onUpdate={(experience) => updateCVData({ experience })}
                />
              )}
              {currentStep === 4 && (
                <SkillsStep
                  data={cvData.skills}
                  onUpdate={(skills) => updateCVData({ skills })}
                />
              )}
              {currentStep === 5 && (
                <ProjectsStep
                  data={cvData.projects}
                  onUpdate={(projects) => updateCVData({ projects })}
                />
              )}

              <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                <Button
                  variant="outline"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Previous
                </Button>
                {currentStep < steps.length ? (
                  <Button onClick={nextStep}>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => handleDownload("docx")}>
                      <Download className="mr-2 h-4 w-4" />
                      DOCX
                    </Button>
                    <Button onClick={() => handleDownload("pdf")}>
                      <Download className="mr-2 h-4 w-4" />
                      PDF
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Preview Panel */}
            <div className="hidden lg:block">
              <div className="sticky top-8">
                <h2 className="mb-4 text-lg font-semibold text-foreground">
                  Live Preview
                </h2>
                <CVPreview data={cvData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}