'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

interface WeddingForm {
  slug: string
  groomName: string
  brideName: string
  groomFullName: string
  brideFullName: string
  weddingDate: string
  saveTheDateText: string
  groomDescription: string
  brideDescription: string
}

export default function AdminPage() {
  const [weddings, setWeddings] = useState<any[]>([])
  const [selectedWedding, setSelectedWedding] = useState<any>(null)
  const [images, setImages] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState<'info' | 'images' | 'events' | 'story' | 'bank'>('info')
  
  const { register, handleSubmit, reset, watch, setValue } = useForm<WeddingForm & any>()

  useEffect(() => {
    fetchWeddings()
  }, [])

  useEffect(() => {
    if (selectedWedding) {
      reset(selectedWedding)
      fetchImages()
    }
  }, [selectedWedding])

  const fetchWeddings = async () => {
    try {
      const response = await axios.get(`${API_URL}/weddings`)
      setWeddings(response.data)
      if (response.data.length > 0 && !selectedWedding) {
        setSelectedWedding(response.data[0])
      }
    } catch (error) {
      console.error('Error fetching weddings:', error)
    }
  }

  const fetchImages = async () => {
    if (!selectedWedding) return
    try {
      const response = await axios.get(`${API_URL}/images/wedding/${selectedWedding._id}`)
      setImages(response.data)
    } catch (error) {
      console.error('Error fetching images:', error)
    }
  }

  const onSubmit = async (data: any) => {
    try {
      if (selectedWedding?._id) {
        await axios.put(`${API_URL}/weddings/${selectedWedding._id}`, data)
        toast.success('Cập nhật thành công!')
      } else {
        await axios.post(`${API_URL}/weddings`, data)
        toast.success('Tạo mới thành công!')
      }
      fetchWeddings()
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Có lỗi xảy ra')
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, category: string) => {
    if (!e.target.files || !selectedWedding) return

    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('weddingId', selectedWedding._id)
    formData.append('category', category)

    const uploadToast = toast.loading(`Đang upload ảnh ${category}...`)
    
    try {
      const response = await axios.post(`${API_URL}/images/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log('Upload response:', response.data) // Debug log
      fetchImages()
      toast.success('Upload ảnh thành công!', { id: uploadToast })
      // Reset file input
      e.target.value = ''
    } catch (error: any) {
      console.error('Upload error:', error) // Debug log
      toast.error(error.response?.data?.error || 'Có lỗi xảy ra khi upload ảnh', { id: uploadToast })
    }
  }

  const handleDeleteImage = async (imageId: string) => {
    // Use a simple confirmation approach
    if (!window.confirm('Bạn có chắc muốn xóa ảnh này?')) return

    try {
      await axios.delete(`${API_URL}/images/${imageId}`)
      fetchImages()
      toast.success('Xóa ảnh thành công!')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Có lỗi xảy ra khi xóa ảnh')
    }
  }

  if (weddings.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Quản lý Thiệp Cưới</h1>
          <p className="text-gray-600">Chưa có thiệp cưới nào. Hãy tạo mới!</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Quản lý Thiệp Cưới</h1>

        {/* Wedding Selector */}
        <div className="bg-white rounded-lg shadow-lg p-4 mb-6">
          <label className="block text-sm font-semibold mb-2">Chọn thiệp cưới:</label>
          <select
            className="w-full md:w-auto px-4 py-2 border rounded-lg"
            value={selectedWedding?._id || ''}
            onChange={(e) => {
              const wedding = weddings.find(w => w._id === e.target.value)
              setSelectedWedding(wedding)
            }}
          >
            {weddings.map((w) => (
              <option key={w._id} value={w._id}>
                {w.groomName} & {w.brideName} ({w.slug})
              </option>
            ))}
          </select>
          <a
            href={`/?slug=${selectedWedding?.slug}`}
            target="_blank"
            className="ml-4 text-pink-500 hover:underline"
          >
            Xem thiệp cưới →
          </a>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="flex border-b overflow-x-auto">
            {[
              { id: 'info', label: 'Thông tin cơ bản' },
              { id: 'images', label: 'Quản lý ảnh' },
              { id: 'events', label: 'Sự kiện' },
              { id: 'story', label: 'Câu chuyện' },
              { id: 'bank', label: 'Tài khoản ngân hàng' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-pink-500 text-pink-500'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6">
            {activeTab === 'info' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Slug (URL)</label>
                    <input {...register('slug', { required: true })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Ngày cưới</label>
                    <input
                      {...register('weddingDate', { required: true })}
                      type="datetime-local"
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Tên chú rể (ngắn)</label>
                    <input {...register('groomName', { required: true })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Tên cô dâu (ngắn)</label>
                    <input {...register('brideName', { required: true })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Họ tên đầy đủ chú rể</label>
                    <input {...register('groomFullName', { required: true })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Họ tên đầy đủ cô dâu</label>
                    <input {...register('brideFullName', { required: true })} className="w-full px-4 py-2 border rounded-lg" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Lời mở đầu (Save the Date)</label>
                  <textarea
                    {...register('saveTheDateText')}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Mô tả chú rể</label>
                    <textarea
                      {...register('groomDescription')}
                      rows={6}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Mô tả cô dâu</label>
                    <textarea
                      {...register('brideDescription')}
                      rows={6}
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'images' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Upload ảnh chú rể</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'groom')}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Upload ảnh cô dâu</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'bride')}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Upload ảnh album</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, 'album')}
                      className="w-full"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  {images
                    .filter(img => ['album', 'groom', 'bride', 'couple'].includes(img.category))
                    .map((image) => (
                      <div key={image._id} className="relative group">
                        <img
                          src={`http://localhost:5000${image.path}`}
                          alt={image.originalName}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => handleDeleteImage(image._id)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                        <div className="text-xs text-center mt-2 text-gray-600">{image.category}</div>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {activeTab === 'events' && (
              <div className="space-y-4">
                <EventsManager register={register} watch={watch} setValue={setValue} selectedWedding={selectedWedding} />
              </div>
            )}

            {activeTab === 'story' && (
              <div className="space-y-4">
                <StoryManager 
                  register={register} 
                  watch={watch} 
                  setValue={setValue} 
                  selectedWedding={selectedWedding}
                  handleImageUpload={handleImageUpload}
                  images={images}
                  handleDeleteImage={handleDeleteImage}
                />
              </div>
            )}

            {activeTab === 'bank' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Tài khoản chú rể</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Ngân hàng</label>
                        <input {...register('bankAccounts.groom.bank')} className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Tên chủ tài khoản</label>
                        <input {...register('bankAccounts.groom.name')} className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Số tài khoản</label>
                        <input {...register('bankAccounts.groom.accountNumber')} className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">QR Code</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            e.preventDefault()
                            handleImageUpload(e, 'qr-groom')
                          }}
                          className="w-full"
                        />
                        {images.filter(img => img.category === 'qr-groom').length > 0 && (
                          <div className="mt-2">
                            {images.filter(img => img.category === 'qr-groom').map((img) => (
                              <div key={img._id} className="relative inline-block mr-2">
                                <img
                                  src={`http://localhost:5000${img.path}`}
                                  alt="QR Code"
                                  className="w-24 h-24 object-contain border rounded"
                                />
                                <button
                                  onClick={() => handleDeleteImage(img._id)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h3 className="font-semibold mb-4">Tài khoản cô dâu</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold mb-2">Ngân hàng</label>
                        <input {...register('bankAccounts.bride.bank')} className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Tên chủ tài khoản</label>
                        <input {...register('bankAccounts.bride.name')} className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">Số tài khoản</label>
                        <input {...register('bankAccounts.bride.accountNumber')} className="w-full px-4 py-2 border rounded-lg" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2">QR Code</label>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            e.preventDefault()
                            handleImageUpload(e, 'qr-bride')
                          }}
                          className="w-full"
                        />
                        {images.filter(img => img.category === 'qr-bride').length > 0 && (
                          <div className="mt-2">
                            {images.filter(img => img.category === 'qr-bride').map((img) => (
                              <div key={img._id} className="relative inline-block mr-2">
                                <img
                                  src={`http://localhost:5000${img.path}`}
                                  alt="QR Code"
                                  className="w-24 h-24 object-contain border rounded"
                                />
                                <button
                                  onClick={() => handleDeleteImage(img._id)}
                                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6">
              <button
                type="submit"
                className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 font-semibold"
              >
                Lưu thay đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

function EventsManager({ register, watch, setValue, selectedWedding }: any) {
  const events = watch('events') || selectedWedding?.events || []

  const addEvent = () => {
    const newEvents = [...events, { title: '', time: '', date: '', location: '', address: '' }]
    setValue('events', newEvents)
  }

  const removeEvent = (index: number) => {
    const newEvents = events.filter((_: any, i: number) => i !== index)
    setValue('events', newEvents)
  }

  return (
    <>
      <button
        type="button"
        onClick={addEvent}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        + Thêm sự kiện
      </button>

      {events.map((_: any, index: number) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Sự kiện {index + 1}</h4>
            <button
              type="button"
              onClick={() => removeEvent(index)}
              className="text-red-500 hover:text-red-700"
            >
              Xóa
            </button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              {...register(`events.${index}.title`)}
              placeholder="Tên sự kiện"
              className="px-4 py-2 border rounded-lg"
            />
            <input
              {...register(`events.${index}.date`)}
              placeholder="Ngày (dd/MM/yyyy)"
              className="px-4 py-2 border rounded-lg"
            />
            <input
              {...register(`events.${index}.time`)}
              placeholder="Giờ (HH:mm)"
              className="px-4 py-2 border rounded-lg"
            />
            <input
              {...register(`events.${index}.location`)}
              placeholder="Tên địa điểm"
              className="px-4 py-2 border rounded-lg"
            />
            <input
              {...register(`events.${index}.address`)}
              placeholder="Địa chỉ chi tiết"
              className="px-4 py-2 border rounded-lg md:col-span-2"
            />
          </div>
        </div>
      ))}
    </>
  )
}

function StoryManager({ register, watch, setValue, selectedWedding, handleImageUpload, images, handleDeleteImage }: any) {
  const story = watch('story') || selectedWedding?.story || []

  const addStory = () => {
    const newStory = [...story, { title: '', content: '', date: '', image: '' }]
    setValue('story', newStory)
  }

  const removeStory = (index: number) => {
    const newStory = story.filter((_: any, i: number) => i !== index)
    setValue('story', newStory)
  }

  const handleStoryImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    if (!e.target.files || !selectedWedding) return

    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    formData.append('weddingId', selectedWedding._id)
    formData.append('category', 'story')

    const uploadToast = toast.loading('Đang upload ảnh...')
    
    try {
      const response = await axios.post(`${API_URL}/images/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      
      // Update story image path
      const updatedStory = [...story]
      updatedStory[index].image = response.data.path
      setValue('story', updatedStory)
      
      toast.success('Upload ảnh thành công!', { id: uploadToast })
      e.target.value = ''
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Có lỗi xảy ra khi upload ảnh', { id: uploadToast })
    }
  }

  const removeStoryImage = (index: number) => {
    const updatedStory = [...story]
    updatedStory[index].image = ''
    setValue('story', updatedStory)
  }

  return (
    <>
      <button
        type="button"
        onClick={addStory}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        + Thêm câu chuyện
      </button>

      {story.map((storyItem: any, index: number) => (
        <div key={index} className="border rounded-lg p-4 space-y-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Câu chuyện {index + 1}</h4>
            <button
              type="button"
              onClick={() => removeStory(index)}
              className="text-red-500 hover:text-red-700"
            >
              Xóa
            </button>
          </div>
          
          <input
            {...register(`story.${index}.date`)}
            placeholder="Ngày/thời điểm (ví dụ: Mùa thu năm ấy)"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <input
            {...register(`story.${index}.title`)}
            placeholder="Tiêu đề"
            className="w-full px-4 py-2 border rounded-lg"
          />
          <textarea
            {...register(`story.${index}.content`)}
            placeholder="Nội dung"
            rows={5}
            className="w-full px-4 py-2 border rounded-lg"
          />
          
          {/* Image upload for story */}
          <div>
            <label className="block text-sm font-semibold mb-2">Ảnh cho câu chuyện (tùy chọn)</label>
            {storyItem?.image ? (
              <div className="relative inline-block">
                <img
                  src={storyItem.image.startsWith('http') ? storyItem.image : `http://localhost:5000${storyItem.image}`}
                  alt="Story"
                  className="w-full max-w-md h-48 object-cover rounded-lg border-2 border-pink-200"
                />
                <button
                  type="button"
                  onClick={() => removeStoryImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ) : (
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleStoryImageUpload(e, index)}
                className="w-full"
              />
            )}
          </div>
        </div>
      ))}
    </>
  )
}
