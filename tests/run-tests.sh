#!/bin/bash

echo "🚀 Base Encoder Chrome 擴充功能自動化測試"
echo "========================================"

# 檢查檔案是否存在
echo "📁 檢查檔案結構..."

files=(
    "manifest.json"
    "src/popup/popup.html"
    "src/popup/popup.js"
    "src/popup/popup.css"
    "src/utils/encoders.js"
    "icons/icon16.png"
    "icons/icon48.png"
    "icons/icon128.png"
)

missing_files=()
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (缺失)"
        missing_files+=("$file")
    fi
done

if [ ${#missing_files[@]} -eq 0 ]; then
    echo "🎉 所有必要檔案都存在！"
else
    echo "⚠️  缺失 ${#missing_files[@]} 個檔案"
    exit 1
fi

echo ""
echo "🔍 檢查關鍵內容..."

# 檢查 manifest.json 中的關鍵欄位
if grep -q '"manifest_version": 3' manifest.json; then
    echo "✅ Manifest 版本正確 (v3)"
else
    echo "❌ Manifest 版本錯誤"
fi

if grep -q '"default_popup": "src/popup/popup.html"' manifest.json; then
    echo "✅ Popup 路徑正確"
else
    echo "❌ Popup 路徑錯誤"
fi

# 檢查 popup.html 是否包含必要元素
if grep -q 'id="input"' src/popup/popup.html; then
    echo "✅ 輸入框元素存在"
else
    echo "❌ 輸入框元素缺失"
fi

if grep -q 'id="output"' src/popup/popup.html; then
    echo "✅ 輸出框元素存在"
else
    echo "❌ 輸出框元素缺失"
fi

if grep -q 'id="process"' src/popup/popup.html && grep -q 'id="format"' src/popup/popup.html && grep -q 'name="mode"' src/popup/popup.html; then
    echo "✅ 新版介面元素存在 (模式選擇、格式選擇、處理按鈕)"
else
    echo "❌ 新版介面元素缺失"
fi

# 檢查 JavaScript 檔案是否包含必要函數
if grep -q 'function base64Encode' src/utils/encoders.js && grep -q 'function base58Encode' src/utils/encoders.js; then
    echo "✅ 所有編碼函數存在"
else
    echo "❌ 編碼函數缺失"
fi

if grep -q 'function base64Decode' src/utils/encoders.js && grep -q 'function base58Decode' src/utils/encoders.js; then
    echo "✅ 所有解碼函數存在"
else
    echo "❌ 解碼函數缺失"
fi

if grep -q 'window.base64Encode' src/utils/encoders.js; then
    echo "✅ 函數已暴露到全域作用域"
else
    echo "❌ 函數未暴露到全域作用域"
fi

# 檢查 popup.js 是否正確引用元素
if grep -q 'getElementById("input")' src/popup/popup.js && grep -q 'getElementById("output")' src/popup/popup.js && grep -q 'getElementById("process")' src/popup/popup.js; then
    echo "✅ Popup.js 正確引用新版 DOM 元素"
else
    echo "❌ Popup.js DOM 元素引用錯誤"
fi

echo ""
echo "📊 測試摘要"
echo "============"
echo "✅ 檔案結構檢查完成"
echo "✅ 關鍵內容檢查完成"
echo ""
echo "🎯 下一步："
echo "1. 在 Chrome 中載入擴充功能 (chrome://extensions/)"
echo "2. 開啟開發者模式"
echo "3. 點擊 '載入未封裝項目'"
echo "4. 選擇這個資料夾"
echo "5. 測試編碼功能"
echo ""
echo "📋 快速測試："
echo "編碼測試 - 輸入: Hello World"
echo "  預期 Base64: SGVsbG8gV29ybGQ="
echo "中文編碼測試 - 輸入: 你好"
echo "  預期 Base64: 5L2g5aW9"
echo "解碼測試 - 輸入: SGVsbG8gV29ybGQ="
echo "  預期解碼結果: Hello World"
echo "中文解碼測試 - 輸入: 5L2g5aW9"
echo "  預期解碼結果: 你好"
echo ""
echo "🌐 測試頁面: file://$(pwd)/test-extension.html"
