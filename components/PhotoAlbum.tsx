'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

interface PhotoAlbumProps {
  weddingId: string
}

export default function PhotoAlbum({ weddingId }: PhotoAlbumProps) {
  const [images, setImages] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  useEffect(() => {
    fetchImages()
  }, [weddingId])

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
          <div className="absolute top-20 right-1/4 text-5xl opacity-10 animate-float" style={{ animationDuration: '7s' }}>📷</div>
          <div className="absolute bottom-20 left-1/4 text-5xl opacity-10 animate-float-slow" style={{ animationDuration: '9s', animationDelay: '1.5s' }}>📸</div>
          <div className="absolute top-1/2 right-20 text-4xl opacity-10 animate-float" style={{ animationDuration: '6s', animationDelay: '2s' }}>✨</div>
        </div>
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-block mb-4">
              <span className="text-4xl">📸</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
              <span className="gradient-text">Album Hình Cưới</span>
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300"></div>
              <span className="text-pink-400 text-2xl">💖</span>
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300"></div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={image._id}
                className="aspect-square overflow-hidden rounded-xl cursor-pointer group relative shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedImage(image.path)}
              >
                <img
                  src={`http://localhost:5000${image.path}`}
                  alt="Wedding photo"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <img
            src={`http://localhost:5000${selectedImage}`}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
        </div>
      )}
    </>
  )
}
