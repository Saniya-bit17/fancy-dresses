@echo off
title Maison Solene Full Stack Launcher
echo ========================================================
echo    Starting Maison Solene Haute Couture Full Stack
echo ========================================================
echo.

echo Starting Backend API on http://localhost:5000/api ...
start "Maison Solene - Backend API" cmd /k "cd backend && npm start"

echo Waiting 2 seconds for backend initialization...
timeout /t 2 /nobreak >nul

echo Starting Frontend App on http://localhost:3000/ ...
start "Maison Solene - Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo Both servers have been launched in separate windows!
echo Frontend: http://localhost:3000/
echo Backend:  http://localhost:5000/api
echo ========================================================
pause
