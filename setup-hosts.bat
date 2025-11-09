@echo off
REM สคริปต์สำหรับเพิ่ม examhotel เข้าไปใน hosts file
REM ต้องรันด้วยสิทธิ์ Administrator

echo.
echo ============================================
echo   ExamHotel - Setup Hosts File
echo ============================================
echo.

REM ตรวจสอบสิทธิ์ Administrator
net session >nul 2>&1
if %errorLevel% neq 0 (
    color 0C
    echo [ERROR] สคริปต์นี้ต้องรันด้วยสิทธิ์ Administrator!
    echo.
    echo วิธีแก้:
    echo   1. คลิกขวาที่ไฟล์ setup-hosts.bat
    echo   2. เลือก "Run as administrator"
    echo   3. คลิก Yes เมื่อมี UAC prompt
    echo.
    pause
    exit /b 1
)

echo [1/4] กำลังตรวจสอบไฟล์ hosts...
set HOSTS_FILE=%SystemRoot%\System32\drivers\etc\hosts

if not exist "%HOSTS_FILE%" (
    color 0C
    echo [ERROR] ไม่พบไฟล์ hosts ที่: %HOSTS_FILE%
    echo.
    pause
    exit /b 1
)

echo [OK] พบไฟล์ hosts: %HOSTS_FILE%
echo.

echo [2/4] กำลังสำรองไฟล์ hosts...
copy "%HOSTS_FILE%" "%HOSTS_FILE%.backup.%date:~-4,4%%date:~-7,2%%date:~-10,2%" >nul 2>&1
echo [OK] สำรองไฟล์เรียบร้อย
echo.

echo [3/4] กำลังเพิ่ม examhotel เข้าไฟล์ hosts...

REM ตรวจสอบว่ามี examhotel ในไฟล์แล้วหรือยัง
findstr /C:"examhotel" "%HOSTS_FILE%" >nul 2>&1
if %errorLevel% equ 0 (
    color 0E
    echo [INFO] examhotel มีในไฟล์ hosts อยู่แล้ว!
    echo.
    echo เนื้อหาที่มีอยู่:
    findstr /C:"examhotel" "%HOSTS_FILE%"
) else (
    echo.>> "%HOSTS_FILE%"
    echo # ExamHotel - Local Development >> "%HOSTS_FILE%"
    echo 127.0.0.1    examhotel >> "%HOSTS_FILE%"
    echo 127.0.0.1    www.examhotel >> "%HOSTS_FILE%"
    color 0A
    echo [SUCCESS] เพิ่ม examhotel เข้าไฟล์ hosts สำเร็จ!
)
echo.

echo [4/4] กำลังล้าง DNS Cache...
ipconfig /flushdns >nul 2>&1
echo [OK] ล้าง DNS Cache เรียบร้อย
echo.

REM ทดสอบ ping
echo กำลังทดสอบการเชื่อมต่อ...
ping -n 1 examhotel >nul 2>&1
if %errorLevel% equ 0 (
    color 0A
    echo [SUCCESS] ทดสอบเชื่อมต่อสำเร็จ!
) else (
    color 0E
    echo [WARNING] ยังเชื่อมต่อไม่ได้ ลองปิดเบราว์เซอร์และเปิดใหม่
)
echo.

color 0A
echo ============================================
echo   ✓✓✓ ติดตั้งเสร็จสมบูรณ์! ✓✓✓
echo ============================================
echo.
echo ตอนนี้คุณสามารถเข้าใช้งานได้ที่:
echo   ► http://examhotel:3000  (เซิร์ฟเวอร์ port 3000)
echo   ► http://examhotel       (เซิร์ฟเวอร์ port 80)
echo.
echo ขั้นตอนถัดไป:
echo   1. รันเซิร์ฟเวอร์:
echo      - Port 3000: npm run dev
echo      - Port 80: คลิกขวา START_EXAMHOTEL.bat (Admin)
echo.
echo   2. เปิดเบราว์เซอร์ไปที่ URL ด้านบน
echo.
echo หมายเหตุ:
echo   - ไฟล์สำรองอยู่ที่: %HOSTS_FILE%.backup.*
echo   - ถ้าเข้าไม่ได้ให้ลอง: ping examhotel
echo.
pause
