"use client"

import Link from "next/link"
import { FileText, Target, MessageSquare, CheckCircle, ArrowRight, Zap, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: FileText,
    title: "CV Builder",
    description: "Build a clean, recruiter-ready CV from scratch using our guided step-by-step form.",
    href: "/builder",
    cta: "Build my CV",
  },
  {
    icon: Target,
    title: "CV Optimiser",
    description: "Upload your CV and a job description. Get a keyword match score and a rewritten, ATS-ready version.",
    href: "/optimiser",
    cta: "Optimise my CV",
  },
  {
    icon: MessageSquare,
    title: "Feedback Tool",
    description: "Get a detailed breakdown of your CV's strengths, formatting issues, and keyword gaps.",
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
      <section className="relative overflow-hidden bg-slate-900 px-6 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Resu You, Resu Me
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-slate-300">
            The AI-powered resume assistant that optimises your CV for ATS systems, builds professional layouts, and gets you noticed.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
              <Link href="/builder">
                Build my CV
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto border-slate-600 text-slate-200 hover:bg-slate-800 hover:text-white">
              <Link href="/optimiser">
                Optimise my CV
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
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                    <feature.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="group/btn px-0 text-blue-600 hover:text-blue-700">
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
              <div className="mb-4 inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
                <Zap className="mr-1.5 h-4 w-4" />
                What is ATS?
              </div>
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground">
                Understanding Applicant Tracking Systems
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                Over 98% of Fortune 500 companies use ATS software to scan and filter resumes
                before a human ever sees them. These systems look for specific keywords,
                formatting patterns, and structural elements.
              </p>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                Recruiters spend just 6 seconds on the initial CV scan. In that time, they look for job titles, company names, education, and key skills. Resu-Me helps you pass both the ATS filters and the 6-second recruiter test.
              </p>
            </div>
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <CardTitle>ATS-Ready Checklist</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {atsChecklist.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
                      <span className="text-sm text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 px-6 py-12 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
                  <FileText className="h-4 w-4 text-white" />
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
            Resu You, Resu Me
          </div>
        </div>
      </footer>
    </div>
  )
}
