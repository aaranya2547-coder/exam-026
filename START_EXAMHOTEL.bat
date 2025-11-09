@echo off
REM สคริปต์สำหรับเริ่ม ExamHotel บน port 80
REM ต้องรันด้วยสิทธิ์ Administrator

echo ============================================
echo  ExamHotel - Starting Server
echo ============================================
echo.

REM ตรวจสอบสิทธิ์ Administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] สคริปต์นี้ต้องรันด้วยสิทธิ์ Administrator
    echo.
    echo กรุณาคลิกขวาที่ไฟล์ START_EXAMHOTEL.bat และเลือก "Run as administrator"
    echo.
    pause
    exit /b 1
)

echo [INFO] กำลังตรวจสอบว่ามี Node.js หรือไม่...
node --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] ไม่พบ Node.js กรุณาติดตั้ง Node.js ก่อน
    pause
    exit /b 1
)

echo [INFO] Node.js version:
node --version

echo.
echo [INFO] กำลังเริ่มเซิร์ฟเวอร์บน port 80...
echo.
echo ============================================
echo  ExamHotel กำลังรันที่:
echo  - http://localhost
echo  - http://examhotel
echo  - http://127.0.0.1
echo ============================================
echo.
echo กด Ctrl+C เพื่อหยุดเซิร์ฟเวอร์
echo.

npm run dev:80
