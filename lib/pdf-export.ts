import { jsPDF } from "jspdf"
import { CVData } from "./cv-types"

export function exportToPDF(cvData: CVData): Blob {
  const doc = new jsPDF({
    format: "a4",
    unit: "mm",
  })

  const pageWidth = 210
  const pageHeight = 297
  const margin = 20
  const contentWidth = pageWidth - margin * 2
  let yPos = margin

  doc.setFont("helvetica")

  if (cvData.personalInfo.name) {
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text(cvData.personalInfo.name, pageWidth / 2, yPos, { align: "center" })
    yPos += 10

    doc.setFontSize(10)
    doc.setFont("helvetica", "normal")

    const contactParts: string[] = []
    if (cvData.personalInfo.email) contactParts.push(cvData.personalInfo.email)
    if (cvData.personalInfo.phone) contactParts.push(cvData.personalInfo.phone)
    if (cvData.personalInfo.location) contactParts.push(cvData.personalInfo.location)
    if (cvData.personalInfo.linkedin) contactParts.push(cvData.personalInfo.linkedin)

    if (contactParts.length > 0) {
      doc.text(contactParts.join(" | "), pageWidth / 2, yPos, { align: "center" })
      yPos += 10
    }

    yPos += 2
    doc.setDrawColor(200, 200, 200)
    doc.line(margin, yPos, pageWidth - margin, yPos)
    yPos += 8
  }

  if (cvData.experience.length > 0) {
    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0, 100, 200)
    doc.text("Experience", margin, yPos)
    yPos += 3
    doc.setDrawColor(0, 100, 200)
    doc.line(margin, yPos, margin + 20, yPos)
    yPos += 6
    doc.setTextColor(0, 0, 0)

    for (const exp of cvData.experience) {
      if (yPos > pageHeight - 40) {
        doc.addPage()
        yPos = margin
      }

      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.text(exp.role || "Role", margin, yPos)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      const dateText = `${exp.startDate} - ${exp.endDate}`
      doc.text(dateText, pageWidth - margin, yPos, { align: "right" })
      yPos += 5

      doc.setFontSize(10)
      doc.text(exp.company || "Company", margin, yPos)
      yPos += 5

      for (const bullet of exp.bullets) {
        if (!bullet) continue
        if (yPos > pageHeight - 20) {
          doc.addPage()
          yPos = margin
        }

        const wrappedText = doc.splitTextToSize(`• ${bullet}`, contentWidth)
        doc.text(wrappedText, margin, yPos)
        yPos += wrappedText.length * 5
      }
      yPos += 3
    }
    yPos += 3
  }

  if (cvData.education.length > 0) {
    if (yPos > pageHeight - 60) {
      doc.addPage()
      yPos = margin
    }

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0, 100, 200)
    doc.text("Education", margin, yPos)
    yPos += 3
    doc.setDrawColor(0, 100, 200)
    doc.line(margin, yPos, margin + 20, yPos)
    yPos += 6
    doc.setTextColor(0, 0, 0)

    for (const edu of cvData.education) {
      if (yPos > pageHeight - 30) {
        doc.addPage()
        yPos = margin
      }

      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.text(edu.degree || "Degree", margin, yPos)
      doc.setFont("helvetica", "normal")
      doc.setFontSize(10)
      const dateText = `${edu.startDate} - ${edu.endDate}`
      doc.text(dateText, pageWidth - margin, yPos, { align: "right" })
      yPos += 5

      let eduDetails = edu.university || "University"
      if (edu.grade) eduDetails += ` | ${edu.grade}`
      doc.text(eduDetails, margin, yPos)
      yPos += 7
    }
    yPos += 3
  }

  const hasSkills =
    cvData.skills.technical.length > 0 ||
    cvData.skills.soft.length > 0 ||
    cvData.skills.languages.length > 0

  if (hasSkills) {
    if (yPos > pageHeight - 50) {
      doc.addPage()
      yPos = margin
    }

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0, 100, 200)
    doc.text("Skills", margin, yPos)
    yPos += 3
    doc.setDrawColor(0, 100, 200)
    doc.line(margin, yPos, margin + 20, yPos)
    yPos += 6
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(10)

    if (cvData.skills.technical.length > 0) {
      doc.setFont("helvetica", "bold")
      doc.text("Technical:", margin, yPos)
      doc.setFont("helvetica", "normal")
      yPos += 5
      const techText = doc.splitTextToSize(cvData.skills.technical.join(", "), contentWidth)
      doc.text(techText, margin, yPos)
      yPos += techText.length * 5 + 2
    }

    if (cvData.skills.soft.length > 0) {
      doc.setFont("helvetica", "bold")
      doc.text("Soft Skills:", margin, yPos)
      doc.setFont("helvetica", "normal")
      yPos += 5
      const softText = doc.splitTextToSize(cvData.skills.soft.join(", "), contentWidth)
      doc.text(softText, margin, yPos)
      yPos += softText.length * 5 + 2
    }

    if (cvData.skills.languages.length > 0) {
      doc.setFont("helvetica", "bold")
      doc.text("Languages:", margin, yPos)
      doc.setFont("helvetica", "normal")
      yPos += 5
      const langText = doc.splitTextToSize(cvData.skills.languages.join(", "), contentWidth)
      doc.text(langText, margin, yPos)
      yPos += langText.length * 5 + 2
    }
    yPos += 3
  }

  if (cvData.projects.length > 0) {
    if (yPos > pageHeight - 50) {
      doc.addPage()
      yPos = margin
    }

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(0, 100, 200)
    doc.text("Projects", margin, yPos)
    yPos += 3
    doc.setDrawColor(0, 100, 200)
    doc.line(margin, yPos, margin + 20, yPos)
    yPos += 6
    doc.setTextColor(0, 0, 0)

    for (const proj of cvData.projects) {
      if (yPos > pageHeight - 30) {
        doc.addPage()
        yPos = margin
      }

      doc.setFontSize(11)
      doc.setFont("helvetica", "bold")
      doc.text(proj.name || "Project", margin, yPos)
      if (proj.link) {
        doc.setFont("helvetica", "normal")
        doc.setFontSize(9)
        doc.text(proj.link, pageWidth - margin, yPos, { align: "right" })
      }
      yPos += 5
      doc.setFontSize(10)
      doc.setFont("helvetica", "normal")

      if (proj.description) {
        const descText = doc.splitTextToSize(proj.description, contentWidth)
        doc.text(descText, margin, yPos)
        yPos += descText.length * 5
      }

      if (proj.techStack.length > 0) {
        doc.setFont("helvetica", "italic")
        doc.setTextColor(100, 100, 100)
        doc.text(`Tech: ${proj.techStack.join(", ")}`, margin, yPos)
        yPos += 5
        doc.setTextColor(0, 0, 0)
      }
      yPos += 3
    }
  }

  return doc.output("blob")
}

export function downloadPDF(cvData: CVData, filename: string = "cv.pdf"): void {
  const blob = exportToPDF(cvData)
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
