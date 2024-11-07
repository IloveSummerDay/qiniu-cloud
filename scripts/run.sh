#!/bin/bash

# 运行前端
echo "Starting frontend..."
cd front
npm run dev &

# 运行后端
echo "Starting backend..."
cd ../node
npm start &
