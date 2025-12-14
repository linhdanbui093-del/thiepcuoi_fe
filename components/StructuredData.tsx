'use client'

interface StructuredDataProps {
  wedding: {
    groomName: string
    brideName: string
    groomFullName?: string
    brideFullName?: string
    weddingDate: string
    events?: Array<{
      title: string
      date: string
      time: string
      location: string
      address: string
    }>
  }
  slug?: string
}

export default function StructuredData({ wedding, slug }: StructuredDataProps) {
  // Use relative URL or environment variable for production
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || (typeof window !== 'undefined' ? window.location.origin : '')
  const pageUrl = slug ? `${siteUrl}/?slug=${slug}` : siteUrl
  const weddingDate = new Date(wedding.weddingDate)
  
  // Generate structured data for Event
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Wedding",
    "name": `Đám cưới ${wedding.groomName} & ${wedding.brideName}`,
    "description": `Thiệp cưới online của ${wedding.groomFullName || wedding.groomName} và ${wedding.brideFullName || wedding.brideName}`,
    "url": pageUrl,
    "startDate": weddingDate.toISOString(),
    "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
    "eventStatus": "https://schema.org/EventScheduled",
    "location": wedding.events && wedding.events.length > 0 ? {
      "@type": "Place",
      "name": wedding.events[0].location,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": wedding.events[0].address,
        "addressCountry": "VN"
      }
    } : undefined,
    "organizer": {
      "@type": "Person",
      "name": `${wedding.groomFullName || wedding.groomName} & ${wedding.brideFullName || wedding.brideName}`
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

