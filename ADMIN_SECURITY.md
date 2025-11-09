# 🔐 ระบบรักษาความปลอดภัย Admin

## การแก้ไขที่ทำ

### ✅ 1. เพิ่มหน้า Login สำหรับ Admin
- สร้างหน้า `/admin/login` สำหรับ Admin เข้าสู่ระบบ
- ใช้ sessionStorage เก็บสถานะการ login
- ออกแบบสไตล์มินิมอลสีม่วง-ขาว

**ตำแหน่งไฟล์:** `app/admin/login/page.js`

### ✅ 2. ป้องกันหน้า Admin
- เพิ่มการตรวจสอบ authentication ก่อนเข้าหน้า Admin
- Redirect ไปหน้า login หากไม่ได้ login
- แสดง loading spinner ขณะตรวจสอบสิทธิ์

**ตำแหน่งไฟล์:** `app/admin/page.js`

### ✅ 3. ลบลิงก์ Admin จาก Navigation สาธารณะ
- ลบลิงก์ "Admin" ออกจาก navigation bar ในหน้าสาธารณะ
- เหลือเฉพาะ: หน้าแรก | การจองของฉัน

**ไฟล์ที่แก้ไข:**
- `app/page.js` - หน้าแรก
- `app/region/[slug]/page.js` - หน้ารายการที่พัก
- `app/accommodation/[slug]/page.js` - หน้ารายละเอียด
- `app/dashboard/page.js` - หน้า Dashboard

### ✅ 4. เพิ่มปุ่ม Logout
- เพิ่มปุ่ม "ออกจากระบบ" ในหน้า Admin
- ลบ session และ redirect กลับหน้าแรก

---

## 🔑 ข้อมูล Login (สำหรับทดสอบ)

```
ชื่อผู้ใช้: admin
รหัสผ่าน: admin123
```

---

## 🚀 วิธีใช้งาน

### สำหรับผู้ใช้ทั่วไป:
1. เปิดเว็บไซต์ที่ http://localhost:3000
2. เลือกภูมิภาคและที่พักที่ต้องการ
3. กดปุ่ม "จองเลย" เพื่อจองที่พัก
4. ดูการจองที่หน้า "การจองของฉัน"

### สำหรับ Admin:
1. เข้าสู่ระบบที่ http://localhost:3000/admin/login
2. กรอก username: `admin` และ password: `admin123`
3. จัดการที่พักและดูรายการจอง
4. คลิก "ออกจากระบบ" เมื่อเสร็จสิ้น

---

## 🛡️ ระบบรักษาความปลอดภัย

### Client-Side Protection:
- ✅ ตรวจสอบ sessionStorage ก่อนเข้าหน้า Admin
- ✅ Auto-redirect ไปหน้า login หากไม่มีสิทธิ์
- ✅ ซ่อนลิงก์ Admin จาก navigation สาธารณะ

### Session Management:
- ใช้ sessionStorage (ข้อมูลจะหายเมื่อปิด tab/browser)
- เก็บสถานะ: `isAdminAuthenticated` และ `adminUser`

---

## ⚠️ สำคัญ: สำหรับ Production

การป้องกันปัจจุบันเป็นแบบ **Client-Side เท่านั้น**

สำหรับ Production ควรเพิ่ม:

### 1. Backend Authentication
```javascript
// ใช้ JWT หรือ Session-based authentication
// เช่น NextAuth.js, Auth0, หรือ Custom JWT
```

### 2. API Route Protection
```javascript
// เพิ่ม middleware ในทุก API route ที่ต้องการป้องกัน
export async function POST(request) {
  // ตรวจสอบ token/session
  const session = await getServerSession(authOptions);
  if (!session || session.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  // ... rest of code
}
```

### 3. Database User Management
```prisma
model Admin {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String // Hash with bcrypt
  email    String @unique
  role     String @default("admin")
}
```

### 4. Environment Variables
```env
ADMIN_USERNAME=your_secure_username
ADMIN_PASSWORD=your_hashed_password
JWT_SECRET=your_jwt_secret_key
```

### 5. Rate Limiting
- จำกัดจำนวนครั้งในการ login
- ป้องกัน brute force attack

### 6. HTTPS
- ใช้ HTTPS ในการ deploy
- Secure cookies

---

## 📝 โครงสร้างการเข้าถึง

```
┌─────────────────────────────────────────┐
│         เว็บไซต์จองที่พัก                │
└─────────────────────────────────────────┘
          │
          ├─── สาธารณะ (Public)
          │    ├─ หน้าแรก (/)
          │    ├─ รายการที่พัก (/region/[slug])
          │    ├─ รายละเอียดที่พัก (/accommodation/[slug])
          │    └─ Dashboard ผู้ใช้ (/dashboard)
          │
          └─── Admin (Protected)
               ├─ หน้า Login (/admin/login)
               └─ Dashboard Admin (/admin) 🔒
                  ├─ จัดการที่พัก
                  └─ ดูรายการจอง
```

---

## ✨ Features

### ผู้ใช้ทั่วไป:
- ✅ เลือกและจองที่พักได้อย่างสะดวก
- ✅ ดูรายการจองของตัวเองผ่านอีเมล
- ✅ ยกเลิกการจอง (ตามเงื่อนไข)

### Admin:
- ✅ จัดการที่พัก (เพิ่ม/ลบ/แก้ไข)
- ✅ ดูรายการจองทั้งหมด
- ✅ ตรวจสอบข้อมูลลูกค้า
- ✅ จัดการสถานะการจอง

---

## 🔄 Flow การ Login

```
1. User → /admin
   ↓
2. ตรวจสอบ sessionStorage
   ↓
3. ไม่มี session? → Redirect to /admin/login
   ↓
4. กรอก username & password
   ↓
5. ตรวจสอบข้อมูล
   ↓
6. ✅ ถูกต้อง → บันทึก session → /admin
   ❌ ไม่ถูกต้อง → แสดงข้อความ error
```

---

## 🎯 สรุป

✅ **แยกสิทธิ์การเข้าถึงชัดเจน**
- ผู้ใช้ทั่วไป: จองที่พักเท่านั้น
- Admin: จัดการระบบทั้งหมด

✅ **ป้องกันหน้า Admin**
- ต้อง login ก่อนเข้าใช้งาน
- ลิงก์ซ่อนจากสายตาผู้ใช้ทั่วไป

✅ **UX/UI ที่ดี**
- หน้า login สวยงาม
- Loading state ชัดเจน
- ปุ่ม Logout พร้อมใช้งาน

---

**หมายเหตุ:** นี่เป็นระบบสำหรับ Development/Demo เท่านั้น
สำหรับ Production กรุณาใช้ระบบ authentication ที่แข็งแกร่งกว่า เช่น NextAuth.js
