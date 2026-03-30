"use client"

import { useState } from "react"
import { Project } from "@/lib/cv-types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, FolderGit2, X } from "lucide-react"

interface ProjectsStepProps {
  data: Project[]
  onUpdate: (data: Project[]) => void
}

export function ProjectsStep({ data, onUpdate }: ProjectsStepProps) {
  const [techInputs, setTechInputs] = useState<Record<string, string>>({})

  const addProject = () => {
    const newProject: Project = {
      id: crypto.randomUUID(),
      name: "",
      description: "",
      techStack: [],
      link: "",
    }
    onUpdate([...data, newProject])
  }

  const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
    onUpdate(
      data.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    )
  }

  const removeProject = (id: string) => {
    onUpdate(data.filter((proj) => proj.id !== id))
  }

  const addTech = (projectId: string) => {
    const value = techInputs[projectId]?.trim()
    const project = data.find((p) => p.id === projectId)
    if (value && project && !project.techStack.includes(value)) {
      updateProject(projectId, "techStack", [...project.techStack, value])
      setTechInputs({ ...techInputs, [projectId]: "" })
    }
  }

  const removeTech = (projectId: string, tech: string) => {
    const project = data.find((p) => p.id === projectId)
    if (project) {
      updateProject(projectId, "techStack", project.techStack.filter((t) => t !== tech))
    }
  }

  const handleTechKeyDown = (e: React.KeyboardEvent, projectId: string) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTech(projectId)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Projects</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Showcase personal or professional projects that demonstrate your skills
        </p>
      </div>

      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border py-12">
            <FolderGit2 className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-sm text-muted-foreground">No projects added yet</p>
            <Button onClick={addProject} variant="outline" className="mt-4">
              <Plus className="mr-2 h-4 w-4" />
              Add Project
            </Button>
          </div>
        ) : (
          <>
            {data.map((proj, index) => (
              <Card key={proj.id}>
                <CardContent className="pt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">
                      Project {index + 1}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      onClick={() => removeProject(proj.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor={`name-${proj.id}`}>Project Name</Label>
                      <Input
                        id={`name-${proj.id}`}
                        placeholder="E-commerce Platform"
                        value={proj.name}
                        onChange={(e) => updateProject(proj.id, "name", e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`description-${proj.id}`}>Description</Label>
                      <Textarea
                        id={`description-${proj.id}`}
                        placeholder="Built a full-stack e-commerce platform with real-time inventory management..."
                        value={proj.description}
                        onChange={(e) => updateProject(proj.id, "description", e.target.value)}
                        rows={3}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label>Tech Stack</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="e.g., React, Node.js..."
                          value={techInputs[proj.id] || ""}
                          onChange={(e) =>
                            setTechInputs({ ...techInputs, [proj.id]: e.target.value })
                          }
                          onKeyDown={(e) => handleTechKeyDown(e, proj.id)}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => addTech(proj.id)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {proj.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="gap-1 py-1.5">
                            {tech}
                            <button
                              type="button"
                              onClick={() => removeTech(proj.id, tech)}
                              className="ml-1 rounded-full hover:bg-foreground/10"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`link-${proj.id}`}>Project Link (Optional)</Label>
                      <Input
                        id={`link-${proj.id}`}
                        placeholder="https://github.com/username/project"
                        value={proj.link}
                        onChange={(e) => updateProject(proj.id, "link", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button onClick={addProject} variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Another Project
            </Button>
          </>
        )}
      </div>
    </div>
  )
}