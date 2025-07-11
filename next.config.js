/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        // Optionally, you can restrict paths/ports
        // pathname: '/a/**',
        // port: ''
      },
      // Add other image hostnames here as needed
    ],
  },
  webpack(config) {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  },
  serverExternalPackages: ["mongoose"]
}

module.exports = nextConfig