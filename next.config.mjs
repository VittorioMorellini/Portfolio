/** @type {import('next').NextConfig} */
//const { withContentlayer } = require('next-contentlayer');
import { withContentlayer } from 'next-contentlayer'

const nextConfig = {
  reactStrictMode: true,
  disableImportAliasWarning: true,
  images:{
    //domains: ["rickandmortyapi.com"],
    domains: ['images.unsplash.com', 'media-exp1.licdn.com',"rickandmortyapi.com"],    
    loader: "custom",
    path: "/"
  },
  swcMinify: true,
}

//module.exports = withContentlayer(nextConfig)
export default withContentlayer(nextConfig)