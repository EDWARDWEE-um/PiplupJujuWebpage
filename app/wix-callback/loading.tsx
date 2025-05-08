import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WixCallbackLoading() {
  return (
    <div className="container mx-auto py-10">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Completing Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
            <p className="ml-3">Processing your login...</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
