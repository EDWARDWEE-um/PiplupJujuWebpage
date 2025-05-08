"use client"

import { useState } from "react"

export function EnvDebug() {
  const [showDebug, setShowDebug] = useState(false)

  return (
    <div className="mt-8 border border-gray-200 p-4 rounded-md">
      <button onClick={() => setShowDebug(!showDebug)} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
        {showDebug ? "Hide" : "Show"} Environment Debug Info
      </button>

      {showDebug && (
        <div className="mt-4">
          <h3 className="font-bold">Environment Variables:</h3>
          <ul className="mt-2 space-y-2">
            <li>
              <strong>NEXT_PUBLIC_WIX_CLIENT_ID:</strong>{" "}
              {process.env.NEXT_PUBLIC_WIX_CLIENT_ID
                ? `${process.env.NEXT_PUBLIC_WIX_CLIENT_ID.substring(0, 5)}...`
                : "Not defined"}
            </li>
            <li>
              <strong>NODE_ENV:</strong> {process.env.NODE_ENV || "Not defined"}
            </li>
          </ul>

          <div className="mt-4 p-2 bg-yellow-100 rounded">
            <p className="text-sm">Note: If NEXT_PUBLIC_WIX_CLIENT_ID is showing as "Not defined", make sure:</p>
            <ol className="list-decimal ml-5 text-sm mt-2">
              <li>The variable is defined in your .env.local file</li>
              <li>The variable name starts with NEXT_PUBLIC_</li>
              <li>You've restarted your development server after adding the variable</li>
            </ol>
          </div>
        </div>
      )}
    </div>
  )
}
