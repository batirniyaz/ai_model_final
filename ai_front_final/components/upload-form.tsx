"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2, Upload, AlertCircle } from "lucide-react"
import Image from "next/image"
import { BASE_URL } from '@/lib/constasnt'
// import { BASE_URL } from '@/lib/constants' // Corrected typo

type PredictionResult = {
  id: number
  image_path: string
  created_at: string
  prediction: string
  prediction_result: string
  image_name: string
  updated_at: string
}

export function UploadForm() {
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<PredictionResult | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);
    setImageUrl(null);

    try {
      const formData = new FormData();
      formData.append("upload_file", file);

      const response = await fetch(`${BASE_URL}api/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);

      setImageUrl(`${BASE_URL}api/images/${data.image_name}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="image">Cell Image</Label>
          <Input id="image" type="file" accept="image/*" onChange={handleFileChange} disabled={isLoading} />
        </div>

        <Button type="submit" disabled={isLoading || !file}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload & Analyze
            </>
          )}
        </Button>
      </form>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {result && (
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Analysis Results</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm font-medium">ID:</div>
                    <div className="text-sm">{result.id}</div>
                    <div className="text-sm font-medium">Image Name:</div>
                    <div className="text-sm truncate" title={result.image_name}>
                      {result.image_name}
                    </div>
                    <div className="text-sm font-medium">Prediction:</div>
                    <div className="text-sm">{result.prediction}</div>
                    <div className="text-sm font-medium">Result:</div>
                    <div
                      className={`text-sm font-bold ${
                        result.prediction_result === "uninfected" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {result.prediction_result.toUpperCase()}
                    </div>
                    <div className="text-sm font-medium">Created At:</div>
                    <div className="text-sm">{new Date(result.created_at).toLocaleString()}</div>
                  </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                  {imageUrl ? (
                    <div className="relative w-full aspect-square max-w-xs mx-auto border rounded-md overflow-hidden">
                      <Image
                        src={imageUrl || "/placeholder.svg"}
                        alt={`Cell image: ${result.image_name}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-center w-full aspect-square max-w-xs mx-auto border rounded-md bg-muted">
                      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}