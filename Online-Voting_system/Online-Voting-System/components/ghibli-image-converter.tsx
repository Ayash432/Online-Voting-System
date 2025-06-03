"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Download, RefreshCw } from "lucide-react"

interface GhibliImageConverterProps {
  imageUrl: string
}

export function GhibliImageConverter({ imageUrl }: GhibliImageConverterProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessed, setIsProcessed] = useState(false)
  const [intensity, setIntensity] = useState(75)
  const originalCanvasRef = useRef<HTMLCanvasElement>(null)
  const processedCanvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    loadImage()
  }, [imageUrl])

  const loadImage = () => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = imageUrl

    img.onload = () => {
      if (originalCanvasRef.current) {
        const ctx = originalCanvasRef.current.getContext("2d")
        if (ctx) {
          // Set canvas dimensions to match image
          originalCanvasRef.current.width = img.width
          originalCanvasRef.current.height = img.height

          // Draw original image
          ctx.drawImage(img, 0, 0)
        }
      }
    }
  }

  const applyGhibliEffect = () => {
    setIsProcessing(true)

    setTimeout(() => {
      if (originalCanvasRef.current && processedCanvasRef.current) {
        const originalCtx = originalCanvasRef.current.getContext("2d")
        const processedCtx = processedCanvasRef.current.getContext("2d")

        if (originalCtx && processedCtx) {
          // Set processed canvas dimensions
          processedCanvasRef.current.width = originalCanvasRef.current.width
          processedCanvasRef.current.height = originalCanvasRef.current.height

          // Get image data from original canvas
          const imageData = originalCtx.getImageData(
            0,
            0,
            originalCanvasRef.current.width,
            originalCanvasRef.current.height,
          )

          // Apply Ghibli-style effects
          const processedImageData = applyGhibliStyleFilters(imageData, intensity / 100)

          // Put processed image data on processed canvas
          processedCtx.putImageData(processedImageData, 0, 0)

          // Apply additional post-processing
          applyPostProcessing(processedCtx, processedCanvasRef.current.width, processedCanvasRef.current.height)

          setIsProcessed(true)
          setIsProcessing(false)
        }
      }
    }, 100) // Small delay to allow UI to update
  }

  const applyGhibliStyleFilters = (imageData: ImageData, intensityFactor: number): ImageData => {
    const data = imageData.data

    // Ghibli-style color adjustments
    for (let i = 0; i < data.length; i += 4) {
      // Enhance colors
      data[i] = Math.min(255, data[i] * (1 + 0.2 * intensityFactor)) // Red
      data[i + 1] = Math.min(255, data[i + 1] * (1 + 0.1 * intensityFactor)) // Green
      data[i + 2] = Math.min(255, data[i + 2] * (1 + 0.3 * intensityFactor)) // Blue

      // Increase saturation
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
      data[i] = data[i] + (data[i] - avg) * 0.5 * intensityFactor
      data[i + 1] = data[i + 1] + (data[i + 1] - avg) * 0.5 * intensityFactor
      data[i + 2] = data[i + 2] + (data[i + 2] - avg) * 0.5 * intensityFactor

      // Ensure values are in valid range
      data[i] = Math.max(0, Math.min(255, data[i]))
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1]))
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2]))
    }

    return imageData
  }

  const applyPostProcessing = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Apply a slight blur for the soft Ghibli look
    ctx.filter = "blur(0.5px)"
    ctx.drawImage(ctx.canvas, 0, 0)
    ctx.filter = "none"

    // Add a subtle vignette effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
    ctx.globalCompositeOperation = "multiply"

    const gradient = ctx.createRadialGradient(width / 2, height / 2, height * 0.3, width / 2, height / 2, height * 0.8)

    gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
    gradient.addColorStop(1, "rgba(0, 0, 0, 0.3)")

    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)

    // Reset composite operation
    ctx.globalCompositeOperation = "source-over"

    // Add a warm overlay to mimic Ghibli's color palette
    ctx.fillStyle = "rgba(255, 245, 224, 0.1)"
    ctx.fillRect(0, 0, width, height)
  }

  const downloadImage = () => {
    if (processedCanvasRef.current) {
      const link = document.createElement("a")
      link.download = "ghibli-style-image.png"
      link.href = processedCanvasRef.current.toDataURL("image/png")
      link.click()
    }
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-4 overflow-hidden">
          <h2 className="text-xl font-semibold mb-4 text-center">Original Image</h2>
          <div className="relative aspect-auto flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
            <canvas
              ref={originalCanvasRef}
              className="max-w-full max-h-[400px] object-contain"
              style={{ display: "block" }}
            />
          </div>
        </Card>

        <Card className="p-4 overflow-hidden">
          <h2 className="text-xl font-semibold mb-4 text-center">Ghibli Style</h2>
          <div className="relative aspect-auto flex items-center justify-center bg-gray-100 rounded-md overflow-hidden">
            {isProcessed ? (
              <canvas
                ref={processedCanvasRef}
                className="max-w-full max-h-[400px] object-contain"
                style={{ display: "block" }}
              />
            ) : (
              <div className="text-center p-8 text-gray-500">
                {isProcessing ? (
                  <div className="flex flex-col items-center">
                    <RefreshCw className="animate-spin h-8 w-8 mb-2" />
                    <p>Applying Ghibli magic...</p>
                  </div>
                ) : (
                  <p>Click "Apply Ghibli Effect" to transform your image</p>
                )}
              </div>
            )}
            <canvas ref={processedCanvasRef} className="hidden" />
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Effect Intensity: {intensity}%</label>
          <Slider
            value={[intensity]}
            min={0}
            max={100}
            step={1}
            onValueChange={(value) => setIntensity(value[0])}
            disabled={isProcessing}
          />
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={applyGhibliEffect} disabled={isProcessing} className="bg-[#1976d2] hover:bg-[#1565c0]">
            {isProcessing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Apply Ghibli Effect"
            )}
          </Button>

          {isProcessed && (
            <Button onClick={downloadImage} variant="outline" className="border-[#1976d2] text-[#1976d2]">
              <Download className="mr-2 h-4 w-4" />
              Download Image
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

