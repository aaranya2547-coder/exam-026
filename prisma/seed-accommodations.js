const { PrismaClient } = require('../app/generated/prisma');
const prisma = new PrismaClient();

// ข้อมูลที่พักภาคเหนือ (17 จังหวัด)
const northernAccommodations = [
  // เชียงใหม่ (2 ที่พัก)
  {
    name: 'โรงแรมดอยสุเทพวิว',
    slug: 'doi-suthep-view-hotel',
    provinceSlug: 'chiang-mai',
    description: 'โรงแรมสไตล์ล้านนาร่วมสมัย ตั้งอยู่เชิงดอยสุเทพ วิวภูเขาสวยงาม อากาศเย็นสบาย ห้องพักกว้างขวางพร้อมระเบียงส่วนตัว สระว่ายน้ำกลางแจ้ง ร้านอาหารเสิร์ฟอาหารพื้นเมืองและอาหารนานาชาติ ใกล้ตลาดวโรรส วัดพระธาตุดอยสุเทพ และเมืองเก่าเชียงใหม่',
    shortDesc: 'โรงแรมสไตล์ล้านนาวิวดอยสุเทพ อากาศเย็นสบาย',
    pricePerNight: 2500,
    maxGuests: 3,
    address: '123 ถ.ห้วยแก้ว ต.สุเทพ อ.เมือง จ.เชียงใหม่',
    latitude: 18.7883,
    longitude: 98.9628,
    amenities: ['Wi-Fi ฟรี', 'สระว่ายน้ำ', 'ร้านอาหาร', 'ที่จอดรถ', 'เครื่องปรับอากาศ', 'ระเบียง'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945', 'https://images.unsplash.com/photo-1582719508461-905c673771fd'],
    isFeatured: true,
    rating: 4.7
  },
  {
    name: 'รีสอร์ทริมปิง',
    slug: 'rimping-resort',
    provinceSlug: 'chiang-mai',
    description: 'รีสอร์ทเงียบสงบริมแม่น้ำปิง บรรยากาศร่มรื่น ห้องพักสไตล์ไทยประยุกต์ มีระเบียงหันหน้าสู่แม่น้ำ สวนสวยร่มรื่น เหมาะสำหรับผู้ที่ต้องการพักผ่อนอย่างเงียบสงบ ใกล้ตลาดวโรรส และย่านไนท์บาซาร์',
    shortDesc: 'รีสอร์ทริมแม่น้ำปิง บรรยากาศเงียบสงบ',
    pricePerNight: 1800,
    maxGuests: 2,
    address: '456 ถ.เจริญประเทศ ต.วัดเกต อ.เมือง จ.เชียงใหม่',
    latitude: 18.7883,
    longitude: 98.9853,
    amenities: ['Wi-Fi ฟรี', 'วิวแม่น้ำ', 'ที่จอดรถ', 'สวนสวย', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: false,
    rating: 4.5
  },
  // เชียงราย (2 ที่พัก)
  {
    name: 'บูติกโฮเทลเชียงราย',
    slug: 'chiang-rai-boutique-hotel',
    provinceSlug: 'chiang-rai',
    description: 'โรงแรมบูติกสไตล์ร่วมสมัย ใจกลางเมืองเชียงราย ตกแต่งด้วยงานศิลปะพื้นเมือง ห้องพักทันสมัย มีคาเฟ่และร้านอาหาร ใกล้วัดร่องขุ่น วัดร่องเสือเต้น และตลาดกลางคืน',
    shortDesc: 'โรงแรมบูติกใจกลางเมืองเชียงราย',
    pricePerNight: 2200,
    maxGuests: 2,
    address: '789 ถ.พหลโยธิน ต.เวียง อ.เมือง จ.เชียงราย',
    latitude: 19.9105,
    longitude: 99.8406,
    amenities: ['Wi-Fi ฟรี', 'คาเฟ่', 'ร้านอาหาร', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'],
    isFeatured: true,
    rating: 4.6
  },
  {
    name: 'รีสอร์ทดอยแม่สลอง',
    slug: 'doi-mae-salong-resort',
    provinceSlug: 'chiang-rai',
    description: 'รีสอร์ทบนดอยแม่สลอง บรรยากาศหนาวเย็น วิวสวนชากว้างใหญ่ ห้องพักสไตล์จีนยูนนาน มีระเบียงชมวิวภูเขา เหมาะสำหรับพักผ่อนหนีความวุ่นวาย',
    shortDesc: 'รีสอร์ทบนดอย วิวสวนชา บรรยากาศหนาวเย็น',
    pricePerNight: 2000,
    maxGuests: 3,
    address: '12 บ้านสันติคีรี ต.แม่สลองนอก อ.แม่ฟ้าหลวง จ.เชียงราย',
    latitude: 20.1567,
    longitude: 99.6422,
    amenities: ['Wi-Fi ฟรี', 'วิวภูเขา', 'ร้านอาหาร', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'],
    isFeatured: false,
    rating: 4.4
  },
  // แม่ฮ่องสอน (1 ที่พัก)
  {
    name: 'โฮมสเตย์ปางอุ๋ง',
    slug: 'pang-ung-homestay',
    provinceSlug: 'mae-hong-son',
    description: 'โฮมสเตย์บรรยากาศธรรมชาติ ใกล้ปางอุ๋ง วิวทะเลหมอกสวยงาม อากาศหนาวเย็นตลอดปี บ้านพักสไตล์ไม้ เหมาะสำหรับนักท่องเที่ยวที่ต้องการสัมผัสธรรมชาติ',
    shortDesc: 'โฮมสเตย์ใกล้ปางอุ๋ง วิวทะเลหมอก',
    pricePerNight: 1500,
    maxGuests: 4,
    address: '34 บ้านรักไทย ต.แม่ฮี้ อ.ปาย จ.แม่ฮ่องสอน',
    latitude: 19.3575,
    longitude: 98.4366,
    amenities: ['Wi-Fi', 'วิวภูเขา', 'ที่จอดรถ', 'ครัว', 'ระเบียง'],
    images: ['https://images.unsplash.com/photo-1587061949409-02df41d5e562'],
    isFeatured: false,
    rating: 4.3
  },
  // ลำปาง (1 ที่พัก)
  {
    name: 'โรงแรมสไตล์ล้านนาลำปาง',
    slug: 'lampang-lanna-hotel',
    provinceSlug: 'lampang',
    description: 'โรงแรมสไตล์ล้านนาโบราณ ตกแต่งด้วยงานไม้สักทอง ใจกลางเมืองลำปาง ใกล้วัดพระแก้ว วัดพระธาตุลำปางหลวง และตลาดกาดกองต้า',
    shortDesc: 'โรงแรมสไตล์ล้านนาใจกลางเมืองลำปาง',
    pricePerNight: 1600,
    maxGuests: 2,
    address: '56 ถ.บุญวาทย์ ต.สวนดอก อ.เมือง จ.ลำปาง',
    latitude: 18.2888,
    longitude: 99.4917,
    amenities: ['Wi-Fi ฟรี', 'ร้านอาหาร', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1445019980597-93fa8acb246c'],
    isFeatured: false,
    rating: 4.2
  },
  // ลำพูน (1 ที่พัก)
  {
    name: 'รีสอร์ทริมคลอง',
    slug: 'rimkhong-resort-lamphun',
    provinceSlug: 'lamphun',
    description: 'รีสอร์ทเล็กๆ ริมคลอง บรรยากาศสงบ ห้องพักสไตล์ไทยประยุกต์ มีสวนสวย ใกล้วัดพระธาตุหริภุญชัย และตลาดเก่าลำพูน',
    shortDesc: 'รีสอร์ทริมคลอง บรรยากาศสงบ',
    pricePerNight: 1400,
    maxGuests: 2,
    address: '78 ถ.ลำพูน-ลี้ ต.ในเมือง อ.เมือง จ.ลำพูน',
    latitude: 18.5744,
    longitude: 99.0081,
    amenities: ['Wi-Fi ฟรี', 'วิวคลอง', 'สวนสวย', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
    isFeatured: false,
    rating: 4.0
  },
  // อุตรดิตถ์ (1 ที่พัก)
  {
    name: 'โรงแรมน่าน้อยริเวอร์',
    slug: 'nan-noi-river-hotel',
    provinceSlug: 'uttaradit',
    description: 'โรงแรมริมแม่น้ำน่าน วิวแม่น้ำสวยงาม ห้องพักสะอาด สะดวกสบาย ใกล้ตลาดเก่าอุตรดิตถ์',
    shortDesc: 'โรงแรมริมแม่น้ำน่าน',
    pricePerNight: 1200,
    maxGuests: 2,
    address: '90 ถ.ท่าอิฐ ต.ท่าอิฐ อ.เมือง จ.อุตรดิตถ์',
    latitude: 17.6259,
    longitude: 100.0994,
    amenities: ['Wi-Fi ฟรี', 'วิวแม่น้ำ', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: false,
    rating: 4.1
  },
  // แพร่ (1 ที่พัก)
  {
    name: 'โรงแรมนครแพร่ทาวเวอร์',
    slug: 'nakhon-phrae-tower-hotel',
    provinceSlug: 'phrae',
    description: 'โรงแรมสูงใจกลางเมืองแพร่ ห้องพักทันสมัย วิวเมืองสวยงาม ใกล้เมืองเก่าแพร่ วงกลมนาคำ',
    shortDesc: 'โรงแรมใจกลางเมืองแพร่',
    pricePerNight: 1300,
    maxGuests: 2,
    address: '12 ถ.ยันตรกิจโกศล ต.ในเวียง อ.เมือง จ.แพร่',
    latitude: 18.1445,
    longitude: 100.1398,
    amenities: ['Wi-Fi ฟรี', 'วิวเมือง', 'ร้านอาหาร', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'],
    isFeatured: false,
    rating: 4.0
  },
  // น่าน (1 ที่พัก)
  {
    name: 'รีสอร์ทภูคา',
    slug: 'phu-kha-resort',
    provinceSlug: 'nan',
    description: 'รีสอร์ทบนเขาภูคา วิวทะเลหมอกสวยงาม อากาศเย็นสบาย บรรยากาศธรรมชาติ เหมาะสำหรับพักผ่อนหย่อนใจ',
    shortDesc: 'รีสอร์ทภูคา วิวทะเลหมอก',
    pricePerNight: 1700,
    maxGuests: 3,
    address: '45 บ้านดงพญา ต.ดู่พงษ์ อ.บ่อเกลือ จ.น่าน',
    latitude: 19.0736,
    longitude: 100.7859,
    amenities: ['Wi-Fi', 'วิวภูเขา', 'ร้านอาหาร', 'ที่จอดรถ'],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'],
    isFeatured: false,
    rating: 4.5
  },
  // พะเยา (1 ที่พัก)
  {
    name: 'โรงแรมกว๊านพะเยา',
    slug: 'kwan-phayao-hotel',
    provinceSlug: 'phayao',
    description: 'โรงแรมริมกว๊านพะเยา วิวทะเลสาบสวยงาม ห้องพักสะอาด สะดวกสบาย เดินเล่นริมกว๊านได้',
    shortDesc: 'โรงแรมริมกว๊านพะเยา',
    pricePerNight: 1400,
    maxGuests: 2,
    address: '23 ถ.ริมกว๊าน ต.เวียง อ.เมือง จ.พะเยา',
    latitude: 19.1927,
    longitude: 99.8820,
    amenities: ['Wi-Fi ฟรี', 'วิวทะเลสาบ', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: false,
    rating: 4.2
  },
  // เพชรบูรณ์ (1 ที่พัก)
  {
    name: 'รีสอร์ทเขาค้อ',
    slug: 'khao-kho-resort',
    provinceSlug: 'phetchabun',
    description: 'รีสอร์ทบนเขาค้อ วิวทะเลหมอกและพระอาทิตย์ขึ้นสวยงาม อากาศเย็นตลอดปี ห้องพักสไตล์ยุโรป',
    shortDesc: 'รีสอร์ทเขาค้อ วิวทะเลหมอก',
    pricePerNight: 2500,
    maxGuests: 4,
    address: '67 บ้านแคมป์สน ต.แคมป์สน อ.เขาค้อ จ.เพชรบูรณ์',
    latitude: 16.7194,
    longitude: 101.0819,
    amenities: ['Wi-Fi ฟรี', 'วิวภูเขา', 'ร้านอาหาร', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1587061949409-02df41d5e562'],
    isFeatured: true,
    rating: 4.8
  },
  // พิษณุโลก (1 ที่พัก)
  {
    name: 'โรงแรมท่าทองใจ',
    slug: 'tha-thong-jai-hotel',
    provinceSlug: 'phitsanulok',
    description: 'โรงแรมใจกลางเมืองพิษณุโลก ใกล้แม่น้ำน่าน วัดพระศรีรัตนมหาธาตุ ห้องพักสะอาด สะดวกสบาย',
    shortDesc: 'โรงแรมใจกลางเมืองพิษณุโลก',
    pricePerNight: 1200,
    maxGuests: 2,
    address: '89 ถ.บรมไตรโลกนารถ ต.ในเมือง อ.เมือง จ.พิษณุโลก',
    latitude: 16.8219,
    longitude: 100.2659,
    amenities: ['Wi-Fi ฟรี', 'ร้านอาหาร', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
    isFeatured: false,
    rating: 4.0
  },
  // สุโขทัย (1 ที่พัก)
  {
    name: 'โรงแรมสุโขทัยเฮอริเทจ',
    slug: 'sukhothai-heritage-hotel',
    provinceSlug: 'sukhothai',
    description: 'โรงแรมสไตล์โบราณ ใกล้อุทยานประวัติศาสตร์สุโขทัย ตกแต่งสไตล์สุโขทัยโบราณ บรรยากาศร่มรื่น',
    shortDesc: 'โรงแรมใกล้อุทยานประวัติศาสตร์สุโขทัย',
    pricePerNight: 1800,
    maxGuests: 2,
    address: '34 ถ.สิงหวัฒน์ ต.ธานี อ.เมือง จ.สุโขทัย',
    latitude: 17.0103,
    longitude: 99.8230,
    amenities: ['Wi-Fi ฟรี', 'สระว่ายน้ำ', 'ร้านอาหาร', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1445019980597-93fa8acb246c'],
    isFeatured: false,
    rating: 4.4
  },
  // ตาก (1 ที่พัก)
  {
    name: 'โฮมสเตย์ลานสกา',
    slug: 'lan-sa-nga-homestay',
    provinceSlug: 'tak',
    description: 'โฮมสเตย์ใกล้เขื่อนภูมิพล บรรยากาศธรรมชาติ วิวภูเขาสวยงาม เหมาะสำหรับพักผ่อนหนีเมืองหลวง',
    shortDesc: 'โฮมสเตย์ใกล้เขื่อนภูมิพล',
    pricePerNight: 1000,
    maxGuests: 4,
    address: '12 บ้านลานสกา ต.สามเงา อ.สามเงา จ.ตาก',
    latitude: 17.2690,
    longitude: 99.1239,
    amenities: ['Wi-Fi', 'วิวภูเขา', 'ที่จอดรถ', 'ครัว'],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'],
    isFeatured: false,
    rating: 4.1
  },
  // กำแพงเพชร (1 ที่พัก)
  {
    name: 'โรงแรมนวรัตน์',
    slug: 'nawarat-hotel-kamphaeng-phet',
    provinceSlug: 'kamphaeng-phet',
    description: 'โรงแรมใจกลางเมืองกำแพงเพชร ใกล้อุทยานประวัติศาสตร์ ห้องพักสะอาด ราคาประหยัด',
    shortDesc: 'โรงแรมใจกลางเมืองกำแพงเพชร',
    pricePerNight: 900,
    maxGuests: 2,
    address: '56 ถ.เทศา ต.ในเมือง อ.เมือง จ.กำแพงเพชร',
    latitude: 16.4828,
    longitude: 99.5225,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'],
    isFeatured: false,
    rating: 3.9
  },
  // พิจิตร (1 ที่พัก)
  {
    name: 'โรงแรมสายน้ำผึ้ง',
    slug: 'sai-nam-phueng-hotel',
    provinceSlug: 'phichit',
    description: 'โรงแรมใจกลางเมืองพิจิตร ใกล้แม่น้ำน่าน ห้องพักสะอาด สะดวกสบาย',
    shortDesc: 'โรงแรมใจกลางเมืองพิจิตร',
    pricePerNight: 1000,
    maxGuests: 2,
    address: '78 ถ.คลองคะเชนทร์ ต.ในเมือง อ.เมือง จ.พิจิตร',
    latitude: 16.4422,
    longitude: 100.3489,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
    isFeatured: false,
    rating: 3.8
  },
  // นครสวรรค์ (1 ที่พัก)
  {
    name: 'โรงแรมบางมูลนาก',
    slug: 'bang-mool-nak-hotel',
    provinceSlug: 'nakhon-sawan',
    description: 'โรงแรมใกล้บึงบอระเพ็ด ใจกลางเมืองนครสวรรค์ ห้องพักกว้างขวาง สะดวกสบาย',
    shortDesc: 'โรงแรมใจกลางเมืองนครสวรรค์',
    pricePerNight: 1100,
    maxGuests: 2,
    address: '45 ถ.มาตุลี ต.ปากน้ำโพ อ.เมือง จ.นครสวรรค์',
    latitude: 15.7047,
    longitude: 100.1253,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'เครื่องปรับอากาศ', 'ร้านอาหาร'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: false,
    rating: 4.0
  },
  // อุทัยธานี (1 ที่พัก)
  {
    name: 'รีสอร์ทสะแกกรัง',
    slug: 'sakae-krang-resort',
    provinceSlug: 'uthai-thani',
    description: 'รีสอร์ทริมแม่น้ำสะแกกรัง บรรยากาศเงียบสงบ ห้องพักสไตล์ไม้ วิวแม่น้ำสวยงาม',
    shortDesc: 'รีสอร์ทริมแม่น้ำสะแกกรัง',
    pricePerNight: 1300,
    maxGuests: 3,
    address: '23 ถ.อุทัยธรรม ต.อุทัยใหม่ อ.เมือง จ.อุทัยธานี',
    latitude: 15.3794,
    longitude: 100.0247,
    amenities: ['Wi-Fi ฟรี', 'วิวแม่น้ำ', 'ที่จอดรถ', 'ร้านอาหาร'],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'],
    isFeatured: false,
    rating: 4.2
  }
];

// ข้อมูลที่พักภาคกลาง (26 จังหวัด)
const centralAccommodations = [
  // กรุงเทพมหานคร (2 ที่พัก)
  {
    name: 'โรงแรมริเวอร์ไซด์ กรุงเทพ',
    slug: 'riverside-hotel-bangkok',
    provinceSlug: 'bangkok',
    description: 'โรงแรมหรูริมแม่น้ำเจ้าพระยา วิวแม่น้ำสวยงาม ห้องพักทันสมัย สระว่ายน้ำบนดาดฟ้า ร้านอาหารนานาชาติ ใกล้ไอคอนสยาม อัสสมชัญ และวัดอรุณ',
    shortDesc: 'โรงแรมหรูริมแม่น้ำเจ้าพระยา',
    pricePerNight: 3500,
    maxGuests: 2,
    address: '123 ถ.เจริญกรุง แขวงบางรัก เขตบางรัก กรุงเทพฯ',
    latitude: 13.7248,
    longitude: 100.5085,
    amenities: ['Wi-Fi ฟรี', 'สระว่ายน้ำ', 'ฟิตเนส', 'ร้านอาหาร', 'วิวแม่น้ำ', 'ที่จอดรถ'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: true,
    rating: 4.8
  },
  {
    name: 'บูติกโฮเทลสยาม',
    slug: 'siam-boutique-hotel',
    provinceSlug: 'bangkok',
    description: 'โรงแรมบูติกสไตล์ไทยประยุกต์ ใจกลางสยาม ใกล้ MBK สยามพารากอน สยามสแควร์ ห้องพักตกแต่งสวยงาม มีคาเฟ่และรูฟท็อปบาร์',
    shortDesc: 'โรงแรมบูติกใจกลางสยาม',
    pricePerNight: 2800,
    maxGuests: 2,
    address: '456 ถ.พญาไท แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ',
    latitude: 13.7467,
    longitude: 100.5332,
    amenities: ['Wi-Fi ฟรี', 'รูฟท็อปบาร์', 'คาเฟ่', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'],
    isFeatured: true,
    rating: 4.6
  },
  // นนทบุรี (1 ที่พัก)
  {
    name: 'โรงแรมอิมแพ็คเมืองทอง',
    slug: 'impact-muang-thong-hotel',
    provinceSlug: 'nonthaburi',
    description: 'โรงแรมใกล้ศูนย์ประชุมอิมแพ็ค เมืองทองธานี ห้องพักทันสมัย สะดวกสบาย เหมาะสำหรับนักธุรกิจ',
    shortDesc: 'โรงแรมใกล้อิมแพ็คเมืองทอง',
    pricePerNight: 1800,
    maxGuests: 2,
    address: '789 ถ.แจ้งวัฒนะ ต.บางพูด อ.ปากเกร็ด จ.นนทบุรี',
    latitude: 13.9132,
    longitude: 100.5525,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'ฟิตเนส', 'ร้านอาหาร', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
    isFeatured: false,
    rating: 4.3
  },
  // ปทุมธานี (1 ที่พัก)
  {
    name: 'โรงแรมฟิวเจอร์พาร์ค',
    slug: 'future-park-hotel',
    provinceSlug: 'pathum-thani',
    description: 'โรงแรมใกล้ฟิวเจอร์พาร์ครังสิต ห้องพักสะอาด สะดวกสบาย ราคาสมเหตุสมผล',
    shortDesc: 'โรงแรมใกล้ฟิวเจอร์พาร์ค',
    pricePerNight: 1200,
    maxGuests: 2,
    address: '34 ถ.พหลโยธิน ต.ประชาธิปัตย์ อ.ธัญบุรี จ.ปทุมธานี',
    latitude: 14.0208,
    longitude: 100.5745,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1445019980597-93fa8acb246c'],
    isFeatured: false,
    rating: 4.0
  },
  // สมุทรปราการ (1 ที่พัก)
  {
    name: 'โรงแรมแอร์พอร์ท',
    slug: 'airport-hotel-samut-prakan',
    provinceSlug: 'samut-prakan',
    description: 'โรงแรมใกล้สนามบินสุวรรณภูมิ ห้องพักทันสมัย มีรถรับส่งสนามบิน เหมาะสำหรับนักเดินทาง',
    shortDesc: 'โรงแรมใกล้สนามบินสุวรรณภูมิ',
    pricePerNight: 1600,
    maxGuests: 2,
    address: '67 ถ.กิ่งแก้ว ต.ราชาเทวะ อ.บางพลี จ.สมุทรปราการ',
    latitude: 13.6810,
    longitude: 100.7473,
    amenities: ['Wi-Fi ฟรี', 'รถรับส่งสนามบิน', 'ที่จอดรถ', 'ร้านอาหาร', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'],
    isFeatured: false,
    rating: 4.2
  },
  // สมุทรสาคร (1 ที่พัก)
  {
    name: 'รีสอร์ทริมทะเล',
    slug: 'seaside-resort-samut-sakhon',
    provinceSlug: 'samut-sakhon',
    description: 'รีสอร์ทริมทะเล บรรยากาศสงบ วิวทะเลสวยงาม อาหารทะเลสด เหมาะสำหรับพักผ่อนสุดสัปดาห์',
    shortDesc: 'รีสอร์ทริมทะเล อาหารทะเลสด',
    pricePerNight: 1800,
    maxGuests: 3,
    address: '89 ถ.เศรษฐกิจ ต.มหาชัย อ.เมือง จ.สมุทรสาคร',
    latitude: 13.5475,
    longitude: 100.2745,
    amenities: ['Wi-Fi ฟรี', 'วิวทะเล', 'ร้านอาหาร', 'ที่จอดรถ'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: false,
    rating: 4.1
  },
  // สมุทรสงคราม (1 ที่พัก)
  {
    name: 'โฮมสเตย์สวนมะพร้าว',
    slug: 'coconut-garden-homestay',
    provinceSlug: 'samut-songkhram',
    description: 'โฮมสเตย์ในสวนมะพร้าว บรรยากาศชนบท ใกล้ตลาดน้ำอัมพวา ตลาดรถไฟแม่กลอง',
    shortDesc: 'โฮมสเตย์สวนมะพร้าว ใกล้อัมพวา',
    pricePerNight: 1000,
    maxGuests: 4,
    address: '12 บ้านท่ากระชับ ต.อัมพวา อ.อัมพวา จ.สมุทรสงคราม',
    latitude: 13.4189,
    longitude: 99.9547,
    amenities: ['Wi-Fi', 'ที่จอดรถ', 'สวนมะพร้าว', 'ครัว'],
    images: ['https://images.unsplash.com/photo-1587061949409-02df41d5e562'],
    isFeatured: false,
    rating: 4.3
  },
  // นครปฐม (1 ที่พัก)
  {
    name: 'โรงแรมพระปฐมเจดีย์',
    slug: 'phra-pathom-chedi-hotel',
    provinceSlug: 'nakhon-pathom',
    description: 'โรงแรมใกล้พระปฐมเจดีย์ ใจกลางเมืองนครปฐม ห้องพักสะอาด สะดวกสบาย',
    shortDesc: 'โรงแรมใกล้พระปฐมเจดีย์',
    pricePerNight: 1100,
    maxGuests: 2,
    address: '45 ถ.ราชวิถี ต.พระปฐมเจดีย์ อ.เมือง จ.นครปฐม',
    latitude: 13.8199,
    longitude: 100.0619,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
    isFeatured: false,
    rating: 4.0
  },
  // ชัยนาท (1 ที่พัก)
  {
    name: 'โรงแรมแม่น้ำเจ้าพระยา',
    slug: 'chao-phraya-river-hotel-chai-nat',
    provinceSlug: 'chai-nat',
    description: 'โรงแรมริมแม่น้ำเจ้าพระยา วิวแม่น้ำสวยงาม บรรยากาศเงียบสงบ',
    shortDesc: 'โรงแรมริมแม่น้ำเจ้าพระยา',
    pricePerNight: 900,
    maxGuests: 2,
    address: '23 ถ.ชัยนาท-สรรพยา ต.ในเมือง อ.เมือง จ.ชัยนาท',
    latitude: 15.1850,
    longitude: 100.1251,
    amenities: ['Wi-Fi ฟรี', 'วิวแม่น้ำ', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: false,
    rating: 3.9
  },
  // ลพบุรี (1 ที่พัก)
  {
    name: 'โรงแรมเมืองลิง',
    slug: 'monkey-city-hotel',
    provinceSlug: 'lopburi',
    description: 'โรงแรมใจกลางเมืองลพบุรี ใกล้ปราสาทพระนารายณ์ ศาลพระกาฬ ห้องพักสะอาด สะดวกสบาย',
    shortDesc: 'โรงแรมใจกลางเมืองลพบุรี',
    pricePerNight: 1000,
    maxGuests: 2,
    address: '56 ถ.ท่าหิน ต.ท่าหิน อ.เมือง จ.ลพบุรี',
    latitude: 14.7995,
    longitude: 100.6172,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'],
    isFeatured: false,
    rating: 3.8
  },
  // สิงห์บุรี (1 ที่พัก)
  {
    name: 'โรงแรมเจ้าพระยา',
    slug: 'chao-phraya-hotel-sing-buri',
    provinceSlug: 'sing-buri',
    description: 'โรงแรมเล็กๆ ใจกลางเมืองสิงห์บุรี ห้องพักสะอาด ราคาประหยัด',
    shortDesc: 'โรงแรมใจกลางเมืองสิงห์บุรี',
    pricePerNight: 800,
    maxGuests: 2,
    address: '34 ถ.สิงห์บุรี ต.บางมัญ อ.เมือง จ.สิงห์บุรี',
    latitude: 14.8936,
    longitude: 100.4067,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
    isFeatured: false,
    rating: 3.7
  },
  // อ่างทอง (1 ที่พัก)
  {
    name: 'โรงแรมไทยเอื้ออังทอง',
    slug: 'thai-uea-ang-thong-hotel',
    provinceSlug: 'ang-thong',
    description: 'โรงแรมใจกลางเมืองอ่างทอง ห้องพักสะอาด สะดวกสบาย ราคาสมเหตุสมผล',
    shortDesc: 'โรงแรมใจกลางเมืองอ่างทอง',
    pricePerNight: 850,
    maxGuests: 2,
    address: '67 ถ.สุพรรณ ต.ตลาดหลวง อ.เมือง จ.อ่างทอง',
    latitude: 14.5896,
    longitude: 100.4553,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1445019980597-93fa8acb246c'],
    isFeatured: false,
    rating: 3.8
  },
  // พระนครศรีอยุธยา (2 ที่พัก)
  {
    name: 'โรงแรมริมน้ำอยุธยา',
    slug: 'ayutthaya-riverside-hotel',
    provinceSlug: 'ayutthaya',
    description: 'โรงแรมริมแม่น้ำเจ้าพระยา วิวเมืองเก่าอยุธยา ใกล้วัดมหาธาตุ วัดไชยวัฒนาราม ห้องพักสไตล์ไทยประยุกต์',
    shortDesc: 'โรงแรมริมน้ำ วิวเมืองเก่าอยุธยา',
    pricePerNight: 1800,
    maxGuests: 2,
    address: '89 ถ.อู่ทอง ต.หอรัตนชัย อ.พระนครศรีอยุธยา จ.พระนครศรีอยุธยา',
    latitude: 14.3532,
    longitude: 100.5671,
    amenities: ['Wi-Fi ฟรี', 'วิวแม่น้ำ', 'ร้านอาหาร', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: true,
    rating: 4.5
  },
  {
    name: 'บูติกโฮเทลอยุธยา',
    slug: 'ayutthaya-boutique-hotel',
    provinceSlug: 'ayutthaya',
    description: 'โรงแรมบูติกสไตล์อยุธยาโบราณ ตกแต่งสวยงาม ใกล้แหล่งท่องเที่ยว',
    shortDesc: 'โรงแรมบูติกสไตล์อยุธยา',
    pricePerNight: 1500,
    maxGuests: 2,
    address: '12 ถ.นเรศวร ต.ประตูชัย อ.พระนครศรีอยุธยา จ.พระนครศรีอยุธยา',
    latitude: 14.3533,
    longitude: 100.5773,
    amenities: ['Wi-Fi ฟรี', 'คาเฟ่', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'],
    isFeatured: false,
    rating: 4.3
  },
  // สระบุรี (1 ที่พัก)
  {
    name: 'โรงแรมพระพุทธบาท',
    slug: 'phra-phutthabat-hotel',
    provinceSlug: 'saraburi',
    description: 'โรงแรมใกล้วัดพระพุทธบาท ห้องพักสะอาด สะดวกสบาย เหมาะสำหรับผู้มาทำบุญ',
    shortDesc: 'โรงแรมใกล้วัดพระพุทธบาท',
    pricePerNight: 1000,
    maxGuests: 2,
    address: '45 ถ.มิตรภาพ ต.ปากเพรียว อ.เมือง จ.สระบุรี',
    latitude: 14.5289,
    longitude: 100.9102,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
    isFeatured: false,
    rating: 4.0
  },
  // ชลบุรี (2 ที่พัก)
  {
    name: 'รีสอร์ทพัทยาบีช',
    slug: 'pattaya-beach-resort',
    provinceSlug: 'chon-buri',
    description: 'รีสอร์ทริมหาดพัทยา วิวทะเลสวยงาม สระว่ายน้ำริมชายหาด ห้องพักทันสมัย บาร์และร้านอาหารริมทะเล ใกล้วอล์คกิ้งสตรีท เซ็นทรัลพัทยา',
    shortDesc: 'รีสอร์ทริมหาดพัทยา',
    pricePerNight: 3000,
    maxGuests: 2,
    address: '123 หาดพัทยา ต.หนองปรือ อ.บางละมุง จ.ชลบุรี',
    latitude: 12.9236,
    longitude: 100.8825,
    amenities: ['Wi-Fi ฟรี', 'สระว่ายน้ำ', 'วิวทะเล', 'ร้านอาหาร', 'ฟิตเนส', 'ที่จอดรถ'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: true,
    rating: 4.7
  },
  {
    name: 'โรงแรมศรีราชา',
    slug: 'sriracha-hotel',
    provinceSlug: 'chon-buri',
    description: 'โรงแรมใจกลางเมืองศรีราชา ใกล้ท่าเรือเกาะสีชัง ห้องพักสะอาด เหมาะสำหรับนักธุรกิจ',
    shortDesc: 'โรงแรมใจกลางเมืองศรีราชา',
    pricePerNight: 1400,
    maxGuests: 2,
    address: '456 ถ.สุขุมวิท ต.ศรีราชา อ.ศรีราชา จ.ชลบุรี',
    latitude: 13.1622,
    longitude: 100.9306,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'ร้านอาหาร', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
    isFeatured: false,
    rating: 4.2
  },
  // ระยอง (1 ที่พัก)
  {
    name: 'รีสอร์ทเกาะเสม็ด',
    slug: 'koh-samet-resort',
    provinceSlug: 'rayong',
    description: 'รีสอร์ทบนเกาะเสม็ด ติดชายหาด วิวทะเลสวยงาม บังกะโลสไตล์ไทย บรรยากาศสบายๆ',
    shortDesc: 'รีสอร์ทเกาะเสม็ด ติดชายหาด',
    pricePerNight: 2500,
    maxGuests: 3,
    address: 'หาดทรายแก้ว ต.เกาะเสม็ด อ.เมือง จ.ระยอง',
    latitude: 12.5664,
    longitude: 101.4528,
    amenities: ['Wi-Fi', 'วิวทะเล', 'ร้านอาหาร', 'กิจกรรมทางน้ำ'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: true,
    rating: 4.6
  },
  // จันทบุรี (1 ที่พัก)
  {
    name: 'โรงแรมริมแม่น้ำจันทบุรี',
    slug: 'chanthaburi-river-hotel',
    provinceSlug: 'chanthaburi',
    description: 'โรงแรมริมแม่น้ำจันทบุรี บรรยากาศเก่าแก่ ใกล้ชุมชนริมน้ำ ตลาดอัญมณี โบสถ์คาทอลิก',
    shortDesc: 'โรงแรมริมแม่น้ำจันทบุรี',
    pricePerNight: 1300,
    maxGuests: 2,
    address: '78 ถ.สุขุมวิท ต.ตลาด อ.เมือง จ.จันทบุรี',
    latitude: 12.6112,
    longitude: 102.1038,
    amenities: ['Wi-Fi ฟรี', 'วิวแม่น้ำ', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'],
    isFeatured: false,
    rating: 4.1
  },
  // ตราด (1 ที่พัก)
  {
    name: 'รีสอร์ทเกาะช้าง',
    slug: 'koh-chang-resort',
    provinceSlug: 'trat',
    description: 'รีสอร์ทบนเกาะช้าง ติดหาดทรายขาว วิวทะเลสวยงาม บังกะโลไม้ กิจกรรมดำน้ำดูปะการัง',
    shortDesc: 'รีสอร์ทเกาะช้าง ติดหาดทรายขาว',
    pricePerNight: 2200,
    maxGuests: 3,
    address: 'หาดไก่แบ้ ต.เกาะช้าง อ.เกาะช้าง จ.ตราด',
    latitude: 12.0436,
    longitude: 102.3439,
    amenities: ['Wi-Fi', 'วิวทะเล', 'ร้านอาหาร', 'กิจกรรมดำน้ำ', 'ที่จอดรถ'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: true,
    rating: 4.5
  },
  // ฉะเชิงเทรา (1 ที่พัก)
  {
    name: 'โรงแรมบางปะกง',
    slug: 'bang-pakong-hotel',
    provinceSlug: 'chachoengsao',
    description: 'โรงแรมใกล้ตลาดน้ำบางน้ำเปรี้ยว วัดโสธรวรารามวรวิหาร ห้องพักสะอาด สะดวกสบาย',
    shortDesc: 'โรงแรมใกล้ตลาดน้ำบางน้ำเปรี้ยว',
    pricePerNight: 1100,
    maxGuests: 2,
    address: '45 ถ.สุขุมวิท ต.บางปะกง อ.บางปะกง จ.ฉะเชิงเทรา',
    latitude: 13.5499,
    longitude: 101.0061,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
    isFeatured: false,
    rating: 3.9
  },
  // ปราจีนบุรี (1 ที่พัก)
  {
    name: 'รีสอร์ทเขาใหญ่',
    slug: 'khao-yai-resort-prachin',
    provinceSlug: 'prachin-buri',
    description: 'รีสอร์ทใกล้อุทยานแห่งชาติเขาใหญ่ บรรยากาธรรมชาติ อากาศเย็นสบาย ห้องพักสไตล์ธรรมชาติ',
    shortDesc: 'รีสอร์ทใกล้เขาใหญ่',
    pricePerNight: 2000,
    maxGuests: 4,
    address: '23 ถ.เขาใหญ่ ต.หมูสี อ.ประจันตคาม จ.ปราจีนบุรี',
    latitude: 14.0931,
    longitude: 101.3681,
    amenities: ['Wi-Fi ฟรี', 'วิวภูเขา', 'ร้านอาหาร', 'ที่จอดรถ'],
    images: ['https://images.unsplash.com/photo-1587061949409-02df41d5e562'],
    isFeatured: true,
    rating: 4.4
  },
  // นครนายก (1 ที่พัก)
  {
    name: 'รีสอร์ทริมน้ำนครนายก',
    slug: 'nakhon-nayok-riverside-resort',
    provinceSlug: 'nakhon-nayok',
    description: 'รีสอร์ทริมแม่น้ำนครนายก บรรยากาธร่มรื่น เหมาะสำหรับพักผ่อนหนีความวุ่นวาย กิจกรรมล่องแพ',
    shortDesc: 'รีสอร์ทริมแม่น้ำนครนายก',
    pricePerNight: 1600,
    maxGuests: 3,
    address: '67 ถ.สุวรรณศร ต.ศรีจุฬา อ.เมือง จ.นครนายก',
    latitude: 14.2069,
    longitude: 101.2130,
    amenities: ['Wi-Fi ฟรี', 'วิวแม่น้ำ', 'ร้านอาหาร', 'กิจกรรมล่องแพ', 'ที่จอดรถ'],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'],
    isFeatured: false,
    rating: 4.2
  },
  // สระแก้ว (1 ที่พัก)
  {
    name: 'โรงแรมชายแดน',
    slug: 'border-hotel-sa-kaeo',
    provinceSlug: 'sa-kaeo',
    description: 'โรงแรมใกล้ชายแดนไทย-กัมพูชา ห้องพักสะอาด สะดวกสบาย เหมาะสำหรับผู้เดินทางข้ามแดน',
    shortDesc: 'โรงแรมใกล้ชายแดนไทย-กัมพูชา',
    pricePerNight: 900,
    maxGuests: 2,
    address: '34 ถ.สระแก้ว ต.สระแก้ว อ.เมือง จ.สระแก้ว',
    latitude: 13.8240,
    longitude: 102.0647,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
    isFeatured: false,
    rating: 3.8
  },
  // กาญจนบุรี (2 ที่พัก)
  {
    name: 'รีสอร์ทริมแม่น้ำแคว',
    slug: 'river-kwai-resort',
    provinceSlug: 'kanchanaburi',
    description: 'รีสอร์ทริมแม่น้ำแคว บรรยากาธเงียบสงบ วิวแม่น้ำสวยงาม พักกระท่อมลอยน้ำ ใกล้สะพานข้ามแม่น้ำแคว',
    shortDesc: 'รีสอร์ทริมแม่น้ำแคว กระท่อมลอยน้ำ',
    pricePerNight: 2200,
    maxGuests: 3,
    address: '89 ถ.แม่น้ำแคว ต.บ้านใต้ อ.เมือง จ.กาญจนบุรี',
    latitude: 14.0227,
    longitude: 99.5328,
    amenities: ['Wi-Fi', 'วิวแม่น้ำ', 'ร้านอาหาร', 'กิจกรรมล่องแพ', 'ที่จอดรถ'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: true,
    rating: 4.7
  },
  {
    name: 'โรงแรมเอราวัณ',
    slug: 'erawan-hotel',
    provinceSlug: 'kanchanaburi',
    description: 'โรงแรมใกล้น้ำตกเอราวัณ ใจกลางเมืองกาญจนบุรี ห้องพักสะอาด สะดวกสบาย',
    shortDesc: 'โรงแรมใกล้น้ำตกเอราวัณ',
    pricePerNight: 1500,
    maxGuests: 2,
    address: '12 ถ.แสงชูโต ต.ปากแพรก อ.เมือง จ.กาญจนบุรี',
    latitude: 14.0045,
    longitude: 99.5457,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'ร้านอาหาร', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945'],
    isFeatured: false,
    rating: 4.3
  },
  // สุพรรณบุรี (1 ที่พัก)
  {
    name: 'โรงแรมดอนเจดีย์',
    slug: 'don-chedi-hotel',
    provinceSlug: 'suphan-buri',
    description: 'โรงแรมใจกลางเมืองสุพรรณบุรี ใกล้อนุสาวรีย์ดอนเจดีย์ หอคำหลวง ห้องพักสะอาด',
    shortDesc: 'โรงแรมใจกลางเมืองสุพรรณบุรี',
    pricePerNight: 1000,
    maxGuests: 2,
    address: '45 ถ.มาลัยแมน ต.ท่าพี่เลี้ยง อ.เมือง จ.สุพรรณบุรี',
    latitude: 14.4745,
    longitude: 100.1173,
    amenities: ['Wi-Fi ฟรี', 'ที่จอดรถ', 'เครื่องปรับอากาศ'],
    images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'],
    isFeatured: false,
    rating: 4.0
  },
  // ราชบุรี (1 ที่พัก)
  {
    name: 'รีสอร์ทดำเนินสะดวก',
    slug: 'damnoen-saduak-resort',
    provinceSlug: 'ratchaburi',
    description: 'รีสอร์ทใกล้ตลาดน้ำดำเนินสะดวก บรรยากาธสวนสวย เหมาะสำหรับพักผ่อน',
    shortDesc: 'รีสอร์ทใกล้ตลาดน้ำดำเนินสะดวก',
    pricePerNight: 1400,
    maxGuests: 3,
    address: '23 ถ.เพชรเกษม ต.ดำเนินสะดวก อ.ดำเนินสะดวก จ.ราชบุรี',
    latitude: 13.5175,
    longitude: 99.9550,
    amenities: ['Wi-Fi ฟรี', 'สวนสวย', 'ร้านอาหาร', 'ที่จอดรถ'],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'],
    isFeatured: false,
    rating: 4.1
  },
  // เพชรบุรี (1 ที่พัก)
  {
    name: 'โรงแรมชะอำบีช',
    slug: 'cha-am-beach-hotel',
    provinceSlug: 'phetchaburi',
    description: 'โรงแรมริมหาดชะอำ วิวทะเลสวยงาม ห้องพักทันสมัย สระว่ายน้ำริมชายหาด',
    shortDesc: 'โรงแรมริมหาดชะอำ',
    pricePerNight: 2000,
    maxGuests: 2,
    address: '67 ถ.รื่นฤดี ต.ชะอำ อ.ชะอำ จ.เพชรบุรี',
    latitude: 12.7991,
    longitude: 99.9669,
    amenities: ['Wi-Fi ฟรี', 'สระว่ายน้ำ', 'วิวทะเล', 'ร้านอาหาร', 'ที่จอดรถ'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: true,
    rating: 4.5
  },
  // ประจวบคีรีขันธ์ (1 ที่พัก)
  {
    name: 'รีสอร์ทหาดสามร้อยยอด',
    slug: 'sam-roi-yot-beach-resort',
    provinceSlug: 'prachuap-khiri-khan',
    description: 'รีสอร์ทใกล้อุทยานแห่งชาติสามร้อยยอด วิวทะเลและภูเขาสวยงาม บรรยากาศเงียบสงบ',
    shortDesc: 'รีสอร์ทใกล้อุทยานสามร้อยยอด',
    pricePerNight: 1800,
    maxGuests: 3,
    address: '34 บ้านบางปู ต.สามร้อยยอด อ.สามร้อยยอด จ.ประจวบคีรีขันธ์',
    latitude: 12.2053,
    longitude: 99.9664,
    amenities: ['Wi-Fi ฟรี', 'วิวทะเล', 'ร้านอาหาร', 'ที่จอดรถ'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4'],
    isFeatured: false,
    rating: 4.3
  }
];

async function main() {
  try {
    console.log('🌱 เริ่มเพิ่มข้อมูลที่พัก...\n');

    // เพิ่มข้อมูลที่พักภาคเหนือ
    console.log('📍 กำลังเพิ่มที่พักภาคเหนือ...');
    for (const accommodation of northernAccommodations) {
      const province = await prisma.province.findUnique({
        where: { slug: accommodation.provinceSlug },
        include: { region: true }
      });

      if (!province) {
        console.log(`⚠️  ไม่พบจังหวัด: ${accommodation.provinceSlug}`);
        continue;
      }

      // ตรวจสอบว่ามีที่พักนี้แล้วหรือไม่
      const existing = await prisma.accommodation.findUnique({
        where: { slug: accommodation.slug }
      });

      if (existing) {
        console.log(`⏭️  มีที่พักนี้แล้ว: ${accommodation.name}`);
        continue;
      }

      await prisma.accommodation.create({
        data: {
          name: accommodation.name,
          slug: accommodation.slug,
          description: accommodation.description,
          shortDesc: accommodation.shortDesc,
          regionId: province.regionId,
          provinceId: province.id,
          pricePerNight: accommodation.pricePerNight,
          maxGuests: accommodation.maxGuests,
          address: accommodation.address,
          latitude: accommodation.latitude,
          longitude: accommodation.longitude,
          amenities: JSON.stringify(accommodation.amenities),
          images: JSON.stringify(accommodation.images),
          isAvailable: true,
          isFeatured: accommodation.isFeatured || false,
          rating: accommodation.rating || 4.0,
        },
      });

      console.log(`✅ เพิ่มที่พักสำเร็จ: ${accommodation.name} (${province.name})`);
    }

    console.log('\n📍 กำลังเพิ่มที่พักภาคกลาง...');
    // เพิ่มข้อมูลที่พักภาคกลาง
    for (const accommodation of centralAccommodations) {
      const province = await prisma.province.findUnique({
        where: { slug: accommodation.provinceSlug },
        include: { region: true }
      });

      if (!province) {
        console.log(`⚠️  ไม่พบจังหวัด: ${accommodation.provinceSlug}`);
        continue;
      }

      // ตรวจสอบว่ามีที่พักนี้แล้วหรือไม่
      const existing = await prisma.accommodation.findUnique({
        where: { slug: accommodation.slug }
      });

      if (existing) {
        console.log(`⏭️  มีที่พักนี้แล้ว: ${accommodation.name}`);
        continue;
      }

      await prisma.accommodation.create({
        data: {
          name: accommodation.name,
          slug: accommodation.slug,
          description: accommodation.description,
          shortDesc: accommodation.shortDesc,
          regionId: province.regionId,
          provinceId: province.id,
          pricePerNight: accommodation.pricePerNight,
          maxGuests: accommodation.maxGuests,
          address: accommodation.address,
          latitude: accommodation.latitude,
          longitude: accommodation.longitude,
          amenities: JSON.stringify(accommodation.amenities),
          images: JSON.stringify(accommodation.images),
          isAvailable: true,
          isFeatured: accommodation.isFeatured || false,
          rating: accommodation.rating || 4.0,
        },
      });

      console.log(`✅ เพิ่มที่พักสำเร็จ: ${accommodation.name} (${province.name})`);
    }

    console.log('\n🎉 เพิ่มข้อมูลที่พักเสร็จสมบูรณ์!');
    console.log(`📊 สรุป:`);
    console.log(`   - ภาคเหนือ: ${northernAccommodations.length} ที่พัก`);
    console.log(`   - ภาคกลาง: ${centralAccommodations.length} ที่พัก`);
    console.log(`   - รวมทั้งหมด: ${northernAccommodations.length + centralAccommodations.length} ที่พัก`);

  } catch (error) {
    console.error('❌ เกิดข้อผิดพลาด:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
