import Image from "next/image"
import Link from "next/link"
import { Play } from "lucide-react"

interface YouTubePreviewProps {
  title: string
  thumbnail: string
  views: string
  date: string
  duration: string
  videoId?: string
}

export default function YouTubePreview({ title, thumbnail, views, date, duration, videoId }: YouTubePreviewProps) {
  // If a real videoId is provided, use it to create a real YouTube link
  const youtubeLink = videoId ? `https://www.youtube.com/watch?v=${videoId}` : "https://www.youtube.com/@PIPLUPJUJUTCG"

  return (
    <Link href={youtubeLink} target="_blank" rel="noopener noreferrer">
      <div className="group flex flex-col sm:flex-row gap-4 hover:bg-muted p-2 rounded-lg transition-colors">
        <div className="relative flex-shrink-0">
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            width={360}
            height={200}
            className="rounded-lg object-cover w-full sm:w-[180px] aspect-video"
          />
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1 rounded">{duration}</div>
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-black/60 rounded-full p-3">
              <Play className="h-6 w-6 text-white" fill="white" />
            </div>
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {views} views • {date}
          </p>
        </div>
      </div>
    </Link>
  )
}
