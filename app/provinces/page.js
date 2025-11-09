'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProvincesPage() {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState('all');

  const regions = [
    { slug: 'all', name: 'ทุกภูมิภาค' },
    { slug: 'north', name: 'ภาคเหนือ' },
    { slug: 'south', name: 'ภาคใต้' },
    { slug: 'northeast', name: 'ภาคอีสาน' },
    { slug: 'central', name: 'ภาคกลาง' },
  ];

  useEffect(() => {
    fetchProvinces();
  }, [selectedRegion]);

  const fetchProvinces = async () => {
    setLoading(true);
    try {
      const url = selectedRegion === 'all'
        ? '/api/provinces'
        : `/api/provinces?regionSlug=${selectedRegion}`;
      const response = await fetch(url);
      const data = await response.json();
      if (data.success) {
        setProvinces(data.data);
      }
    } catch (error) {
      console.error('Error fetching provinces:', error);
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
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
              <Link href="/provinces" className="text-purple-800 font-medium">
                77 จังหวัด
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
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-light text-purple-900 mb-3">
            เลือกจังหวัดที่คุณต้องการ
          </h2>
          <p className="text-purple-600/70">
            77 จังหวัดทั่วประเทศไทย พร้อมที่พักคุณภาพ
          </p>
        </motion.div>

        {/* Region Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {regions.map((region) => (
            <button
              key={region.slug}
              onClick={() => setSelectedRegion(region.slug)}
              className={`px-6 py-3 rounded-2xl font-light transition-all duration-300 ${
                selectedRegion === region.slug
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg scale-105'
                  : 'bg-white text-purple-600 hover:bg-purple-50 hover:scale-105'
              }`}
            >
              {region.name}
            </button>
          ))}
        </motion.div>

        {/* Province Count */}
        <div className="text-center mb-8">
          <span className="text-purple-600 font-light">
            {loading ? 'กำลังโหลด...' : `พบ ${provinces.length} จังหวัด`}
          </span>
        </div>

        {/* Provinces Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow h-32 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
          >
            {provinces.map((province) => (
              <motion.div key={province.id} variants={itemVariants}>
                <Link href={`/accommodations?provinceSlug=${province.slug}`}>
                  <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 border-transparent hover:border-purple-300">
                    <div className="text-center">
                      <h3 className="text-lg font-light text-purple-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {province.name}
                      </h3>
                      <p className="text-sm text-purple-600/60">
                        {province.region.name}
                      </p>
                      {province._count.accommodations > 0 && (
                        <div className="mt-3 pt-3 border-t border-purple-100">
                          <span className="text-xs text-purple-500 font-medium">
                            {province._count.accommodations} ที่พัก
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && provinces.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-purple-400 text-lg">ไม่พบข้อมูลจังหวัด</p>
          </motion.div>
        )}
      </div>

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
