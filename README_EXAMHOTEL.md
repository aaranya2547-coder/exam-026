# 🏨 ExamHotel - คู่มือการใช้งาน

## เว็บไซต์จองที่พักออนไลน์สไตล์มินิมอล

---

## 🚀 วิธีเริ่มใช้งาน ExamHotel

### ขั้นตอนที่ 1: ตั้งค่า Hosts File (ทำครั้งเดียว)

**Windows:**
1. คลิกขวาที่ไฟล์ `setup-hosts.bat`
2. เลือก **"Run as administrator"**
3. รอจนขึ้นข้อความ "ติดตั้งเสร็จสมบูรณ์"

**หรือตั้งค่าด้วยตัวเอง:**
1. เปิด Notepad ด้วยสิทธิ์ Administrator
2. เปิดไฟล์: `C:\Windows\System32\drivers\etc\hosts`
3. เพิ่มบรรทัดนี้ลงท้ายไฟล์:
   ```
   127.0.0.1    examhotel
   127.0.0.1    www.examhotel
   ```
4. บันทึกและปิดไฟล์
5. เปิด Command Prompt (Admin) และรัน:
   ```
   ipconfig /flushdns
   ```

---

### ขั้นตอนที่ 2: เริ่มเซิร์ฟเวอร์

**วิธีที่ 1: ใช้ไฟล์ Batch (แนะนำ)**
1. คลิกขวาที่ไฟล์ `START_EXAMHOTEL.bat`
2. เลือก **"Run as administrator"**
3. เซิร์ฟเวอร์จะรันบน port 80

**วิธีที่ 2: ใช้ Command Line**
```bash
# เปิด Command Prompt/PowerShell ด้วยสิทธิ์ Administrator
cd C:\Users\Admin\exam-claude
npm run dev:80
```

---

### ขั้นตอนที่ 3: เข้าใช้งานเว็บไซต์

เปิดเบราว์เซอร์และไปที่:
- **http://examhotel** ✨ (แนะนำ)
- http://www.examhotel
- http://localhost

---

## 📋 คำสั่งที่มีให้ใช้งาน

### Development (Port 3000)
```bash
npm run dev                 # รันบน http://localhost:3000
```

### Development (Port 80 - ต้องสิทธิ์ Admin)
```bash
npm run dev:80             # รันบน http://localhost (port 80)
npm run dev:examhotel      # รันบน http://examhotel (port 80)
```

### Production
```bash
npm run build              # Build โปรเจค
npm run start              # รันบน port 3000
npm run start:80           # รันบน port 80 (ต้องสิทธิ์ Admin)
```

### Database
```bash
npm run prisma:studio      # เปิด Prisma Studio (http://localhost:5555)
npm run prisma:generate    # Generate Prisma Client
npm run prisma:migrate     # Run database migrations
npm run prisma:seed        # เพิ่มข้อมูลตัวอย่าง
```

### API Server (Express)
```bash
npm run server             # รัน Express server
npm run server:dev         # รัน Express server (auto-reload)
```

---

## 🌐 URL ที่สามารถเข้าได้

### หน้าหลัก
- **http://examhotel** - หน้าแรก
- **http://examhotel/provinces** - 77 จังหวัด
- **http://examhotel/accommodations** - ที่พักทั้งหมด
- **http://examhotel/dashboard** - การจองของฉัน
- **http://examhotel/admin/login** - เข้าสู่ระบบแอดมิน

### API Endpoints
- **http://examhotel/api/regions** - ภูมิภาคทั้งหมด
- **http://examhotel/api/provinces** - จังหวัดทั้งหมด
- **http://examhotel/api/accommodations** - ที่พักทั้งหมด
- **http://examhotel/api/promotions** - โปรโมชั่น
- **http://examhotel/api/bookings** - การจอง

### ตัวอย่าง URL ที่พักตามจังหวัด
- **http://examhotel/accommodations?provinceSlug=chiang-mai** - ที่พักในเชียงใหม่
- **http://examhotel/accommodations?provinceSlug=bangkok** - ที่พักในกรุงเทพฯ
- **http://examhotel/accommodations?regionSlug=north** - ที่พักภาคเหนือ
- **http://examhotel/accommodations?regionSlug=central** - ที่พักภาคกลาง

---

## 🔐 ข้อมูลเข้าสู่ระบบ

### Admin
- **URL:** http://examhotel/admin/login
- **Username:** admin
- **Password:** admin123

### Prisma Studio
- **URL:** http://localhost:5555

---

## 📊 ข้อมูลในระบบ

### ภูมิภาค (Regions)
- ภาคเหนือ - 17 จังหวัด, 21 ที่พัก
- ภาคใต้ - 14 จังหวัด, 3 ที่พัก
- ภาคอีสาน - 20 จังหวัด, 0 ที่พัก
- ภาคกลาง - 26 จังหวัด, 32 ที่พัก

### จังหวัด (Provinces)
- ทั้งหมด: **77 จังหวัด**

### ที่พัก (Accommodations)
- ทั้งหมด: **56 ที่พัก**
- ที่พักแนะนำ (Featured): **12 ที่พัก**
- ราคาเริ่มต้น: **800 บาท/คืน**
- คะแนนเฉลี่ย: **4.3 ⭐**

---

## 🎨 ฟีเจอร์หลัก

### 1. หน้าแรก
- แสดงโปรโมชั่นตามเทศกาล
- ที่พักแนะนำ (Featured)
- เลือกภูมิภาค
- ลิงก์เข้า 77 จังหวัด

### 2. หน้า 77 จังหวัด
- กรองตามภูมิภาค
- แสดงจำนวนที่พักในแต่ละจังหวัด
- คลิกดูที่พักในจังหวัดนั้นทันที

### 3. หน้าที่พัก
- กรองตามภูมิภาค
- กรองตามจังหวัด
- แสดงคะแนนรีวิว ⭐
- แบดจ์ "แนะนำ" สำหรับที่พักคุณภาพ
- ปุ่มจองเลย
- ปุ่มดูรายละเอียด

### 4. หน้ารายละเอียดที่พัก
- รูปภาพแกลเลอรี
- รายละเอียดครบถ้วน
- สิ่งอำนวยความสะดวก
- แผนที่
- ฟอร์มจอง

### 5. การจอง
- ระบบตรวจสอบวันว่าง
- ต้องจองล่วงหน้าอย่างน้อย 2 เดือน
- คำนวณราคาอัตโนมัติ
- ยกเลิกได้ (ก่อน 2 เดือน)

### 6. แดชบอร์ด
- ดูการจองของตัวเอง
- ยกเลิกการจอง

### 7. Admin Panel
- จัดการที่พัก
- ดูการจองทั้งหมด
- สถิติการจอง

---

## 🛠️ เทคโนโลยีที่ใช้

- **Frontend:** Next.js 15, React 19, Tailwind CSS 4
- **Backend:** Next.js API Routes, Express.js
- **Database:** MySQL, Prisma ORM
- **Animation:** Framer Motion
- **Styling:** Tailwind CSS (Purple-White Theme)

---

## 📝 โครงสร้างโปรเจค

```
exam-claude/
├── app/                          # Next.js App Router
│   ├── page.js                   # หน้าแรก
│   ├── provinces/page.js         # 77 จังหวัด
│   ├── accommodations/page.js    # ที่พักทั้งหมด
│   ├── accommodation/[slug]/     # รายละเอียดที่พัก
│   ├── dashboard/page.js         # การจองของฉัน
│   ├── admin/                    # แอดมิน
│   │   ├── login/page.js
│   │   └── page.js
│   └── api/                      # API Routes
│       ├── regions/
│       ├── provinces/
│       ├── accommodations/
│       ├── promotions/
│       └── bookings/
├── components/                   # React Components
│   ├── BookingModal.js
│   ├── RatingStars.js
│   └── PromotionBanner.js
├── prisma/                       # Database
│   ├── schema.prisma
│   ├── provinces-data.js
│   ├── seed.js
│   └── seed-accommodations.js
├── lib/
│   └── prisma-client.js
├── setup-hosts.bat              # ตั้งค่า hosts file
├── START_EXAMHOTEL.bat          # เริ่มเซิร์ฟเวอร์
└── test-api.js                  # ทดสอบ API

---

## 🐛 แก้ปัญหา

### Port 80 ถูกใช้งานอยู่
```bash
# ตรวจสอบว่าโปรแกรมไหนใช้ port 80
netstat -ano | findstr :80

# ปิดโปรแกรมที่ใช้ port 80 (Skype, IIS, Apache, etc.)
```

### ไม่สามารถเข้า http://examhotel ได้
1. ตรวจสอบว่าเพิ่ม examhotel ใน hosts file แล้ว
2. ล้าง DNS Cache: `ipconfig /flushdns`
3. ลอง ping: `ping examhotel` (ควรได้ 127.0.0.1)
4. ปิดเบราว์เซอร์และเปิดใหม่

### ข้อผิดพลาด "EACCES" หรือ "Permission denied"
- ต้องรัน Command Prompt/PowerShell ด้วยสิทธิ์ Administrator
- คลิกขวา > Run as administrator

### Database Error
```bash
# Generate Prisma Client ใหม่
npm run prisma:generate

# รัน migrations
npm run prisma:migrate

# Seed ข้อมูลใหม่
npm run prisma:seed
```

---

## 📧 สนับสนุน

หากพบปัญหาหรือต้องการความช่วยเหลือ:
1. ตรวจสอบ `API_TEST_REPORT.md` สำหรับรายละเอียด API
2. ตรวจสอบ `SETUP_DOMAIN.md` สำหรับการตั้งค่าโดเมน
3. เช็ค Console logs ในเบราว์เซอร์
4. เช็ค Terminal logs ของเซิร์ฟเวอร์

---

## 🎉 เริ่มต้นใช้งาน

1. ✅ รัน `setup-hosts.bat` (Admin)
2. ✅ รัน `START_EXAMHOTEL.bat` (Admin)
3. ✅ เปิดเบราว์เซอร์ไปที่ **http://examhotel**
4. 🎊 เริ่มจองที่พักได้เลย!

---

**ExamHotel** - จองที่พักออนไลน์ สะดวก รวดเร็ว ง่ายดาย
© 2024 ExamHotel Team
