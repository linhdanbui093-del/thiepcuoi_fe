'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Mail, Heart, PenTool, Send } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ocuadua.com/api'

interface GuestbookProps {
  weddingId: string
}

interface Wish {
  _id: string
  guestName: string
  message: string
  createdAt: string
}

interface WishForm {
  guestName: string
  message: string
}

export default function Guestbook({ weddingId }: GuestbookProps) {
  const [wishes, setWishes] = useState<Wish[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm<WishForm>()

  useEffect(() => {
    fetchWishes()
  }, [weddingId])

  const fetchWishes = async () => {
    try {
      const response = await axios.get(`${API_URL}/wishes/wedding/${weddingId}`)
      setWishes(response.data)
    } catch (error) {
      console.error('Error fetching wishes:', error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data: WishForm) => {
    if (submitting) return // Prevent double submission
    
    setSubmitting(true)
    try {
      const response = await axios.post(`${API_URL}/wishes`, {
        weddingId,
        guestName: data.guestName.trim(),
        message: data.message.trim()
      })
      
      if (response.data) {
        reset()
        await fetchWishes()
        toast.success('Gửi lời chúc thành công! Cảm ơn bạn ❤️')
      }
    } catch (error: any) {
      console.error('Error submitting wish:', error)
      const errorMessage = error.response?.data?.error || error.message || 'Có lỗi xảy ra. Vui lòng thử lại!'
      toast.error(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 via-white/80 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-rose opacity-10"></div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
      
      {/* Floating message elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/4 opacity-5 animate-float" style={{ animationDuration: '9s' }}>
          <Mail className="w-16 h-16 text-pink-400" />
        </div>
        <div className="absolute bottom-20 right-1/4 opacity-5 animate-float-slow" style={{ animationDuration: '11s', animationDelay: '1.5s' }}>
          <PenTool className="w-14 h-14 text-rose-400" />
        </div>
        <div className="absolute top-1/2 left-20 opacity-5 animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}>
          <Heart className="w-12 h-12 text-pink-500 fill-pink-500" />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block mb-4">
            <PenTool className="w-10 h-10 text-pink-500 mx-auto" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            <span className="gradient-text">Sổ Lưu Bút</span>
          </h2>
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300"></div>
            <Mail className="w-6 h-6 text-pink-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          {/* Form */}
          <form 
            onSubmit={handleSubmit(onSubmit)}
            className="bg-gradient-to-br from-white to-pink-50 rounded-2xl shadow-xl p-6 md:p-8 mb-12 border border-pink-100 animate-fade-in-up" 
            style={{ animationDelay: '0.2s' }}
            noValidate
          >
            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Tên của bạn
              </label>
              <input
                {...register('guestName', { required: 'Vui lòng nhập tên của bạn' })}
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Nhập tên của bạn"
              />
              {errors.guestName && (
                <p className="text-red-500 text-sm mt-1">{errors.guestName.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 font-semibold mb-2">
                Lời chúc
              </label>
              <textarea
                {...register('message', { required: 'Vui lòng nhập lời chúc' })}
                rows={5}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 resize-none"
                placeholder="Nhập lời chúc của bạn..."
              />
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="relative z-20 w-full md:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full hover:from-pink-600 hover:to-rose-600 active:from-pink-700 active:to-rose-700 transition-all duration-300 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 disabled:hover:scale-100 disabled:active:scale-100 cursor-pointer"
              style={{ pointerEvents: submitting ? 'none' : 'auto' }}
            >
              {submitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Đang gửi...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Gửi lời chúc
                  <Send className="w-5 h-5" />
                </span>
              )}
            </button>
          </form>

          {/* Wishes List */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
            </div>
          ) : wishes.length === 0 ? (
            <div className="text-center py-12 text-gray-600">
              Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé!
            </div>
          ) : (
            <div className="space-y-6">
              {wishes.map((wish) => (
                <div key={wish._id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold mr-3">
                      {wish.guestName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{wish.guestName}</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(wish.createdAt).toLocaleDateString('vi-VN')}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{wish.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
