export interface PersonalInfo {
  name: string
  email: string
  phone: string
  linkedin: string
  location: string
}

export interface Education {
  id: string
  university: string
  degree: string
  startDate: string
  endDate: string
  grade: string
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  bullets: string[]
}

export interface Skills {
  technical: string[]
  soft: string[]
  languages: string[]
}

export interface Project {
  id: string
  name: string
  description: string
  techStack: string[]
  link: string
}

export interface CVData {
  personalInfo: PersonalInfo
  education: Education[]
  experience: Experience[]
  skills: Skills
  projects: Project[]
}

export const initialCVData: CVData = {
  personalInfo: {
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    location: "",
  },
  education: [],
  experience: [],
  skills: {
    technical: [],
    soft: [],
    languages: [],
  },
  projects: [],
}