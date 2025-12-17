'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { BookOpen, Heart, Mail, Sparkles } from 'lucide-react'
import AnimatedText from './AnimatedText'

interface StorySectionProps {
  story: Array<{
    title: string
    content: string
    date?: string
    image?: string
  }>
}

export default function StorySection({ story }: StorySectionProps) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const itemRefs = useRef<Map<number, HTMLDivElement>>(new Map())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleItems((prev) => new Set(prev).add(index))
          }
        })
      },
      {
        threshold: 0.2,
        rootMargin: '50px',
      }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [story])

  if (!story || story.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white via-pink-50/20 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-rose opacity-15"></div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
      
      {/* Floating story elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-20 opacity-5 animate-float" style={{ animationDuration: '9s' }}>
          <BookOpen className="w-16 h-16 text-pink-400" />
        </div>
        <div className="absolute bottom-1/4 right-20 opacity-5 animate-float-slow" style={{ animationDuration: '11s', animationDelay: '2s' }}>
          <Mail className="w-14 h-14 text-rose-400" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-5 animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}>
          <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <Heart className="w-10 h-10 text-pink-500 fill-pink-500 mx-auto animate-text-zoom" style={{ animationDelay: '0.2s', animationDuration: '0.6s' }} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            <span className="gradient-text">
              <AnimatedText text="Chuyện chúng mình" animationType="bounce" delay={0.4} />
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300 animate-text-slide-right" style={{ animationDelay: '0.7s', animationDuration: '0.6s' }}></div>
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-text-zoom" style={{ animationDelay: '0.9s', animationDuration: '0.6s' }} />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300 animate-text-slide-left" style={{ animationDelay: '0.7s', animationDuration: '0.6s' }}></div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-20">
          {story.map((item, index) => {
            const isVisible = visibleItems.has(index)
            const animationClass = index % 2 === 0 ? 'animate-image-slide-left' : 'animate-image-slide-right'
            
            return (
              <div
                key={index}
                ref={(el) => {
                  if (el) itemRefs.current.set(index, el)
                }}
                data-index={index}
                className={isVisible ? animationClass : 'opacity-0'}
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  transition: 'opacity 0.8s ease-out, transform 0.8s ease-out'
                }}
              >
                {/* Layout for items with images - alternating left/right */}
                {item.image ? (
                  <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                    {/* Image */}
                    <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                      <div className="relative group overflow-hidden rounded-2xl shadow-2xl image-sparkle-overlay image-hover-lift">
                        {/* Sparkle effects */}
                        <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                          {[...Array(10)].map((_, i) => (
                            <div
                              key={i}
                              className="absolute opacity-60"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animation: `sparkle ${1.5 + Math.random()}s ease-in-out infinite`,
                                animationDelay: `${Math.random() * 2}s`,
                              }}
                            >
                              <Sparkles className="w-4 h-4 text-yellow-300" />
                            </div>
                          ))}
                        </div>
                        
                        <Image
                          src={item.image.startsWith('http') ? item.image : `https://api.ocuadua.com${item.image}`}
                          alt={item.title}
                          width={600}
                          height={500}
                          className="w-full h-[400px] md:h-[500px] object-cover transform group-hover:scale-110 transition-all duration-700"
                          loading={index < 2 ? 'eager' : 'lazy'}
                          quality={85}
                        />
                        
                        {/* Enhanced gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Animated border glow */}
                        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 animate-image-glow"></div>
                        
                        {/* Heart icon on hover */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20">
                          <Heart className="w-16 h-16 text-white fill-white animate-scale-burst" />
                        </div>
                      </div>
                    </div>
                  
                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="text-center md:text-left">
                      {item.date && (
                        <p className="text-pink-500 font-semibold mb-4 text-lg tracking-wide">
                          <AnimatedText text={item.date} animationType="slide-down" delay={0.2} />
                        </p>
                      )}
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                        <AnimatedText text={item.title} animationType={index % 2 === 0 ? "slide-right" : "slide-left"} delay={0.4} />
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        <AnimatedText text={item.content} animationType="fade-scale" delay={0.6} splitBy="word" />
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Layout for items without images */
                <div className="text-center">
                  {item.date && (
                    <p className="text-pink-500 font-semibold mb-4 text-lg tracking-wide">
                      <AnimatedText text={item.date} animationType="slide-down" delay={0.2} />
                    </p>
                  )}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                    <AnimatedText text={item.title} animationType="bounce" delay={0.4} />
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">
                    <AnimatedText text={item.content} animationType="fade-scale" delay={0.6} splitBy="word" />
                  </p>
                </div>
              )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
