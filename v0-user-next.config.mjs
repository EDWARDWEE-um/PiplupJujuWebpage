/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['localhost', 'placekitten.com', 'picsum.photos'],
  },
  experimental: {
    optimizeCss: false, // Disable CSS optimization to prevent issues
    esmExternals: false, // Ensure proper module loading
  },
}

export default nextConfig
