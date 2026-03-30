"use client"

import { Experience } from "@/lib/cv-types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Briefcase, X } from "lucide-react"

interface ExperienceStepProps {
  data: Experience[]
  onUpdate: (data: Experience[]) => void
}

export function ExperienceStep({ data, onUpdate }: ExperienceStepProps) {
  const addExperience = () => {
    const newExperience: Experience = {
      id: crypto.randomUUID(),
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      bullets: [""],
    }
    onUpdate([...data, newExperience])
  }

  const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
    onUpdate(
      data.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    )
  }

  const removeExperience = (id: string) => {
    onUpdate(data.filter((exp) => exp.id !== id))
  }

  const addBullet = (id: string) => {
    const exp = data.find((e) => e.id === id)
    if (exp) {
      updateExperience(id, "bullets", [...exp.bullets, ""])
    }
  }

  const updateBullet = (expId: string, bulletIndex: number, value: string) => {
    const exp = data.find((e) => e.id === expId)
    if (exp) {
      const newBullets = [...exp.bullets]
      newBullets[bulletIndex] = value
      updateExperience(expId, "bullets", newBullets)
    }
  }

  const removeBullet = (expId: string, bulletIndex: number) => {
    const exp = data.find((e) => e.id === expId)
    if (exp && exp.bullets.length > 1) {
      const newBullets = exp.bullets.filter((_, i) => i !== bulletIndex)
      updateExperience(expId, "bullets", newBullets)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Work Experience</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your professional experience with achievement-focused bullet points
        </p>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12">
            <Briefcase className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">No experience added yet</p>
            <Button onClick={addExperience} variant="outline" className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add Experience
            </Button>
          </div>
        ) : (
          <>
            {data.map((exp, index) => (
              <Card key={exp.id}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Experience {index + 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor={`company-${exp.id}`}>Company</Label>
                      <Input
                        id={`company-${exp.id}`}
                        placeholder="Google"
                        value={exp.company}
                        onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`role-${exp.id}`}>Role/Title</Label>
                      <Input
                        id={`role-${exp.id}`}
                        placeholder="Software Engineer"
                        value={exp.role}
                        onChange={(e) => updateExperience(exp.id, "role", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`startDate-${exp.id}`}>Start Date</Label>
                      <Input
                        id={`startDate-${exp.id}`}
                        placeholder="Jan 2020"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`endDate-${exp.id}`}>End Date</Label>
                      <Input
                        id={`endDate-${exp.id}`}
                        placeholder="Present"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2 sm:col-span-2">
                      <Label>Bullet Points</Label>
                      <p className="text-xs text-muted-foreground">
                        Use action verbs and quantify achievements when possible
                      </p>
                      <div className="mt-2 space-y-2">
                        {exp.bullets.map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className="flex gap-2">
                            <Textarea
                              placeholder="Increased conversion rate by 25% through A/B testing..."
                              value={bullet}
                              onChange={(e) => updateBullet(exp.id, bulletIndex, e.target.value)}
                              rows={2}
                              className="flex-1"
                            />
                            {exp.bullets.length > 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 shrink-0 text-muted-foreground hover:text-destructive"
                                onClick={() => removeBullet(exp.id, bulletIndex)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-muted-foreground"
                          onClick={() => addBullet(exp.id)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Add Bullet Point
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button onClick={addExperience} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Another Experience
            </Button>
          </>
        )}
      </div>
    </div>
  )
}