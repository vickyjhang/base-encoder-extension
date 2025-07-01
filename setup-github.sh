#!/bin/bash

# 🚀 Base Encoder - GitHub 推送腳本
echo "🔐 Base Encoder - GitHub 推送設定"
echo "================================="

# 檢查當前 git 狀態
echo "📋 檢查 git 狀態..."
git status

echo ""
echo "🔗 GitHub 倉庫設定指南："
echo "========================"
echo ""
echo "1. 前往 https://github.com/vickyjhang"
echo "2. 點擊 'New repository' 或 '新增倉庫'"
echo "3. 倉庫名稱設定為: base-encoder-extension"
echo "4. 描述: Chrome Extension for Base64/Base58 encoding and number base conversion"
echo "5. 設定為 Public (或 Private)"
echo "6. ⚠️  不要勾選 'Add a README file'"
echo "7. ⚠️  不要選擇 .gitignore 模板"
echo "8. 點擊 'Create repository'"
echo ""

# 提示使用者建立倉庫
read -p "✅ 已在 GitHub 建立倉庫了嗎？ (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔗 設定遠端倉庫..."
    
    # 移除可能存在的遠端倉庫
    git remote remove origin 2>/dev/null || true
    
    # 添加遠端倉庫
    echo "添加遠端倉庫: https://github.com/vickyjhang/base-encoder-extension.git"
    git remote add origin https://github.com/vickyjhang/base-encoder-extension.git
    
    echo ""
    echo "🚀 推送到 GitHub..."
    echo "如果需要認證，請使用您的 GitHub 帳號和 Personal Access Token"
    echo ""
    
    # 推送到 GitHub
    git push -u origin main
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ 成功推送到 GitHub！"
        echo "🔗 專案網址: https://github.com/vickyjhang/base-encoder-extension"
        echo ""
        echo "🎯 下一步："
        echo "- 檢查 GitHub 上的檔案是否完整"
        echo "- 設定倉庫描述和標籤"
        echo "- 建立 Release（可選）"
    else
        echo ""
        echo "❌ 推送失敗！"
        echo ""
        echo "可能的解決方案："
        echo "1. 檢查倉庫名稱是否正確"
        echo "2. 確認 GitHub 帳號權限"
        echo "3. 檢查網路連線"
        echo "4. 使用 Personal Access Token 進行認證"
    fi
else
    echo ""
    echo "📋 請先在 GitHub 建立倉庫，然後重新執行此腳本"
    echo "倉庫網址範例: https://github.com/vickyjhang/base-encoder-extension"
fi

echo ""
echo "📚 更多資源："
echo "- GitHub 倉庫建立指南: https://docs.github.com/en/get-started/quickstart/create-a-repo"
echo "- Personal Access Token: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token"
