'use client'

import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import AboutCouple from '@/components/AboutCouple'
import Countdown from '@/components/Countdown'
import StorySection from '@/components/StorySection'
import PhotoAlbum from '@/components/PhotoAlbum'
import EventsSection from '@/components/EventsSection'
import ParentsSection from '@/components/ParentsSection'
import Guestbook from '@/components/Guestbook'
import GiftSection from '@/components/GiftSection'
import StructuredData from '@/components/StructuredData'
import MusicPlayer from '@/components/MusicPlayer'
import CurtainOpening from '@/components/CurtainOpening'

interface WeddingPageProps {
  wedding: any
  slug: string
}

export default function WeddingPage({ wedding, slug }: WeddingPageProps) {
  return (
    <>
      <CurtainOpening />
      <StructuredData wedding={wedding} slug={slug} />
      <MusicPlayer wedding={wedding} />
      <main className="min-h-screen">
        <HeroSection wedding={wedding} />
        <AboutCouple wedding={wedding} />
        <Countdown weddingDate={wedding.weddingDate} />
        <StorySection story={wedding.story || []} />
        <PhotoAlbum weddingId={wedding._id} />
        <EventsSection events={wedding.events || []} />
        <ParentsSection parents={wedding.parents} />
        <Guestbook weddingId={wedding._id} />
        <Suspense fallback={
          <section className="py-20">
            <div className="container mx-auto px-4 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            </div>
          </section>
        }>
          <GiftSection weddingId={wedding._id} bankAccounts={wedding.bankAccounts} />
        </Suspense>
      </main>
    </>
  )
}

