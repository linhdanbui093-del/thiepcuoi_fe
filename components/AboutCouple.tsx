'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Heart, HeartHandshake, Sparkles } from 'lucide-react'
import AnimatedText from './AnimatedText'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ocuadua.com/api'

interface AboutCoupleProps {
  wedding: {
    _id: string
    groomName: string
    brideName: string
    groomFullName: string
    brideFullName: string
    groomDescription: string
    brideDescription: string
  }
}

export default function AboutCouple({ wedding }: AboutCoupleProps) {
  const [groomImage, setGroomImage] = useState<string | null>(null)
  const [brideImage, setBrideImage] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    fetchImages()
  }, [wedding._id])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      {
        threshold: 0.2,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  const fetchImages = async () => {
    try {
      const [groomRes, brideRes] = await Promise.all([
        axios.get(`${API_URL}/images/wedding/${wedding._id}/groom`).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/images/wedding/${wedding._id}/bride`).catch(() => ({ data: [] }))
      ])
      
      if (groomRes.data?.length > 0) {
        setGroomImage(groomRes.data[0].path)
      }
      if (brideRes.data?.length > 0) {
        setBrideImage(brideRes.data[0].path)
      }
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  return (
    <section ref={sectionRef} id="about" className="py-20 bg-gradient-to-b from-white via-pink-50/30 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-20"></div>
      
      {/* Decorative border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
      
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-20 opacity-5 animate-float" style={{ animationDuration: '8s' }}>
          <HeartHandshake className="w-16 h-16 text-pink-400" />
        </div>
        <div className="absolute bottom-20 right-20 opacity-5 animate-float-slow" style={{ animationDuration: '10s' }}>
          <Heart className="w-14 h-14 text-rose-400 fill-rose-400" />
        </div>
        <div className="absolute top-1/2 left-10 opacity-5 animate-float" style={{ animationDuration: '7s', animationDelay: '2s' }}>
          <Heart className="w-10 h-10 text-pink-400 fill-pink-400" />
        </div>
        <div className="absolute top-1/3 right-10 opacity-5 animate-float-slow" style={{ animationDuration: '9s', animationDelay: '1s' }}>
          <Heart className="w-12 h-12 text-rose-500 fill-rose-500" />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <HeartHandshake className="w-10 h-10 text-pink-500 mx-auto animate-text-zoom" style={{ animationDelay: '0.2s', animationDuration: '0.6s' }} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            <span className="gradient-text">
              <AnimatedText text={wedding.groomName} animationType="slide-right" delay={0.4} className="inline-block" />
            </span>
            <span className="mx-4 text-pink-400">
              <AnimatedText text="&" animationType="zoom" delay={0.7} />
            </span>
            <span className="gradient-text">
              <AnimatedText text={wedding.brideName} animationType="slide-left" delay={1.0} className="inline-block" />
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300 animate-text-slide-right" style={{ animationDelay: '1.3s', animationDuration: '0.6s' }}></div>
            <p className="text-pink-500 text-lg font-semibold">
              <AnimatedText text={new Date().getFullYear().toString()} animationType="bounce" delay={1.5} />
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300 animate-text-slide-left" style={{ animationDelay: '1.3s', animationDuration: '0.6s' }}></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Groom */}
          <div className={`text-center group ${isVisible ? 'animate-image-slide-left' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            <div className="mb-6 relative inline-block">
              {groomImage ? (
                <div className="relative image-sparkle-overlay">
                  {/* Animated glow background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full blur-2xl opacity-30 group-hover:opacity-70 transition-opacity duration-500 animate-image-glow"></div>
                  
                  {/* Sparkle effects */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute opacity-60"
                        style={{
                          left: `${50 + Math.cos((i * 45) * (Math.PI / 180)) * 40}%`,
                          top: `${50 + Math.sin((i * 45) * (Math.PI / 180)) * 40}%`,
                          animation: `sparkle ${1.5 + i * 0.1}s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      >
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                      </div>
                    ))}
                  </div>
                  
                  <Image
                    src={`https://api.ocuadua.com${groomImage}`}
                    alt={wedding.groomName}
                    width={256}
                    height={256}
                    className="relative w-64 h-64 rounded-full mx-auto object-cover shadow-2xl ring-4 ring-pink-100 transform group-hover:scale-110 transition-all duration-500 image-hover-lift animate-image-float"
                    quality={85}
                  />
                  
                  {/* Rotating ring effect */}
                  <div className="absolute inset-0 rounded-full border-4 border-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" style={{ animationDuration: '20s' }}></div>
                </div>
              ) : (
                <div className="w-64 h-64 rounded-full mx-auto bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 flex items-center justify-center shadow-2xl ring-4 ring-pink-100 transform group-hover:scale-110 transition-all duration-500 image-hover-lift animate-image-float">
                  <span className="text-6xl text-white font-bold">
                    {wedding.groomName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              <AnimatedText text={wedding.groomFullName} animationType="slide-up" delay={0.2} />
            </h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-pink-300 animate-text-slide-right" style={{ animationDelay: '0.4s', animationDuration: '0.5s' }}></div>
              <p className="text-pink-500 font-semibold uppercase tracking-wider text-sm">
                <AnimatedText text="The Groom" animationType="fade-scale" delay={0.5} />
              </p>
              <div className="h-px w-8 bg-pink-300 animate-text-slide-left" style={{ animationDelay: '0.4s', animationDuration: '0.5s' }}></div>
            </div>
            <p className="text-gray-700 leading-relaxed max-w-md mx-auto text-base">
              <AnimatedText text={wedding.groomDescription || 'Chưa có mô tả'} animationType="fade-scale" delay={0.7} splitBy="word" />
            </p>
          </div>

          {/* Bride */}
          <div className={`text-center group ${isVisible ? 'animate-image-slide-right' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
            <div className="mb-6 relative inline-block">
              {brideImage ? (
                <div className="relative image-sparkle-overlay">
                  {/* Animated glow background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full blur-2xl opacity-30 group-hover:opacity-70 transition-opacity duration-500 animate-image-glow"></div>
                  
                  {/* Sparkle effects */}
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute opacity-60"
                        style={{
                          left: `${50 + Math.cos((i * 45) * (Math.PI / 180)) * 40}%`,
                          top: `${50 + Math.sin((i * 45) * (Math.PI / 180)) * 40}%`,
                          animation: `sparkle ${1.5 + i * 0.1}s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      >
                        <Sparkles className="w-5 h-5 text-yellow-300" />
                      </div>
                    ))}
                  </div>
                  
                  <Image
                    src={`https://api.ocuadua.com${brideImage}`}
                    alt={wedding.brideName}
                    width={256}
                    height={256}
                    className="relative w-64 h-64 rounded-full mx-auto object-cover shadow-2xl ring-4 ring-pink-100 transform group-hover:scale-110 transition-all duration-500 image-hover-lift animate-image-float"
                    quality={85}
                  />
                  
                  {/* Rotating ring effect */}
                  <div className="absolute inset-0 rounded-full border-4 border-pink-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-spin" style={{ animationDuration: '20s' }}></div>
                </div>
              ) : (
                <div className="w-64 h-64 rounded-full mx-auto bg-gradient-to-br from-pink-400 via-rose-400 to-pink-500 flex items-center justify-center shadow-2xl ring-4 ring-pink-100 transform group-hover:scale-110 transition-all duration-500 image-hover-lift animate-image-float">
                  <span className="text-6xl text-white font-bold">
                    {wedding.brideName.charAt(0)}
                  </span>
                </div>
              )}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              <AnimatedText text={wedding.brideFullName} animationType="slide-up" delay={0.4} />
            </h3>
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-pink-300 animate-text-slide-right" style={{ animationDelay: '0.6s', animationDuration: '0.5s' }}></div>
              <p className="text-pink-500 font-semibold uppercase tracking-wider text-sm">
                <AnimatedText text="The Bride" animationType="fade-scale" delay={0.7} />
              </p>
              <div className="h-px w-8 bg-pink-300 animate-text-slide-left" style={{ animationDelay: '0.6s', animationDuration: '0.5s' }}></div>
            </div>
            <p className="text-gray-700 leading-relaxed max-w-md mx-auto text-base">
              <AnimatedText text={wedding.brideDescription || 'Chưa có mô tả'} animationType="fade-scale" delay={0.9} splitBy="word" />
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
