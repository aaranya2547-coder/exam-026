'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import BookingModal from '@/components/BookingModal';
import RatingStars from '@/components/RatingStars';

export default function AccommodationsPage() {
  const searchParams = useSearchParams();
  const provinceSlug = searchParams.get('provinceSlug');
  const regionSlug = searchParams.get('regionSlug');

  const [accommodations, setAccommodations] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAccommodation, setSelectedAccommodation] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(provinceSlug || 'all');
  const [filterRegion, setFilterRegion] = useState(regionSlug || 'all');

  const regions = [
    { slug: 'all', name: 'ทุกภูมิภาค' },
    { slug: 'north', name: 'ภาคเหนือ' },
    { slug: 'south', name: 'ภาคใต้' },
    { slug: 'northeast', name: 'ภาคอีสาน' },
    { slug: 'central', name: 'ภาคกลาง' },
  ];

  useEffect(() => {
    fetchAccommodations();
    fetchProvinces();
  }, [selectedProvince, filterRegion]);

  const fetchAccommodations = async () => {
    setLoading(true);
    try {
      let url = '/api/accommodations?';

      if (selectedProvince && selectedProvince !== 'all') {
        url += `provinceSlug=${selectedProvince}&`;
      } else if (filterRegion && filterRegion !== 'all') {
        url += `regionSlug=${filterRegion}&`;
      }

      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setAccommodations(data.data);
      }
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProvinces = async () => {
    try {
      const url = filterRegion === 'all'
        ? '/api/provinces'
        : `/api/provinces?regionSlug=${filterRegion}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setProvinces(data.data);
      }
    } catch (error) {
      console.error('Error fetching provinces:', error);
    }
  };

  const handleRegionChange = (region) => {
    setFilterRegion(region);
    setSelectedProvince('all');
  };

  const handleProvinceChange = (province) => {
    setSelectedProvince(province);
  };

  const getCurrentTitle = () => {
    if (selectedProvince !== 'all') {
      const province = provinces.find(p => p.slug === selectedProvince);
      return `ที่พักใน${province?.name || 'จังหวัดที่เลือก'}`;
    }
    if (filterRegion !== 'all') {
      const region = regions.find(r => r.slug === filterRegion);
      return `ที่พักใน${region?.name || 'ภูมิภาคที่เลือก'}`;
    }
    return 'ที่พักทั้งหมด';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <h1 className="text-2xl font-light text-purple-600 hover:text-purple-800 transition-colors cursor-pointer">
                ExamHotel
              </h1>
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-purple-600 hover:text-purple-800 transition-all duration-300 hover:scale-105">
                หน้าแรก
              </Link>
              <Link href="/provinces" className="text-purple-600 hover:text-purple-800 transition-all duration-300 hover:scale-105">
                77 จังหวัด
              </Link>
              <Link href="/accommodations" className="text-purple-800 font-medium">
                ที่พัก
              </Link>
              <Link href="/dashboard" className="text-purple-600 hover:text-purple-800 transition-all duration-300 hover:scale-105">
                การจองของฉัน
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-light text-purple-900 mb-3">
            {getCurrentTitle()}
          </h2>
          <p className="text-purple-600/70">
            ค้นหาที่พักที่เหมาะสมสำหรับคุณ
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          {/* Region Filter */}
          <div className="mb-6">
            <h3 className="text-lg font-light text-purple-900 mb-3">เลือกภูมิภาค:</h3>
            <div className="flex flex-wrap gap-3">
              {regions.map((region) => (
                <button
                  key={region.slug}
                  onClick={() => handleRegionChange(region.slug)}
                  className={`px-5 py-2 rounded-full font-light transition-all duration-300 ${
                    filterRegion === region.slug
                      ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-white text-purple-600 hover:bg-purple-50 hover:scale-105 shadow-md'
                  }`}
                >
                  {region.name}
                </button>
              ))}
            </div>
          </div>

          {/* Province Filter */}
          {provinces.length > 0 && (
            <div>
              <h3 className="text-lg font-light text-purple-900 mb-3">เลือกจังหวัด:</h3>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleProvinceChange('all')}
                  className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                    selectedProvince === 'all'
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
                  }`}
                >
                  ทั้งหมด
                </button>
                {provinces.map((province) => (
                  <button
                    key={province.id}
                    onClick={() => handleProvinceChange(province.slug)}
                    className={`px-4 py-2 rounded-full text-sm font-light transition-all duration-300 ${
                      selectedProvince === province.slug
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'bg-white text-purple-600 hover:bg-purple-50 shadow-md'
                    }`}
                  >
                    {province.name}
                    {province._count.accommodations > 0 && (
                      <span className="ml-1 text-xs opacity-70">
                        ({province._count.accommodations})
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <span className="text-purple-600 font-light">
            {loading ? 'กำลังโหลด...' : `พบ ${accommodations.length} ที่พัก`}
          </span>
        </div>

        {/* Accommodations Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg h-96 animate-pulse"
              />
            ))}
          </div>
        ) : accommodations.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {accommodations.map((accommodation) => (
              <motion.div
                key={accommodation.id}
                variants={itemVariants}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-100 to-purple-50">
                  {accommodation.images && accommodation.images.length > 0 ? (
                    <img
                      src={accommodation.images[0]}
                      alt={accommodation.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-purple-300">
                      <span className="text-4xl">🏨</span>
                    </div>
                  )}
                  {accommodation.isFeatured && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      ⭐ แนะนำ
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <Link href={`/accommodation/${accommodation.slug}`}>
                    <h3 className="text-xl font-light text-purple-900 mb-2 group-hover:text-purple-600 transition-colors cursor-pointer">
                      {accommodation.name}
                    </h3>
                  </Link>

                  {/* Rating */}
                  {accommodation.rating && (
                    <div className="mb-2">
                      <RatingStars rating={parseFloat(accommodation.rating)} />
                    </div>
                  )}

                  <p className="text-sm text-purple-600/60 mb-1">
                    📍 {accommodation.province?.name || accommodation.region.name}
                  </p>

                  <p className="text-sm text-purple-600/80 mb-4 line-clamp-2">
                    {accommodation.shortDesc || accommodation.description}
                  </p>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-light text-purple-900">
                        ฿{accommodation.pricePerNight.toLocaleString()}
                      </span>
                      <span className="text-sm text-purple-600/60 ml-1">/คืน</span>
                    </div>
                    <span className="text-sm text-purple-600/60">
                      👥 {accommodation.maxGuests} คน
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2">
                    <Link
                      href={`/accommodation/${accommodation.slug}`}
                      className="flex-1 text-center px-4 py-2 bg-purple-50 text-purple-600 rounded-full hover:bg-purple-100 transition-all duration-300 text-sm"
                    >
                      ดูรายละเอียด
                    </Link>
                    <button
                      onClick={() => setSelectedAccommodation(accommodation)}
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
                    >
                      จองเลย
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-3xl shadow-lg"
          >
            <div className="text-6xl mb-4">🏨</div>
            <p className="text-purple-400 text-xl mb-2">ไม่พบที่พักในจังหวัดนี้</p>
            <p className="text-purple-300 text-sm mb-6">
              ลองเลือกจังหวัดอื่นหรือภูมิภาคอื่น
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/provinces"
                className="px-6 py-2 bg-purple-500 text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                เลือกจังหวัดอื่น
              </Link>
              <button
                onClick={() => {
                  setFilterRegion('all');
                  setSelectedProvince('all');
                }}
                className="px-6 py-2 bg-white text-purple-600 border-2 border-purple-200 rounded-full hover:bg-purple-50 transition-all duration-300"
              >
                ดูที่พักทั้งหมด
              </button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedAccommodation && (
        <BookingModal
          accommodation={selectedAccommodation}
          onClose={() => setSelectedAccommodation(null)}
        />
      )}

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-purple-100 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-600/60 font-light">
            © 2024 ExamHotel | จองที่พักออนไลน์
          </p>
        </div>
      </footer>
    </div>
  );
}
