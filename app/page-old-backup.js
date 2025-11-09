'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  const [regions, setRegions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const response = await fetch('/api/regions');
      const data = await response.json();
      if (data.success) {
        setRegions(data.data);
      }
    } catch (error) {
      console.error('Error fetching regions:', error);
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
            <motion.h1
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-2xl font-light text-purple-600"
            >
              จองที่พักออนไลน์
            </motion.h1>
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

      {/* Hero Section */}
      <section className="py-20 px-4">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-5xl font-light text-purple-900 mb-6">
            ค้นหาที่พักในฝัน
          </h2>
          <p className="text-xl text-purple-600/80 font-light">
            เลือกโซนที่คุณต้องการเพื่อเริ่มต้นการเดินทาง
          </p>
        </motion.div>
      </section>

      {/* Regions Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
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

        {!loading && regions.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-purple-400 text-lg">
              ยังไม่มีข้อมูลโซนที่พัก กรุณาเพิ่มข้อมูลในหน้า Admin
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
