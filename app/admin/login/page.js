'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simple authentication (in production, use proper auth)
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Set session
      sessionStorage.setItem('isAdminAuthenticated', 'true');
      sessionStorage.setItem('adminUser', credentials.username);

      // Redirect to admin dashboard
      router.push('/admin');
    } else {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-3xl font-light text-purple-600 mb-2 cursor-pointer hover:text-purple-800 transition-colors">
              จองที่พักออนไลน์
            </h1>
          </Link>
          <p className="text-purple-600/60">Admin Login</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <h2 className="text-2xl font-light text-purple-900 mb-6 text-center">
            เข้าสู่ระบบผู้ดูแล
          </h2>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-2xl text-sm mb-6"
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">
                ชื่อผู้ใช้
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) =>
                  setCredentials({ ...credentials, username: e.target.value })
                }
                required
                className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="กรอกชื่อผู้ใช้"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-700 mb-2">
                รหัสผ่าน
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
                required
                className="w-full px-4 py-3 border-2 border-purple-100 rounded-xl focus:border-purple-500 focus:outline-none transition-colors"
                placeholder="กรอกรหัสผ่าน"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed font-light text-lg"
            >
              {loading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-purple-500 hover:text-purple-700 text-sm transition-colors"
            >
              ← กลับสู่หน้าแรก
            </Link>
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-8 pt-6 border-t border-purple-100">
            <p className="text-xs text-purple-600/60 text-center mb-2">
              ข้อมูลสำหรับทดสอบ:
            </p>
            <div className="bg-purple-50 rounded-xl p-3 text-xs text-purple-700 space-y-1">
              <p>ชื่อผู้ใช้: <strong>admin</strong></p>
              <p>รหัสผ่าน: <strong>admin123</strong></p>
            </div>
          </div>
        </div>

        {/* Info */}
        <p className="text-center text-purple-600/60 text-sm mt-6">
          สำหรับผู้ดูแลระบบเท่านั้น
        </p>
      </motion.div>
    </div>
  );
}
