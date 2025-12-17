'use client'

import { PartyPopper, Church, Heart, Calendar, MapPin, ExternalLink } from 'lucide-react'
import AnimatedText from './AnimatedText'

interface EventsSectionProps {
  events: Array<{
    title: string
    time: string
    date: string
    location: string
    address: string
    mapLink?: string
  }>
}

export default function EventsSection({ events }: EventsSectionProps) {
  if (!events || events.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white via-pink-50/25 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-hearts opacity-10"></div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
      
      {/* Floating event elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-20 opacity-5 animate-float" style={{ animationDuration: '8s' }}>
          <PartyPopper className="w-16 h-16 text-pink-400" />
        </div>
        <div className="absolute bottom-1/4 left-20 opacity-5 animate-float-slow" style={{ animationDuration: '10s', animationDelay: '2s' }}>
          <Church className="w-16 h-16 text-rose-400" />
        </div>
        <div className="absolute top-1/2 right-1/3 opacity-5 animate-float" style={{ animationDuration: '7s', animationDelay: '1s' }}>
          <Heart className="w-12 h-12 text-pink-300 fill-pink-300" />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <PartyPopper className="w-10 h-10 text-pink-500 mx-auto animate-text-zoom" style={{ animationDelay: '0.2s', animationDuration: '0.6s' }} />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            <span className="gradient-text">
              <AnimatedText text="Sự Kiện Cưới" animationType="bounce" delay={0.4} />
            </span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300 animate-text-slide-right" style={{ animationDelay: '0.7s', animationDuration: '0.6s' }}></div>
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400 animate-text-zoom" style={{ animationDelay: '0.9s', animationDuration: '0.6s' }} />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300 animate-text-slide-left" style={{ animationDelay: '0.7s', animationDuration: '0.6s' }}></div>
          </div>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
            <AnimatedText text="Tình yêu đích thực đứng về phía nhau trong những ngày tốt đẹp và sát cánh hơn trong những ngày tồi tệ." animationType="fade-scale" delay={1.1} splitBy="word" />
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {events.map((event, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-pink-100 hover:border-pink-200 transform hover:scale-[1.02] animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <Church className="w-8 h-8 text-pink-500" />
                <span>
                  <AnimatedText text={event.title} animationType="slide-right" delay={0.2 + index * 0.1} />
                </span>
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start">
                  <Calendar className="w-6 h-6 mr-3 text-pink-500 flex-shrink-0 mt-0.5" />
                  <span className="text-lg font-semibold">{event.date} - {event.time}</span>
                </p>
                <p className="flex items-start">
                  <MapPin className="w-6 h-6 mr-3 text-pink-500 flex-shrink-0 mt-0.5" />
                  <span className="text-lg font-semibold">{event.location}</span>
                </p>
                <p className="ml-9 text-gray-600">{event.address}</p>
                {event.mapLink && (
                  <div className="ml-9 mt-3">
                    <a
                      href={event.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors font-semibold"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Xem trên Google Maps
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
