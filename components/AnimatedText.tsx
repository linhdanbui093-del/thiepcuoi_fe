'use client'

import { useEffect, useState } from 'react'

interface AnimatedTextProps {
  text: string
  className?: string
  animationType?: 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'bounce' | 'zoom' | 'fade-scale' | 'rotate' | 'char' | 'word'
  delay?: number
  duration?: number
  splitBy?: 'char' | 'word'
}

export default function AnimatedText({
  text,
  className = '',
  animationType = 'slide-up',
  delay = 0,
  duration = 0.8,
  splitBy = 'word',
}: AnimatedTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const getAnimationClass = () => {
    if (!isVisible) return 'opacity-0'
    
    switch (animationType) {
      case 'slide-left':
        return 'animate-text-slide-left'
      case 'slide-right':
        return 'animate-text-slide-right'
      case 'slide-up':
        return 'animate-text-slide-up'
      case 'slide-down':
        return 'animate-text-slide-down'
      case 'bounce':
        return 'animate-text-bounce'
      case 'zoom':
        return 'animate-text-zoom'
      case 'fade-scale':
        return 'animate-text-fade-scale'
      case 'rotate':
        return 'animate-text-rotate'
      default:
        return 'animate-text-slide-up'
    }
  }

  if (animationType === 'char' || splitBy === 'char') {
    return (
      <span className={className}>
        {text.split('').map((char, index) => (
          <span
            key={index}
            className={`text-char-animate ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              animationDelay: `${delay + index * 0.05}s`,
              animationDuration: `${duration}s`,
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>
    )
  }

  if (animationType === 'word' || splitBy === 'word') {
    return (
      <span className={className}>
        {text.split(' ').map((word, index) => (
          <span
            key={index}
            className={`text-word-animate inline-block ${isVisible ? 'opacity-100' : 'opacity-0'}`}
            style={{
              animationDelay: `${delay + index * 0.1}s`,
              animationDuration: `${duration}s`,
            }}
          >
            {word}
            {index < text.split(' ').length - 1 && '\u00A0'}
          </span>
        ))}
      </span>
    )
  }

  return (
    <span
      className={`${className} ${getAnimationClass()}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {text}
    </span>
  )
}

