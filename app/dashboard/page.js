'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const [email, setEmail] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchBookings = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch(`/api/bookings?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการยกเลิกการจองนี้?')) {
      return;
    }

    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        alert('ยกเลิกการจองสำเร็จ');
        // Refresh bookings
        const refreshResponse = await fetch(`/api/bookings?email=${encodeURIComponent(email)}`);
        const refreshData = await refreshResponse.json();
        if (refreshData.success) {
          setBookings(refreshData.data);
        }
      } else {
        alert(data.message || 'ไม่สามารถยกเลิกการจองได้');
      }
    } catch (error) {
      console.error('Error cancelling booking:', error);
      alert('เกิดข้อผิดพลาดในการยกเลิกการจอง');
    }
  };

  const canCancel = (checkInDate) => {
    const today = new Date();
    const checkIn = new Date(checkInDate);
    const monthsDiff = (checkIn.getFullYear() - today.getFullYear()) * 12 +
                       (checkIn.getMonth() - today.getMonth());
    return monthsDiff >= 2;
  };

  const getStatusBadge = (status) => {
    const styles = {
      confirmed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
      completed: 'bg-blue-100 text-blue-700',
    };
    const labels = {
      confirmed: 'ยืนยันแล้ว',
      cancelled: 'ยกเลิกแล้ว',
      completed: 'เสร็จสิ้น',
    };
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-700'}`}>
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-purple-100">
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
                className="text-purple-800 font-medium"
              >
                การจองของฉัน
              </Link>
              <Link
                href="/admin"
                className="text-purple-600 hover:text-purple-800 transition-all duration-300 hover:scale-105"
              >
                Admin
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h2 className="text-4xl font-light text-purple-900 mb-3">
            การจองของฉัน
          </h2>
          <p className="text-purple-600/70">
            ค้นหาการจองของคุณด้วยอีเมล
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 mb-8"
        >
          <form onSubmit={fetchBookings} className="flex gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="กรอกอีเมลของคุณ"
              required
              className="flex-1 px-6 py-4 border-2 border-purple-100 rounded-2xl focus:border-purple-500 focus:outline-none transition-colors text-lg"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed font-light text-lg"
            >
              {loading ? 'กำลังค้นหา...' : 'ค้นหา'}
            </button>
          </form>
        </motion.div>

        {/* Bookings List */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {bookings.length > 0 ? (
              bookings.map((booking, index) => (
                <motion.div
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-64 h-48 md:h-auto bg-gradient-to-br from-purple-300 to-purple-500">
                      {booking.accommodation.images && booking.accommodation.images[0] && (
                        <img
                          src={booking.accommodation.images[0]}
                          alt={booking.accommodation.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-2xl font-light text-purple-900 mb-1">
                            {booking.accommodation.name}
                          </h3>
                          <p className="text-purple-600/70 text-sm">
                            {booking.accommodation.region.name} • เลขที่จอง: {booking.bookingNumber}
                          </p>
                        </div>
                        {getStatusBadge(booking.status)}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                        <div>
                          <p className="text-purple-600/60 mb-1">วันที่เข้าพัก</p>
                          <p className="text-purple-900 font-medium">
                            {new Date(booking.checkInDate).toLocaleDateString('th-TH')}
                          </p>
                        </div>
                        <div>
                          <p className="text-purple-600/60 mb-1">วันที่ออก</p>
                          <p className="text-purple-900 font-medium">
                            {new Date(booking.checkOutDate).toLocaleDateString('th-TH')}
                          </p>
                        </div>
                        <div>
                          <p className="text-purple-600/60 mb-1">จำนวนคืน</p>
                          <p className="text-purple-900 font-medium">
                            {booking.numberOfNights} คืน
                          </p>
                        </div>
                        <div>
                          <p className="text-purple-600/60 mb-1">จำนวนผู้เข้าพัก</p>
                          <p className="text-purple-900 font-medium">
                            {booking.numberOfGuests} คน
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-purple-100">
                        <div>
                          <span className="text-2xl font-light text-purple-600">
                            ฿{Number(booking.totalPrice).toLocaleString()}
                          </span>
                          <span className="text-sm text-purple-400 ml-1">
                            ทั้งหมด
                          </span>
                        </div>

                        {booking.status === 'confirmed' && canCancel(booking.checkInDate) && (
                          <button
                            onClick={() => cancelBooking(booking.id)}
                            className="px-6 py-2 border-2 border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300"
                          >
                            ยกเลิกการจอง
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-3xl shadow-lg">
                <svg
                  className="w-16 h-16 text-purple-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-purple-400 text-lg">
                  ไม่พบการจองด้วยอีเมลนี้
                </p>
              </div>
            )}
          </motion.div>
        )}
      </div>

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
