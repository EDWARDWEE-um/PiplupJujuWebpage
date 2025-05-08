/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Apply these headers to all routes
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.wix.com;
              connect-src 'self' https://*.wix.com https://www.googleapis.com;
              frame-src 'self' https://*.wix.com https://accounts.google.com;
              img-src 'self' data: https://*.wix.com https://*.googleusercontent.com;
              style-src 'self' 'unsafe-inline';
            `.replace(/\s+/g, ' ').trim()
          }
        ]
      }
    ]
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
