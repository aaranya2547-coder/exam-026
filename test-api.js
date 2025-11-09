// สคริปต์ทดสอบ API ทั้งหมด
const API_BASE = 'http://localhost:3000';

async function testAPI(name, url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      console.log(`✅ ${name}: OK`);
      if (data.count !== undefined) {
        console.log(`   📊 จำนวน: ${data.count} รายการ`);
      }
      if (data.data && Array.isArray(data.data)) {
        console.log(`   📊 จำนวน: ${data.data.length} รายการ`);
      }
      return true;
    } else {
      console.log(`❌ ${name}: FAILED (${response.status})`);
      console.log(`   ข้อผิดพลาด: ${data.message || 'Unknown error'}`);
      return false;
    }
  } catch (error) {
    console.log(`❌ ${name}: ERROR`);
    console.log(`   ${error.message}`);
    return false;
  }
}

async function runTests() {
  console.log('🧪 เริ่มทดสอบ API...\n');

  const tests = [
    // Regions API
    { name: 'GET /api/regions', url: `${API_BASE}/api/regions` },

    // Provinces API
    { name: 'GET /api/provinces', url: `${API_BASE}/api/provinces` },
    { name: 'GET /api/provinces?regionSlug=north', url: `${API_BASE}/api/provinces?regionSlug=north` },
    { name: 'GET /api/provinces?regionSlug=central', url: `${API_BASE}/api/provinces?regionSlug=central` },

    // Accommodations API
    { name: 'GET /api/accommodations', url: `${API_BASE}/api/accommodations` },
    { name: 'GET /api/accommodations?featured=true', url: `${API_BASE}/api/accommodations?featured=true` },
    { name: 'GET /api/accommodations?regionSlug=north', url: `${API_BASE}/api/accommodations?regionSlug=north` },
    { name: 'GET /api/accommodations?regionSlug=central', url: `${API_BASE}/api/accommodations?regionSlug=central` },
    { name: 'GET /api/accommodations?provinceSlug=chiang-mai', url: `${API_BASE}/api/accommodations?provinceSlug=chiang-mai` },
    { name: 'GET /api/accommodations?provinceSlug=bangkok', url: `${API_BASE}/api/accommodations?provinceSlug=bangkok` },

    // Promotions API
    { name: 'GET /api/promotions', url: `${API_BASE}/api/promotions` },

    // Bookings API
    { name: 'GET /api/bookings', url: `${API_BASE}/api/bookings` },
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const result = await testAPI(test.name, test.url);
    if (result) {
      passed++;
    } else {
      failed++;
    }
    console.log(''); // เว้นบรรทัด
  }

  console.log('\n📊 สรุปผลการทดสอบ:');
  console.log(`   ✅ ผ่าน: ${passed}/${tests.length}`);
  console.log(`   ❌ ไม่ผ่าน: ${failed}/${tests.length}`);

  if (failed === 0) {
    console.log('\n🎉 ทดสอบ API ผ่านทั้งหมด!');
  } else {
    console.log('\n⚠️  มี API บางตัวไม่ผ่านการทดสอบ');
  }
}

runTests();
