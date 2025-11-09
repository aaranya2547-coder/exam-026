'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookingModal({ show, onClose, accommodation }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuests: 1,
    specialRequests: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          accommodationId: accommodation.id,
          customerData: {
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
          },
          checkInDate: formData.checkInDate,
          checkOutDate: formData.checkOutDate,
          numberOfGuests: parseInt(formData.numberOfGuests),
          specialRequests: formData.specialRequests,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({
            fullName: '',
            email: '',
            phone: '',
            checkInDate: '',
            checkOutDate: '',
            numberOfGuests: 1,
            specialRequests: '',
          });
        }, 2000);
      } else {
        setError(data.message || 'เกิดข้อผิดพลาดในการจอง');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อ');
    } finally {
      setLoading(false);
    }
  };

  // Get minimum date (2 months from today)
  const getMinDate = () => {
    const date = new Date();
    date.setMonth(date.getMonth() + 2);
    return date.toISOString().split('T')[0];
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ type: 'spring', duration: 0.5 }}
                className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {success ? (
                  <div className="p-12 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', duration: 0.6 }}
                      className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                      <svg
                        className="w-10 h-10 text-white"
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
                    </motion.div>
                    <h3 className="text-2xl font-light text-purple-900 mb-2">
                      จองสำเร็จ!
                    </h3>
                    <p className="text-purple-600/70">
                      เราได้ส่งอีเมลยืนยันการจองไปให้คุณแล้ว
                    </p>
                  </div>
                ) : (
                  <>
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-8 py-6">
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-light text-white">
                          จองที่พัก
                        </h2>
                        <button
                          onClick={onClose}
                          className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-all flex items-center justify-center"
                        >
                          <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      <p className="text-white/90 mt-2 font-light">
                        {accommodation?.name}
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm"
                        >
                          {error}
                        </motion.div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-purple-700 mb-2">
                            ชื่อ-นามสกุล *
                          </label>
                          <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                            placeholder="กรอกชื่อ-นามสกุล"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-purple-700 mb-2">
                            อีเมล *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                            placeholder="example@email.com"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-purple-700 mb-2">
                            เบอร์โทรศัพท์ *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                            placeholder="0XX-XXX-XXXX"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-purple-700 mb-2">
                            จำนวนผู้เข้าพัก *
                          </label>
                          <select
                            name="numberOfGuests"
                            value={formData.numberOfGuests}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                          >
                            {[...Array(accommodation?.maxGuests || 10)].map(
                              (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1} คน
                                </option>
                              )
                            )}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-purple-700 mb-2">
                            วันที่เข้าพัก *
                          </label>
                          <input
                            type="date"
                            name="checkInDate"
                            value={formData.checkInDate}
                            onChange={handleChange}
                            min={getMinDate()}
                            required
                            className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-purple-700 mb-2">
                            วันที่ออก *
                          </label>
                          <input
                            type="date"
                            name="checkOutDate"
                            value={formData.checkOutDate}
                            onChange={handleChange}
                            min={
                              formData.checkInDate ||
                              getMinDate()
                            }
                            required
                            className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-purple-700 mb-2">
                          ความต้องการพิเศษ
                        </label>
                        <textarea
                          name="specialRequests"
                          value={formData.specialRequests}
                          onChange={handleChange}
                          rows={3}
                          className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors resize-none"
                          placeholder="ระบุความต้องการพิเศษ (ถ้ามี)"
                        />
                      </div>

                      <div className="bg-purple-50 rounded-2xl p-4 text-sm text-purple-600">
                        <p className="mb-1">
                          📅 ต้องจองล่วงหน้าอย่างน้อย 2 เดือน
                        </p>
                        <p>
                          ✓ สามารถยกเลิกได้ฟรีหากเหลือเวลามากกว่า 2 เดือนก่อนเข้าพัก
                        </p>
                      </div>

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={onClose}
                          className="flex-1 px-6 py-3 border-2 border-purple-200 text-purple-600 rounded-2xl hover:bg-purple-50 transition-all duration-300"
                        >
                          ยกเลิก
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? 'กำลังจอง...' : 'ยืนยันการจอง'}
                        </button>
                      </div>
                    </form>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
