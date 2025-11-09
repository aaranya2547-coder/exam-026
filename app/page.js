'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import PromotionBanner from '@/components/PromotionBanner';
import RatingStars from '@/components/RatingStars';

export default function Home() {
  const [regions, setRegions] = useState([]);
  const [promotions, setPromotions] = useState([]);
  const [featuredAccommodations, setFeaturedAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch all data in parallel
      const [regionsRes, promotionsRes, featuredRes] = await Promise.all([
        fetch('/api/regions'),
        fetch('/api/promotions'),
        fetch('/api/accommodations?featured=true'),
      ]);

      const [regionsData, promotionsData, featuredData] = await Promise.all([
        regionsRes.json(),
        promotionsRes.json(),
        featuredRes.json(),
      ]);

      if (regionsData.success) setRegions(regionsData.data);
      if (promotionsData.success) setPromotions(promotionsData.data);
      if (featuredData.success) setFeaturedAccommodations(featuredData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
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
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <motion.h1
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="text-2xl font-light text-purple-600 cursor-pointer"
              >
                จองที่พักออนไลน์
              </motion.h1>
            </Link>
            <nav className="flex gap-6">
              <Link href="/" className="text-purple-800 font-medium">
                หน้าแรก
              </Link>
              <Link href="/provinces" className="text-purple-600 hover:text-purple-800 transition-all duration-300 hover:scale-105">
                77 จังหวัด
              </Link>
              <Link href="/dashboard" className="text-purple-600 hover:text-purple-800 transition-all duration-300 hover:scale-105">
                การจองของฉัน
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl font-light text-purple-900 mb-6">
            ค้นหาที่พักในฝัน
          </h2>
          <p className="text-xl text-purple-600/80 font-light mb-8">
            เลือกโซนที่คุณต้องการเพื่อเริ่มต้นการเดินทาง
          </p>

          {/* Quick Link to Provinces */}
          <Link href="/provinces">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-purple-600 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-light text-lg border-2 border-purple-100 hover:border-purple-300"
            >
              🏙️ เลือกจาก 77 จังหวัด
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* Promotions Section */}
      {promotions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-3xl font-light text-purple-900 mb-6 text-center">
              🎁 โปรโมชั่นพิเศษ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {promotions.slice(0, 2).map((promotion) => (
                <PromotionBanner key={promotion.id} promotion={promotion} />
              ))}
            </div>
          </motion.div>
        </section>
      )}

      {/* Featured Accommodations Section */}
      {featuredAccommodations.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-3xl font-light text-purple-900 mb-6 text-center">
              ⭐ โลเคชั่นแนะนำ
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {featuredAccommodations.map((accommodation) => (
                <motion.div key={accommodation.id} variants={itemVariants}>
                  <Link href={`/accommodation/${accommodation.slug}`}>
                    <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                      {/* Badge */}
                      <div className="relative">
                        <div className="aspect-[16/10] relative overflow-hidden">
                          <div
                            className="absolute inset-0 bg-gradient-to-br from-purple-300 to-purple-500 group-hover:scale-110 transition-transform duration-700"
                            style={{
                              backgroundImage:
                                accommodation.images && accommodation.images[0]
                                  ? `url(${accommodation.images[0]})`
                                  : undefined,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                          />
                        </div>
                        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                          ⭐ แนะนำ
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h4 className="text-xl font-light text-purple-900 mb-2 group-hover:text-purple-600 transition-colors">
                          {accommodation.name}
                        </h4>

                        {/* Rating */}
                        {accommodation.rating && (
                          <div className="mb-3">
                            <RatingStars rating={parseFloat(accommodation.rating)} size="sm" />
                          </div>
                        )}

                        <p className="text-purple-600/70 text-sm mb-4 line-clamp-2">
                          {accommodation.shortDesc}
                        </p>

                        {/* Location */}
                        <div className="text-xs text-purple-500 mb-4">
                          📍 {accommodation.province?.name || accommodation.region.name}
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-2xl font-light text-purple-600">
                              ฿{Number(accommodation.pricePerNight).toLocaleString()}
                            </span>
                            <span className="text-sm text-purple-400 ml-1">
                              / คืน
                            </span>
                          </div>
                          <div className="text-sm text-purple-500">
                            สูงสุด {accommodation.maxGuests} คน
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-purple-100">
                          <span className="text-purple-600 group-hover:text-purple-800 transition-colors inline-flex items-center gap-2 text-sm">
                            ดูรายละเอียด
                            <svg
                              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
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
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* Regions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h3 className="text-3xl font-light text-purple-900 mb-6 text-center">
          เลือกตามภูมิภาค
        </h3>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl shadow-lg h-80 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {regions.map((region) => (
              <motion.div key={region.id} variants={itemVariants}>
                <Link href={`/region/${region.slug}`}>
                  <div className="group relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    <div className="aspect-[4/5] relative overflow-hidden">
                      <div
                        className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 group-hover:scale-110 transition-transform duration-700"
                        style={{
                          backgroundImage: region.imageUrl
                            ? `url(${region.imageUrl})`
                            : undefined,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-2xl font-light mb-2">
                          {region.name}
                        </h3>
                        <p className="text-sm text-white/90 mb-3">
                          {region.description || 'สำรวจที่พักในภูมิภาคนี้'}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">
                            {region._count.accommodations} ที่พัก
                          </span>
                          <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/30 transition-all duration-300 group-hover:scale-110">
                            <svg
                              className="w-4 h-4 text-white"
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
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md border-t border-purple-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-600/60 font-light">
            © 2024 จองที่พักออนไลน์ | Minimal Design
          </p>
        </div>
      </footer>
    </div>
  );
}
