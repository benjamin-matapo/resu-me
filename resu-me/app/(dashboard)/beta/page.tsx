"use client"

import { useState } from "react"
import { Clock, Mic, MessageSquare, Brain, Sparkles, CheckCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const upcomingFeatures = [
  {
    icon: Mic,
    title: "AI Mock Interviews",
    description:
      "Practice with realistic AI-powered interviews tailored to your target role and industry.",
    status: "In Development",
  },
  {
    icon: MessageSquare,
    title: "Real-time Feedback",
    description:
      "Get instant feedback on your answers, body language tips, and suggestions for improvement.",
    status: "Coming Soon",
  },
  {
    icon: Brain,
    title: "Question Bank",
    description:
      "Access thousands of real interview questions from top companies, organised by role and difficulty.",
    status: "Coming Soon",
  },
  {
    icon: Sparkles,
    title: "Answer Coach",
    description:
      "Learn the STAR method and get AI suggestions to structure compelling answers.",
    status: "Planned",
  },
]

export default function BetaPage() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="animate-in fade-in duration-500">
      <div className="border-b border-border bg-muted/30 px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20">
            <Clock className="mr-1.5 h-3 w-3" />
            Coming Soon
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight text-foreground lg:text-3xl">
            Interview Prep
          </h1>
          <p className="mt-2 text-muted-foreground">
            AI-powered interview preparation to help you ace your next job interview
          </p>
        </div>
      </div>

      <div className="px-6 py-8 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Hero Section */}
          <div className="mx-auto max-w-2xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Mic className="h-10 w-10 text-primary" />
            </div>
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Prepare for Interviews with AI
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
              We&apos;re building the ultimate interview preparation tool. Practice mock interviews,
              get real-time feedback, and learn how to answer even the toughest questions.
            </p>
          </div>

          {/* Waitlist Signup */}
          <Card className="mx-auto mt-10 max-w-md">
            <CardHeader className="text-center">
              <CardTitle>Join the Waitlist</CardTitle>
              <CardDescription>
                Be the first to know when Interview Prep launches
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubmitted ? (
                <div className="flex flex-col items-center py-4 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                  <p className="mt-4 font-medium text-foreground">
                    You&apos;re on the list!
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    We&apos;ll notify you as soon as Interview Prep is ready.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1"
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "..." : "Join"}
                    {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Feature Teaser Cards */}
          <div className="mt-16">
            <h3 className="mb-8 text-center text-xl font-semibold text-foreground">
              What&apos;s Coming
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {upcomingFeatures.map((feature) => (
                <Card key={feature.title} className="relative overflow-hidden">
                  <div className="absolute right-4 top-4">
                    <Badge
                      variant="outline"
                      className={
                        feature.status === "In Development"
                          ? "border-success/30 bg-success/10 text-success"
                          : feature.status === "Coming Soon"
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-muted-foreground/30 bg-muted text-muted-foreground"
                      }
                    >
                      {feature.status}
                    </Badge>
                  </div>
                  <CardHeader>
                    <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mx-auto mt-16 max-w-xl">
            <h3 className="mb-8 text-center text-xl font-semibold text-foreground">
              Development Timeline
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-success text-success-foreground">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Q1 2026</p>
                  <p className="text-sm text-muted-foreground">
                    Core interview engine development
                  </p>
                </div>
              </div>
              <div className="ml-5 h-8 w-0.5 bg-border" />
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <span className="text-sm font-medium">2</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Q2 2026</p>
                  <p className="text-sm text-muted-foreground">
                    Beta testing with early users
                  </p>
                </div>
              </div>
              <div className="ml-5 h-8 w-0.5 bg-border" />
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-border bg-background">
                  <span className="text-sm font-medium text-muted-foreground">3</span>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Q3 2026</p>
                  <p className="text-sm text-muted-foreground">
                    Public launch
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}