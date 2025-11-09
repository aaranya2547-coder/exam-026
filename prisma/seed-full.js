const { PrismaClient } = require('../app/generated/prisma');
const provincesData = require('./provinces-data');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 เริ่มต้น seeding database (Full Version)...');

  // 1. Create Regions
  console.log('📍 สร้างข้อมูลภูมิภาค...');
  const regionMap = {};

  const regions = [
    {
      name: 'ภาคเหนือ',
      slug: 'north',
      description: 'สัมผัสบรรยากาศหนาวเย็น ธรรมชาติสวยงาม',
      imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4',
    },
    {
      name: 'ภาคใต้',
      slug: 'south',
      description: 'ทะเลสวย หาดทราย เกาะน้อยใหญ่',
      imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19',
    },
    {
      name: 'ภาคอีสาน',
      slug: 'northeast',
      description: 'วัฒนธรรมอีสาน อาหารรสจัดจ้าน',
      imageUrl: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
    },
    {
      name: 'ภาคกลาง',
      slug: 'central',
      description: 'ใจกลางเมือง สะดวกสบาย',
      imageUrl: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b',
    },
  ];

  for (const region of regions) {
    const created = await prisma.region.upsert({
      where: { slug: region.slug },
      update: {},
      create: region,
    });
    regionMap[region.slug] = created.id;
  }

  console.log('✅ สร้างภูมิภาคเรียบร้อย:', regions.length, 'ภูมิภาค');

  // 2. Create 77 Provinces
  console.log('🏙️ สร้างข้อมูล 77 จังหวัด...');
  const provinceMap = {};
  let provinceCount = 0;

  for (const [regionSlug, provinces] of Object.entries(provincesData)) {
    for (const province of provinces) {
      const created = await prisma.province.upsert({
        where: { slug: province.slug },
        update: {},
        create: {
          name: province.name,
          slug: province.slug,
          regionId: regionMap[regionSlug],
          description: `ที่พักและแหล่งท่องเที่ยวใน${province.name}`,
        },
      });
      provinceMap[province.slug] = created.id;
      provinceCount++;
    }
  }

  console.log('✅ สร้างจังหวัดเรียบร้อย:', provinceCount, 'จังหวัด');

  // 3. Create Promotions (โปรโมชั่นตามเทศกาล)
  console.log('🎉 สร้างโปรโมชั่นตามเทศกาล...');

  const promotions = [
    {
      name: 'ลดพิเศษปีใหม่ 2026',
      slug: 'new-year-2026',
      description: 'ฉลองปีใหม่ด้วยส่วนลดพิเศษ 20% สำหรับการจอง 3 คืนขึ้นไป',
      discountType: 'percentage',
      discountValue: 20,
      startDate: new Date('2025-12-25'),
      endDate: new Date('2026-01-05'),
      season: 'ปีใหม่',
      minNights: 3,
    },
    {
      name: 'สงกรานต์ 2026 สุดคุ้ม',
      slug: 'songkran-2026',
      description: 'ส่วนลด 25% สำหรับเทศกาลสงกรานต์ พักยาวคุ้มกว่า',
      discountType: 'percentage',
      discountValue: 25,
      startDate: new Date('2026-04-10'),
      endDate: new Date('2026-04-18'),
      season: 'สงกรานต์',
      minNights: 2,
    },
    {
      name: 'ลอยกระทง ราตรีสุดโรแมนติก',
      slug: 'loy-krathong-2026',
      description: 'พิเศษ! ลด 15% สำหรับเทศกาลลอยกระทง',
      discountType: 'percentage',
      discountValue: 15,
      startDate: new Date('2026-11-13'),
      endDate: new Date('2026-11-16'),
      season: 'ลอยกระทง',
      minNights: 1,
    },
    {
      name: 'ฤดูร้อน ลดสูงสุด 30%',
      slug: 'summer-sale-2026',
      description: 'หน้าร้อนนี้ ท่องเที่ยวคุ้มค่า ลดสูงสุด 30%',
      discountType: 'percentage',
      discountValue: 30,
      startDate: new Date('2026-03-01'),
      endDate: new Date('2026-05-31'),
      season: 'ฤดูร้อน',
      minNights: 2,
    },
    {
      name: 'หน้าหนาว สุดฟิน ลด 15%',
      slug: 'winter-promo-2026',
      description: 'เที่ยวหน้าหนาวสบายๆ ลด 15% ทุกที่พัก',
      discountType: 'percentage',
      discountValue: 15,
      startDate: new Date('2025-11-01'),
      endDate: new Date('2026-02-28'),
      season: 'หน้าหนาว',
      minNights: 2,
    },
  ];

  for (const promo of promotions) {
    await prisma.promotion.upsert({
      where: { slug: promo.slug },
      update: {},
      create: promo,
    });
  }

  console.log('✅ สร้างโปรโมชั่นเรียบร้อย:', promotions.length, 'โปรโมชั่น');

  // 4. Create Accommodations (รวมที่พักเดิมและที่พักใหม่)
  console.log('🏠 สร้างข้อมูลที่พัก...');

  const accommodations = [
    // ภาคเหนือ - Featured
    {
      name: 'รีสอร์ทบนดอยสวยงาม',
      slug: 'mountain-resort-chiangmai',
      description: 'รีสอร์ทสไตล์มินิมอลบนดอยสูง วิวหมอกทะเล อากาศเย็นสบายตลอดปี มีระเบียงส่วนตัว พร้อมสิ่งอำนวยความสะดวกครบครัน เหมาะสำหรับการพักผ่อนและชาร์จแบตเตอรี่',
      shortDesc: 'รีสอร์ทวิวหมอกทะเล อากาศเย็นสบาย',
      regionId: regionMap.north,
      provinceId: provinceMap['chiang-mai'],
      pricePerNight: 3500,
      maxGuests: 4,
      address: 'ดอยสะเก็ด เชียงใหม่ 50220',
      amenities: JSON.stringify(['WiFi', 'แอร์', 'ทีวี', 'ตู้เย็น', 'ระเบียงส่วนตัว', 'ที่จอดรถ']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4',
        'https://images.unsplash.com/photo-1566073771259-6a8506099945',
      ]),
      isFeatured: true,
      rating: 4.8,
    },
    {
      name: 'บ้านไม้ริมน้ำ เชียงราย',
      slug: 'wooden-house-chiangrai',
      description: 'บ้านไม้แบบไทยร่วมสมัย ตั้งอยู่ริมแม่น้ำโขง บรรยากาศเงียบสงบ ใกล้สามเหลี่ยมทองคำ เหมาะสำหรับครอบครัวหรือกลุ่มเพื่อน',
      shortDesc: 'บ้านไม้ริมโขง บรรยากาศเงียบสงบ',
      regionId: regionMap.north,
      provinceId: provinceMap['chiang-rai'],
      pricePerNight: 2800,
      maxGuests: 6,
      address: 'เชียงแสน เชียงราย 57150',
      amenities: JSON.stringify(['WiFi', 'แอร์', 'ครัว', 'ที่จอดรถ', 'สวน', 'ระเบียงวิวแม่น้ำ']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9',
      ]),
      isFeatured: true,
      rating: 4.7,
    },

    // ภาคใต้ - Featured
    {
      name: 'วิลล่าหรูริมทะเล ภูเก็ต',
      slug: 'luxury-villa-phuket',
      description: 'วิลล่าสไตล์โมเดิร์น ติดชายหาดส่วนตัว มีสระว่ายน้ำ infinity pool วิวทะเลอันดามันสุดอลังการ ห้องนอน 3 ห้อง เหมาะสำหรับครอบครัวหรือกลุ่มเพื่อน',
      shortDesc: 'วิลล่าหรูติดชายหาด สระว่ายน้ำส่วนตัว',
      regionId: regionMap.south,
      provinceId: provinceMap['phuket'],
      pricePerNight: 8500,
      maxGuests: 8,
      address: 'กมลา ภูเก็ต 83150',
      amenities: JSON.stringify(['WiFi', 'แอร์', 'ครัวยุโรป', 'สระว่ายน้ำ', 'ชายหาดส่วนตัว', 'ที่จอดรถ', 'พนักงานทำความสะอาด']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1602002418082-a4443e081dd1',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811',
      ]),
      isFeatured: true,
      rating: 4.9,
    },
    {
      name: 'รีสอร์ทเกาะสมุย',
      slug: 'resort-koh-samui',
      description: 'รีสอร์ทริมชายหาดเฉวง ห้องพักสไตล์ทรอปิคอล วิวทะเลสวยงาม ใกล้แหล่งท่องเที่ยว ร้านอาหาร และชีวิตยามค่ำคืน',
      shortDesc: 'รีสอร์ทชายหาดเฉวง ทำเลดี',
      regionId: regionMap.south,
      provinceId: provinceMap['surat-thani'],
      pricePerNight: 4200,
      maxGuests: 3,
      address: 'เฉวง สมุย สุราษฎร์ธานี 84320',
      amenities: JSON.stringify(['WiFi', 'แอร์', 'ทีวี', 'ตู้เย็น', 'สระว่ายน้ำรวม', 'ที่จอดรถ', 'บริการรถรับส่ง']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b',
      ]),
      isFeatured: false,
      rating: 4.5,
    },

    // ภาคอีสาน
    {
      name: 'โฮมสเตย์อีสาน นครราชสีมา',
      slug: 'homestay-korat',
      description: 'โฮมสเตย์สไตล์ชนบท บรรยากาศธรรมชาติ ท่ามกลางนาข้าวและสวนผลไม้ สัมผัสวิถีชีวิตอีสานแท้ๆ อาหารพื้นเมืองรสชาติดี',
      shortDesc: 'โฮมสเตย์สไตล์อีสาน วิถีชีวิตท้องถิ่น',
      regionId: regionMap.northeast,
      provinceId: provinceMap['nakhon-ratchasima'],
      pricePerNight: 1500,
      maxGuests: 5,
      address: 'ปากช่อง นครราชสีมา 30130',
      amenities: JSON.stringify(['WiFi', 'พัดลม', 'ครัว', 'สวน', 'ที่จอดรถ', 'จักรยาน']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1605276373954-0c4a0dac5b12',
        'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d',
      ]),
      isFeatured: false,
      rating: 4.3,
    },

    // ภาคกลาง - Featured
    {
      name: 'คอนโดสไตล์โมเดิร์น กรุงเทพ',
      slug: 'modern-condo-bangkok',
      description: 'คอนโดใจกลางเมือง ใกล้ BTS สะดวกสบาย เดินทางง่าย ตกแต่งสไตล์มินิมอล ครบครันด้วยสิ่งอำนวยความสะดวก เหมาะสำหรับนักท่องเที่ยวและนักธุรกิจ',
      shortDesc: 'คอนโดใจกลางเมือง ใกล้ BTS',
      regionId: regionMap.central,
      provinceId: provinceMap['bangkok'],
      pricePerNight: 2200,
      maxGuests: 2,
      address: 'สุขุมวิท กรุงเทพ 10110',
      amenities: JSON.stringify(['WiFi', 'แอร์', 'ทีวี', 'ตู้เย็น', 'เครื่องซักผ้า', 'สระว่ายน้ำรวม', 'ฟิตเนส']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
      ]),
      isFeatured: true,
      rating: 4.6,
    },
    {
      name: 'รีสอร์ทริมแม่น้ำ กาญจนบุรี',
      slug: 'riverside-resort-kanchanaburi',
      description: 'รีสอร์ทริมแม่น้ำแควน้อย บรรยากาศสงบร่มรื่น ล้อมรอบด้วยธรรมชาติ เสียงน้ำไหล นกร้อง เหมาะสำหรับการพักผ่อนหนีเมือง',
      shortDesc: 'รีสอร์ทริมแม่น้ำแคว บรรยากาศสงบ',
      regionId: regionMap.central,
      provinceId: provinceMap['kanchanaburi'],
      pricePerNight: 2500,
      maxGuests: 4,
      address: 'ไทรโยค กาญจนบุรี 71150',
      amenities: JSON.stringify(['WiFi', 'แอร์', 'ทีวี', 'ตู้เย็น', 'ระเบียงริมน้ำ', 'ที่จอดรถ', 'เรือพาย']),
      images: JSON.stringify([
        'https://images.unsplash.com/photo-1596436889106-be35e843f974',
        'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83',
      ]),
      isFeatured: true,
      rating: 4.7,
    },
  ];

  for (const acc of accommodations) {
    await prisma.accommodation.upsert({
      where: { slug: acc.slug },
      update: {},
      create: acc,
    });
  }

  console.log('✅ สร้างที่พักเรียบร้อย:', accommodations.length, 'ที่พัก');
  console.log('   - ที่พักแนะนำ (Featured):', accommodations.filter(a => a.isFeatured).length, 'แห่ง');

  console.log('\n🎉 Seeding เสร็จสมบูรณ์!');
  console.log('📊 สรุป:');
  console.log('   - ภูมิภาค:', regions.length);
  console.log('   - จังหวัด:', provinceCount);
  console.log('   - โปรโมชั่น:', promotions.length);
  console.log('   - ที่พัก:', accommodations.length);
}

main()
  .catch((e) => {
    console.error('❌ เกิดข้อผิดพลาด:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
