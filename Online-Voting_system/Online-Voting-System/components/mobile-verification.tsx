"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Smartphone } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface MobileVerificationProps {
  onVerified: () => void
  onCancel: () => void
}

export function MobileVerification({ onVerified, onCancel }: MobileVerificationProps) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [countdown, setCountdown] = useState(60)
  const [mobileNumber, setMobileNumber] = useState("")
  const [showOtpInput, setShowOtpInput] = useState(false)
  const [generatedOtp, setGeneratedOtp] = useState("")
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const { toast } = useToast()

  useEffect(() => {
    if (showOtpInput && inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }

    if (showOtpInput) {
      // Start countdown timer
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [showOtpInput])

  const generateOtp = () => {
    // Generate a 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setGeneratedOtp(newOtp)
    return newOtp
  }

  const handleSendOtp = async () => {
    if (!mobileNumber || mobileNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Generate a random OTP
      const newOtp = generateOtp()

      // Simulate API call for sending OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Show OTP input after sending OTP
      setShowOtpInput(true)
      setCountdown(60)

      // Show toast with the OTP (for demo purposes only)
      toast({
        title: "OTP Sent Successfully",
        description: `Your OTP is: ${newOtp} (This would normally be sent to your phone)`,
        duration: 5000,
      })
    } catch (err) {
      setError("Failed to send OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return

    const newOtp = [...otp]
    newOtp[index] = value.substring(0, 1)
    setOtp(newOtp)

    // Auto-focus next input
    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Navigate with arrow keys
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    } else if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Handle backspace
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp]
        newOtp[index] = ""
        setOtp(newOtp)
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()

    // Check if pasted content is a valid OTP
    if (!/^\d+$/.test(pastedData)) return

    const digits = pastedData.substring(0, 6).split("")
    const newOtp = [...otp]

    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit
      }
    })

    setOtp(newOtp)

    // Focus the appropriate input
    if (digits.length < 6 && inputRefs.current[digits.length]) {
      inputRefs.current[digits.length].focus()
    }
  }

  const handleVerify = async () => {
    const otpValue = otp.join("")

    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits of the OTP")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simulate API call for OTP verification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, either check against generated OTP or accept any OTP
      if (generatedOtp && otpValue !== generatedOtp) {
        setError("Invalid OTP. Please try again or use the OTP shown in the notification.")
        setLoading(false)
        return
      }

      toast({
        title: "Verification Successful",
        description: "Your mobile number has been verified successfully.",
        variant: "success",
      })

      onVerified()
    } catch (err) {
      setError("Invalid OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleResendOtp = async () => {
    setLoading(true)

    try {
      // Generate a new OTP
      const newOtp = generateOtp()

      // Simulate API call for resending OTP
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Reset countdown
      setCountdown(60)

      // Show toast with the new OTP (for demo purposes only)
      toast({
        title: "OTP Resent",
        description: `Your new OTP is: ${newOtp} (This would normally be sent to your phone)`,
        duration: 5000,
      })

      // Start countdown timer again
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } catch (err) {
      setError("Failed to resend OTP. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center mb-2">
          <Smartphone className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-center">Mobile Verification</CardTitle>
        <CardDescription className="text-center">
          {!showOtpInput
            ? "Enter your mobile number to receive a verification code"
            : `We've sent a verification code to +91 ${mobileNumber.substring(0, 2)}XXXX${mobileNumber.substring(6)}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!showOtpInput ? (
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-l-md border border-r-0 border-input">
                +91
              </span>
              <Input
                placeholder="10-digit mobile number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
                maxLength={10}
                className="rounded-l-none"
              />
            </div>
            {error && <p className="text-destructive text-sm text-center">{error}</p>}
          </div>
        ) : (
          <>
            <div className="flex justify-center gap-2 mb-6">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-12 h-12 text-center text-lg"
                />
              ))}
            </div>

            {error && <p className="text-destructive text-sm text-center mb-4">{error}</p>}

            <p className="text-sm text-center text-slate-600 dark:text-slate-400 mb-4">
              Didn't receive the code?{" "}
              {countdown > 0 ? (
                <span>Resend in {countdown}s</span>
              ) : (
                <button
                  onClick={handleResendOtp}
                  disabled={loading}
                  className="text-primary hover:underline focus:outline-none"
                >
                  Resend OTP
                </button>
              )}
            </p>
          </>
        )}
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        {!showOtpInput ? (
          <Button onClick={handleSendOtp} className="w-full" disabled={loading || mobileNumber.length !== 10}>
            {loading ? "Sending..." : "Send Verification Code"}
          </Button>
        ) : (
          <Button onClick={handleVerify} className="w-full" disabled={loading || otp.join("").length !== 6}>
            {loading ? "Verifying..." : "Verify"}
          </Button>
        )}
        <Button variant="outline" onClick={onCancel} className="w-full" disabled={loading}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </CardFooter>
    </Card>
  )
}

