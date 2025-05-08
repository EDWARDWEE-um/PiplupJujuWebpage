import { EnvVariableTester } from "@/components/env-variable-tester"

export default function EnvTestPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8 text-center">Environment Variable Test</h1>
      <EnvVariableTester />

      <div className="max-w-md mx-auto mt-8 p-4 border rounded-md bg-amber-50 text-amber-800">
        <h2 className="font-semibold mb-2">Important Notes:</h2>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          <li>Environment variables in Next.js are embedded during build time</li>
          <li>Any changes to .env.local require a server restart</li>
          <li>Only variables prefixed with NEXT_PUBLIC_ are available in the browser</li>
        </ul>
      </div>
    </div>
  )
}
