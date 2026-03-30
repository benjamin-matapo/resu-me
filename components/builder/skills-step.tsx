"use client"

import { useState } from "react"
import { Skills } from "@/lib/cv-types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Code, Users, Languages } from "lucide-react"

interface SkillsStepProps {
  data: Skills
  onUpdate: (data: Skills) => void
}

export function SkillsStep({ data, onUpdate }: SkillsStepProps) {
  const [inputs, setInputs] = useState({
    technical: "",
    soft: "",
    languages: "",
  })

  const addSkill = (category: keyof Skills) => {
    const value = inputs[category].trim()
    if (value && !data[category].includes(value)) {
      onUpdate({
        ...data,
        [category]: [...data[category], value],
      })
      setInputs({ ...inputs, [category]: "" })
    }
  }

  const removeSkill = (category: keyof Skills, skill: string) => {
    onUpdate({
      ...data,
      [category]: data[category].filter((s) => s !== skill),
    })
  }

  const handleKeyDown = (e: React.KeyboardEvent, category: keyof Skills) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addSkill(category)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Skills</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add relevant skills categorised by type
        </p>
      </div>

      <div className="space-y-6">
        {/* Technical Skills */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Code className="h-4 w-4 text-muted-foreground" />
            Technical Skills
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., React, Python, SQL..."
              value={inputs.technical}
              onChange={(e) => setInputs({ ...inputs, technical: e.target.value })}
              onKeyDown={(e) => handleKeyDown(e, "technical")}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => addSkill("technical")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.technical.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1 py-1.5">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill("technical", skill)}
                  className="ml-1 rounded-full hover:bg-foreground/10"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {data.technical.length === 0 && (
              <p className="text-sm text-muted-foreground">No technical skills added</p>
            )}
          </div>
        </div>

        {/* Soft Skills */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            Soft Skills
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., Leadership, Communication..."
              value={inputs.soft}
              onChange={(e) => setInputs({ ...inputs, soft: e.target.value })}
              onKeyDown={(e) => handleKeyDown(e, "soft")}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => addSkill("soft")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.soft.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1 py-1.5">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill("soft", skill)}
                  className="ml-1 rounded-full hover:bg-foreground/10"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {data.soft.length === 0 && (
              <p className="text-sm text-muted-foreground">No soft skills added</p>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Languages className="h-4 w-4 text-muted-foreground" />
            Languages
          </Label>
          <div className="flex gap-2">
            <Input
              placeholder="e.g., English (Native), French (Fluent)..."
              value={inputs.languages}
              onChange={(e) => setInputs({ ...inputs, languages: e.target.value })}
              onKeyDown={(e) => handleKeyDown(e, "languages")}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => addSkill("languages")}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.languages.map((skill) => (
              <Badge key={skill} variant="secondary" className="gap-1 py-1.5">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill("languages", skill)}
                  className="ml-1 rounded-full hover:bg-foreground/10"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {data.languages.length === 0 && (
              <p className="text-sm text-muted-foreground">No languages added</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}