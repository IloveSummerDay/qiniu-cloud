@echo off

REM 运行前端
echo Starting frontend...
cd front
start cmd /c "npm run dev"

REM 运行后端
echo Starting backend...
cd ../node
start cmd /c "npm start"
