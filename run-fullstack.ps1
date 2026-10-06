# Maison Solene Full Stack PowerShell Runner
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host "   Starting Maison Solene Full Stack Application        " -ForegroundColor Yellow
Write-Host "========================================================" -ForegroundColor Cyan
Write-Host ""

$env:PATH = "C:\Program Files\nodejs;" + $env:PATH
$backendPath = Join-Path $PSScriptRoot "backend"
$frontendPath = Join-Path $PSScriptRoot "frontend"

Write-Host "Starting Backend API on http://localhost:5000/api ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$env:PATH = 'C:\Program Files\nodejs;' + `$env:PATH; cd '$backendPath'; npm.cmd start"

Start-Sleep -Seconds 2

Write-Host "Starting Frontend App on http://localhost:3000/ ..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "`$env:PATH = 'C:\Program Files\nodejs;' + `$env:PATH; cd '$frontendPath'; npm.cmd run dev"

Write-Host ""
Write-Host "Both servers are launching!" -ForegroundColor Cyan
Write-Host "  ✦ Frontend: http://localhost:3000/" -ForegroundColor White
Write-Host "  ✦ Backend:  http://localhost:5000/api" -ForegroundColor White
