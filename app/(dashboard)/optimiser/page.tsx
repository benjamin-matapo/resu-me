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
  matchedKeywords: string[]
  missingKeywords: string[]
  originalCV: string
  optimisedCV: string
}

function analyzeKeywords(cvText: string, jobDescription: string): OptimiserResult {
  const jobKeywords = jobDescription
    .toLowerCase()
    .split(/\W+/)
    .filter((word) => word.length > 4)
    .filter((word, i, arr) => arr.indexOf(word) === i)
    .slice(0, 20)

  const cvLower = cvText.toLowerCase()
  const matched = jobKeywords.filter((kw) => cvLower.includes(kw))
  const missing = jobKeywords.filter((kw) => !cvLower.includes(kw))

  const score = jobKeywords.length > 0 ? Math.round((matched.length / jobKeywords.length) * 100) : 0

  let optimised = cvText
  if (missing.length > 0) {
    optimised += `\n\nKey Skills: ${missing.slice(0, 5).join(", ")}`
  }

  return {
    score,
    matchedKeywords: matched,
    missingKeywords: missing,
    originalCV: cvText,
    optimisedCV: optimised,
  }
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

  const handleFile = (file: File) => {
    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      setCVText(text || `[Content from ${file.name}]\n\nThis is a simulated CV content for demonstration purposes.\n\nExperience:\n- Software Engineer at Tech Company\n- Developed web applications using React\n- Collaborated with cross-functional teams\n\nSkills:\n- JavaScript, TypeScript, React\n- Node.js, Python\n- Agile methodologies`)
    }
    reader.readAsText(file)
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleOptimise = async () => {
    if (!cvText || !jobDescription) return

    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const analysisResult = analyzeKeywords(cvText, jobDescription)
    setResult(analysisResult)
    setIsProcessing(false)
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
                        Matched Keywords ({result.matchedKeywords.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {result.matchedKeywords.length > 0 ? (
                          result.matchedKeywords.map((kw) => (
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
                        Missing Keywords ({result.missingKeywords.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {result.missingKeywords.length > 0 ? (
                          result.missingKeywords.map((kw) => (
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

                  {/* Before/After Comparison */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">CV Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-muted-foreground">
                            Original
                          </h4>
                          <div className="h-40 overflow-auto rounded border border-border bg-muted/30 p-3 text-xs">
                            {result.originalCV.slice(0, 300)}...
                          </div>
                        </div>
                        <div>
                          <h4 className="mb-2 text-sm font-medium text-success">
                            Optimised
                          </h4>
                          <div className="h-40 overflow-auto rounded border border-success/30 bg-success/5 p-3 text-xs">
                            {result.optimisedCV.slice(0, 300)}...
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Button className="w-full" size="lg">
                    <Download className="mr-2 h-4 w-4" />
                    Download Optimised CV
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}