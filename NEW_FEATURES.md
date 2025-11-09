# 🎉 ฟีเจอร์ใหม่ - 77 จังหวัด, โลเคชั่นแนะนำ และโปรโมชั่น

## ✨ สรุปฟีเจอร์ที่เพิ่มใหม่

### 1. 🏙️ ระบบ 77 จังหวัด
- เพิ่ม Model `Province` ในฐานข้อมูล
- ข้อมูลครบทั้ง 77 จังหวัดแบ่งตามภูมิภาค
  - ภาคเหนือ: 17 จังหวัด
  - ภาคใต้: 14 จังหวัด
  - ภาคอีสาน: 20 จังหวัด
  - ภาคกลาง: 26 จังหวัด

### 2. ⭐ โลเคชั่นแนะนำ (Featured Accommodations)
- เพิ่มฟิลด์ `isFeatured` ในตารางที่พัก
- เพิ่มฟิลด์ `rating` สำหรับคะแนนรีวิว (0.00-5.00)
- การเรียงลำดับแสดงที่พักแนะนำก่อน

### 3. 🎁 ระบบโปรโมชั่นตามเทศกาล
- เพิ่ม Model `Promotion` และ `AccommodationPromotion`
- โปรโมชั่นตามเทศกาล 5 แคมเปญ:
  1. **ปีใหม่ 2026** - ลด 20% (25 ธ.ค. - 5 ม.ค.)
  2. **สงกรานต์ 2026** - ลด 25% (10-18 เม.ย.)
  3. **ลอยกระทง 2026** - ลด 15% (13-16 พ.ย.)
  4. **ฤดูร้อน 2026** - ลดสูงสุด 30% (มี.ค.-พ.ค.)
  5. **หน้าหนาว 2026** - ลด 15% (พ.ย.-ก.พ.)

---

## 📊 โครงสร้าง Database ใหม่

### Model: Province
```prisma
model Province {
  id          Int       @id @default(autoincrement())
  name        String    @unique
  slug        String    @unique
  regionId    Int
  description String?
  imageUrl    String?

  region         Region
  accommodations Accommodation[]
}
```

### Model: Accommodation (อัปเดต)
```prisma
model Accommodation {
  // ... ฟิลด์เดิม
  provinceId  Int?      // เพิ่ม
  isFeatured  Boolean   @default(false) // เพิ่ม
  rating      Decimal?  // เพิ่ม

  province    Province?
  promotions  AccommodationPromotion[] // เพิ่ม
}
```

### Model: Promotion
```prisma
model Promotion {
  id            Int     @id
  name          String
  slug          String  @unique
  description   String
  discountType  String  // percentage, fixed
  discountValue Decimal
  startDate     DateTime
  endDate       DateTime
  season        String?
  isActive      Boolean
  minNights     Int?

  accommodations AccommodationPromotion[]
}
```

---

## 🚀 API Endpoints ใหม่

### 1. GET /api/provinces
ดึงข้อมูลจังหวัดทั้งหมด

**Query Parameters:**
- `regionId` - กรองตามภูมิภาค (ID)
- `regionSlug` - กรองตามภูมิภาค (slug)

**ตัวอย่าง:**
```bash
GET /api/provinces?regionSlug=north
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "เชียงใหม่",
      "slug": "chiang-mai",
      "region": { ... },
      "_count": {
        "accommodations": 5
      }
    }
  ],
  "count": 17
}
```

### 2. GET /api/promotions
ดึงข้อมูลโปรโมชั่นที่ใช้งานได้ในปัจจุบัน

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "ลดพิเศษปีใหม่ 2026",
      "discountType": "percentage",
      "discountValue": 20,
      "season": "ปีใหม่",
      "minNights": 3
    }
  ]
}
```

### 3. GET /api/accommodations (อัปเดต)
เพิ่ม Query Parameters ใหม่:

- `provinceId` - กรองตามจังหวัด (ID)
- `provinceSlug` - กรองตามจังหวัด (slug)
- `featured=true` - แสดงเฉพาะที่พักแนะนำ

**ตัวอย่าง:**
```bash
# ดูที่พักแนะนำทั้งหมด
GET /api/accommodations?featured=true

# ดูที่พักในเชียงใหม่
GET /api/accommodations?provinceSlug=chiang-mai

# ดูที่พักในภาคเหนือที่แนะนำ
GET /api/accommodations?regionSlug=north&featured=true
```

---

## 🗂️ ไฟล์ที่สร้าง/แก้ไข

### ไฟล์ใหม่:
1. `prisma/provinces-data.js` - ข้อมูล 77 จังหวัด
2. `prisma/seed-full.js` - Seed script ฉบับเต็ม
3. `app/api/provinces/route.js` - API จังหวัด
4. `app/api/promotions/route.js` - API โปรโมชั่น

### ไฟล์ที่แก้ไข:
1. `prisma/schema.prisma` - เพิ่ม Province, Promotion models
2. `app/api/accommodations/route.js` - เพิ่ม filters ใหม่

### Migration:
- `20251015103357_add_provinces_and_promotions`

---

## 📝 วิธีใช้งาน

### 1. รัน Migration และ Seed
```bash
# Migration ถูกรันไปแล้ว แต่ถ้าต้องการรันใหม่:
npm run prisma:migrate

# Seed ข้อมูล 77 จังหวัด + โปรโมชั่น
node prisma/seed-full.js
```

### 2. เริ่มเซิร์ฟเวอร์
```bash
npm run dev
```

### 3. ทดสอบ API

```bash
# ดูจังหวัดทั้งหมด
curl http://localhost:3000/api/provinces

# ดูจังหวัดในภาคเหนือ
curl "http://localhost:3000/api/provinces?regionSlug=north"

# ดูโปรโมชั่นปัจจุบัน
curl http://localhost:3000/api/promotions

# ดูที่พักแนะนำ
curl "http://localhost:3000/api/accommodations?featured=true"

# ดูที่พักในเชียงใหม่
curl "http://localhost:3000/api/accommodations?provinceSlug=chiang-mai"
```

---

## 💡 ตัวอย่างการใช้งานในหน้าเว็บ

### 1. แสดงโปรโมชั่นในหน้าแรก
```javascript
const [promotions, setPromotions] = useState([]);

useEffect(() => {
  fetch('/api/promotions')
    .then(res => res.json())
    .then(data => setPromotions(data.data));
}, []);

// แสดง Banner โปรโมชั่น
{promotions.map(promo => (
  <PromotionBanner
    key={promo.id}
    title={promo.name}
    discount={promo.discountValue}
    type={promo.discountType}
    season={promo.season}
  />
))}
```

### 2. แสดงที่พักแนะนำ
```javascript
const [featured, setFeatured] = useState([]);

useEffect(() => {
  fetch('/api/accommodations?featured=true')
    .then(res => res.json())
    .then(data => setFeatured(data.data));
}, []);

// แสดง Section ที่พักแนะนำ
<section>
  <h2>⭐ โลเคชั่นแนะนำ</h2>
  {featured.map(acc => (
    <AccommodationCard
      key={acc.id}
      {...acc}
      rating={acc.rating}
      province={acc.province?.name}
    />
  ))}
</section>
```

### 3. ตัวกรองจังหวัด
```javascript
const [provinces, setProvinces] = useState([]);
const [selected, setSelected] = useState(null);

useEffect(() => {
  fetch('/api/provinces?regionSlug=north')
    .then(res => res.json())
    .then(data => setProvinces(data.data));
}, []);

// Dropdown เลือกจังหวัด
<select onChange={(e) => setSelected(e.target.value)}>
  <option value="">ทุกจังหวัด</option>
  {provinces.map(p => (
    <option key={p.id} value={p.slug}>
      {p.name} ({p._count.accommodations})
    </option>
  ))}
</select>
```

---

## 🎯 Use Cases

### 1. ค้นหาที่พักตามจังหวัด
```
หน้าแรก → เลือกภาคเหนือ → เลือกเชียงใหม่ → แสดงที่พักในเชียงใหม่
```

### 2. ดูที่พักแนะนำ
```
หน้าแรก → Section "โลเคชั่นแนะนำ" → คลิกดูรายละเอียด
```

### 3. ใช้โปรโมชั่น
```
หน้าแรก → เห็น Banner โปรโมชั่นสงกรานต์ ลด 25%
→ คลิกดูที่พักที่เข้าร่วม → จองและรับส่วนลด
```

---

## 📈 สถิติข้อมูลในระบบ

✅ **77 จังหวัด** แบ่งเป็น:
- ภาคเหนือ: 17 จังหวัด
- ภาคใต้: 14 จังหวัด
- ภาคอีสาน: 20 จังหวัด
- ภาคกลาง: 26 จังหวัด

✅ **5 โปรโมชั่น** ตามเทศกาล:
- ปีใหม่ (ลด 20%)
- สงกรานต์ (ลด 25%)
- ลอยกระทง (ลด 15%)
- ฤดูร้อน (ลดสูงสุด 30%)
- หน้าหนาว (ลด 15%)

✅ **5 ที่พักแนะนำ** (Featured):
- คะแนนรีวิว 4.6-4.9 ⭐
- กระจายทั่วทุกภูมิภาค

---

## 🔄 ขั้นตอนต่อไป (TODO)

### หน้าเว็บที่ควรเพิ่ม:
1. **หน้าเลือกจังหวัด** (`/provinces`)
   - แสดง 77 จังหวัดทั้งหมด
   - คลิกเพื่อดูที่พักในจังหวัดนั้น

2. **Section โลเคชั่นแนะนำ** (ในหน้าแรก)
   - แสดงที่พัก Featured 5-10 อันดับแรก
   - มี Badge "⭐ แนะนำ"

3. **Banner โปรโมชั่น** (ในหน้าแรก)
   - แสดงโปรโมชั่นที่ใช้ได้ในปัจจุบัน
   - Auto-update ตามวันที่

4. **หน้ารายการจังหวัด** (`/province/[slug]`)
   - แสดงที่พักในจังหวัดที่เลือก
   - มีข้อมูลสถิติจำนวนที่พัก

### Components ที่ควรสร้าง:
- `<ProvinceSelector />` - Dropdown เลือกจังหวัด
- `<PromotionBanner />` - แสดงโปรโมชั่น
- `<FeaturedCard />` - การ์ดที่พักแนะนำ
- `<RatingStars />` - แสดงคะแนนรีวิว

---

## 🎨 UI/UX Suggestions

### โปรโมชั่น Banner:
```
┌─────────────────────────────────────────┐
│ 🎉 สงกรานต์นี้ ลดสูงสุด 25%!           │
│ พักยาว คุ้มกว่า | จอง 2 คืนขึ้นไป      │
│ [ดูที่พักที่เข้าร่วม →]                 │
└─────────────────────────────────────────┘
```

### โลเคชั่นแนะนำ Section:
```
⭐ โลเคชั่นแนะนำ
────────────────────────────────
[รูปภาพ]  รีสอร์ทบนดอย      ⭐ 4.8
          เชียงใหม่
          ฿3,500/คืน  [จองเลย →]

[รูปภาพ]  วิลล่าริมทะเล     ⭐ 4.9
          ภูเก็ต
          ฿8,500/คืน  [จองเลย →]
```

### ตัวกรองจังหวัด:
```
ค้นหาตามจังหวัด: [เลือกจังหวัด ▼]
├── ภาคเหนือ
│   ├── เชียงใหม่ (5)
│   ├── เชียงราย (3)
│   └── ...
├── ภาคใต้
│   ├── ภูเก็ต (8)
│   └── ...
```

---

## 🚀 สรุป

ระบบตอนนี้พร้อมรองรับ:
✅ ค้นหาที่พักตามจังหวัด (77 จังหวัด)
✅ แสดงที่พักแนะนำ (Featured)
✅ โปรโมชั่นตามเทศกาล (5 แคมเปญ)
✅ คะแนนรีวิว (Rating System)
✅ API ครบถ้วนพร้อมใช้งาน

**ต้องการแค่สร้างหน้าเว็บเพิ่มเติมเพื่อแสดงฟีเจอร์เหล่านี้!** 🎉
