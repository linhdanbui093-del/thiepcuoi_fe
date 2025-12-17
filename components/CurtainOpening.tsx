'use client'

import { useState, useEffect } from 'react'
import { Heart, Sparkles } from 'lucide-react'

export default function CurtainOpening() {
  const [isOpen, setIsOpen] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Start opening animation after a brief delay
    const timer = setTimeout(() => {
      setIsOpen(true)
    }, 500)

    // Show content after curtains are fully open
    const contentTimer = setTimeout(() => {
      setShowContent(true)
    }, 2500)

    return () => {
      clearTimeout(timer)
      clearTimeout(contentTimer)
    }
  }, [])

  if (showContent) {
    return null // Hide component after animation completes
  }

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none">
      {/* Left Curtain */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 transition-transform duration-[2000ms] ease-in-out ${
          isOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: 'inset -10px 0 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Curtain texture */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/20 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        {/* Curtain folds */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-1 bg-black/20"
            style={{
              left: `${(i + 1) * 12.5}%`,
              transform: 'skewX(-5deg)',
            }}
          />
        ))}

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20">
          <Heart className="w-16 h-16 text-white fill-white" />
        </div>
      </div>

      {/* Right Curtain */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-rose-600 via-pink-600 to-rose-500 transition-transform duration-[2000ms] ease-in-out ${
          isOpen ? 'translate-x-full' : 'translate-x-0'
        }`}
        style={{
          boxShadow: 'inset 10px 0 30px rgba(0, 0, 0, 0.3)',
        }}
      >
        {/* Curtain texture */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-full h-20 bg-gradient-to-b from-black/20 to-transparent"></div>
          <div className="absolute bottom-0 right-0 w-full h-20 bg-gradient-to-t from-black/20 to-transparent"></div>
        </div>
        
        {/* Curtain folds */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-1 bg-black/20"
            style={{
              right: `${(i + 1) * 12.5}%`,
              transform: 'skewX(5deg)',
            }}
          />
        ))}

        {/* Decorative elements */}
        <div className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 opacity-20">
          <Heart className="w-16 h-16 text-white fill-white" />
        </div>
      </div>

      {/* Center reveal effect with sparkles */}
      {isOpen && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative">
            {/* Sparkle effects */}
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute opacity-0 animate-sparkle-reveal"
                style={{
                  left: `${Math.cos((i * 30) * (Math.PI / 180)) * 100}px`,
                  top: `${Math.sin((i * 30) * (Math.PI / 180)) * 100}px`,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <Sparkles className="w-8 h-8 text-yellow-300" />
              </div>
            ))}
            
            {/* Heart burst effect */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Heart className="w-20 h-20 text-pink-400 fill-pink-400 animate-scale-burst" />
            </div>
          </div>
        </div>
      )}

      {/* Golden rope/tassel at top */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600 z-10">
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-yellow-500 rounded-full"></div>
      </div>
    </div>
  )
}

