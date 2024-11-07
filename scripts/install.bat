@echo off

REM 安装前端
echo Installing frontend...
cd front
start cmd /c "npm install"

REM 安装后端
echo Installing backend...
cd ../node
start cmd /c "npm install"
