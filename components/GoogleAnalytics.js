import Script from 'next/script'

export default function GoogleAnalytics({ measurementId }) {
  // Don't render if no measurement ID provided
  if (!measurementId) {
    return null;
  }

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${measurementId}', {
            // Privacy-compliant settings
            anonymize_ip: true,
            allow_google_signals: false,
            allow_ad_personalization_signals: false,
            
            // Custom settings
            page_title: document.title,
            page_location: window.location.href,
            
            // Enhanced measurement
            enhanced_measurement: {
              scrolls: true,
              outbound_clicks: true,
              site_search: false,
              video_engagement: false,
              file_downloads: true
            }
          });
          
          // Custom events for portfolio tracking
          gtag('event', 'portfolio_load', {
            event_category: 'engagement',
            event_label: 'portfolio_visit'
          });
          
          // Track important portfolio interactions
          document.addEventListener('click', function(e) {
            // Track contact button clicks
            if (e.target.matches('a[href^="mailto:"]') || e.target.closest('a[href^="mailto:"]')) {
              gtag('event', 'contact_email_click', {
                event_category: 'contact',
                event_label: 'email_click'
              });
            }
            
            // Track GitHub profile clicks
            if (e.target.matches('a[href*="github.com"]') || e.target.closest('a[href*="github.com"]')) {
              gtag('event', 'github_profile_click', {
                event_category: 'social',
                event_label: 'github_click'
              });
            }
            
            // Track LinkedIn profile clicks
            if (e.target.matches('a[href*="linkedin.com"]') || e.target.closest('a[href*="linkedin.com"]')) {
              gtag('event', 'linkedin_profile_click', {
                event_category: 'social',
                event_label: 'linkedin_click'
              });
            }
            
            // Track resume download
            if (e.target.matches('a[href*="resume"]') || e.target.closest('a[href*="resume"]')) {
              gtag('event', 'resume_download', {
                event_category: 'engagement',
                event_label: 'resume_download'
              });
            }
            
            // Track project links
            if (e.target.matches('a[href*="github.com"][href*="santhanakrishnanstark"]') || 
                e.target.closest('a[href*="github.com"][href*="santhanakrishnanstark"]')) {
              const projectName = e.target.textContent || e.target.closest('a').textContent || 'unknown';
              gtag('event', 'project_github_click', {
                event_category: 'projects',
                event_label: projectName.trim()
              });
            }
            
            // Track external project demos
            if (e.target.matches('a[href*="netlify.app"], a[href*="vercel.app"], a[href*="github.io"]') || 
                e.target.closest('a[href*="netlify.app"], a[href*="vercel.app"], a[href*="github.io"]')) {
              const projectName = e.target.textContent || e.target.closest('a').textContent || 'unknown';
              gtag('event', 'project_demo_click', {
                event_category: 'projects',
                event_label: projectName.trim()
              });
            }
          });
          
          // Track scroll depth for engagement
          let maxScroll = 0;
          window.addEventListener('scroll', function() {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            if (scrollPercent > maxScroll && scrollPercent % 25 === 0) {
              maxScroll = scrollPercent;
              gtag('event', 'scroll_depth', {
                event_category: 'engagement',
                event_label: scrollPercent + '%'
              });
            }
          });
        `}
      </Script>
    </>
  )
}