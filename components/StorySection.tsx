'use client'

interface StorySectionProps {
  story: Array<{
    title: string
    content: string
    date?: string
    image?: string
  }>
}

export default function StorySection({ story }: StorySectionProps) {
  if (!story || story.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white via-pink-50/20 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-rose opacity-15"></div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
      
      {/* Floating story elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-20 text-6xl opacity-5 animate-float" style={{ animationDuration: '9s' }}>📖</div>
        <div className="absolute bottom-1/4 right-20 text-6xl opacity-5 animate-float-slow" style={{ animationDuration: '11s', animationDelay: '2s' }}>💌</div>
        <div className="absolute top-1/2 left-1/4 text-5xl opacity-5 animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }}>💕</div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block mb-4">
            <span className="text-4xl">💕</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            <span className="gradient-text">Chuyện chúng mình</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300"></div>
            <span className="text-pink-400 text-2xl">❤️</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300"></div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto space-y-20">
          {story.map((item, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.2}s` }}>
              {/* Layout for items with images - alternating left/right */}
              {item.image ? (
                <div className={`grid md:grid-cols-2 gap-8 lg:gap-12 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                  {/* Image */}
                  <div className={`${index % 2 === 1 ? 'md:order-2' : ''}`}>
                    <div className="relative group overflow-hidden rounded-2xl shadow-2xl">
                      <img
                        src={item.image.startsWith('http') ? item.image : `https://api.ocuadua.com${item.image}`}
                        alt={item.title}
                        className="w-full h-[400px] md:h-[500px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-400 to-rose-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className={`${index % 2 === 1 ? 'md:order-1' : ''}`}>
                    <div className="text-center md:text-left">
                      {item.date && (
                        <p className="text-pink-500 font-semibold mb-4 text-lg tracking-wide">{item.date}</p>
                      )}
                      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                        {item.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {item.content}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                /* Layout for items without images */
                <div className="text-center">
                  {item.date && (
                    <p className="text-pink-500 font-semibold mb-4 text-lg tracking-wide">{item.date}</p>
                  )}
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-6">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-lg max-w-3xl mx-auto">
                    {item.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
