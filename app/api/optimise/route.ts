import { NextRequest, NextResponse } from "next/server"
import { extractKeywords, calculateMatchScore, generateSuggestions } from "@/lib/keywords"

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

    if (!jdText || typeof jdText !== "string") {
      return NextResponse.json(
        { message: "jdText is required" },
        { status: 400 }
      )
    }

    const jdKeywords = extractKeywords(jdText)
    const { score, matched, missing } = calculateMatchScore(cvText, jdKeywords)
    const suggestions = generateSuggestions(missing)

    return NextResponse.json({
      score,
      matched,
      missing,
      suggestions,
    })
  } catch (error) {
    console.error("Optimise error:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to optimise CV" },
      { status: 500 }
    )
  }
}
