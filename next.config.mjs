/** @type {import('next').NextConfig} */

//const { withContentlayer } = require('next-contentlayer');
import { withContentlayer } from 'next-contentlayer'

const nextConfig = {
  reactStrictMode: true,
  disableImportAliasWarning: true,
  images:{
    domains: ['images.unsplash.com', 'media-exp1.licdn.com',"rickandmortyapi.com"],    
    loader: "custom",
    path: "/"
  },
  swcMinify: true,
}

// const withMDX = require('@next/mdx')({
//   extension: /\.(md|mdx)/,
//   options: {
//     // If you use remark-gfm, you'll need to use next.config.mjs
//     // as the package is ESM only
//     // https://github.com/remarkjs/remark-gfm#install
//     remarkPlugins: [],
//     rehypePlugins: [],
//     // If you use `MDXProvider`, uncomment the following line.
//     //providerImportSource: "@mdx-js/react",
//   },
// })
// module.exports = withMDX({
//   // Append the default value with md extensions
//   pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
// })
//module.exports = withContentlayer(nextConfig)
export default withContentlayer(nextConfig)