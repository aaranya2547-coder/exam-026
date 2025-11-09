@echo off
REM ===============================================
REM  ExamHotel - หยุดเซิร์ฟเวอร์
REM ===============================================

echo ============================================
echo  ExamHotel - Stopping Server
echo ============================================
echo.

echo [INFO] กำลังหยุดเซิร์ฟเวอร์ PM2...
pm2 stop examhotel

echo.
echo [OK] หยุดเซิร์ฟเวอร์สำเร็จ
echo.
echo ต้องการเริ่มใหม่? รัน: START_PERMANENT.bat
echo.
pause
