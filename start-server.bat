@echo off
echo Starting Nivarn Development Server...
cd /d "c:\Users\sagar\OneDrive\Desktop\nivarn[3]"
echo Current directory: %cd%
echo.
echo Checking if package.json exists:
if exist package.json (
    echo package.json found ✓
) else (
    echo package.json NOT found ✗
    exit /b 1
)
echo.
echo Starting development server...
npm run dev