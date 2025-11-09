@echo off
REM ===============================================
REM  ExamHotel - Auto Start (ไม่ต้อง Admin)
REM ===============================================

cd /d C:\Users\Admin\exam-claude

REM เริ่ม Next.js server
start /B npm run dev -- --port 3000 --hostname 0.0.0.0

echo ExamHotel กำลังเริ่มทำงาน...
echo.
echo เข้าใช้งานได้ที่:
echo   - http://localhost:3000
echo   - http://192.168.0.130:3000
echo.
echo Terminal นี้สามารถปิดได้ เว็บยังทำงานในเบื้องหลัง
