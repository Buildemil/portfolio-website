#!/bin/bash

echo "🚀 Building portfolio for production..."

# Install dependencies
npm install

# Build the project
npm run build

echo "✅ Build complete! Files are in the 'out/' directory"
echo ""
echo "📦 Deploy options:"
echo "1. Vercel: vercel --prod"
echo "2. Netlify: netlify deploy --prod --dir=out"
echo "3. Manual: Upload contents of 'out/' folder to your host"
