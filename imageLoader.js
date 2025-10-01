export default function imageLoader({ src, width, quality }) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ''
  
  // If src already starts with basePath, don't add it again
  if (src.startsWith(basePath)) {
    return src
  }
  
  // Add basePath to the src
  return `${basePath}${src}`
}