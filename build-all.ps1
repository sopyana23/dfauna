Write-Host "==============================================" -ForegroundColor Green
Write-Host "Building DFauna Desktop and Mobile Frontends" -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green

Write-Host ""
Write-Host "1. Building Desktop Frontend..." -ForegroundColor Cyan
cd frontend-desktop
npm run build
cd ..

Write-Host ""
Write-Host "2. Building Mobile Frontend..." -ForegroundColor Cyan
cd frontend-mobile
npm run build
cd ..

Write-Host ""
Write-Host "==============================================" -ForegroundColor Green
Write-Host "Build complete! Files compiled into Laravel public folder." -ForegroundColor Green
Write-Host "==============================================" -ForegroundColor Green
