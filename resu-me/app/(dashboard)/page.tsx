"use client"

import Link from "next/link"
import { FileText, Sparkles, MessageSquare, CheckCircle, ArrowRight, Zap, Target, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: FileText,
    title: "CV Builder",
    description: "Create a professional, ATS-friendly CV from scratch with our guided builder.",
    href: "/builder",
    cta: "Start Building",
  },
  {
    icon: Sparkles,
    title: "CV Optimiser",
    description: "Upload your CV and a job description to get instant keyword optimisation.",
    href: "/optimiser",
    cta: "Optimise Now",
  },
  {
    icon: MessageSquare,
    title: "Feedback Tool",
    description: "Get detailed AI feedback on formatting, ATS compatibility, and content quality.",
    href: "/feedback",
    cta: "Get Feedback",
  },
]

const atsChecklist = [
  "Simple, clean formatting",
  "Standard section headings",
  "Keywords from job description",
  "No tables or complex layouts",
  "Consistent date formats",
  "Clear contact information",
]

export default function HomePage() {
  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-muted/50 to-background px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your CV. Optimised.{" "}
            <span className="text-primary">Instantly.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Beat Applicant Tracking Systems with AI-powered CV optimisation. Match keywords,
            fix formatting issues, and land more interviews.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/builder">
                Build Your CV
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link href="/optimiser">
                Optimise Existing CV
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground">
              Everything you need to land the interview
            </h2>
            <p className="mt-4 text-muted-foreground">
              Three powerful tools to make your CV stand out
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="group relative overflow-hidden transition-all hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="group/btn px-0 text-primary">
                    <Link href={feature.href}>
                      {feature.cta}
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ATS Explainer Section */}
      <section className="border-t border-border bg-muted/30 px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                <Zap className="mr-1.5 h-4 w-4" />
                Understanding ATS
              </div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground">
                What is an Applicant Tracking System?
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                Over 98% of Fortune 500 companies use ATS software to scan and filter resumes
                before a human ever sees them. These systems look for specific keywords,
                formatting patterns, and structural elements.
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                If your CV is not optimised for ATS, it may never reach a recruiter, no matter
                how qualified you are. Our tools help you pass through these filters.
              </p>
            </div>
            <Card className="border-2 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <CardTitle>ATS-Ready Checklist</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {atsChecklist.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 shrink-0 text-success" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 6-Second Test Section */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center rounded-full bg-warning/10 px-3 py-1 text-sm font-medium text-warning">
            <Eye className="mr-1.5 h-4 w-4" />
            The 6-Second Test
          </div>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground">
            Recruiters spend 6 seconds on your CV
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            Studies show that recruiters make their initial decision in just 6 seconds.
            In that time, they scan for job titles, company names, education, and key skills.
            Make every second count with a perfectly optimised CV.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/feedback">
                Test Your CV Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <FileText className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-lg font-semibold">Resu-Me</span>
              </div>
              <p className="mt-4 max-w-sm text-sm text-muted-foreground">
                AI-powered resume assistant helping job seekers land more interviews
                through intelligent CV optimisation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Tools</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/builder" className="text-sm text-muted-foreground hover:text-foreground">
                    CV Builder
                  </Link>
                </li>
                <li>
                  <Link href="/optimiser" className="text-sm text-muted-foreground hover:text-foreground">
                    CV Optimiser
                  </Link>
                </li>
                <li>
                  <Link href="/feedback" className="text-sm text-muted-foreground hover:text-foreground">
                    Feedback Tool
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Coming Soon</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link href="/beta" className="text-sm text-muted-foreground hover:text-foreground">
                    Interview Prep
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            Built with AI to help you succeed
          </div>
        </div>
      </footer>
    </div>
  )
}