@echo off
chcp 65001 >nul 2>&1
cd /d "%~dp0"
echo.
echo === DEBUG INFO ===
echo.
echo [1] Node version:
node --version 2>&1
echo.
echo [2] NPM version:
npm --version 2>&1
echo.
echo [3] Current directory:
echo %cd%
echo.
echo [4] Files in directory:
dir /b
echo.
echo [5] node_modules exists?
if exist node_modules (echo YES) else (echo NO)
echo.
echo [6] Trying to start server...
echo.
node server.js
echo.
echo [7] Exit code: %errorlevel%
echo.
pause
