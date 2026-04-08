import { PDFParse } from "pdf-parse"
import mammoth from "mammoth"

export async function parseCV(buffer: Buffer, mimeType: string): Promise<string> {
  if (mimeType === "application/pdf") {
    const parser = new PDFParse()
    const data = await parser.parse(buffer)
    return data.text
  }

  if (
    mimeType ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
    mimeType === "application/msword"
  ) {
    const result = await mammoth.extractRawText({ buffer })
    return result.value
  }

  if (mimeType === "text/plain") {
    return buffer.toString("utf-8")
  }

  throw new Error(`Unsupported file type: ${mimeType}`)
}
