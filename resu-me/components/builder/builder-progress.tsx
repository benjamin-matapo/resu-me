"use client"

import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

interface Step {
  id: number
  name: string
}

interface BuilderProgressProps {
  steps: Step[]
  currentStep: number
}

export function BuilderProgress({ steps, currentStep }: BuilderProgressProps) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={cn(
              "relative",
              index !== steps.length - 1 && "flex-1"
            )}
          >
            <div className="flex items-center">
              <div
                className={cn(
                  "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors",
                  step.id < currentStep
                    ? "border-primary bg-primary text-primary-foreground"
                    : step.id === currentStep
                    ? "border-primary bg-background text-primary"
                    : "border-border bg-background text-muted-foreground"
                )}
              >
                {step.id < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step.id
                )}
              </div>
              {index !== steps.length - 1 && (
                <div
                  className={cn(
                    "ml-4 hidden h-0.5 flex-1 transition-colors sm:block",
                    step.id < currentStep ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "absolute left-1/2 mt-2 hidden -translate-x-1/2 text-xs font-medium sm:block",
                step.id === currentStep
                  ? "text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {step.name}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  )
}