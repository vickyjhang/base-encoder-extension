#!/bin/bash

# 🚀 Base Encoder 發佈前快速測試腳本
# 此腳本會進行最終的檔案檢查和驗證

echo "🎯 Base Encoder - 發佈前快速檢查"
echo "=================================="

# 設定顏色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 檢查計數器
PASS=0
FAIL=0

# 檢查函數
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅ $1${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ $1 - 檔案不存在${NC}"
        ((FAIL++))
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅ $1/${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ $1/ - 目錄不存在${NC}"
        ((FAIL++))
    fi
}

echo ""
echo "📁 檢查檔案結構..."
echo "==================="

# 檢查主要檔案
check_file "manifest.json"
check_file "README.md"

# 檢查目錄結構
check_dir "src"
check_dir "src/popup"
check_dir "src/utils"
check_dir "icons"

# 檢查核心檔案
check_file "src/popup/popup.html"
check_file "src/popup/popup.js"
check_file "src/popup/popup.css"
check_file "src/utils/encoders.js"

# 檢查圖示檔案
check_file "icons/icon16.png"
check_file "icons/icon48.png"
check_file "icons/icon128.png"

echo ""
echo "📄 檢查文件檔案..."
echo "=================="

check_file "PRIVACY_POLICY.md"
check_file "CHROME_WEB_STORE_CONTENT.md"
check_file "FINAL_CHECKLIST.md"
check_file "SCREENSHOT_TEST_GUIDE.md"

echo ""
echo "🖼️ 檢查螢幕截圖工具..."
echo "======================"

check_file "screenshot-generator.html"
check_file "fallback-screenshot.html"

echo ""
echo "🔧 檢查 manifest.json 內容..."
echo "=============================="

if [ -f "manifest.json" ]; then
    # 檢查 manifest 版本
    if grep -q '"manifest_version": 3' manifest.json; then
        echo -e "${GREEN}✅ Manifest 版本: 3${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ Manifest 版本不正確${NC}"
        ((FAIL++))
    fi
    
    # 檢查名稱長度
    NAME=$(grep '"name"' manifest.json | sed 's/.*"name": "\([^"]*\)".*/\1/')
    NAME_LENGTH=${#NAME}
    if [ $NAME_LENGTH -le 45 ]; then
        echo -e "${GREEN}✅ 名稱長度: $NAME_LENGTH 字元${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ 名稱過長: $NAME_LENGTH 字元 (最大45)${NC}"
        ((FAIL++))
    fi
    
    # 檢查描述長度
    DESC=$(grep '"description"' manifest.json | sed 's/.*"description": "\([^"]*\)".*/\1/')
    DESC_LENGTH=${#DESC}
    if [ $DESC_LENGTH -le 132 ]; then
        echo -e "${GREEN}✅ 描述長度: $DESC_LENGTH 字元${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ 描述過長: $DESC_LENGTH 字元 (最大132)${NC}"
        ((FAIL++))
    fi
    
    # 檢查權限
    if grep -q '"storage"' manifest.json; then
        echo -e "${GREEN}✅ Storage 權限存在${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ Storage 權限缺失${NC}"
        ((FAIL++))
    fi
    
    # 檢查是否有不必要的權限
    if grep -q '"activeTab"\|"host_permissions"\|"tabs"' manifest.json; then
        echo -e "${YELLOW}⚠️ 發現可能不必要的權限${NC}"
    else
        echo -e "${GREEN}✅ 權限設定精簡${NC}"
        ((PASS++))
    fi
else
    echo -e "${RED}❌ 無法檢查 manifest.json${NC}"
    ((FAIL++))
fi

echo ""
echo "📊 檢查圖示檔案大小..."
echo "====================="

if [ -f "icons/icon16.png" ]; then
    SIZE16=$(identify icons/icon16.png 2>/dev/null | grep -o '[0-9]*x[0-9]*' | head -1)
    if [ "$SIZE16" = "16x16" ]; then
        echo -e "${GREEN}✅ icon16.png 尺寸: $SIZE16${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ icon16.png 尺寸錯誤: $SIZE16 (應為16x16)${NC}"
        ((FAIL++))
    fi
fi

if [ -f "icons/icon48.png" ]; then
    SIZE48=$(identify icons/icon48.png 2>/dev/null | grep -o '[0-9]*x[0-9]*' | head -1)
    if [ "$SIZE48" = "48x48" ]; then
        echo -e "${GREEN}✅ icon48.png 尺寸: $SIZE48${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ icon48.png 尺寸錯誤: $SIZE48 (應為48x48)${NC}"
        ((FAIL++))
    fi
fi

if [ -f "icons/icon128.png" ]; then
    SIZE128=$(identify icons/icon128.png 2>/dev/null | grep -o '[0-9]*x[0-9]*' | head -1)
    if [ "$SIZE128" = "128x128" ]; then
        echo -e "${GREEN}✅ icon128.png 尺寸: $SIZE128${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ icon128.png 尺寸錯誤: $SIZE128 (應為128x128)${NC}"
        ((FAIL++))
    fi
fi

echo ""
echo "🔍 檢查程式碼品質..."
echo "=================="

# 檢查 JavaScript 語法（如果有 node）
if command -v node &> /dev/null; then
    echo "檢查 JavaScript 語法..."
    if node -c src/popup/popup.js 2>/dev/null; then
        echo -e "${GREEN}✅ popup.js 語法正確${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ popup.js 語法錯誤${NC}"
        ((FAIL++))
    fi
    
    if node -c src/utils/encoders.js 2>/dev/null; then
        echo -e "${GREEN}✅ encoders.js 語法正確${NC}"
        ((PASS++))
    else
        echo -e "${RED}❌ encoders.js 語法錯誤${NC}"
        ((FAIL++))
    fi
else
    echo -e "${YELLOW}⚠️ Node.js 未安裝，跳過 JavaScript 語法檢查${NC}"
fi

# 檢查 HTML 基本結構
if grep -q '<!DOCTYPE html>' src/popup/popup.html; then
    echo -e "${GREEN}✅ popup.html 有正確的 DOCTYPE${NC}"
    ((PASS++))
else
    echo -e "${RED}❌ popup.html 缺少 DOCTYPE${NC}"
    ((FAIL++))
fi

echo ""
echo "📦 檢查發佈準備..."
echo "=================="

check_file "prepare-release.sh"

if [ -f "prepare-release.sh" ]; then
    if [ -x "prepare-release.sh" ]; then
        echo -e "${GREEN}✅ prepare-release.sh 可執行${NC}"
        ((PASS++))
    else
        echo -e "${YELLOW}⚠️ prepare-release.sh 需要執行權限${NC}"
        echo "執行: chmod +x prepare-release.sh"
    fi
fi

echo ""
echo "🎯 檢查結果總結"
echo "================"
echo -e "通過檢查: ${GREEN}$PASS${NC}"
echo -e "失敗檢查: ${RED}$FAIL${NC}"

if [ $FAIL -eq 0 ]; then
    echo ""
    echo -e "${GREEN}🎉 恭喜！所有檢查都通過了！${NC}"
    echo -e "${GREEN}✅ 您的擴充功能已準備好發佈到 Chrome Web Store${NC}"
    echo ""
    echo "下一步："
    echo "1. 執行 ./prepare-release.sh 打包"
    echo "2. 開啟螢幕截圖生成器測試下載功能"
    echo "3. 登入 Chrome Web Store 開發者控制台"
    echo "4. 上傳 ZIP 檔案並填寫商店資訊"
else
    echo ""
    echo -e "${RED}❌ 發現 $FAIL 個問題需要修正${NC}"
    echo "請根據上方的錯誤訊息進行修正，然後重新執行此腳本"
fi

echo ""
echo "📋 快速操作指令："
echo "=================="
echo "打包發佈版本:    ./prepare-release.sh"
echo "測試螢幕截圖:    open screenshot-generator.html"
echo "查看檢查清單:    cat FINAL_CHECKLIST.md"
echo "開啟開發者控制台: open https://chrome.google.com/webstore/devconsole"

echo ""
echo "🔗 有用連結："
echo "============"
echo "Chrome Web Store: https://chrome.google.com/webstore/devconsole"
echo "政策指南: https://developer.chrome.com/docs/webstore/program_policies/"
echo "開發文件: https://developer.chrome.com/docs/extensions/"
