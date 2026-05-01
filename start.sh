#!/bin/bash

# ============================================
# RideNEarn - Production Start Script (PM2)
# Optimised for: 1 vCPU / 1 GB RAM / 35 GB Disk
# ============================================

set -e

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-3000}"
APP_NAME="ridenearn"

echo "🚀 RideNEarn Deployment Script (PM2)"
echo "======================================"
echo "   Optimised for 1 vCPU / 1 GB RAM"
echo ""

cd "$APP_DIR"

# ── Step 0: Setup swap if not present (critical for 1GB RAM builds) ──
if [ "$(swapon --show | wc -l)" -le 1 ] && [ "$(id -u)" -eq 0 ]; then
  echo "💾 Setting up 1GB swap file for build safety..."
  fallocate -l 1G /swapfile 2>/dev/null || dd if=/dev/zero of=/swapfile bs=1M count=1024
  chmod 600 /swapfile
  mkswap /swapfile
  swapon /swapfile
  echo "/swapfile swap swap defaults 0 0" >> /etc/fstab
  echo "   Swap enabled ✓"
fi

# ── Step 1: Install PM2 globally if not present ──
if ! command -v pm2 &> /dev/null; then
  echo "📦 Installing PM2 globally..."
  npm install -g pm2
fi

# ── Step 2: Install dependencies ──
if [ ! -d "node_modules" ]; then
  echo "📦 Installing project dependencies..."
  npm install --prefer-offline --no-audit --no-fund
fi

# ── Step 3: Build with memory-constrained Node ──
echo "🔨 Building production bundle (memory-limited)..."
NODE_OPTIONS="--max-old-space-size=512" npm run build

# ── Step 4: Clean up dev artifacts to save RAM/disk ──
echo "🧹 Cleaning up..."
rm -rf .next/cache/webpack 2>/dev/null || true

# ── Step 5: Copy static assets into standalone (required for standalone mode) ──
echo "📂 Copying static assets into standalone output..."
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

# ── Step 6: Stop existing instance if running ──
pm2 delete "$APP_NAME" 2>/dev/null || true

# ── Step 7: Start with PM2 (memory-limited, auto-restart) ──
echo "✅ Starting RideNEarn on port $PORT..."
PORT=$PORT pm2 start node \
  --name "$APP_NAME" \
  --max-memory-restart "400M" \
  --node-args="--max-old-space-size=384" \
  -- .next/standalone/server.js

# ── Step 7: Save PM2 state (survives terminal close) ──
pm2 save

echo ""
echo "🎉 RideNEarn is running!"
echo "   App:    $APP_NAME"
echo "   URL:    http://0.0.0.0:$PORT"
echo "   Memory: capped at 400MB (auto-restart on exceed)"
echo ""
echo "Commands:"
echo "   pm2 logs $APP_NAME      — Live logs"
echo "   pm2 monit                — CPU/RAM monitor"
echo "   pm2 restart $APP_NAME   — Restart"
echo "   pm2 stop $APP_NAME      — Stop"
echo ""
echo "For reboot persistence, run:  pm2 startup"
