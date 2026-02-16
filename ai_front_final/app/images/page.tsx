import { ImageGallery } from "@/components/image-gallery"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ImagesPage() {
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">All Analyzed Images</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          View all previously analyzed cell images and their detection results
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Image Gallery</CardTitle>
          <CardDescription>Browse through all analyzed cell images</CardDescription>
        </CardHeader>
        <CardContent>
          <ImageGallery />
        </CardContent>
      </Card>
    </div>
  )
}
