import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import WeddingPage from './WeddingPage'
import { generateWeddingMetadata } from '@/lib/metadata'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ocuadua.com/api'

interface PageProps {
  params: {
    slug: string
  }
}

async function getWedding(slug: string) {
  try {
    const response = await fetch(`${API_URL}/weddings/${slug}`, {
      cache: 'no-store',
    })
    if (!response.ok) {
      return null
    }
    return await response.json()
  } catch (error) {
    return null
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const wedding = await getWedding(params.slug)
  
  if (!wedding) {
    return {
      title: 'Không tìm thấy thiệp cưới',
    }
  }

  const metadata = generateWeddingMetadata(wedding)
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: metadata.ogImage ? [`https://api.ocuadua.com${metadata.ogImage}`] : [],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: metadata.description,
      images: metadata.ogImage ? [`https://api.ocuadua.com${metadata.ogImage}`] : [],
    },
  }
}

export default async function SlugPage({ params }: PageProps) {
  const wedding = await getWedding(params.slug)

  if (!wedding) {
    notFound()
  }

  return <WeddingPage wedding={wedding} slug={params.slug} />
}

