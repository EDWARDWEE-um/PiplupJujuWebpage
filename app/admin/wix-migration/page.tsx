"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Download,
  Upload,
  Database,
  ShoppingBag,
  Users,
  CreditCard,
  Settings,
  FileText,
} from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function WixMigrationPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [wixApiKey, setWixApiKey] = useState("")
  const [wixSecretKey, setWixSecretKey] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const [migrationProgress, setMigrationProgress] = useState(0)
  const [migrationStatus, setMigrationStatus] = useState<"idle" | "running" | "completed" | "error">("idle")
  const [migrationStats, setMigrationStats] = useState({
    products: { total: 0, migrated: 0 },
    categories: { total: 0, migrated: 0 },
    customers: { total: 0, migrated: 0 },
    orders: { total: 0, migrated: 0 },
  })

  const handleConnect = async () => {
    if (!wixApiKey || !wixSecretKey) {
      toast({
        title: "Missing credentials",
        description: "Please enter your Wix API key and secret key",
        variant: "destructive",
      })
      return
    }

    // Simulate API connection
    setIsConnected(false)

    try {
      // In a real implementation, this would be an API call to validate the credentials
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsConnected(true)
      toast({
        title: "Connected to Wix",
        description: "Successfully connected to your Wix store",
      })

      // Simulate fetching stats
      setMigrationStats({
        products: { total: 156, migrated: 0 },
        categories: { total: 12, migrated: 0 },
        customers: { total: 243, migrated: 0 },
        orders: { total: 189, migrated: 0 },
      })
    } catch (error) {
      toast({
        title: "Connection failed",
        description: "Failed to connect to Wix. Please check your credentials.",
        variant: "destructive",
      })
    }
  }

  const startMigration = async () => {
    if (!isConnected) {
      toast({
        title: "Not connected",
        description: "Please connect to your Wix store first",
        variant: "destructive",
      })
      return
    }

    setMigrationStatus("running")
    setMigrationProgress(0)

    try {
      // Simulate migration process
      for (let i = 1; i <= 100; i++) {
        await new Promise((resolve) => setTimeout(resolve, 100))
        setMigrationProgress(i)

        // Update stats as migration progresses
        if (i === 25) {
          setMigrationStats((prev) => ({
            ...prev,
            categories: { ...prev.categories, migrated: prev.categories.total },
          }))
        } else if (i === 50) {
          setMigrationStats((prev) => ({
            ...prev,
            products: { ...prev.products, migrated: prev.products.total },
          }))
        } else if (i === 75) {
          setMigrationStats((prev) => ({
            ...prev,
            customers: { ...prev.customers, migrated: prev.customers.total },
          }))
        } else if (i === 100) {
          setMigrationStats((prev) => ({
            ...prev,
            orders: { ...prev.orders, migrated: prev.orders.total },
          }))
        }
      }

      setMigrationStatus("completed")
      toast({
        title: "Migration completed",
        description: "Your Wix store has been successfully migrated",
      })
    } catch (error) {
      setMigrationStatus("error")
      toast({
        title: "Migration failed",
        description: "An error occurred during migration",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wix Migration Tool</h1>
          <p className="text-muted-foreground">Migrate your Wix ecommerce store to PIPLUPJUJUTCG</p>
        </div>
        <div className="flex items-center gap-2">
          {isConnected ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" />
              Connected to Wix
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" />
              Not Connected
            </Badge>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="connect">Connect</TabsTrigger>
          <TabsTrigger value="migrate">Migrate</TabsTrigger>
          <TabsTrigger value="verify">Verify</TabsTrigger>
          <TabsTrigger value="finalize">Finalize</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Migration Process Overview</CardTitle>
              <CardDescription>Follow these steps to migrate your Wix ecommerce store to PIPLUPJUJUTCG</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Connect to Wix</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect to your Wix store using your API credentials to access your store data
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Migrate Data</h3>
                    <p className="text-sm text-muted-foreground">
                      Migrate your products, categories, customers, and orders from Wix to PIPLUPJUJUTCG
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Verify Migration</h3>
                    <p className="text-sm text-muted-foreground">
                      Verify that all your data has been migrated correctly and make any necessary adjustments
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    4
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Finalize Migration</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up redirects, update DNS settings, and go live with your new PIPLUPJUJUTCG store
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setActiveTab("connect")}>
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Migration Checklist</CardTitle>
              <CardDescription>Important items to prepare before starting the migration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                  </div>
                  <span>Backup your Wix store data</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                  </div>
                  <span>Generate Wix API credentials</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                  </div>
                  <span>Prepare product images and files</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                  </div>
                  <span>Document custom settings and configurations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary"></div>
                  </div>
                  <span>Prepare URL structure mapping for SEO</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="connect" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connect to Wix</CardTitle>
              <CardDescription>Enter your Wix API credentials to connect to your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="api-key">Wix API Key</Label>
                <Input
                  id="api-key"
                  placeholder="Enter your Wix API key"
                  value={wixApiKey}
                  onChange={(e) => setWixApiKey(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  You can find your API key in your Wix dashboard under Settings &gt; API Keys
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secret-key">Wix Secret Key</Label>
                <Input
                  id="secret-key"
                  type="password"
                  placeholder="Enter your Wix secret key"
                  value={wixSecretKey}
                  onChange={(e) => setWixSecretKey(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("overview")}>
                Back
              </Button>
              <Button onClick={handleConnect}>{isConnected ? "Reconnect" : "Connect to Wix"}</Button>
            </CardFooter>
          </Card>

          {isConnected && (
            <Card>
              <CardHeader>
                <CardTitle>Connection Status</CardTitle>
                <CardDescription>Your Wix store is connected and ready for migration</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Products</p>
                    <p className="text-2xl font-bold">{migrationStats.products.total}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Categories</p>
                    <p className="text-2xl font-bold">{migrationStats.categories.total}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Customers</p>
                    <p className="text-2xl font-bold">{migrationStats.customers.total}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Orders</p>
                    <p className="text-2xl font-bold">{migrationStats.orders.total}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={() => setActiveTab("migrate")} className="w-full">
                  Continue to Migration
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="migrate" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Migrate Your Wix Store</CardTitle>
              <CardDescription>Start the migration process to transfer your Wix store data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <span>Categories</span>
                  </div>
                  <Badge variant={migrationStats.categories.migrated > 0 ? "success" : "outline"}>
                    {migrationStats.categories.migrated}/{migrationStats.categories.total}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <span>Products</span>
                  </div>
                  <Badge variant={migrationStats.products.migrated > 0 ? "success" : "outline"}>
                    {migrationStats.products.migrated}/{migrationStats.products.total}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Customers</span>
                  </div>
                  <Badge variant={migrationStats.customers.migrated > 0 ? "success" : "outline"}>
                    {migrationStats.customers.migrated}/{migrationStats.customers.total}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span>Orders</span>
                  </div>
                  <Badge variant={migrationStats.orders.migrated > 0 ? "success" : "outline"}>
                    {migrationStats.orders.migrated}/{migrationStats.orders.total}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Migration Progress</span>
                  <span>{migrationProgress}%</span>
                </div>
                <Progress value={migrationProgress} className="h-2" />
              </div>

              {migrationStatus === "completed" && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">Migration Completed</AlertTitle>
                  <AlertDescription className="text-green-700">
                    Your Wix store data has been successfully migrated to PIPLUPJUJUTCG.
                  </AlertDescription>
                </Alert>
              )}

              {migrationStatus === "error" && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Migration Failed</AlertTitle>
                  <AlertDescription>
                    An error occurred during migration. Please try again or contact support.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("connect")}
                disabled={migrationStatus === "running"}
              >
                Back
              </Button>
              {migrationStatus === "idle" || migrationStatus === "error" ? (
                <Button onClick={startMigration}>Start Migration</Button>
              ) : migrationStatus === "running" ? (
                <Button disabled>Migrating...</Button>
              ) : (
                <Button onClick={() => setActiveTab("verify")}>
                  Continue to Verification
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="verify" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verify Migration</CardTitle>
              <CardDescription>Verify that your Wix store data has been migrated correctly</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <span>Categories</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="h-5 w-5 text-primary" />
                    <span>Products</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Customers</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <span>Orders</span>
                  </div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Verified</Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="verification-notes">Verification Notes</Label>
                <Textarea
                  id="verification-notes"
                  placeholder="Add any notes or issues you found during verification"
                  rows={4}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("migrate")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("finalize")}>
                Continue to Finalization
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="finalize" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Finalize Migration</CardTitle>
              <CardDescription>Complete the final steps to go live with your new PIPLUPJUJUTCG store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    1
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Set Up URL Redirects</h3>
                    <p className="text-sm text-muted-foreground">
                      Set up redirects from your Wix store URLs to your new PIPLUPJUJUTCG store URLs
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <FileText className="mr-2 h-4 w-4" />
                      Generate Redirect Map
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    2
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Update DNS Settings</h3>
                    <p className="text-sm text-muted-foreground">
                      Update your DNS settings to point to your new PIPLUPJUJUTCG store
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Settings className="mr-2 h-4 w-4" />
                      View DNS Instructions
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    3
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Test Your New Store</h3>
                    <p className="text-sm text-muted-foreground">
                      Test your new PIPLUPJUJUTCG store to ensure everything is working correctly
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Download className="mr-2 h-4 w-4" />
                      Download Test Checklist
                    </Button>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    4
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium">Go Live</h3>
                    <p className="text-sm text-muted-foreground">
                      Switch your store to live mode and start accepting orders
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Go Live Checklist
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("verify")}>
                Back
              </Button>
              <Button>Complete Migration</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Migration Summary</CardTitle>
              <CardDescription>Summary of your Wix to PIPLUPJUJUTCG migration</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Products Migrated</p>
                    <p className="text-2xl font-bold">{migrationStats.products.migrated}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Categories Migrated</p>
                    <p className="text-2xl font-bold">{migrationStats.categories.migrated}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Customers Migrated</p>
                    <p className="text-2xl font-bold">{migrationStats.customers.migrated}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Orders Migrated</p>
                    <p className="text-2xl font-bold">{migrationStats.orders.migrated}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
