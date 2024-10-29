#!/bin/bash

# 安装前端依赖
echo "Installing frontend dependencies..."
cd front
npm install

# 安装后端依赖
echo "Installing backend dependencies..."
cd ../node
npm install

echo "Dependencies installed successfully."
