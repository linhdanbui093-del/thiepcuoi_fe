'use client'

import { Users, Heart, User, UserCheck } from 'lucide-react'

interface ParentsSectionProps {
  parents?: {
    groom?: {
      father?: string
      mother?: string
    }
    bride?: {
      father?: string
      mother?: string
    }
  }
}

export default function ParentsSection({ parents }: ParentsSectionProps) {
  if (!parents || (!parents.groom && !parents.bride)) {
    return null
  }

  const groomFather = parents.groom?.father || ''
  const groomMother = parents.groom?.mother || ''
  const brideFather = parents.bride?.father || ''
  const brideMother = parents.bride?.mother || ''

  // Check if any parent info exists
  if (!groomFather && !groomMother && !brideFather && !brideMother) {
    return null
  }

  const hasGroomParents = !!(groomFather || groomMother)
  const hasBrideParents = !!(brideFather || brideMother)

  return (
    <section className="py-20 bg-gradient-to-b from-white via-pink-50/30 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-rose opacity-10"></div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
      
      {/* Floating family elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-20 opacity-5 animate-float" style={{ animationDuration: '9s' }}>
          <Users className="w-16 h-16 text-blue-400" />
        </div>
        <div className="absolute bottom-1/4 right-20 opacity-5 animate-float-slow" style={{ animationDuration: '11s', animationDelay: '1.5s' }}>
          <Users className="w-16 h-16 text-pink-400" />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-5 animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}>
          <Heart className="w-12 h-12 text-rose-400 fill-rose-400" />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="inline-block mb-4">
            <Users className="w-10 h-10 text-pink-500 mx-auto" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            <span className="gradient-text">Gia đình</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300"></div>
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300"></div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className={`grid ${hasGroomParents && hasBrideParents ? 'grid-cols-2' : 'grid-cols-1'} gap-4 md:gap-12 lg:gap-16`}>
            {/* Groom's family */}
            {hasGroomParents && (
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="mb-3 md:mb-6">
                  <div className="inline-block p-2 md:p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-full mb-2 md:mb-4">
                    <Users className="w-6 h-6 md:w-10 md:h-10 text-blue-500" />
                  </div>
                  <h3 className="text-base md:text-3xl font-bold text-gray-800 mb-3 md:mb-6">
                    <span className="gradient-text">Gia đình Chú Rể</span>
                  </h3>
                </div>
                <div className="space-y-2 md:space-y-4 text-sm md:text-lg text-gray-700">
                  {groomFather && (
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      <User className="w-4 h-4 md:w-6 md:h-6 text-blue-500" />
                      <p className="font-semibold">{groomFather}</p>
                    </div>
                  )}
                  {groomMother && (
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      <UserCheck className="w-4 h-4 md:w-6 md:h-6 text-blue-500" />
                      <p className="font-semibold">{groomMother}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bride's family */}
            {hasBrideParents && (
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="mb-3 md:mb-6">
                  <div className="inline-block p-2 md:p-4 bg-gradient-to-br from-pink-100 to-rose-50 rounded-full mb-2 md:mb-4">
                    <Users className="w-6 h-6 md:w-10 md:h-10 text-pink-500" />
                  </div>
                  <h3 className="text-base md:text-3xl font-bold text-gray-800 mb-3 md:mb-6">
                    <span className="gradient-text">Gia đình Cô Dâu</span>
                  </h3>
                </div>
                <div className="space-y-2 md:space-y-4 text-sm md:text-lg text-gray-700">
                  {brideFather && (
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      <User className="w-4 h-4 md:w-6 md:h-6 text-pink-500" />
                      <p className="font-semibold">{brideFather}</p>
                    </div>
                  )}
                  {brideMother && (
                    <div className="flex items-center justify-center gap-2 md:gap-3">
                      <UserCheck className="w-4 h-4 md:w-6 md:h-6 text-pink-500" />
                      <p className="font-semibold">{brideMother}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Connecting line */}
          {hasGroomParents && hasBrideParents && (
            <div className="mt-6 md:mt-12 flex items-center justify-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="h-px w-10 md:w-20 bg-gradient-to-r from-transparent to-pink-300"></div>
                <Heart className="w-5 h-5 md:w-8 md:h-8 text-pink-400 fill-pink-400 opacity-50" />
                <div className="h-px w-10 md:w-20 bg-gradient-to-l from-transparent to-pink-300"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

