"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, RefreshCw, ArrowLeft } from "lucide-react"

interface CaptchaProps {
  onVerified: () => void
  onCancel: () => void
}

export function Captcha({ onVerified, onCancel }: CaptchaProps) {
  const [captchaText, setCaptchaText] = useState("")
  const [userInput, setUserInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [captchaImage, setCaptchaImage] = useState("")

  useEffect(() => {
    generateCaptcha()
  }, [])

  const generateCaptcha = () => {
    // Generate a random string for the CAPTCHA
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
    let result = ""
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCaptchaText(result)

    // Create a canvas to generate the CAPTCHA image
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")

    canvas.width = 200
    canvas.height = 70

    if (ctx) {
      // Fill background
      ctx.fillStyle = "#f1f5f9"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add noise (dots)
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.2})`
        ctx.beginPath()
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Add lines for distortion
      for (let i = 0; i < 4; i++) {
        ctx.strokeStyle = `rgba(0, 0, 0, ${Math.random() * 0.2})`
        ctx.beginPath()
        ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height)
        ctx.stroke()
      }

      // Draw the text
      ctx.font = "bold 30px Arial"
      ctx.fillStyle = "#0f172a"
      ctx.textBaseline = "middle"

      // Draw each character with slight rotation for added security
      const textWidth = ctx.measureText(result).width
      const startX = (canvas.width - textWidth) / 2

      for (let i = 0; i < result.length; i++) {
        const charWidth = ctx.measureText(result[i]).width
        const x = startX + i * charWidth + i * 5 // Add spacing between characters
        const y = canvas.height / 2 + (Math.random() * 10 - 5)

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(Math.random() * 0.4 - 0.2) // Rotate between -0.2 and 0.2 radians
        ctx.fillText(result[i], 0, 0)
        ctx.restore()
      }

      // Convert canvas to data URL
      setCaptchaImage(canvas.toDataURL("image/png"))
    }
  }

  const handleVerify = async () => {
    if (!userInput) {
      setError("Please enter the CAPTCHA text")
      return
    }

    setLoading(true)
    setError("")

    try {
      // Simulate API call for CAPTCHA verification
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Case-sensitive verification
      if (userInput === captchaText) {
        onVerified()
      } else {
        setError("Incorrect CAPTCHA. Please try again.")
        generateCaptcha()
        setUserInput("")
      }
    } catch (err) {
      setError("Verification failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-center">Security Verification</CardTitle>
        <CardDescription className="text-center">
          Please enter the characters you see in the image below
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          {captchaImage && (
            <div className="relative">
              <img
                src={captchaImage || "/placeholder.svg"}
                alt="CAPTCHA"
                className="border border-slate-200 dark:border-slate-700 rounded-md"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={generateCaptcha}
                className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white dark:bg-slate-800 shadow-sm"
                title="Refresh CAPTCHA"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Input
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter CAPTCHA text"
            className="text-center"
            maxLength={6}
          />
          {error && <p className="text-destructive text-sm text-center">{error}</p>}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button onClick={handleVerify} className="w-full" disabled={loading || !userInput}>
          {loading ? "Verifying..." : "Verify"}
        </Button>
        <Button variant="outline" onClick={onCancel} className="w-full" disabled={loading}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
      </CardFooter>
    </Card>
  )
}

