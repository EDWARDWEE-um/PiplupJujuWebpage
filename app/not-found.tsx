import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle } from "lucide-react"

export default function NotFound() {
  return (
    <div className="container flex items-center justify-center min-h-[calc(100vh-8rem)] py-8">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-12 w-12 text-yellow-500" />
          </div>
          <CardTitle className="text-3xl">404</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-medium mb-2">Page Not Found</p>
          <p className="text-muted-foreground">The page you are looking for doesn't exist or has been moved.</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/products/sealed">Browse Products</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
