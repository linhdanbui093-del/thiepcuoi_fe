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
      {/* Light beam effect from center when opening */}
      {isOpen && (
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.2) 30%, transparent 70%)',
            animation: 'fadeIn 0.8s ease-out',
          }}
        />
      )}

      {/* Floating particles explosion when opening */}
      {isOpen && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(60)].map((_, i) => {
            const angle = (Math.PI * 2 * i) / 60
            const distance = 300 + Math.random() * 400
            const x = Math.cos(angle) * distance
            const y = Math.sin(angle) * distance
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  width: `${Math.random() * 10 + 3}px`,
                  height: `${Math.random() * 10 + 3}px`,
                  background: ['#fbbf24', '#f59e0b', '#ec4899', '#f472b6', '#ffffff', '#fcd34d'][Math.floor(Math.random() * 6)],
                  opacity: Math.random() * 0.9 + 0.1,
                  transform: `translate(-50%, -50%)`,
                  '--particle-x': `${x}px`,
                  '--particle-y': `${y}px`,
                  animation: `particleExplode ${1.5 + Math.random() * 1}s ease-out forwards`,
                  animationDelay: `${Math.random() * 0.3}s`,
                  boxShadow: '0 0 8px currentColor',
                } as React.CSSProperties}
              />
            )
          })}
        </div>
      )}

      {/* Confetti effect */}
      {isOpen && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                width: `${Math.random() * 12 + 8}px`,
                height: `${Math.random() * 12 + 8}px`,
                background: ['#a855f7', '#c084fc', '#fbbf24', '#f59e0b', '#ec4899', '#f472b6', '#ffffff'][Math.floor(Math.random() * 7)],
                opacity: Math.random() * 0.8 + 0.2,
                transform: `rotate(${Math.random() * 360}deg)`,
                animation: `confettiFall ${2 + Math.random() * 2}s linear forwards`,
                animationDelay: `${Math.random() * 0.5}s`,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
              }}
            />
          ))}
        </div>
      )}

      {/* Floating hearts when opening */}
      {isOpen && (
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const size = Math.floor(Math.random() * 3) + 4
            const heartColor = ['#ec4899', '#f472b6', '#a855f7', '#c084fc', '#fbbf24'][Math.floor(Math.random() * 5)]
            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `heartFloat ${3 + Math.random() * 2}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                <Heart 
                  className="w-6 h-6"
                  style={{
                    width: `${size * 4}px`,
                    height: `${size * 4}px`,
                    color: heartColor,
                    fill: heartColor,
                    opacity: Math.random() * 0.6 + 0.4,
                  }}
                />
              </div>
            )
          })}
        </div>
      )}

      {/* Left Curtain - Fade and scale with clip path */}
      <div
        className={`absolute top-0 left-0 w-1/2 h-full transition-all duration-[2000ms] ease-in-out ${
          isOpen ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
        style={{
          background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 25%, #f87171 50%, #ef4444 75%, #dc2626 100%)',
          backgroundSize: '200% 200%',
          boxShadow: 'inset -30px 0 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(220, 38, 38, 0.5), inset 0 0 80px rgba(239, 68, 68, 0.3)',
          clipPath: isOpen ? 'polygon(0 0, 0% 0, 0% 100%, 0 100%)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          animation: isOpen ? 'none' : 'gradientShift 8s ease infinite',
        }}
      >
        {/* Elegant vertical stripes */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              left: `${(i + 1) * 6.66}%`,
              background: i % 2 === 0 
                ? 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)' 
                : 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1), transparent)',
            }}
          />
        ))}
        
        {/* Shimmer effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: isOpen ? 'none' : 'shimmer 3s infinite',
          }}
        />

        {/* Golden stars pattern */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '4px',
                height: '4px',
                background: '#fbbf24',
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                animation: `starTwinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Right Curtain - Fade and scale with clip path */}
      <div
        className={`absolute top-0 right-0 w-1/2 h-full transition-all duration-[2000ms] ease-in-out ${
          isOpen ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
        }`}
        style={{
          background: 'linear-gradient(225deg, #dc2626 0%, #ef4444 25%, #f87171 50%, #ef4444 75%, #dc2626 100%)',
          backgroundSize: '200% 200%',
          boxShadow: 'inset 30px 0 60px rgba(0, 0, 0, 0.5), 0 0 100px rgba(220, 38, 38, 0.5), inset 0 0 80px rgba(239, 68, 68, 0.3)',
          clipPath: isOpen ? 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)' : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          animation: isOpen ? 'none' : 'gradientShift 8s ease infinite',
        }}
      >
        {/* Elegant vertical stripes */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 bottom-0 w-px"
            style={{
              right: `${(i + 1) * 6.66}%`,
              background: i % 2 === 0 
                ? 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.15), transparent)' 
                : 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.1), transparent)',
            }}
          />
        ))}
        
        {/* Shimmer effect */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            background: 'linear-gradient(70deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: isOpen ? 'none' : 'shimmer 3s infinite',
          }}
        />

        {/* Golden stars pattern */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: '4px',
                height: '4px',
                background: '#fbbf24',
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
                animation: `starTwinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            />
          ))}
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

