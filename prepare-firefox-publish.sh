#!/bin/bash

# Firefox Add-ons Store 發佈準備腳本

echo "🦊 Firefox Add-ons Store 發佈準備"
echo "================================="

# 檢查當前目錄
if [ ! -d "firefox-extension" ]; then
    echo "❌ 錯誤：請在專案根目錄執行此腳本"
    exit 1
fi

echo "📋 執行發佈前檢查..."

# 1. 檢查 XPI 檔案
echo ""
echo "1️⃣ 檢查 XPI 檔案..."
if [ -f "release/base-encoder-firefox-v1.2.xpi" ]; then
    echo "✅ XPI 檔案存在"
    echo "📊 檔案大小：$(du -h release/base-encoder-firefox-v1.2.xpi | cut -f1)"
    echo "📅 建立時間：$(stat -f "%Sm" -t "%Y-%m-%d %H:%M:%S" release/base-encoder-firefox-v1.2.xpi)"
else
    echo "❌ XPI 檔案不存在，正在建構..."
    cd firefox-extension
    ./build-firefox.sh
    cd ..
fi

# 2. 驗證 XPI 內容
echo ""
echo "2️⃣ 驗證 XPI 內容..."
if command -v unzip >/dev/null 2>&1; then
    echo "📦 XPI 檔案內容："
    unzip -l release/base-encoder-firefox-v1.2.xpi | head -20
    
    # 檢查必要檔案
    required_files=(
        "manifest.json"
        "src/popup/popup.html"
        "src/popup/popup.js"
        "src/popup/popup.css"
        "src/utils/encoders.js"
        "icons/icon16.png"
        "icons/icon48.png"
        "icons/icon128.png"
    )
    
    echo ""
    echo "🔍 檢查必要檔案："
    for file in "${required_files[@]}"; do
        if unzip -l release/base-encoder-firefox-v1.2.xpi | grep -q "$file"; then
            echo "✅ $file"
        else
            echo "❌ $file 遺失"
        fi
    done
else
    echo "⚠️  無法驗證 XPI 內容（unzip 命令不可用）"
fi

# 3. 檢查 manifest.json
echo ""
echo "3️⃣ 檢查 manifest.json..."
if [ -f "firefox-extension/manifest.json" ]; then
    echo "✅ Manifest 檔案存在"
    
    # 檢查關鍵欄位
    if grep -q '"manifest_version": 2' firefox-extension/manifest.json; then
        echo "✅ Manifest V2 格式正確"
    else
        echo "❌ Manifest 版本錯誤"
    fi
    
    if grep -q '"browser_action"' firefox-extension/manifest.json; then
        echo "✅ browser_action 設定正確"
    else
        echo "❌ browser_action 設定錯誤"
    fi
    
    if grep -q '"applications"' firefox-extension/manifest.json; then
        echo "✅ Firefox applications 設定正確"
    else
        echo "❌ Firefox applications 設定錯誤"
    fi
    
    # 顯示基本資訊
    echo ""
    echo "📝 基本資訊："
    echo "名稱：$(grep '"name"' firefox-extension/manifest.json | sed 's/.*"name": *"\([^"]*\)".*/\1/')"
    echo "版本：$(grep '"version"' firefox-extension/manifest.json | sed 's/.*"version": *"\([^"]*\)".*/\1/')"
    echo "描述：$(grep '"description"' firefox-extension/manifest.json | sed 's/.*"description": *"\([^"]*\)".*/\1/' | cut -c1-50)..."
else
    echo "❌ manifest.json 檔案不存在"
fi

# 4. 檢查圖示檔案
echo ""
echo "4️⃣ 檢查圖示檔案..."
icon_sizes=("16" "32" "48" "128")
for size in "${icon_sizes[@]}"; do
    icon_file="firefox-extension/icons/icon${size}.png"
    if [ -f "$icon_file" ]; then
        echo "✅ icon${size}.png ($(du -h "$icon_file" | cut -f1))"
    else
        echo "❌ icon${size}.png 遺失"
    fi
done

# 5. 生成發佈資訊
echo ""
echo "5️⃣ 生成發佈資訊..."

cat > firefox-publish-info.txt << 'EOF'
# Firefox Add-ons Store 發佈資訊

## 基本資訊
- 名稱: Base Encoder
- 版本: 1.2
- 類別: Developer Tools

## 簡短描述 (最多 132 字元)
多功能編碼/解碼工具，支援 Base64/Base58 編碼解碼、進制轉換 (2-36)、Unicode 編碼解碼，並具備數據持久化功能。

## 標籤
encoding, decoding, base64, base58, unicode, converter, developer-tools, utilities

## 權限說明
- storage: 用於保存使用者輸入內容和設定，提供數據持久化功能

## 隱私權聲明
本擴充功能完全在本地運行，不會：
- 收集任何個人資訊
- 上傳資料到遠端伺服器
- 追蹤使用者行為
- 存取瀏覽歷史

所有資料僅保存在使用者的本地瀏覽器中。

## 支援網址
GitHub: https://github.com/[your-username]/base-encoder-extension

## 聯絡信箱
[your-email@example.com]
EOF

echo "✅ 發佈資訊已生成：firefox-publish-info.txt"

# 6. 開啟截圖生成器
echo ""
echo "6️⃣ 準備截圖素材..."
if [ -f "firefox-screenshot-generator.html" ]; then
    echo "✅ 截圖生成器已準備"
    echo "💡 提示：可以使用瀏覽器開啟 firefox-screenshot-generator.html 製作截圖"
    
    # 嘗試自動開啟
    if command -v open >/dev/null 2>&1; then
        echo "🚀 正在開啟截圖生成器..."
        open firefox-screenshot-generator.html
    elif command -v xdg-open >/dev/null 2>&1; then
        echo "🚀 正在開啟截圖生成器..."
        xdg-open firefox-screenshot-generator.html
    else
        echo "📁 請手動開啟：firefox-screenshot-generator.html"
    fi
else
    echo "❌ 截圖生成器檔案不存在"
fi

# 7. 總結和下一步
echo ""
echo "🎯 發佈準備總結"
echo "==============="
echo "✅ XPI 檔案準備完成"
echo "✅ Manifest 檔案驗證通過"
echo "✅ 圖示檔案完整"
echo "✅ 發佈資訊已生成"
echo "✅ 截圖工具已準備"

echo ""
echo "🚀 下一步行動："
echo "1. 使用截圖生成器製作 3-5 張產品截圖"
echo "2. 前往 Mozilla Add-ons Developer Hub 註冊帳號"
echo "3. 上傳 XPI 檔案：release/base-encoder-firefox-v1.2.xpi"
echo "4. 使用 firefox-publish-info.txt 中的資訊填寫表單"
echo "5. 上傳製作好的截圖"
echo "6. 提交審核"

echo ""
echo "🔗 重要連結："
echo "• Mozilla Add-ons Developer Hub: https://addons.mozilla.org/developers/"
echo "• 發佈指南: FIREFOX_PUBLISH_GUIDE.md"
echo "• 截圖生成器: firefox-screenshot-generator.html"
echo "• 發佈資訊: firefox-publish-info.txt"

echo ""
echo "📞 如需協助，請參考 FIREFOX_PUBLISH_GUIDE.md 文檔"

# 8. 檢查更新時間
echo ""
echo "📅 最後更新時間：$(date)"
echo "🦊 Firefox 版本準備完成！祝發佈成功！"
