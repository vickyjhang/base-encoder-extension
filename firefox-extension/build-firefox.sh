#!/bin/bash

# Firefox 版本建構腳本
# 建立 Firefox Add-on 的 XPI 檔案

echo "🦊 開始建構 Firefox Base Encoder 擴充功能..."

# 檢查是否在正確的目錄
if [ ! -f "manifest.json" ]; then
    echo "❌ 錯誤：請在 firefox-extension 目錄中執行此腳本"
    exit 1
fi

# 建立 release 目錄
mkdir -p ../release

# 設定檔案名稱
VERSION=$(grep '"version"' manifest.json | sed 's/.*"version": *"\([^"]*\)".*/\1/')
XPI_NAME="base-encoder-firefox-v${VERSION}.xpi"
RELEASE_PATH="../release/${XPI_NAME}"

echo "📦 版本: ${VERSION}"
echo "📁 輸出檔案: ${XPI_NAME}"

# 刪除舊的 XPI 檔案
if [ -f "${RELEASE_PATH}" ]; then
    rm "${RELEASE_PATH}"
    echo "🗑️  已刪除舊版本檔案"
fi

# 建立 XPI 檔案 (排除不需要的檔案)
echo "🔨 正在建立 XPI 檔案..."
zip -r "${RELEASE_PATH}" . \
    -x "*.DS_Store" \
    -x "*.git*" \
    -x "build-firefox.sh" \
    -x "*.md" \
    -x "*.txt" \
    -x "test-firefox.html" \
    -x "__pycache__/*" \
    -x "*.pyc" \
    -x "node_modules/*" \
    -x ".vscode/*" \
    -x "*.log"

# 檢查建構結果
if [ $? -eq 0 ]; then
    echo "✅ 建構成功！"
    echo "📋 檔案資訊："
    ls -lh "${RELEASE_PATH}"
    echo ""
    echo "📦 XPI 內容："
    unzip -l "${RELEASE_PATH}"
    echo ""
    echo "🚀 可以在 Firefox 中測試或上傳到 Firefox Add-ons Store"
    echo "   測試方式：about:debugging → This Firefox → Load Temporary Add-on"
    echo "   檔案位置：${RELEASE_PATH}"
else
    echo "❌ 建構失敗"
    exit 1
fi
