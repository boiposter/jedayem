@echo off
chcp 65001 >nul 2>&1
cd /d "%~dp0"
echo.
echo  ===================================
echo    Pushing Jedayem to GitHub
echo  ===================================
echo.

git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo  ERROR: Git is not installed!
    echo  Download it from: https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)

echo  Initializing git repo...
git init
git checkout -b main

echo.
echo  Adding files...
git add -A

echo.
echo  Creating commit...
git commit -m "Initial commit - Jedayem v2.0"

echo.
echo  Pushing to GitHub...
git remote add origin https://github.com/boiposter/jedayem.git 2>nul
git remote set-url origin https://github.com/boiposter/jedayem.git
git push -u origin main

echo.
if %errorlevel% equ 0 (
    echo  SUCCESS! Code pushed to GitHub.
    echo  https://github.com/boiposter/jedayem
) else (
    echo  Push failed. You may need to sign in to GitHub.
    echo  Try running: git push -u origin main
)
echo.
pause
