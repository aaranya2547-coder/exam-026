'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function RegionPage() {
  const params = useParams();
  const [accommodations, setAccommodations] = useState([]);
  const [region, setRegion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.slug) {
      fetchAccommodations();
    }
  }, [params.slug]);

  const fetchAccommodations = async () => {
    try {
      const response = await fetch(`/api/accommodations?regionSlug=${params.slug}`);
      const data = await response.json();
      if (data.success && data.data.length > 0) {
        setAccommodations(data.data);
        setRegion(data.data[0].region);
      }
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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
                className="text-2xl font-light text-purple-600 hover:text-purple-800 transition-colors cursor-pointer"
              >
                จองที่พักออนไลน์
              </motion.h1>
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

      {/* Breadcrumb & Title */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              href="/"
              className="text-purple-500 hover:text-purple-700 transition-colors inline-flex items-center gap-2 mb-6"
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
              กลับสู่หน้าแรก
            </Link>
            <h2 className="text-4xl font-light text-purple-900 mb-3">
              {region?.name || 'กำลังโหลด...'}
            </h2>
            <p className="text-purple-600/70">
              พบ {accommodations.length} ที่พัก
            </p>
          </motion.div>
        </div>
      </section>

      {/* Accommodations List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {accommodations.map((accommodation) => (
              <motion.div key={accommodation.id} variants={itemVariants}>
                <Link href={`/accommodation/${accommodation.slug}`}>
                  <div className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Image */}
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

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-light text-purple-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {accommodation.name}
                      </h3>
                      <p className="text-purple-600/70 text-sm mb-4 line-clamp-2">
                        {accommodation.shortDesc}
                      </p>

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
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-purple-400 text-lg">
              ยังไม่มีที่พักในภูมิภาคนี้
            </p>
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
