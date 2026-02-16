import Link from "next/link"
import { UploadForm } from "@/components/upload-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Malaria Detection System</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Upload cell images to detect malaria infection using our AI-powered system
        </p>
      </div>
      <div className='flex justify-center'>

    
      <div className="grid grid-cols-1    md:grid-cols-2 gap-8">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Upload Image</CardTitle>
            <CardDescription>Upload a cell image to analyze for malaria infection</CardDescription>
          </CardHeader>
          <CardContent>
            <UploadForm />
          </CardContent>
        </Card>
      </div>
  </div>
      <div className="flex justify-center">
        <Link
          href="/images"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          View All Images
        </Link>
      </div>
    </div>
  )
}
