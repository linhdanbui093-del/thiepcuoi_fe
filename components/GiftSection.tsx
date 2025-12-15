'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Gift, Heart, Wallet, Copy, Check } from 'lucide-react'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.ocuadua.com/api'

interface GiftSectionProps {
  weddingId: string
  bankAccounts?: {
    groom?: {
      bank: string
      name: string
      accountNumber: string
    }
    bride?: {
      bank: string
      name: string
      accountNumber: string
    }
  }
}

export default function GiftSection({ weddingId, bankAccounts }: GiftSectionProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const [groomQR, setGroomQR] = useState<string | null>(null)
  const [brideQR, setBrideQR] = useState<string | null>(null)

  useEffect(() => {
    fetchQRCodes()
  }, [weddingId])

  const fetchQRCodes = async () => {
    try {
      const [groomRes, brideRes] = await Promise.all([
        axios.get(`${API_URL}/images/wedding/${weddingId}/qr-groom`).catch(() => ({ data: [] })),
        axios.get(`${API_URL}/images/wedding/${weddingId}/qr-bride`).catch(() => ({ data: [] }))
      ])
      
      if (groomRes.data?.length > 0) {
        setGroomQR(groomRes.data[0].path)
      }
      if (brideRes.data?.length > 0) {
        setBrideQR(brideRes.data[0].path)
      }
    } catch (error) {
      console.error('Error fetching QR codes:', error)
    }
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    toast.success('Đã copy số tài khoản!', {
      icon: '📋',
      duration: 2000,
    })
    setTimeout(() => setCopied(null), 2000)
  }

  if (!bankAccounts) {
    return null
  }

  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 via-white/90 to-white relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-pattern-dots opacity-10"></div>
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
      
      {/* Floating gift elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-1/4 opacity-5 animate-float" style={{ animationDuration: '7s' }}>
          <Gift className="w-16 h-16 text-pink-400" />
        </div>
        <div className="absolute bottom-20 left-1/4 opacity-5 animate-float-slow" style={{ animationDuration: '9s', animationDelay: '1s' }}>
          <Heart className="w-14 h-14 text-rose-400 fill-rose-400" />
        </div>
        <div className="absolute top-1/2 right-20 opacity-5 animate-float" style={{ animationDuration: '8s', animationDelay: '2s' }}>
          <Wallet className="w-12 h-12 text-pink-500" />
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="inline-block mb-4">
            <Gift className="w-10 h-10 text-pink-500 mx-auto" />
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4">
            <span className="gradient-text">Hộp mừng cưới</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-pink-300"></div>
            <Heart className="w-6 h-6 text-pink-400 fill-pink-400" />
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-pink-300"></div>
          </div>
          <p className="text-center text-gray-700 mb-12 max-w-2xl mx-auto text-lg leading-relaxed">
            Nếu có thể, bạn hãy tới tham dự Đám cưới, chung vui và Mừng cưới trực tiếp cho chúng mình nha ^^. Cảm ơn bạn rất nhiều!
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {bankAccounts.groom && (
            <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-pink-100 transform hover:scale-[1.02] animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                <Wallet className="w-6 h-6 text-blue-500" />
                <span>Mừng cưới đến chú rể</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-600 font-semibold">Ngân hàng:</label>
                  <p className="text-gray-800 text-lg">{bankAccounts.groom.bank}</p>
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Tên:</label>
                  <p className="text-gray-800 text-lg">{bankAccounts.groom.name}</p>
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Số tài khoản:</label>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-800 text-lg font-mono">
                      {bankAccounts.groom.accountNumber}
                    </p>
                    <button
                      onClick={() => copyToClipboard(bankAccounts.groom!.accountNumber, 'groom-account')}
                      className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors text-sm flex items-center gap-1"
                    >
                      {copied === 'groom-account' ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Đã copy!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                {groomQR && (
                  <div className="mt-4">
                    <label className="text-gray-600 font-semibold block mb-2">Mã QR:</label>
                    <div className="flex justify-center">
                      <Image
                        src={`https://api.ocuadua.com${groomQR}`}
                        alt="QR Code"
                        width={192}
                        height={192}
                        className="object-contain border-2 border-pink-200 rounded-lg bg-white p-2"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {bankAccounts.bride && (
            <div className="bg-gradient-to-br from-white to-pink-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-pink-100 transform hover:scale-[1.02] animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                <Wallet className="w-6 h-6 text-pink-500" />
                <span>Mừng cưới đến cô dâu</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-600 font-semibold">Ngân hàng:</label>
                  <p className="text-gray-800 text-lg">{bankAccounts.bride.bank}</p>
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Tên:</label>
                  <p className="text-gray-800 text-lg">{bankAccounts.bride.name}</p>
                </div>
                <div>
                  <label className="text-gray-600 font-semibold">Số tài khoản:</label>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-800 text-lg font-mono">
                      {bankAccounts.bride.accountNumber}
                    </p>
                    <button
                      onClick={() => copyToClipboard(bankAccounts.bride!.accountNumber, 'bride-account')}
                      className="px-3 py-1 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors text-sm flex items-center gap-1"
                    >
                      {copied === 'bride-account' ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Đã copy!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
                {brideQR && (
                  <div className="mt-4">
                    <label className="text-gray-600 font-semibold block mb-2">Mã QR:</label>
                    <div className="flex justify-center">
                      <Image
                        src={`https://api.ocuadua.com${brideQR}`}
                        alt="QR Code"
                        width={192}
                        height={192}
                        className="object-contain border-2 border-pink-200 rounded-lg bg-white p-2"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
