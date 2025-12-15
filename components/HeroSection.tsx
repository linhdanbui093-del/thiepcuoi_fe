'use client'

import { format } from 'date-fns'
import { vi } from 'date-fns/locale'
import { Heart, Sparkles } from 'lucide-react'

interface HeroSectionProps {
  wedding: {
    groomName: string
    brideName: string
    weddingDate: string
    saveTheDateText?: string
  }
}

export default function HeroSection({ wedding }: HeroSectionProps) {
  const weddingDate = new Date(wedding.weddingDate)
  const formattedDate = format(weddingDate, "dd 'tháng' MM yyyy", { locale: vi })

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-animated overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-rose opacity-30"></div>
      
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Animated particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${Math.random() * 10 + 15}s`,
            }}
          />
        ))}
      </div>
      
      {/* Floating hearts decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 opacity-20 animate-float" style={{ animationDuration: '4s' }}>
          <Heart className="w-12 h-12 text-pink-400 fill-pink-400" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-20 animate-float-slow" style={{ animationDuration: '6s', animationDelay: '1s' }}>
          <Heart className="w-10 h-10 text-rose-400 fill-rose-400" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-20 animate-float" style={{ animationDuration: '5s', animationDelay: '2s' }}>
          <Heart className="w-14 h-14 text-pink-500 fill-pink-500" />
        </div>
        <div className="absolute top-1/2 right-1/3 opacity-15 animate-float-slow" style={{ animationDuration: '7s', animationDelay: '3s' }}>
          <Heart className="w-8 h-8 text-rose-500 fill-rose-500" />
        </div>
        <div className="absolute bottom-1/3 right-1/4 opacity-15 animate-float" style={{ animationDuration: '4.5s', animationDelay: '1.5s' }}>
          <Heart className="w-10 h-10 text-pink-400 fill-pink-400" />
        </div>
      </div>
      
      {/* Sparkle effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sparkle ${2 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            <Sparkles className="w-6 h-6 text-rose-300" />
          </div>
        ))}
      </div>
      
      <div className="relative z-10 text-center px-4 py-20 animate-fade-in-up">
        <div className="mb-8">
          <p className="text-pink-500 font-semibold tracking-[0.3em] uppercase text-sm mb-6 animate-fade-in">
            Save the Date
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <span className="block text-gray-800 drop-shadow-sm">{wedding.groomName}</span>
            <span className="text-4xl md:text-5xl lg:text-6xl mx-4 gradient-text font-serif">&</span>
            <span className="block text-gray-800 drop-shadow-sm">{wedding.brideName}</span>
          </h1>
          <div className="text-xl md:text-2xl lg:text-3xl text-gray-700 font-light mb-2 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            {formattedDate}
          </div>
          <div className="flex justify-center gap-2 mt-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
            <Heart className="w-7 h-7 text-pink-400 fill-pink-400" />
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
          </div>
        </div>

        {wedding.saveTheDateText && (
          <div className="max-w-2xl mx-auto mt-8 text-gray-700 leading-relaxed text-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {wedding.saveTheDateText}
          </div>
        )}

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 font-semibold text-lg glow-pink hover:glow-pink"
          >
            Xem thêm
            <svg className="w-5 h-5 animate-bounce" style={{ animationDuration: '2s' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-pink-400"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  )
}
