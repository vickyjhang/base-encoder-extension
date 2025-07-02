#!/bin/bash

# Firefox 版本功能測試腳本

echo "🧪 Firefox Base Encoder 功能測試"
echo "================================="

# 檢查 Firefox 版本目錄
if [ ! -d "firefox-extension" ]; then
    echo "❌ 錯誤：請在專案根目錄執行此腳本"
    exit 1
fi

echo "📁 檢查檔案結構..."
files_to_check=(
    "firefox-extension/manifest.json"
    "firefox-extension/src/popup/popup.html"
    "firefox-extension/src/popup/popup.js"
    "firefox-extension/src/popup/popup.css"
    "firefox-extension/src/utils/encoders.js"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file 遺失"
    fi
done

echo ""
echo "🔍 檢查 JavaScript 函數調用..."

# 檢查是否有正確的函數調用
echo "📝 編碼/解碼函數："
if grep -q "base64Encode\|base58Encode" firefox-extension/src/popup/popup.js; then
    echo "✅ 編碼函數調用正確"
else
    echo "❌ 編碼函數調用錯誤"
fi

if grep -q "base64Decode\|base58Decode" firefox-extension/src/popup/popup.js; then
    echo "✅ 解碼函數調用正確"
else
    echo "❌ 解碼函數調用錯誤"
fi

echo "🔢 進制轉換函數："
if grep -q "baseConvert" firefox-extension/src/popup/popup.js; then
    echo "✅ 進制轉換函數調用正確"
else
    echo "❌ 進制轉換函數調用錯誤"
fi

echo "🌐 Unicode 函數："
if grep -q "unicodeEncode\|unicodeDecode" firefox-extension/src/popup/popup.js; then
    echo "✅ Unicode 函數調用正確"
else
    echo "❌ Unicode 函數調用錯誤"
fi

echo ""
echo "🔧 檢查 encoders.js 函數定義..."

functions_to_check=(
    "base64Encode"
    "base64Decode"
    "base58Encode"
    "base58Decode"
    "baseConvert"
    "unicodeEncode"
    "unicodeDecode"
)

for func in "${functions_to_check[@]}"; do
    if grep -q "function $func" firefox-extension/src/utils/encoders.js; then
        echo "✅ $func 函數已定義"
    else
        echo "❌ $func 函數未找到"
    fi
done

echo ""
echo "🦊 檢查 Firefox 特有配置..."

# 檢查 manifest.json
if grep -q '"manifest_version": 2' firefox-extension/manifest.json; then
    echo "✅ Manifest V2 格式正確"
else
    echo "❌ Manifest 版本錯誤"
fi

if grep -q '"browser_action"' firefox-extension/manifest.json; then
    echo "✅ browser_action 配置正確"
else
    echo "❌ browser_action 配置錯誤"
fi

if grep -q '"browser_specific_settings"' firefox-extension/manifest.json; then
    echo "✅ Firefox browser_specific_settings 配置正確"
else
    echo "❌ Firefox browser_specific_settings 配置錯誤"
fi

# 檢查最低版本要求
min_version=$(grep '"strict_min_version"' firefox-extension/manifest.json | sed 's/.*"strict_min_version": *"\([^"]*\)".*/\1/')
version_check=$(echo "$min_version" | awk -F. '{print ($1*10000) + ($2*100) + $3}')
required_version=1090000  # 109.0 = 109*10000 + 0*100 + 0
if [ "$version_check" -ge "$required_version" ]; then
    echo "✅ 最低版本要求正確：$min_version (符合 Firefox for Android 要求 ≥109.0)"
else
    echo "❌ 最低版本要求錯誤：$min_version (建議設定為 ≥109.0 以支援 Firefox for Android)"
fi

echo ""
echo "📦 檢查建構結果..."
if [ -f "release/base-encoder-firefox-v1.2.xpi" ]; then
    echo "✅ XPI 檔案已建構"
    echo "📊 檔案大小：$(du -h release/base-encoder-firefox-v1.2.xpi | cut -f1)"
else
    echo "❌ XPI 檔案未找到"
fi

echo ""
echo "🎯 測試摘要"
echo "==========="
echo "✅ 如果所有檢查都通過，Firefox 版本應該可以正常運作"
echo "🔧 如果有錯誤，請根據上面的提示進行修正"
echo ""
echo "🚀 下一步："
echo "1. 在 Firefox 中載入擴充功能進行測試"
echo "2. 前往 about:debugging → This Firefox → Load Temporary Add-on"
echo "3. 選擇 firefox-extension/manifest.json 或 release/base-encoder-firefox-v1.2.xpi"
echo "4. 測試所有功能是否正常運作"
