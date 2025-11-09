'use client';

import { motion } from 'framer-motion';

export default function PromotionBanner({ promotion }) {
  if (!promotion) return null;

  const getSeasonIcon = (season) => {
    const icons = {
      'ปีใหม่': '🎉',
      'สงกรานต์': '💦',
      'ลอยกระทง': '🏮',
      'ฤดูร้อน': '☀️',
      'หน้าหนาว': '❄️',
    };
    return icons[season] || '🎁';
  };

  const getSeasonColor = (season) => {
    const colors = {
      'ปีใหม่': 'from-purple-500 to-pink-500',
      'สงกรานต์': 'from-blue-500 to-cyan-500',
      'ลอยกระทง': 'from-orange-500 to-yellow-500',
      'ฤดูร้อน': 'from-yellow-500 to-red-500',
      'หน้าหนาว': 'from-blue-400 to-purple-500',
    };
    return colors[season] || 'from-purple-500 to-purple-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative overflow-hidden rounded-3xl bg-gradient-to-r ${getSeasonColor(promotion.season)} p-6 text-white shadow-2xl`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">{getSeasonIcon(promotion.season)}</span>
              <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                {promotion.season}
              </span>
            </div>
            <h3 className="text-2xl font-light mb-2">{promotion.name}</h3>
            <p className="text-white/90 text-sm mb-3 max-w-xl">
              {promotion.description}
            </p>
            <div className="flex items-center gap-4 text-sm">
              {promotion.minNights && (
                <span className="bg-white/20 px-3 py-1 rounded-full">
                  พักขั้นต่ำ {promotion.minNights} คืน
                </span>
              )}
              <span className="text-white/80">
                📅 {new Date(promotion.startDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })} - {new Date(promotion.endDate).toLocaleDateString('th-TH', { day: 'numeric', month: 'short' })}
              </span>
            </div>
          </div>

          <div className="text-right ml-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 min-w-[120px]">
              <div className="text-4xl font-bold">
                {promotion.discountValue}
                {promotion.discountType === 'percentage' ? '%' : '฿'}
              </div>
              <div className="text-sm font-light mt-1">ส่วนลด</div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
