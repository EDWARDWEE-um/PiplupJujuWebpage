import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, FileText, Download, ExternalLink } from "lucide-react"

export default function MigrationGuidePage() {
  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/wix-migration">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Migration Tool
          </Button>
        </Link>
      </div>

      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8 mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Wix to PIPLUPJUJUTCG Migration Guide</h1>
          <p className="text-muted-foreground">
            A comprehensive guide to migrating your Wix ecommerce store to PIPLUPJUJUTCG
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download PDF Guide
        </Button>
      </div>

      <div className="grid gap-8 md:grid-cols-[250px_1fr] lg:grid-cols-[300px_1fr]">
        <div className="space-y-4">
          <div className="font-medium">On this page</div>
          <nav className="flex flex-col space-y-2 text-sm">
            <Link href="#introduction" className="text-muted-foreground hover:text-foreground">
              Introduction
            </Link>
            <Link href="#before-migration" className="text-muted-foreground hover:text-foreground">
              Before You Migrate
            </Link>
            <Link href="#data-migration" className="text-muted-foreground hover:text-foreground">
              Data Migration
            </Link>
            <Link href="#design-considerations" className="text-muted-foreground hover:text-foreground">
              Design Considerations
            </Link>
            <Link href="#seo" className="text-muted-foreground hover:text-foreground">
              SEO & Redirects
            </Link>
            <Link href="#payment-processing" className="text-muted-foreground hover:text-foreground">
              Payment Processing
            </Link>
            <Link href="#testing" className="text-muted-foreground hover:text-foreground">
              Testing
            </Link>
            <Link href="#going-live" className="text-muted-foreground hover:text-foreground">
              Going Live
            </Link>
            <Link href="#post-migration" className="text-muted-foreground hover:text-foreground">
              Post-Migration
            </Link>
          </nav>
        </div>

        <div className="space-y-8">
          <Card id="introduction">
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
              <CardDescription>Understanding the migration process from Wix to PIPLUPJUJUTCG</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Migrating from Wix to PIPLUPJUJUTCG involves transferring your products, categories, customers, orders,
                and other data from your Wix store to your new PIPLUPJUJUTCG store. This guide will walk you through the
                entire process, from preparation to going live.
              </p>
              <p>The migration process consists of several key steps:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Preparing your Wix store data for migration</li>
                <li>Connecting to the Wix API to extract your data</li>
                <li>Importing your data into PIPLUPJUJUTCG</li>
                <li>Setting up redirects for SEO</li>
                <li>Testing your new store</li>
                <li>Going live with your PIPLUPJUJUTCG store</li>
              </ol>
              <p>
                Our migration tool automates much of this process, but there are still important considerations and
                manual steps that you'll need to take care of.
              </p>
            </CardContent>
          </Card>

          <Card id="before-migration">
            <CardHeader>
              <CardTitle>Before You Migrate</CardTitle>
              <CardDescription>Important preparations before starting the migration process</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">Backup Your Wix Store Data</h3>
              <p>
                Before you begin the migration process, it's crucial to back up all your Wix store data. This includes:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Product catalog (including images, descriptions, prices, etc.)</li>
                <li>Customer information</li>
                <li>Order history</li>
                <li>Store settings and configurations</li>
              </ul>
              <p>You can export most of this data from your Wix dashboard under Store Products &gt; Export & Import.</p>

              <Separator className="my-4" />

              <h3 className="text-lg font-medium">Generate Wix API Credentials</h3>
              <p>To use our migration tool, you'll need to generate API credentials from your Wix account:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Log in to your Wix account</li>
                <li>Go to Settings &gt; API Keys</li>
                <li>Click "Create New API Key"</li>
                <li>Name your key (e.g., "PIPLUPJUJUTCG Migration")</li>
                <li>Copy both the API Key and Secret Key</li>
              </ol>
              <p>You'll need these credentials when using our migration tool.</p>

              <Separator className="my-4" />

              <h3 className="text-lg font-medium">Document Your Current Store Structure</h3>
              <p>Take time to document your current store structure, including:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Category hierarchy</li>
                <li>Product organization</li>
                <li>URL structure</li>
                <li>Custom fields and attributes</li>
                <li>Shipping and tax settings</li>
                <li>Payment methods</li>
              </ul>
              <p>This documentation will be valuable when setting up your new PIPLUPJUJUTCG store.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Download Pre-Migration Checklist
              </Button>
            </CardFooter>
          </Card>

          <Card id="data-migration">
            <CardHeader>
              <CardTitle>Data Migration</CardTitle>
              <CardDescription>Understanding what data will be migrated and how</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <h3 className="text-lg font-medium">What Gets Migrated</h3>
              <p>Our migration tool will transfer the following data from your Wix store:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Products (including images, descriptions, prices, variants, etc.)</li>
                <li>Categories and collections</li>
                <li>Customers (including addresses and contact information)</li>
                <li>Orders (including line items, shipping details, etc.)</li>
              </ul>

              <Separator className="my-4" />

              <h3 className="text-lg font-medium">What Doesn't Get Migrated</h3>
              <p>Some elements will need to be set up manually in your new PIPLUPJUJUTCG store:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Store design and theme customizations</li>
                <li>Blog posts and content pages</li>
                <li>Custom apps and integrations</li>
                <li>Discount rules and coupons</li>
                <li>Tax and shipping configurations</li>
                <li>Payment gateway settings</li>
              </ul>

              <Separator className="my-4" />

              <h3 className="text-lg font-medium">Migration Process</h3>
              <p>The data migration process follows these steps:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Connect to your Wix store using API credentials</li>
                <li>Extract data from Wix (categories, products, customers, orders)</li>
                <li>Transform data to match PIPLUPJUJUTCG's structure</li>
                <li>Import data into your PIPLUPJUJUTCG store</li>
                <li>Verify that all data has been migrated correctly</li>
              </ol>
              <p>
                Our migration tool handles this process automatically, but you'll need to verify the results and make
                any necessary adjustments.
              </p>
            </CardContent>
          </Card>

          <Card id="design-considerations">
            <CardHeader>
              <CardTitle>Design Considerations</CardTitle>
              <CardDescription>Adapting your store design for PIPLUPJUJUTCG</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                While our migration tool focuses on transferring your store data, you'll need to consider how to adapt
                your store design for PIPLUPJUJUTCG.
              </p>

              <h3 className="text-lg font-medium">Theme Selection</h3>
              <p>
                PIPLUPJUJUTCG uses a modern, responsive design system based on Next.js and Tailwind CSS. You have
                several options for your store design:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Use the default PIPLUPJUJUTCG theme with your branding colors</li>
                <li>Customize the existing theme to match your brand</li>
                <li>Create a completely custom design</li>
              </ul>

              <h3 className="text-lg font-medium">Brand Assets</h3>
              <p>Prepare the following brand assets for your PIPLUPJUJUTCG store:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Logo (SVG or high-resolution PNG)</li>
                <li>Favicon</li>
                <li>Brand colors (primary, secondary, accent)</li>
                <li>Typography preferences</li>
                <li>Hero images and banners</li>
              </ul>

              <h3 className="text-lg font-medium">Mobile Responsiveness</h3>
              <p>
                PIPLUPJUJUTCG is built with mobile-first design principles. All pages and components are fully
                responsive and will adapt to different screen sizes.
              </p>
            </CardContent>
          </Card>

          <Card id="seo">
            <CardHeader>
              <CardTitle>SEO & Redirects</CardTitle>
              <CardDescription>Maintaining your search engine rankings during migration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                One of the most critical aspects of any ecommerce migration is preserving your SEO rankings. This
                requires setting up proper redirects from your old Wix URLs to your new PIPLUPJUJUTCG URLs.
              </p>

              <h3 className="text-lg font-medium">URL Structure Mapping</h3>
              <p>
                Our migration tool will generate a URL mapping file that shows how your Wix URLs map to your new
                PIPLUPJUJUTCG URLs. This mapping covers:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Product pages</li>
                <li>Category pages</li>
                <li>Collection pages</li>
                <li>Other important pages (about, contact, etc.)</li>
              </ul>

              <h3 className="text-lg font-medium">Setting Up Redirects</h3>
              <p>There are two ways to set up redirects:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>
                  <strong>Wix Redirects:</strong> Set up redirects in your Wix dashboard under SEO Tools &gt; URL
                  Redirects. This is useful during the transition period.
                </li>
                <li>
                  <strong>Server Redirects:</strong> Once you've fully migrated, set up 301 redirects at the server
                  level using the URL mapping file.
                </li>
              </ol>

              <h3 className="text-lg font-medium">Meta Data</h3>
              <p>Our migration tool will transfer the following SEO metadata from your Wix store:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Page titles</li>
                <li>Meta descriptions</li>
                <li>Product and category descriptions</li>
              </ul>
              <p>You should review and optimize this metadata after migration.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Download SEO Migration Checklist
              </Button>
            </CardFooter>
          </Card>

          <Card id="payment-processing">
            <CardHeader>
              <CardTitle>Payment Processing</CardTitle>
              <CardDescription>Setting up payment methods in your new store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Payment processing settings are not automatically migrated. You'll need to set up your payment gateways
                in your new PIPLUPJUJUTCG store.
              </p>

              <h3 className="text-lg font-medium">Supported Payment Gateways</h3>
              <p>PIPLUPJUJUTCG supports the following payment gateways:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Stripe</li>
                <li>PayPal</li>
                <li>Square</li>
                <li>Authorize.net</li>
                <li>Custom payment methods</li>
              </ul>

              <h3 className="text-lg font-medium">Setting Up Payment Gateways</h3>
              <p>To set up payment gateways in PIPLUPJUJUTCG:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Go to Store Settings &gt; Payment Methods</li>
                <li>Select the payment gateways you want to use</li>
                <li>Enter your API credentials for each gateway</li>
                <li>Configure settings like supported currencies, payment icons, etc.</li>
              </ol>

              <h3 className="text-lg font-medium">Testing Payments</h3>
              <p>Before going live, test your payment gateways using test mode:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Enable test mode for each payment gateway</li>
                <li>Place test orders using test credit cards</li>
                <li>Verify that orders are processed correctly</li>
                <li>Check that order confirmation emails are sent</li>
              </ol>
            </CardContent>
          </Card>

          <Card id="testing">
            <CardHeader>
              <CardTitle>Testing</CardTitle>
              <CardDescription>Thoroughly testing your new store before going live</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Before going live with your new PIPLUPJUJUTCG store, it's essential to thoroughly test all aspects of
                your store functionality.
              </p>

              <h3 className="text-lg font-medium">Functional Testing</h3>
              <p>Test the following core functions:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Product browsing and search</li>
                <li>Category navigation</li>
                <li>Product filtering and sorting</li>
                <li>Adding products to cart</li>
                <li>Checkout process</li>
                <li>Account creation and login</li>
                <li>Order history and tracking</li>
              </ul>

              <h3 className="text-lg font-medium">Cross-Browser Testing</h3>
              <p>Test your store on different browsers:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Chrome</li>
                <li>Firefox</li>
                <li>Safari</li>
                <li>Edge</li>
              </ul>

              <h3 className="text-lg font-medium">Mobile Testing</h3>
              <p>Test your store on different devices:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>iPhone (iOS)</li>
                <li>Android phones</li>
                <li>Tablets</li>
              </ul>

              <h3 className="text-lg font-medium">Performance Testing</h3>
              <p>Check your store's performance:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Page load times</li>
                <li>Image loading</li>
                <li>Checkout process speed</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Download Testing Checklist
              </Button>
            </CardFooter>
          </Card>

          <Card id="going-live">
            <CardHeader>
              <CardTitle>Going Live</CardTitle>
              <CardDescription>Steps to launch your new PIPLUPJUJUTCG store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Once you've completed the migration and testing, you're ready to launch your new PIPLUPJUJUTCG store.
                Here's a step-by-step guide to going live:
              </p>

              <h3 className="text-lg font-medium">Pre-Launch Checklist</h3>
              <p>Before launching, verify that:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>All products, categories, and content have been migrated</li>
                <li>Images and media are displaying correctly</li>
                <li>Payment gateways are configured and working</li>
                <li>Shipping and tax settings are correct</li>
                <li>Email notifications are set up</li>
                <li>Legal pages (terms, privacy policy, etc.) are in place</li>
              </ul>

              <h3 className="text-lg font-medium">DNS Configuration</h3>
              <p>To point your domain to your new PIPLUPJUJUTCG store:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Log in to your domain registrar</li>
                <li>Update your DNS settings to point to your new hosting</li>
                <li>Set up CNAME records as needed</li>
                <li>Wait for DNS propagation (can take up to 48 hours)</li>
              </ol>

              <h3 className="text-lg font-medium">Redirects Implementation</h3>
              <p>Implement the redirects from your URL mapping:</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Set up 301 redirects from old Wix URLs to new PIPLUPJUJUTCG URLs</li>
                <li>Test redirects to ensure they're working correctly</li>
                <li>Monitor for 404 errors and fix any missing redirects</li>
              </ol>

              <h3 className="text-lg font-medium">Launch Announcement</h3>
              <p>Notify your customers about your new store:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Send an email announcement to your customer list</li>
                <li>Post on social media</li>
                <li>Update your Google Business profile</li>
                <li>Consider offering a special promotion to celebrate the launch</li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                <FileText className="mr-2 h-4 w-4" />
                Download Launch Checklist
              </Button>
            </CardFooter>
          </Card>

          <Card id="post-migration">
            <CardHeader>
              <CardTitle>Post-Migration</CardTitle>
              <CardDescription>What to do after your migration is complete</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                After successfully migrating to PIPLUPJUJUTCG, there are several important tasks to ensure your new
                store continues to run smoothly.
              </p>

              <h3 className="text-lg font-medium">Monitor Performance</h3>
              <p>Keep an eye on your store's performance:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Monitor site speed and performance</li>
                <li>Check for any 404 errors or broken links</li>
                <li>Track conversion rates and user behavior</li>
                <li>Monitor search engine rankings</li>
              </ul>

              <h3 className="text-lg font-medium">Optimize Your Store</h3>
              <p>Continue to improve your store:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Optimize product descriptions and images</li>
                <li>Refine your site navigation and user experience</li>
                <li>Implement customer feedback</li>
                <li>Add new features and functionality</li>
              </ul>

              <h3 className="text-lg font-medium">Stay Updated</h3>
              <p>Keep your PIPLUPJUJUTCG store up to date:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Apply regular updates and security patches</li>
                <li>Stay informed about new features and improvements</li>
                <li>Join the PIPLUPJUJUTCG community for support and tips</li>
              </ul>
            </CardContent>
            <CardFooter>
              <div className="flex flex-col w-full gap-2">
                <Button variant="outline" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Download Post-Migration Guide
                </Button>
                <Button className="w-full">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Contact Support
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
