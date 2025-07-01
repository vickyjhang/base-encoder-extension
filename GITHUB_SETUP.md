# 🚀 GitHub 倉庫建立與推送指南

## 📋 步驟 1: 在 GitHub 建立倉庫

### 1.1 登入 GitHub
前往 https://github.com 並登入您的 vickyjhang 帳戶

### 1.2 建立新倉庫
1. 點擊右上角的 "+" 按鈕
2. 選擇 "New repository"
3. 填寫倉庫資訊：
   - **Repository name**: `base-encoder-extension`
   - **Description**: `🔐 Base Encoder - Chrome Extension for Base64/Base58 encoding and number base conversion`
   - **Visibility**: 選擇 Public 或 Private
   - **⚠️ 重要**: 不要勾選 "Add a README file"（我們已經有了）
   - **⚠️ 重要**: 不要選擇 .gitignore 模板（我們已經有了）
   - **⚠️ 重要**: 不要選擇 license（如需要可稍後添加）

### 1.3 建立倉庫
點擊 "Create repository" 按鈕

## 📋 步驟 2: 推送到 GitHub

建立倉庫後，GitHub 會顯示指令。請使用以下命令：

### 2.1 添加遠端倉庫
```bash
git remote add origin https://github.com/vickyjhang/base-encoder-extension.git
```

### 2.2 推送到 GitHub
```bash
git push -u origin main
```

## 🔧 完整命令序列

在終端機中執行：

```bash
# 確認當前位置
cd /Users/vicky.jhang/Documents/ai/chrome_plugin/base-encoder-extension

# 添加遠端倉庫（請確認倉庫名稱正確）
git remote add origin https://github.com/vickyjhang/base-encoder-extension.git

# 推送到 GitHub
git push -u origin main
```

## 🔐 認證選項

### 選項 1: HTTPS + Personal Access Token (推薦)
如果使用 HTTPS，您需要：
1. 在 GitHub 設定中建立 Personal Access Token
2. 使用 token 而非密碼進行認證

### 選項 2: SSH Key
如果您已設定 SSH key：
```bash
git remote add origin git@github.com:vickyjhang/base-encoder-extension.git
```

## ✅ 驗證推送成功

推送完成後：
1. 前往 https://github.com/vickyjhang/base-encoder-extension
2. 確認所有檔案都已上傳
3. 檢查 README.md 是否正確顯示

## 🎯 後續操作

### 更新 README.md
建議在 GitHub 倉庫中添加：
- 專案徽章 (badges)
- Chrome Web Store 連結（發佈後）
- 安裝說明
- 貢獻指南

### 設定 GitHub Pages (可選)
可以將 screenshot-generator.html 等工具頁面部署到 GitHub Pages

### 設定 Issues 和 Projects
啟用 Issues 功能來追蹤 bug 和功能請求

---

**準備好後，請執行上述命令將專案推送到 GitHub！** 🚀
