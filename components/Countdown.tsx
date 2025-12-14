'use client'

import { useState, useEffect } from 'react'

interface CountdownProps {
  weddingDate: string
}

export default function Countdown({ weddingDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const targetDate = new Date(weddingDate).getTime()

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [weddingDate])

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 via-white to-rose-50 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-hearts opacity-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
      
      {/* Floating clock icons */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 text-5xl opacity-10 animate-float" style={{ animationDuration: '6s' }}>⏰</div>
        <div className="absolute bottom-20 right-1/4 text-5xl opacity-10 animate-float-slow" style={{ animationDuration: '8s', animationDelay: '1s' }}>⏰</div>
        <div className="absolute top-1/2 left-1/3 text-4xl opacity-10 animate-float" style={{ animationDuration: '7s', animationDelay: '2s' }}>💫</div>
      </div>
      
      <div className="container mx-auto px-4 text-center">
        <div className="mb-4 animate-fade-in-up">
          <span className="text-4xl">⏰</span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <span className="gradient-text">The Big Day!</span>
        </h2>
        
        <div className="flex justify-center gap-4 md:gap-6 lg:gap-8 flex-wrap">
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 min-w-[120px] transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-2">
              {timeLeft.days}
            </div>
            <div className="text-gray-600 font-semibold uppercase tracking-wider text-sm">Ngày</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 min-w-[120px] transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-2">
              {timeLeft.hours}
            </div>
            <div className="text-gray-600 font-semibold uppercase tracking-wider text-sm">Giờ</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 min-w-[120px] transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-scale-in" style={{ animationDelay: '0.5s' }}>
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-2">
              {timeLeft.minutes}
            </div>
            <div className="text-gray-600 font-semibold uppercase tracking-wider text-sm">Phút</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 min-w-[120px] transform hover:scale-105 transition-all duration-300 hover:shadow-2xl animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-5xl md:text-6xl lg:text-7xl font-bold gradient-text mb-2">
              {timeLeft.seconds}
            </div>
            <div className="text-gray-600 font-semibold uppercase tracking-wider text-sm">Giây</div>
          </div>
        </div>
      </div>
    </section>
  )
}
