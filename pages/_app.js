import '../styles/globals.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import GoogleAnalytics from '../components/GoogleAnalytics'

// Google Analytics tracking function for route changes
const pageview = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
}

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url)
    }
    
    router.events.on('routeChangeComplete', handleRouteChange)
    
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <>
      {/* Google Analytics Integration */}
      <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
      
      {/* Main App Component */}
      <Component {...pageProps} />
    </>
  )
}