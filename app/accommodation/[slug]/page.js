'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import BookingModal from '@/components/BookingModal';

export default function AccommodationPage() {
  const params = useParams();
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params.slug) {
      fetchAccommodation();
    }
  }, [params.slug]);

  const fetchAccommodation = async () => {
    try {
      const response = await fetch(`/api/accommodations/${params.slug}`);
      const data = await response.json();
      if (data.success) {
        setAccommodation(data.data);
      }
    } catch (error) {
      console.error('Error fetching accommodation:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-purple-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (!accommodation) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-purple-600 text-xl">ไม่พบข้อมูลที่พัก</p>
          <Link
            href="/"
            className="mt-4 inline-block text-purple-500 hover:text-purple-700"
          >
            กลับสู่หน้าแรก
          </Link>
        </div>
      </div>
    );
  }

  const images = accommodation.images || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-40 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-light text-purple-600 hover:text-purple-800 transition-colors cursor-pointer">
                จองที่พักออนไลน์
              </h1>
            </Link>
            <nav className="flex gap-6">
              <Link
                href="/"
                className="text-purple-600 hover:text-purple-800 transition-all duration-300 hover:scale-105"
              >
                หน้าแรก
              </Link>
              <Link
                href="/dashboard"
                className="text-purple-600 hover:text-purple-800 transition-all duration-300 hover:scale-105"
              >
                การจองของฉัน
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Link
            href={`/region/${accommodation.region.slug}`}
            className="text-purple-500 hover:text-purple-700 transition-colors inline-flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            กลับไปที่ {accommodation.region.name}
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className="aspect-[16/9] relative bg-gradient-to-br from-purple-300 to-purple-500">
                <AnimatePresence mode="wait">
                  {images.length > 0 && (
                    <motion.img
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      src={images[currentImageIndex]}
                      alt={accommodation.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                </AnimatePresence>

                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === 0 ? images.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() =>
                        setCurrentImageIndex((prev) =>
                          prev === images.length - 1 ? 0 : prev + 1
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all hover:scale-110"
                    >
                      <svg
                        className="w-5 h-5 text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>

                    {/* Dots Indicator */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-8'
                              : 'bg-white/50 hover:bg-white/70'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-3xl shadow-xl p-8"
            >
              <h1 className="text-4xl font-light text-purple-900 mb-4">
                {accommodation.name}
              </h1>
              <p className="text-purple-600/70 mb-6">
                {accommodation.region.name} • {accommodation.address}
              </p>

              <div className="prose max-w-none text-purple-800/80 mb-8">
                <p className="whitespace-pre-line">{accommodation.description}</p>
              </div>

              {/* Amenities */}
              {accommodation.amenities && accommodation.amenities.length > 0 && (
                <div className="border-t border-purple-100 pt-6">
                  <h3 className="text-xl font-light text-purple-900 mb-4">
                    สิ่งอำนวยความสะดวก
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {accommodation.amenities.map((amenity, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-purple-600"
                      >
                        <svg
                          className="w-5 h-5 text-purple-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-3xl shadow-xl p-8 sticky top-24"
            >
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-light text-purple-600">
                    ฿{Number(accommodation.pricePerNight).toLocaleString()}
                  </span>
                  <span className="text-purple-400">/ คืน</span>
                </div>
                <p className="text-sm text-purple-600/70">
                  รองรับสูงสุด {accommodation.maxGuests} คน
                </p>
              </div>

              <button
                onClick={() => setShowBookingModal(true)}
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-4 rounded-2xl font-light text-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95"
              >
                จองเลย
              </button>

              <div className="mt-6 pt-6 border-t border-purple-100 space-y-3 text-sm text-purple-600/70">
                <p>✓ จองล่วงหน้าอย่างน้อย 2 เดือน</p>
                <p>✓ ยกเลิกฟรีหากเหลือเวลามากกว่า 2 เดือน</p>
                <p>✓ ยืนยันการจองทันที</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        show={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        accommodation={accommodation}
      />

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-purple-100 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-600/60 font-light">
            © 2024 จองที่พักออนไลน์ | Minimal Design
          </p>
        </div>
      </footer>
    </div>
  );
}
