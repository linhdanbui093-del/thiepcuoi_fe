'use client'

interface EventsSectionProps {
  events: Array<{
    title: string
    time: string
    date: string
    location: string
    address: string
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
        <div className="absolute top-1/4 right-20 text-6xl opacity-5 animate-float" style={{ animationDuration: '8s' }}>🎉</div>
        <div className="absolute bottom-1/4 left-20 text-6xl opacity-5 animate-float-slow" style={{ animationDuration: '10s', animationDelay: '2s' }}>💒</div>
        <div className="absolute top-1/2 right-1/3 text-5xl opacity-5 animate-float" style={{ animationDuration: '7s', animationDelay: '1s' }}>🎊</div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            <span className="gradient-text">Sự Kiện Cưới</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300"></div>
            <span className="text-pink-400 text-2xl">💕</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300"></div>
          </div>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
            Tình yêu đích thực đứng về phía nhau trong những ngày tốt đẹp và sát cánh hơn trong những ngày tồi tệ.
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
                <span className="text-pink-500 text-3xl">💒</span>
                <span>{event.title}</span>
              </h3>
              <div className="space-y-4 text-gray-700">
                <p className="flex items-start">
                  <svg className="w-6 h-6 mr-3 text-pink-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-lg font-semibold">{event.date} - {event.time}</span>
                </p>
                <p className="flex items-start">
                  <svg className="w-6 h-6 mr-3 text-pink-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-lg font-semibold">{event.location}</span>
                </p>
                <p className="ml-9 text-gray-600">{event.address}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
