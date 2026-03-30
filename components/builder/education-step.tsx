"use client"

import { Education } from "@/lib/cv-types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Trash2, GraduationCap } from "lucide-react"

interface EducationStepProps {
  data: Education[]
  onUpdate: (data: Education[]) => void
}

export function EducationStep({ data, onUpdate }: EducationStepProps) {
  const addEducation = () => {
    const newEducation: Education = {
      id: crypto.randomUUID(),
      university: "",
      degree: "",
      startDate: "",
      endDate: "",
      grade: "",
    }
    onUpdate([...data, newEducation])
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onUpdate(
      data.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    )
  }

  const removeEducation = (id: string) => {
    onUpdate(data.filter((edu) => edu.id !== id))
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Education</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your academic background and qualifications
        </p>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12">
            <GraduationCap className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">No education added yet</p>
            <Button onClick={addEducation} variant="outline" className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add Education
            </Button>
          </div>
        ) : (
          <>
            {data.map((edu, index) => (
              <Card key={edu.id}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Education {index + 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeEducation(edu.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor={`university-${edu.id}`}>University/Institution</Label>
                      <Input
                        id={`university-${edu.id}`}
                        placeholder="University of Oxford"
                        value={edu.university}
                        onChange={(e) => updateEducation(edu.id, "university", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor={`degree-${edu.id}`}>Degree/Qualification</Label>
                      <Input
                        id={`degree-${edu.id}`}
                        placeholder="BSc Computer Science"
                        value={edu.degree}
                        onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${edu.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${edu.id}`}
                        placeholder="Sep 2018"
                        value={edu.startDate}
                        onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${edu.id}`}>End Date</Label>
                      <Input
                        id={`endDate-${edu.id}`}
                        placeholder="Jun 2022"
                        value={edu.endDate}
                        onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor={`grade-${edu.id}`}>Grade (Optional)</Label>
                      <Input
                        id={`grade-${edu.id}`}
                        placeholder="First Class Honours"
                        value={edu.grade}
                        onChange={(e) => updateEducation(edu.id, "grade", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button onClick={addEducation} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Another Education
            </Button>
          </>
        )}
      </div>
    </div>
  )
}