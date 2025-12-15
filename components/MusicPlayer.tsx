'use client'

import { useState, useEffect, useRef } from 'react'
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react'

interface MusicPlayerProps {
  wedding: {
    musicUrl?: string
    musicEnabled?: boolean
  }
}

export default function MusicPlayer({ wedding }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [isVisible, setIsVisible] = useState(false)
  const [needsInteraction, setNeedsInteraction] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const interactionHandlersRef = useRef<(() => void)[]>([])
  const playTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Initialize audio
  useEffect(() => {
    if (!wedding.musicUrl || wedding.musicEnabled === false) {
      return
    }

    // Create audio element
    audioRef.current = new Audio(wedding.musicUrl)
    audioRef.current.volume = volume
    audioRef.current.loop = true
    audioRef.current.preload = 'auto'
    
    
    // Function to play audio using audioRef
    const playAudio = () => {
      if (!audioRef.current) {
        return false
      }
      
      const playPromise = audioRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true)
            setIsVisible(false)
            setNeedsInteraction(false)
            return true
          })
          .catch((error) => {
            setNeedsInteraction(true)
            return false
          })
      }
      return false
    }

    // Set timeout to attempt play after page loads
    const tryAutoPlay = () => {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current)
      }
      
      playTimeoutRef.current = setTimeout(() => {
        if (!playAudio()) {
        }
      }, 1000) // 1 second delay
    }

    // Try to play when audio is ready
    const handleReady = () => {
      tryAutoPlay()
    }
    
    // Set up event listeners
    audioRef.current.addEventListener('canplay', handleReady, { once: true })
    audioRef.current.addEventListener('loadeddata', handleReady, { once: true })
    
    // If already ready, try immediately
    if (audioRef.current.readyState >= 2) {
      tryAutoPlay()
    }

    // Global interaction handler - play on ANY user interaction
    const handleFirstInteraction = () => {
      if (!isPlaying && audioRef.current) {
        if (playAudio()) {
          // Successfully started playing, remove listeners
          document.removeEventListener('click', handleFirstInteraction, { capture: true })
          document.removeEventListener('touchstart', handleFirstInteraction, { capture: true })
          document.removeEventListener('mousedown', handleFirstInteraction, { capture: true })
          document.removeEventListener('keydown', handleFirstInteraction, { capture: true })
          document.removeEventListener('scroll', handleFirstInteraction, { capture: true })
        }
      }
    }
    
    // Listen for first interaction with capture to catch early
    document.addEventListener('click', handleFirstInteraction, { capture: true, once: true })
    document.addEventListener('touchstart', handleFirstInteraction, { capture: true, once: true })
    document.addEventListener('mousedown', handleFirstInteraction, { capture: true, once: true })
    document.addEventListener('keydown', handleFirstInteraction, { capture: true, once: true })
    document.addEventListener('scroll', handleFirstInteraction, { capture: true, once: true })

    // Cleanup function
    return () => {
      if (playTimeoutRef.current) {
        clearTimeout(playTimeoutRef.current)
        playTimeoutRef.current = null
      }
      
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplay', handleReady)
        audioRef.current.removeEventListener('loadeddata', handleReady)
        audioRef.current.pause()
        audioRef.current = null
      }
      
      document.removeEventListener('click', handleFirstInteraction, { capture: true })
      document.removeEventListener('touchstart', handleFirstInteraction, { capture: true })
      document.removeEventListener('mousedown', handleFirstInteraction, { capture: true })
      document.removeEventListener('keydown', handleFirstInteraction, { capture: true })
      document.removeEventListener('scroll', handleFirstInteraction, { capture: true })
    }
  }, [wedding.musicUrl, wedding.musicEnabled, volume, isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume
    }
  }, [isMuted, volume])

  if (!wedding.musicUrl) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main player button */}
      <button
        onClick={() => {
          setIsVisible(!isVisible)
          // If needs interaction and user clicks, try to play
          if (needsInteraction && audioRef.current) {
            audioRef.current.play()
              .then(() => {
                setIsPlaying(true)
                setNeedsInteraction(false)
              })
              .catch(() => {
                // Still blocked
              })
          }
        }}
        className={`w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-full shadow-2xl hover:shadow-pink-500/50 flex items-center justify-center transition-all duration-300 hover:scale-110 ${
          needsInteraction ? 'animate-pulse ring-2 ring-pink-300 ring-offset-2' : ''
        }`}
        aria-label="Music player"
        title={needsInteraction ? 'Nhấn để phát nhạc' : 'Music player'}
      >
        <Music className="w-6 h-6" />
      </button>

      {/* Expanded controls */}
      {isVisible && (
        <div className="absolute bottom-16 right-0 bg-white rounded-2xl shadow-2xl p-4 min-w-[200px] animate-fade-in-up border border-pink-100">
          {needsInteraction && (
            <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs text-yellow-800 text-center">
                ⚠️ Nhấn play để bắt đầu phát nhạc
              </p>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  if (needsInteraction && audioRef.current) {
                    audioRef.current.play()
                      .then(() => {
                        setIsPlaying(true)
                        setNeedsInteraction(false)
                      })
                      .catch(() => {
                        // Still blocked
                      })
                  } else {
                    setIsPlaying(!isPlaying)
                  }
                }}
                className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="w-10 h-10 bg-gray-100 text-gray-700 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-gray-500" />
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value))
                  setIsMuted(false)
                }}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
              <span className="text-xs text-gray-500 w-8 text-right">
                {Math.round(volume * 100)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

