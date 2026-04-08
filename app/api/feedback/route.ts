import { NextRequest, NextResponse } from "next/server"
import { generateFeedback } from "@/lib/feedback-engine"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cvText, jdText } = body

    if (!cvText || typeof cvText !== "string") {
      return NextResponse.json(
        { message: "cvText is required" },
        { status: 400 }
      )
    }

    const feedback = generateFeedback(cvText, jdText)

    return NextResponse.json({ feedback })
  } catch (error) {
    console.error("Feedback error:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to generate feedback" },
      { status: 500 }
    )
  }
}
