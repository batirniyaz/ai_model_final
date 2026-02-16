"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"
import { BASE_URL } from '@/lib/constasnt'

type ImageData = {
  id: number
  image_path: string
  created_at: string
  prediction: string
  prediction_result: string
  image_name: string
  updated_at: string
}

export function ImageGallery() {
  const [images, setImages] = useState<ImageData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`${BASE_URL}api/images`)

        if (!response.ok) {
          throw new Error(`Failed to fetch images: ${response.status}`)
        }

        const data = await response.json()
        setImages(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load images")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchImages()
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading images...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-destructive/10 text-destructive p-4 rounded-md">
        <p className="font-medium">Error loading images</p>
        <p className="text-sm">{error}</p>
      </div>
    )
  }

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No images found. Upload some images to get started.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden">
          <div className="relative w-full h-72 p-2">
            <Image
              src={`http://20.251.161.183:1111/api/images/${image.image_name}`}
              alt={`Cell image: ${image.image_name}`}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 33vw"
              priority={true}
            />
          </div>
          <CardContent className="p-4">
            <div className="flex justify-between items-start mb-2">
              <Badge
                variant={image.prediction_result.toUpperCase() === "INFECTED" ? "destructive" : "default"}
                className="mb-2"
              >
                {image.prediction_result.toUpperCase()}
              </Badge>
              <span className="text-xs text-muted-foregroun">ID: {image.id}</span>
            </div>
            <p className="text-sm font-medium truncate" title={image.image_name}>
              {image.image_name}
            </p>
            <p className="text-xs text-muted-foreground">{new Date(image.created_at).toLocaleString()}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
