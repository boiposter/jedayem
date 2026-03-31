@echo off
chcp 65001 >nul 2>&1
echo.
echo  ===================================
echo    Jedayem Server
echo  ===================================
echo.

cd /d "%~dp0"

echo  Checking Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo  ERROR: Node.js is not installed!
    echo  Download it from: https://nodejs.org
    echo.
    pause
    exit /b 1
)
echo  Node.js found:
node --version
echo.

if not exist node_modules (
    echo  Installing dependencies...
    echo.
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo  ERROR: npm install failed!
        echo.
        pause
        exit /b 1
    )
    echo.
    echo  Dependencies installed!
    echo.
)

echo  Starting server at http://localhost:3000
echo  Press Ctrl+C to stop
echo.
start http://localhost:3000
node server.js
if %errorlevel% neq 0 (
    echo.
    echo  ERROR: Server crashed! See error above.
    echo.
)
pause
