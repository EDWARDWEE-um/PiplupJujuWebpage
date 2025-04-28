/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'placekitten.com', 'picsum.photos'],
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false, // Disable CSS optimization to prevent issues
    esmExternals: false, // Ensure proper module loading
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
