/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images:{ //Quando uma imagem vem de uma URL externa, tem q fazer isso
    domains: ['store.storeimages.cdn-apple.com']
  } 
}

module.exports = nextConfig
