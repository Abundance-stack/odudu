@echo off
echo ========================================
echo UISS Backend Installation Script
echo ========================================
echo.

echo [1/4] Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)
echo Node.js is installed!
echo.

echo [2/4] Installing dependencies...
call npm install
if errorlevel 1 (
    echo ERROR: Failed to install dependencies!
    pause
    exit /b 1
)
echo Dependencies installed successfully!
echo.

echo [3/4] Setting up environment file...
if not exist .env (
    copy .env.example .env
    echo .env file created! Please update it with your credentials.
) else (
    echo .env file already exists.
)
echo.

echo [4/4] Checking MongoDB...
echo Please make sure MongoDB is installed and running.
echo.

echo ========================================
echo Installation Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Update .env file with your credentials
echo 2. Start MongoDB service
echo 3. Run: npm run dev
echo.
pause
