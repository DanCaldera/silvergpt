/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 's.gravatar.com', 'lh3.googleusercontent.com', 'tailwindui.com', 'avatars.githubusercontent.com']
  }
}

module.exports = nextConfig
