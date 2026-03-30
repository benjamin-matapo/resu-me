"use client"

import { PersonalInfo } from "@/lib/cv-types"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, Link, MapPin } from "lucide-react"

interface PersonalInfoStepProps {
  data: PersonalInfo
  onUpdate: (data: PersonalInfo) => void
}

export function PersonalInfoStep({ data, onUpdate }: PersonalInfoStepProps) {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onUpdate({ ...data, [field]: value })
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-foreground">Personal Information</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Add your contact details so employers can reach you
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            Full Name
          </Label>
          <Input
            id="name"
            placeholder="John Smith"
            value={data.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="john.smith@example.com"
            value={data.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            Phone Number
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="+44 7123 456789"
            value={data.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin" className="flex items-center gap-2">
            <Link className="h-4 w-4 text-muted-foreground" />
            LinkedIn URL
          </Label>
          <Input
            id="linkedin"
            placeholder="linkedin.com/in/johnsmith"
            value={data.linkedin}
            onChange={(e) => handleChange("linkedin", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Location
          </Label>
          <Input
            id="location"
            placeholder="London, UK"
            value={data.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}