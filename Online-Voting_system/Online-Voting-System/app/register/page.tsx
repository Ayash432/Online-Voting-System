"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Vote, Upload } from "lucide-react"
import { MobileVerification } from "@/components/mobile-verification"

export default function RegisterPage() {
  const router = useRouter()
  const [registrationStep, setRegistrationStep] = useState<"form" | "mobile">("form")
  const [formData, setFormData] = useState({
    name: "",
    aadhaar: "",
    pan: "",
    mobile: "",
    dob: "",
    gender: "",
    address: "",
    state: "",
    pincode: "",
    password: "",
    confirmPassword: "",
    aadhaarImage: null as File | null,
    panImage: null as File | null,
    photo: null as File | null,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.name.trim()) newErrors.name = "Name is required"

    if (!formData.aadhaar.trim()) newErrors.aadhaar = "Aadhaar number is required"
    else if (!/^\d{12}$/.test(formData.aadhaar)) newErrors.aadhaar = "Aadhaar must be 12 digits"

    if (!formData.pan.trim()) newErrors.pan = "PAN number is required"
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) newErrors.pan = "Invalid PAN format (e.g., ABCDE1234F)"

    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required"
    else if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Mobile number must be 10 digits"

    if (!formData.dob) newErrors.dob = "Date of birth is required"
    else {
      const birthDate = new Date(formData.dob)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 18) newErrors.dob = "You must be at least 18 years old to register"
    }

    if (!formData.gender) newErrors.gender = "Gender is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.state) newErrors.state = "State is required"

    if (!formData.pincode.trim()) newErrors.pincode = "PIN code is required"
    else if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "PIN code must be 6 digits"

    if (!formData.password) newErrors.password = "Password is required"
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters"

    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"

    if (!formData.aadhaarImage) newErrors.aadhaarImage = "Aadhaar card image is required"
    if (!formData.panImage) newErrors.panImage = "PAN card image is required"
    if (!formData.photo) newErrors.photo = "Your photo is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)

    try {
      // Simulate API call for registration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Move to mobile verification
      setRegistrationStep("mobile")
    } catch (err) {
      setErrors({ form: "Registration failed. Please try again." })
    } finally {
      setLoading(false)
    }
  }

  const handleMobileVerified = () => {
    // Redirect to login page after successful registration
    router.push("/login?registered=true")
  }

  const handleFileChange = (field: "aadhaarImage" | "panImage" | "photo", e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, [field]: e.target.files[0] })
    }
  }

  const formatAadhaar = (value: string) => {
    // Remove non-digits
    const digits = value.replace(/\D/g, "")

    // Format as XXXX-XXXX-XXXX
    if (digits.length <= 4) return digits
    if (digits.length <= 8) return `${digits.slice(0, 4)}-${digits.slice(4)}`
    return `${digits.slice(0, 4)}-${digits.slice(4, 8)}-${digits.slice(8, 12)}`
  }

  const handleAadhaarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatAadhaar(e.target.value)
    // Store only digits in state
    setFormData({ ...formData, aadhaar: e.target.value.replace(/\D/g, "") })
    // Display formatted value in input
    e.target.value = formatted
  }

  const formatPAN = (value: string) => {
    // Convert to uppercase and remove spaces
    return value.toUpperCase().replace(/\s/g, "")
  }

  const handlePANChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPAN(e.target.value)
    setFormData({ ...formData, pan: formatted })
    e.target.value = formatted
  }

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <Vote className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">VoteIndia</h1>
          <p className="text-slate-600 dark:text-slate-400">Register as a Voter</p>
        </div>

        {registrationStep === "form" && (
          <Card>
            <CardHeader>
              <CardTitle>Create a Voter Account</CardTitle>
              <CardDescription>
                Enter your details to register as a voter. All fields are required for verification.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name (as per Aadhaar)</Label>
                        <Input
                          id="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        {errors.name && <p className="text-destructive text-sm">{errors.name}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input
                          id="dob"
                          type="date"
                          value={formData.dob}
                          onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                        />
                        {errors.dob && <p className="text-destructive text-sm">{errors.dob}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                          value={formData.gender}
                          onValueChange={(value) => setFormData({ ...formData, gender: value })}
                        >
                          <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.gender && <p className="text-destructive text-sm">{errors.gender}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mobile">Mobile Number</Label>
                        <Input
                          id="mobile"
                          placeholder="10-digit mobile number"
                          value={formData.mobile}
                          onChange={(e) => setFormData({ ...formData, mobile: e.target.value.replace(/\D/g, "") })}
                          maxLength={10}
                        />
                        {errors.mobile && <p className="text-destructive text-sm">{errors.mobile}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Identity Documents</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="aadhaar">Aadhaar Number</Label>
                        <Input
                          id="aadhaar"
                          placeholder="XXXX-XXXX-XXXX"
                          onChange={handleAadhaarChange}
                          maxLength={14} // 12 digits + 2 hyphens
                        />
                        {errors.aadhaar && <p className="text-destructive text-sm">{errors.aadhaar}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pan">PAN Number</Label>
                        <Input id="pan" placeholder="ABCDE1234F" onChange={handlePANChange} maxLength={10} />
                        {errors.pan && <p className="text-destructive text-sm">{errors.pan}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="aadhaarImage">Aadhaar Card Image</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="aadhaarImage"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-slate-500 dark:text-slate-400" />
                              <p className="text-xs text-slate-500 dark:text-slate-400">Click to upload Aadhaar card</p>
                            </div>
                            <Input
                              id="aadhaarImage"
                              type="file"
                              className="hidden"
                              accept=".jpg,.jpeg,.png,.pdf"
                              onChange={(e) => handleFileChange("aadhaarImage", e)}
                            />
                          </label>
                        </div>
                        {formData.aadhaarImage && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            File selected: {formData.aadhaarImage.name}
                          </p>
                        )}
                        {errors.aadhaarImage && <p className="text-destructive text-sm">{errors.aadhaarImage}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="panImage">PAN Card Image</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="panImage"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-slate-500 dark:text-slate-400" />
                              <p className="text-xs text-slate-500 dark:text-slate-400">Click to upload PAN card</p>
                            </div>
                            <Input
                              id="panImage"
                              type="file"
                              className="hidden"
                              accept=".jpg,.jpeg,.png,.pdf"
                              onChange={(e) => handleFileChange("panImage", e)}
                            />
                          </label>
                        </div>
                        {formData.panImage && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            File selected: {formData.panImage.name}
                          </p>
                        )}
                        {errors.panImage && <p className="text-destructive text-sm">{errors.panImage}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="photo">Your Photo</Label>
                        <div className="flex items-center justify-center w-full">
                          <label
                            htmlFor="photo"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
                          >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-2 text-slate-500 dark:text-slate-400" />
                              <p className="text-xs text-slate-500 dark:text-slate-400">Click to upload your photo</p>
                            </div>
                            <Input
                              id="photo"
                              type="file"
                              className="hidden"
                              accept=".jpg,.jpeg,.png"
                              onChange={(e) => handleFileChange("photo", e)}
                            />
                          </label>
                        </div>
                        {formData.photo && (
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                            File selected: {formData.photo.name}
                          </p>
                        )}
                        {errors.photo && <p className="text-destructive text-sm">{errors.photo}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Address Information</h3>
                    <div className="space-y-2">
                      <Label htmlFor="address">Full Address</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter your full address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        rows={3}
                      />
                      {errors.address && <p className="text-destructive text-sm">{errors.address}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Select
                          value={formData.state}
                          onValueChange={(value) => setFormData({ ...formData, state: value })}
                        >
                          <SelectTrigger id="state">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {indianStates.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.state && <p className="text-destructive text-sm">{errors.state}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="pincode">PIN Code</Label>
                        <Input
                          id="pincode"
                          placeholder="6-digit PIN code"
                          value={formData.pincode}
                          onChange={(e) => setFormData({ ...formData, pincode: e.target.value.replace(/\D/g, "") })}
                          maxLength={6}
                        />
                        {errors.pincode && <p className="text-destructive text-sm">{errors.pincode}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Account Security</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                          id="password"
                          type="password"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        {errors.password && <p className="text-destructive text-sm">{errors.password}</p>}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        />
                        {errors.confirmPassword && <p className="text-destructive text-sm">{errors.confirmPassword}</p>}
                      </div>
                    </div>
                  </div>

                  {errors.form && <p className="text-destructive text-sm">{errors.form}</p>}
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : "Register"}
                </Button>
                <p className="text-sm text-center text-slate-600 dark:text-slate-400">
                  Already have an account?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Login here
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        )}

        {registrationStep === "mobile" && (
          <MobileVerification onVerified={handleMobileVerified} onCancel={() => setRegistrationStep("form")} />
        )}
      </div>
    </div>
  )
}

