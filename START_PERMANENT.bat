@echo off
REM ===============================================
REM  ExamHotel - เริ่มเว็บถาวร (ด้วย PM2)
REM ===============================================
REM ต้องรันด้วยสิทธิ์ Administrator

echo ============================================
echo  ExamHotel - Starting Permanent Server
echo ============================================
echo.

REM ตรวจสอบสิทธิ์ Administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    color 0C
    echo [ERROR] สคริปต์นี้ต้องรันด้วยสิทธิ์ Administrator
    echo.
    echo กรุณาคลิกขวาที่ไฟล์ START_PERMANENT.bat และเลือก "Run as administrator"
    echo.
    pause
    exit /b 1
)

echo [INFO] กำลังตรวจสอบว่ามี PM2 หรือไม่...
pm2 --version >nul 2>&1
if %errorLevel% neq 0 (
    echo [ERROR] ไม่พบ PM2 กรุณาติดตั้งก่อน: npm install -g pm2
    pause
    exit /b 1
)

echo [OK] พบ PM2
pm2 --version

cd /d C:\Users\Admin\exam-claude

echo.
echo [INFO] กำลังหยุด ExamHotel เดิม (ถ้ามี)...
pm2 delete examhotel >nul 2>&1

echo [INFO] กำลังเริ่ม ExamHotel บน port 80...
pm2 start ecosystem.config.js

echo.
echo [INFO] บันทึกการตั้งค่าให้เริ่มอัตโนมัติ...
pm2 save

echo [INFO] ตั้งค่าให้ PM2 เริ่มตอน boot (เลือก startup script)...
echo คำสั่งถัดไปต้อง copy และรันใน PowerShell (Admin):
pm2 startup

echo.
echo ============================================
echo  ExamHotel กำลังรันอยู่!
echo ============================================
echo.
echo เข้าใช้งานได้ที่:
echo   - http://localhost
echo   - http://192.168.0.130
echo   - http://examhotel (ถ้าตั้งค่า hosts แล้ว)
echo.
echo จากโทรศัพท์ (WiFi เดียวกัน):
echo   - http://192.168.0.130
echo.
echo คำสั่งจัดการ:
echo   pm2 status       - ดูสถานะ
echo   pm2 logs         - ดู logs
echo   pm2 restart all  - รีสตาร์ท
echo   pm2 stop all     - หยุด
echo   pm2 start all    - เริ่มใหม่
echo   pm2 delete all   - ลบทั้งหมด
echo.
pause
