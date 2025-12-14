'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import HeroSection from '@/components/HeroSection'
import AboutCouple from '@/components/AboutCouple'
import Countdown from '@/components/Countdown'
import StorySection from '@/components/StorySection'
import PhotoAlbum from '@/components/PhotoAlbum'
import EventsSection from '@/components/EventsSection'
import Guestbook from '@/components/Guestbook'
import GiftSection from '@/components/GiftSection'
import StructuredData from '@/components/StructuredData'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

function HomeContent() {
  const searchParams = useSearchParams()
  const slug = searchParams?.get('slug') || 'default'
  const [wedding, setWedding] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchWedding()
  }, [slug])

  const fetchWedding = async () => {
    try {
      const response = await axios.get(`${API_URL}/weddings/${slug}`)
      setWedding(response.data)
    } catch (error) {
      console.error('Error fetching wedding:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  if (!wedding) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Không tìm thấy thiệp cưới</h1>
          <p className="text-gray-600">Vui lòng kiểm tra lại đường dẫn</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <StructuredData wedding={wedding} slug={slug} />
      <main className="min-h-screen">
        <HeroSection wedding={wedding} />
        <AboutCouple wedding={wedding} />
        <Countdown weddingDate={wedding.weddingDate} />
        <StorySection story={wedding.story || []} />
        <PhotoAlbum weddingId={wedding._id} />
        <EventsSection events={wedding.events || []} />
        <Guestbook weddingId={wedding._id} />
        <GiftSection weddingId={wedding._id} bankAccounts={wedding.bankAccounts} />
      </main>
    </>
  )
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    }>
      <HomeContent />
    </Suspense>
  )
}
