#!/bin/bash

# ============================================
# RideNEarn - Production Start Script (PM2)
# Keeps the app running even if terminal closes
# Auto-restarts on crash, survives reboots
# ============================================

set -e

APP_DIR="$(cd "$(dirname "$0")" && pwd)"
PORT="${PORT:-3000}"
APP_NAME="ridenearn"

echo "🚀 RideNEarn Deployment Script (PM2)"
echo "======================================"

cd "$APP_DIR"

# Step 1: Install pm2 globally if not present
if ! command -v pm2 &> /dev/null; then
  echo "📦 Installing PM2 globally..."
  npm install -g pm2
fi

# Step 2: Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing project dependencies..."
  npm install
fi

# Step 3: Build for production
echo "🔨 Building production bundle..."
npm run build

# Step 4: Stop existing instance if running
pm2 delete "$APP_NAME" 2>/dev/null || true

# Step 5: Start with PM2
echo "✅ Starting RideNEarn on port $PORT with PM2..."
pm2 start npm --name "$APP_NAME" -- start -- -p "$PORT"

# Step 6: Save PM2 process list (survives reboot)
pm2 save

# Step 7: Setup PM2 startup script (survives server reboot)
echo ""
echo "🎉 RideNEarn is running!"
echo "   App:    $APP_NAME"
echo "   URL:    http://0.0.0.0:$PORT"
echo ""
echo "Useful PM2 commands:"
echo "   pm2 logs $APP_NAME     — View live logs"
echo "   pm2 status             — Check status"
echo "   pm2 restart $APP_NAME  — Restart app"
echo "   pm2 stop $APP_NAME     — Stop app"
echo "   pm2 delete $APP_NAME   — Remove from PM2"
echo ""
echo "To survive server reboots, run:"
echo "   pm2 startup"
echo "   (then run the command it outputs)"
