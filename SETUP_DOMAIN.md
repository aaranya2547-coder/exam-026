# การตั้งค่าโดเมน ExamHotel

## วิธีใช้งานชื่อโดเมน `examhotel` ในเครื่องของคุณ

### Windows

1. **เปิดไฟล์ hosts ด้วยสิทธิ์ Administrator:**
   - กด Windows + R
   - พิมพ์: `notepad C:\Windows\System32\drivers\etc\hosts`
   - คลิก "Run as administrator"

2. **เพิ่มบรรทัดนี้ลงในไฟล์:**
   ```
   127.0.0.1    examhotel
   127.0.0.1    www.examhotel
   ```

3. **บันทึกไฟล์และปิด Notepad**

4. **ล้าง DNS Cache:**
   - เปิด Command Prompt (Admin)
   - รันคำสั่ง:
     ```
     ipconfig /flushdns
     ```

5. **เข้าใช้งานเว็บไซต์:**
   - เปิดเบราว์เซอร์
   - ไปที่: `http://examhotel:3000`
   - หรือ: `http://www.examhotel:3000`

---

## การใช้งาน Next.js กับ Custom Domain

### วิธีที่ 1: ใช้ผ่าน Port 3000 (แนะนำสำหรับ Development)

```bash
# รันเซิร์ฟเวอร์
npm run dev

# เข้าใช้งานที่
http://examhotel:3000
```

### วิธีที่ 2: ใช้ Port 80 (ไม่ต้องระบุพอร์ต)

1. **สร้าง reverse proxy ด้วย nginx หรือ Apache** (ถ้ามีติดตั้ง)

2. **หรือใช้ package.json script:**

แก้ไข `package.json`:
```json
{
  "scripts": {
    "dev": "next dev",
    "dev:80": "next dev -p 80",
    "build": "next build",
    "start": "next start -p 80",
    "lint": "next lint"
  }
}
```

จากนั้นรัน:
```bash
# ต้องใช้สิทธิ์ Administrator
npm run dev:80
```

เข้าใช้งานที่: `http://examhotel`

---

## ตรวจสอบว่าตั้งค่าสำเร็จ

1. เปิด Command Prompt
2. รันคำสั่ง: `ping examhotel`
3. ควรเห็น IP: `127.0.0.1`

---

## API Endpoints

เมื่อตั้งค่าเรียบร้อยแล้ว สามารถเรียกใช้ API ผ่าน:

```
http://examhotel:3000/api/regions
http://examhotel:3000/api/provinces
http://examhotel:3000/api/accommodations
http://examhotel:3000/api/promotions
http://examhotel:3000/api/bookings
```

---

## การใช้งานใน Production

สำหรับการใช้งานจริง ควร:

1. **ซื้อโดเมน examhotel.com** จากผู้ให้บริการโดเมน
2. **ตั้งค่า DNS A Record** ชี้มา IP ของเซิร์ฟเวอร์
3. **ติดตั้ง SSL Certificate** (Let's Encrypt)
4. **ใช้ Reverse Proxy** (Nginx/Apache)
5. **Deploy บน VPS/Cloud** (AWS, Google Cloud, DigitalOcean)

---

## หมายเหตุ

- ไฟล์ hosts มีผลเฉพาะในเครื่องของคุณเท่านั้น
- ต้องมีสิทธิ์ Administrator ในการแก้ไขไฟล์ hosts
- หลังแก้ไขต้อง flush DNS cache ทุกครั้ง
- Port 80 ต้องใช้สิทธิ์ Administrator ในการรัน
