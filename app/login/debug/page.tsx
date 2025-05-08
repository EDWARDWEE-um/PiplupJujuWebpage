import { EnvDebug } from "@/components/env-debug"

export default function LoginDebugPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Login Environment Debug</h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Environment Variables</h2>
        <p className="mb-4">This page helps diagnose issues with environment variables needed for authentication.</p>

        <EnvDebug />

        <div className="mt-8 p-4 bg-blue-50 rounded-md">
          <h3 className="font-semibold mb-2">How to fix missing environment variables:</h3>
          <ol className="list-decimal ml-5 space-y-2">
            <li>
              Create a <code className="bg-gray-100 px-1 rounded">.env.local</code> file in your project root
            </li>
            <li>
              Add <code className="bg-gray-100 px-1 rounded">NEXT_PUBLIC_WIX_CLIENT_ID=your_client_id_here</code>
            </li>
            <li>Restart your development server</li>
            <li>Refresh this page</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
