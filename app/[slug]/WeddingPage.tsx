'use client'

import { useState, useEffect } from 'react'
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

interface WeddingPageProps {
  wedding: any
  slug: string
}

export default function WeddingPage({ wedding, slug }: WeddingPageProps) {
  return (
    <>
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
        <GiftSection weddingId={wedding._id} bankAccounts={wedding.bankAccounts} />
      </main>
    </>
  )
}

