@echo off
echo Starting Nivaran Development Server...
echo Current directory: %cd%

cd /d "c:\Users\sagar\OneDrive\Desktop\nivarn[3]"
echo Checking if package.json exists:

if exist package.json (
    echo package.json found ✓
) else (
    echo package.json not found ✗
    pause
    exit /b 1
)

echo.
echo Starting development server...
npm run dev

pause