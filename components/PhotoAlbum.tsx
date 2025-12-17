'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Camera, Sparkles, Heart } from 'lucide-react'
import { X } from 'lucide-react'
import AnimatedText from './AnimatedText'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ocuadua.com/api'

interface PhotoAlbumProps {
  weddingId: string
}

export default function PhotoAlbum({ weddingId }: PhotoAlbumProps) {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [visibleImages, setVisibleImages] = useState<Set<string>>(new Set())
  const imageRefs = useRef<Map<string, HTMLDivElement>>(new Map())

  useEffect(() => {
    fetchImages()
  }, [weddingId])

  useEffect(() => {
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const imageId = entry.target.getAttribute('data-image-id')
            if (imageId) {
              setVisibleImages((prev) => new Set(prev).add(imageId))
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      imageRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [images])

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${API_URL}/images/wedding/${weddingId}/album`)
      setImages(response.data)
    } catch (error) {
      console.error('Error fetching images:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageLoad = (imageId: string) => {
    setLoadedImages(prev => new Set(prev).add(imageId))
  }

  if (loading) {
    return (
      <section className="py-20 bg-pink-50">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
        </div>
      </section>
    )
  }

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <section className="py-20 bg-gradient-to-b from-white via-pink-50/30 to-white relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-pattern-dots opacity-15"></div>
        
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
        
        {/* Floating camera icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-1/4 opacity-10 animate-float" style={{ animationDuration: '7s' }}>
            <Camera className="w-12 h-12 text-pink-400" />
          </div>
          <div className="absolute bottom-20 left-1/4 opacity-10 animate-float-slow" style={{ animationDuration: '9s', animationDelay: '1.5s' }}>
            <Camera className="w-10 h-10 text-pink-300" />
          </div>
          <div className="absolute top-1/2 right-20 opacity-10 animate-float" style={{ animationDuration: '6s', animationDelay: '2s' }}>
            <Sparkles className="w-8 h-8 text-rose-300" />
          </div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <Camera className="w-10 h-10 text-pink-500 mx-auto animate-text-zoom" style={{ animationDelay: '0.2s', animationDuration: '0.6s' }} />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              <span className="gradient-text">
                <AnimatedText text="Album Hình Cưới" animationType="bounce" delay={0.4} />
              </span>
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300 animate-text-slide-right" style={{ animationDelay: '0.7s', animationDuration: '0.6s' }}></div>
              <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-text-zoom" style={{ animationDelay: '0.9s', animationDuration: '0.6s' }} />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300 animate-text-slide-left" style={{ animationDelay: '0.7s', animationDuration: '0.6s' }}></div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => {
              const imageUrl = `https://api.ocuadua.com${image.path}`
              const isLoaded = loadedImages.has(image._id)
              const isVisible = visibleImages.has(image._id)
              
              // Different animation styles for variety
              const animationStyles = [
                'animate-image-reveal',
                'animate-image-zoom',
                'animate-image-rotate',
                'animate-image-slide-left',
                'animate-image-slide-right',
              ]
              const animationClass = animationStyles[index % animationStyles.length]
              
              return (
                <div
                  key={image._id}
                  ref={(el) => {
                    if (el) imageRefs.current.set(image._id, el)
                  }}
                  data-image-id={image._id}
                  className={`aspect-square overflow-hidden rounded-xl cursor-pointer group relative shadow-lg image-hover-lift image-sparkle-overlay bg-gray-100 ${
                    isVisible ? animationClass : 'opacity-0'
                  }`}
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
                  }}
                  onClick={() => setSelectedImage(image.path)}
                >
                  {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                    </div>
                  )}
                  
                  {/* Sparkle effect overlay */}
                  <div className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute opacity-60"
                        style={{
                          left: `${20 + i * 15}%`,
                          top: `${20 + (i % 3) * 30}%`,
                          animation: `sparkle ${1.5 + i * 0.2}s ease-in-out infinite`,
                          animationDelay: `${i * 0.1}s`,
                        }}
                      >
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                      </div>
                    ))}
                  </div>
                  
                  <Image
                    src={imageUrl}
                    alt="Wedding photo"
                    width={400}
                    height={400}
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                      isLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading={index < 8 ? 'eager' : 'lazy'}
                    onLoad={() => handleImageLoad(image._id)}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                    quality={85}
                  />
                  
                  {/* Gradient overlay with glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Heart icon on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <Heart className="w-12 h-12 text-white fill-white animate-scale-burst" />
                  </div>
                  
                  {/* Border glow effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none animate-image-glow"></div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 bg-black/50 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="relative max-w-full max-h-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={`https://api.ocuadua.com${selectedImage}`}
              alt="Full size"
              width={1200}
              height={800}
              className="max-w-full max-h-[90vh] object-contain"
              quality={90}
            />
          </div>
        </div>
      )}
    </>
  )
}
