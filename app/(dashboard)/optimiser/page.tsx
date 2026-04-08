"use client"

import { useState, useCallback } from "react"
import { Upload, FileText, Sparkles, Download, CheckCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface OptimiserResult {
  score: number
  matched: string[]
  missing: string[]
  suggestions: { keyword: string; suggestion: string; section: string }[]
}

export default function OptimiserPage() {
  const [cvText, setCVText] = useState("")
  const [jobDescription, setJobDescription] = useState("")
  const [fileName, setFileName] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [result, setResult] = useState<OptimiserResult | null>(null)
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

  const handleOptimise = async () => {
    if (!cvText || !jobDescription) return

    setIsProcessing(true)
    setResult(null)

    try {
      const response = await fetch("/api/optimise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cvText, jdText: jobDescription }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to optimise CV")
      }

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Optimise error:", error)
      alert(error instanceof Error ? error.message : "Failed to optimise CV. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-success"
    if (score >= 50) return "text-warning"
    return "text-destructive"
  }

  const getScoreBg = (score: number) => {
    if (score >= 75) return "bg-success"
    if (score >= 50) return "bg-warning"
    return "bg-destructive"
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="border-b border-border bg-muted/30 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            CV Optimiser
          </h1>
          <p className="mt-2 text-muted-foreground">
            Match your CV to any job description and boost your ATS score
          </p>
        </div>
      </div>

      <div className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left Panel - Inputs */}
            <div className="space-y-6">
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
                      PDF, DOCX, or TXT (max 5MB)
                    </p>
                  </div>
                  {cvText && (
                    <div className="mt-4 max-h-40 overflow-auto rounded border border-border bg-muted/30 p-3 text-xs text-muted-foreground">
                      {cvText.slice(0, 500)}...
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Job Description */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Paste the full job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={10}
                    className="resize-none"
                  />
                </CardContent>
              </Card>

              <Button
                onClick={handleOptimise}
                disabled={!cvText || !jobDescription || isProcessing}
                className="w-full"
                size="lg"
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="mr-2 h-4 w-4 animate-pulse" />
                    Analysing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Optimise CV
                  </>
                )}
              </Button>
            </div>

            {/* Right Panel - Results */}
            <div className="space-y-6">
              {!result ? (
                <Card className="flex h-full min-h-[400px] items-center justify-center">
                  <div className="text-center">
                    <Sparkles className="mx-auto h-12 w-12 text-muted-foreground/30" />
                    <p className="mt-4 text-lg font-medium text-muted-foreground">
                      Results will appear here
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground/70">
                      Upload your CV and paste a job description to get started
                    </p>
                  </div>
                </Card>
              ) : (
                <>
                  {/* Score */}
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-foreground">
                            Keyword Match Score
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Based on job description keywords
                          </p>
                        </div>
                        <div className="relative h-24 w-24">
                          <svg className="h-24 w-24 -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              className="text-muted"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeDasharray={`${result.score}, 100`}
                              className={getScoreBg(result.score)}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className={cn("text-2xl font-bold", getScoreColor(result.score))}>
                              {result.score}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Matched Keywords */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <CheckCircle className="h-4 w-4 text-success" />
                        Matched Keywords ({result.matched.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {result.matched.length > 0 ? (
                          result.matched.map((kw) => (
                            <Badge key={kw} className="bg-success/10 text-success hover:bg-success/20">
                              {kw}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">No matching keywords found</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Missing Keywords */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <XCircle className="h-4 w-4 text-destructive" />
                        Missing Keywords ({result.missing.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {result.missing.length > 0 ? (
                          result.missing.map((kw) => (
                            <Badge
                              key={kw}
                              variant="destructive"
                              className="bg-destructive/10 text-destructive hover:bg-destructive/20"
                            >
                              {kw}
                            </Badge>
                          ))
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            All keywords matched
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Suggestions */}
                  {result.suggestions && result.suggestions.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Suggestions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          {result.suggestions.map((s, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <Badge variant="outline" className="shrink-0 mt-0.5">
                                {s.section}
                              </Badge>
                              <p className="text-sm text-muted-foreground">{s.suggestion}</p>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}