import { NextRequest, NextResponse } from "next/server"
import { parseCV } from "@/lib/parser"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json(
        { message: "No file provided" },
        { status: 400 }
      )
    }

    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/msword",
      "text/plain",
    ]

    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: `Unsupported file type: ${file.type}. Please upload a PDF, DOCX, or TXT file.` },
        { status: 400 }
      )
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const text = await parseCV(buffer, file.type)

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { message: "Could not extract text from the file. The file may be empty or image-based." },
        { status: 400 }
      )
    }

    return NextResponse.json({ text })
  } catch (error) {
    console.error("Parse error:", error)
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Failed to parse file" },
      { status: 500 }
    )
  }
}
