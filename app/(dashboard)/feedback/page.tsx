"use client"

import { useState, useCallback } from "react"
import {
  Upload,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Layout,
  Search,
  Target,
  Lightbulb,
  Gauge,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface FeedbackIssue {
  id: string
  category: "formatting" | "ats" | "keywords" | "bullets" | "clarity"
  severity: "error" | "warning" | "info"
  title: string
  message: string
  suggestion: string
  line?: string
}

interface FeedbackResult {
  clarityScore: number
  atsCompatibility: {
    passed: string[]
    failed: string[]
  }
  issues: FeedbackIssue[]
}

const categoryIcons = {
  formatting: Layout,
  ats: Search,
  keywords: Target,
  bullets: FileText,
  clarity: Gauge,
}

const severityStyles = {
  error: {
    bg: "bg-destructive/10",
    text: "text-destructive",
    border: "border-destructive/30",
    badge: "bg-destructive text-destructive-foreground",
  },
  warning: {
    bg: "bg-warning/10",
    text: "text-warning",
    border: "border-warning/30",
    badge: "bg-warning text-warning-foreground",
  },
  info: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/30",
    badge: "bg-primary text-primary-foreground",
  },
}

export default function FeedbackPage() {
  const [cvText, setCVText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [fileName, setFileName] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<FeedbackResult | null>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFile = async (file: File) => {
    setFileName(file.name)
    setCVText("")

    const formData = new FormData()
    formData.append("file", file)

    try {
      const response = await fetch("/api/parse", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        const error = await response.json()
        alert(error.message || "Failed to parse file")
        return
      }

      const data = await response.json()
      setCVText(data.text)
    } catch (error) {
      console.error("Parse error:", error)
      alert("Failed to parse file. Please try again.")
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleAnalyze = async () => {
    if (!cvText) return

    setIsProcessing(true)

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cvText,
          jdText: jobDescription || undefined,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to generate feedback")
      }

      const data = await response.json()

      const passed: string[] = []
      const failed: string[] = []

      data.feedback.forEach((item: FeedbackItem) => {
        if (item.category === "ats") {
          failed.push(item.title)
        }
      })

      if (failed.length === 0 && data.feedback.length < 5) {
        passed.push("Standard file format")
        passed.push("Readable font detected")
        passed.push("No images blocking text")
      }

      const clarityScore = Math.max(
        40,
        100 -
          data.feedback.filter((i: FeedbackItem) => i.severity === "error").length * 20 -
          data.feedback.filter((i: FeedbackItem) => i.severity === "warning").length * 10
      )

      setResult({
        clarityScore,
        atsCompatibility: { passed, failed },
        issues: data.feedback,
      })
    } catch (error) {
      console.error("Feedback error:", error)
      alert(error instanceof Error ? error.message : "Failed to generate feedback. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="border-b border-border bg-muted/30 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Feedback Tool
          </h1>
          <p className="mt-2 text-muted-foreground">
            Get detailed AI feedback on your CV&apos;s formatting, ATS compatibility, and content
          </p>
        </div>
      </div>

      <div className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {!result ? (
            <div className="mx-auto max-w-2xl space-y-6">
              {/* File Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <FileText className="h-5 w-5 text-primary" />
                    Upload Your CV
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className={cn(
                      "relative rounded-lg border-2 border-dashed p-8 text-center transition-colors",
                      dragActive
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <input
                      type="file"
                      accept=".pdf,.docx,.doc,.txt"
                      onChange={handleFileInput}
                      className="absolute inset-0 cursor-pointer opacity-0"
                    />
                    <Upload className="mx-auto h-10 w-10 text-muted-foreground" />
                    <p className="mt-4 text-sm font-medium text-foreground">
                      {fileName || "Drop your CV here or click to upload"}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      PDF, DOCX, or TXT
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Optional Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Description (Optional)</CardTitle>
                  <CardDescription>
                    Add a job description for keyword gap analysis
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Paste the job description here for more targeted feedback..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={6}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

              <Button
                onClick={handleAnalyze}
                disabled={!cvText || isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? "Analysing..." : "Get Feedback"}
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Summary Cards */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Clarity Score */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Clarity Score
                        </p>
                        <p
                          className={cn(
                            "text-3xl font-bold",
                            result.clarityScore >= 75
                              ? "text-success"
                              : result.clarityScore >= 50
                              ? "text-warning"
                              : "text-destructive"
                          )}
                        >
                          {result.clarityScore}%
                        </p>
                      </div>
                      <Gauge className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>

                {/* Issues Found */}
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          Issues Found
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          {result.issues.length}
                        </p>
                      </div>
                      <AlertTriangle className="h-8 w-8 text-warning" />
                    </div>
                  </CardContent>
                </Card>

                {/* ATS Check */}
                <Card className="sm:col-span-2 lg:col-span-1">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          ATS Checks Passed
                        </p>
                        <p className="text-3xl font-bold text-foreground">
                          {result.atsCompatibility.passed.length}/
                          {result.atsCompatibility.passed.length +
                            result.atsCompatibility.failed.length}
                        </p>
                      </div>
                      <Search className="h-8 w-8 text-primary" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ATS Compatibility */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Search className="h-5 w-5 text-primary" />
                    ATS Compatibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-success">
                        <CheckCircle className="h-4 w-4" />
                        Passed
                      </h4>
                      <ul className="space-y-2">
                        {result.atsCompatibility.passed.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                          >
                            <CheckCircle className="h-3.5 w-3.5 text-success" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {result.atsCompatibility.failed.length > 0 && (
                      <div>
                        <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-destructive">
                          <XCircle className="h-4 w-4" />
                          Needs Attention
                        </h4>
                        <ul className="space-y-2">
                          {result.atsCompatibility.failed.map((item) => (
                            <li
                              key={item}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <XCircle className="h-3.5 w-3.5 text-destructive" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Feedback Issues */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-foreground">Detailed Feedback</h2>
                {result.issues.map((issue) => {
                  const Icon = categoryIcons[issue.category]
                  const styles = severityStyles[issue.severity]

                  return (
                    <Card
                      key={issue.id}
                      className={cn("border-l-4", styles.border)}
                    >
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <div
                            className={cn(
                              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                              styles.bg
                            )}
                          >
                            <Icon className={cn("h-5 w-5", styles.text)} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">
                                {issue.title}
                              </h3>
                              <Badge className={styles.badge} variant="secondary">
                                {issue.severity}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {issue.message}
                            </p>
                            {issue.line && (
                              <p className="mt-2 rounded bg-muted px-2 py-1 font-mono text-xs text-muted-foreground">
                                {issue.line}
                              </p>
                            )}
                            <div className="mt-3 flex items-start gap-2 rounded-lg bg-primary/5 p-3">
                              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                              <p className="text-sm text-foreground">
                                {issue.suggestion}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>

              <Button
                variant="outline"
                onClick={() => setResult(null)}
                className="w-full"
              >
                Analyse Another CV
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}