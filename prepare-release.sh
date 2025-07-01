#!/bin/bash

# Chrome Web Store 發佈準備腳本
echo "🚀 準備 Chrome Web Store 發佈檔案..."

# 建立發佈目錄
mkdir -p release/base-encoder-extension/src

# 複製核心檔案
echo "📁 複製核心檔案..."
cp manifest.json release/base-encoder-extension/
cp -r src/popup release/base-encoder-extension/src/
cp -r src/utils release/base-encoder-extension/src/
cp -r icons release/base-encoder-extension/

# 複製重要文件
cp README.md release/base-encoder-extension/

# 進入發佈目錄
cd release

# 建立 ZIP 檔案
echo "📦 建立 ZIP 檔案..."
zip -r "base-encoder-extension-v1.1.zip" base-encoder-extension/ -x "*.DS_Store"

echo "✅ 發佈檔案準備完成！"
echo "📄 檔案位置: release/base-encoder-extension-v1.1.zip"
echo ""
echo "📋 檔案內容檢查："
unzip -l "base-encoder-extension-v1.1.zip"

echo ""
echo "🌐 下一步："
echo "1. 前往 Chrome Web Store Developer Dashboard"
echo "2. 上傳 base-encoder-extension-v1.1.zip"
echo "3. 填寫商店資訊"
echo "4. 提交審核"
