'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('accommodations');
  const [accommodations, setAccommodations] = useState([]);
  const [regions, setRegions] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    shortDesc: '',
    regionId: '',
    pricePerNight: '',
    maxGuests: '',
    address: '',
    amenities: '',
    images: '',
  });

  useEffect(() => {
    // Check authentication
    const auth = sessionStorage.getItem('isAdminAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
      setLoading(false);
      fetchRegions();
      fetchAccommodations();
      fetchBookings();
    } else {
      router.push('/admin/login');
    }
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
    }
  };

  const fetchAccommodations = async () => {
    setDataLoading(true);
    try {
      const response = await fetch('/api/accommodations');
      const data = await response.json();
      if (data.success) {
        setAccommodations(data.data);
      }
    } catch (error) {
      console.error('Error fetching accommodations:', error);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    sessionStorage.removeItem('adminUser');
    router.push('/');
  };

  const fetchBookings = async () => {
    try {
      const response = await fetch('/api/bookings');
      const data = await response.json();
      if (data.success) {
        setBookings(data.data);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDataLoading(true);

    try {
      const amenitiesArray = formData.amenities
        .split(',')
        .map((a) => a.trim())
        .filter((a) => a);
      const imagesArray = formData.images
        .split(',')
        .map((i) => i.trim())
        .filter((i) => i);

      const response = await fetch('/api/accommodations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          regionId: parseInt(formData.regionId),
          pricePerNight: parseFloat(formData.pricePerNight),
          maxGuests: parseInt(formData.maxGuests),
          amenities: amenitiesArray,
          images: imagesArray,
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('เพิ่มที่พักสำเร็จ!');
        setShowForm(false);
        setFormData({
          name: '',
          slug: '',
          description: '',
          shortDesc: '',
          regionId: '',
          pricePerNight: '',
          maxGuests: '',
          address: '',
          amenities: '',
          images: '',
        });
        fetchAccommodations();
      } else {
        alert(data.message || 'เกิดข้อผิดพลาด');
      }
    } catch (error) {
      console.error('Error creating accommodation:', error);
      alert('เกิดข้อผิดพลาดในการเพิ่มที่พัก');
    } finally {
      setDataLoading(false);
    }
  };

  const deleteAccommodation = async (slug) => {
    if (!confirm('คุณแน่ใจหรือไม่ว่าต้องการลบที่พักนี้?')) {
      return;
    }

    try {
      const response = await fetch(`/api/accommodations/${slug}`, {
        method: 'DELETE',
      });
      const data = await response.json();

      if (data.success) {
        alert('ลบที่พักสำเร็จ');
        fetchAccommodations();
      } else {
        alert(data.message || 'ไม่สามารถลบที่พักได้');
      }
    } catch (error) {
      console.error('Error deleting accommodation:', error);
      alert('เกิดข้อผิดพลาดในการลบที่พัก');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-purple-600">กำลังตรวจสอบสิทธิ์...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

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
            <nav className="flex gap-6 items-center">
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
              <span className="text-purple-800 font-medium">
                Admin
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-purple-100 text-purple-600 rounded-xl hover:bg-purple-200 transition-all duration-300"
              >
                ออกจากระบบ
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-4xl font-light text-purple-900 mb-3">
            Admin Dashboard
          </h2>
          <p className="text-purple-600/70">
            จัดการที่พักและการจอง
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('accommodations')}
            className={`px-6 py-3 rounded-2xl font-light transition-all duration-300 ${
              activeTab === 'accommodations'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                : 'bg-white text-purple-600 hover:bg-purple-50'
            }`}
          >
            จัดการที่พัก ({accommodations.length})
          </button>
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-6 py-3 rounded-2xl font-light transition-all duration-300 ${
              activeTab === 'bookings'
                ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                : 'bg-white text-purple-600 hover:bg-purple-50'
            }`}
          >
            รายการจอง ({bookings.length})
          </button>
        </div>

        {/* Accommodations Tab */}
        {activeTab === 'accommodations' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Add Button */}
            <div className="flex justify-end">
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg"
              >
                {showForm ? 'ปิดฟอร์ม' : '+ เพิ่มที่พักใหม่'}
              </button>
            </div>

            {/* Add Form */}
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <h3 className="text-2xl font-light text-purple-900 mb-6">
                  เพิ่มที่พักใหม่
                </h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-2">
                        ชื่อที่พัก *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-2">
                        Slug (URL) *
                      </label>
                      <input
                        type="text"
                        value={formData.slug}
                        onChange={(e) =>
                          setFormData({ ...formData, slug: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-purple-700 mb-2">
                        คำอธิบายสั้น *
                      </label>
                      <input
                        type="text"
                        value={formData.shortDesc}
                        onChange={(e) =>
                          setFormData({ ...formData, shortDesc: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-purple-700 mb-2">
                        คำอธิบายเต็ม *
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({ ...formData, description: e.target.value })
                        }
                        required
                        rows={4}
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-2">
                        ภูมิภาค *
                      </label>
                      <select
                        value={formData.regionId}
                        onChange={(e) =>
                          setFormData({ ...formData, regionId: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none"
                      >
                        <option value="">เลือกภูมิภาค</option>
                        {regions.map((region) => (
                          <option key={region.id} value={region.id}>
                            {region.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-2">
                        ราคาต่อคืน (บาท) *
                      </label>
                      <input
                        type="number"
                        value={formData.pricePerNight}
                        onChange={(e) =>
                          setFormData({ ...formData, pricePerNight: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-purple-700 mb-2">
                        จำนวนผู้เข้าพักสูงสุด *
                      </label>
                      <input
                        type="number"
                        value={formData.maxGuests}
                        onChange={(e) =>
                          setFormData({ ...formData, maxGuests: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-purple-700 mb-2">
                        ที่อยู่ *
                      </label>
                      <input
                        type="text"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        required
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-purple-700 mb-2">
                        สิ่งอำนวยความสะดวก (แยกด้วย , )
                      </label>
                      <input
                        type="text"
                        value={formData.amenities}
                        onChange={(e) =>
                          setFormData({ ...formData, amenities: e.target.value })
                        }
                        placeholder="WiFi, แอร์, ทีวี, ตู้เย็น"
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-purple-700 mb-2">
                        รูปภาพ URLs (แยกด้วย , )
                      </label>
                      <input
                        type="text"
                        value={formData.images}
                        onChange={(e) =>
                          setFormData({ ...formData, images: e.target.value })
                        }
                        placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                        className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 px-6 py-3 border-2 border-purple-200 text-purple-600 rounded-2xl hover:bg-purple-50 transition-all"
                    >
                      ยกเลิก
                    </button>
                    <button
                      type="submit"
                      disabled={dataLoading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all disabled:opacity-50"
                    >
                      {dataLoading ? 'กำลังบันทึก...' : 'บันทึก'}
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Accommodations List */}
            <div className="grid grid-cols-1 gap-6">
              {accommodations.map((accommodation) => (
                <div
                  key={accommodation.id}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="md:flex">
                    <div className="md:w-48 h-48 bg-gradient-to-br from-purple-300 to-purple-500">
                      {accommodation.images && accommodation.images[0] && (
                        <img
                          src={accommodation.images[0]}
                          alt={accommodation.name}
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-xl font-light text-purple-900 mb-2">
                            {accommodation.name}
                          </h3>
                          <p className="text-purple-600/70 text-sm mb-3">
                            {accommodation.shortDesc}
                          </p>
                          <div className="flex gap-6 text-sm text-purple-600">
                            <span>฿{Number(accommodation.pricePerNight).toLocaleString()} / คืน</span>
                            <span>สูงสุด {accommodation.maxGuests} คน</span>
                            <span>{accommodation.region.name}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Link
                            href={`/accommodation/${accommodation.slug}`}
                            className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-xl transition-all"
                          >
                            ดู
                          </Link>
                          <button
                            onClick={() => deleteAccommodation(accommodation.slug)}
                            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                          >
                            ลบ
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-3xl shadow-lg p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-light text-purple-900 mb-1">
                      {booking.accommodation.name}
                    </h3>
                    <p className="text-purple-600/70 text-sm">
                      เลขที่จอง: {booking.bookingNumber}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : booking.status === 'cancelled'
                        ? 'bg-red-100 text-red-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {booking.status === 'confirmed'
                      ? 'ยืนยันแล้ว'
                      : booking.status === 'cancelled'
                      ? 'ยกเลิกแล้ว'
                      : 'เสร็จสิ้น'}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-purple-600/60 mb-1">ผู้จอง</p>
                    <p className="text-purple-900">{booking.customer.fullName}</p>
                    <p className="text-purple-600/70">{booking.customer.email}</p>
                  </div>
                  <div>
                    <p className="text-purple-600/60 mb-1">เข้าพัก - ออก</p>
                    <p className="text-purple-900">
                      {new Date(booking.checkInDate).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'short',
                      })}{' '}
                      -{' '}
                      {new Date(booking.checkOutDate).toLocaleDateString('th-TH', {
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-purple-600/60 mb-1">จำนวน</p>
                    <p className="text-purple-900">
                      {booking.numberOfGuests} คน • {booking.numberOfNights} คืน
                    </p>
                  </div>
                  <div>
                    <p className="text-purple-600/60 mb-1">ราคารวม</p>
                    <p className="text-purple-900 font-medium">
                      ฿{Number(booking.totalPrice).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
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
