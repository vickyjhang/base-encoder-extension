# 🦊 Firefox Base Encoder 安裝指南

## 📋 安裝方式

### 方法一：開發者模式安裝（推薦用於測試）

1. **開啟 Firefox 除錯頁面**
   - 在 Firefox 網址列輸入：`about:debugging`
   - 或者使用快捷鍵：`Ctrl+Shift+Alt+I` (Windows/Linux) 或 `Cmd+Shift+Alt+I` (macOS)

2. **載入擴充功能**
   - 點擊左側的「This Firefox」
   - 點擊「Load Temporary Add-on...」按鈕
   - 選擇 `firefox-extension` 資料夾中的 `manifest.json` 檔案
   - 或者選擇建構好的 `base-encoder-firefox-v1.2.xpi` 檔案

3. **確認安裝**
   - 擴充功能應該出現在擴充功能清單中
   - Firefox 工具列應該出現 Base Encoder 圖示

### 方法二：XPI 檔案安裝

1. **建構 XPI 檔案**
   ```bash
   cd firefox-extension
   ./build-firefox.sh
   ```

2. **安裝 XPI 檔案**
   - 拖拽 `release/base-encoder-firefox-v1.2.xpi` 到 Firefox 視窗
   - 或者在 `about:debugging` 中選擇該 XPI 檔案

## 🔧 測試安裝

1. **功能測試**
   - 點擊工具列上的 Base Encoder 圖示
   - 確認彈出視窗正常顯示
   - 測試各項功能是否正常

2. **使用測試頁面**
   - 開啟 `test-firefox.html` 進行完整測試
   - 按照測試步驟逐一驗證功能

## 🚀 Firefox Add-ons Store 發佈

### 準備工作

1. **註冊開發者帳號**
   - 前往 [Firefox Add-ons Developer Hub](https://addons.mozilla.org/developers/)
   - 使用 Firefox 帳號登入

2. **準備必要資料**
   - XPI 檔案（已建構完成）
   - 擴充功能描述
   - 截圖素材（1-5 張）
   - 隱私權政策

### 上傳步驟

1. **建立新的附加元件**
   - 登入開發者後台
   - 點擊「Submit a New Add-on」
   - 選擇「On this site」

2. **上傳 XPI 檔案**
   - 選擇建構好的 `base-encoder-firefox-v1.2.xpi`
   - 等待自動驗證完成

3. **填寫詳細資訊**
   - **名稱**：Base Encoder
   - **摘要**：多功能編碼/解碼工具，支援 Base64/Base58 編碼解碼、進制轉換、Unicode 編碼解碼
   - **描述**：詳細說明功能特色
   - **類別**：Developer Tools
   - **標籤**：encoding, decoding, base64, base58, unicode, converter

4. **上傳截圖**
   - 準備 1-5 張功能截圖
   - 建議尺寸：至少 600x400 像素
   - 展示主要功能介面

5. **設定權限和隱私**
   - 說明 storage 權限的用途
   - 確認隱私權政策

### 審核過程

1. **自動驗證**
   - 檢查 manifest.json 格式
   - 掃描潛在安全問題
   - 驗證程式碼品質

2. **人工審核**
   - Mozilla 團隊人工審核
   - 通常需要 1-7 天
   - 可能要求修正問題

3. **發佈**
   - 審核通過後自動發佈
   - 使用者可在 Firefox Add-ons Store 搜尋到

## 🔍 常見問題

### 安裝問題

**Q: 載入時顯示「This add-on is not compatible」**
A: 檢查 Firefox 版本是否 ≥ 57.0，確認 manifest.json 中的 strict_min_version 設定

**Q: 擴充功能圖示不顯示**
A: 檢查圖示檔案路徑，確認所有尺寸的圖示都存在

**Q: 彈出視窗空白**
A: 開啟開發者工具檢查控制台錯誤，通常是 JavaScript 或 CSS 載入問題

### 功能問題

**Q: 資料不會保存**
A: 檢查 storage 權限是否正確設定，確認 browser.storage API 可用

**Q: 編碼結果錯誤**
A: 確認 encoders.js 檔案完整載入，檢查輸入格式是否正確

### 發佈問題

**Q: XPI 檔案驗證失敗**
A: 檢查 manifest.json 格式，確認所有必要欄位都已填寫

**Q: 審核被拒絕**
A: 查看審核意見，通常需要：
- 改善程式碼品質
- 完善權限說明
- 修正安全問題

## 📞 支援

如有問題，請：
1. 查看 Firefox 控制台錯誤訊息
2. 參考 [Mozilla WebExtensions 文檔](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
3. 在專案 Issues 中提交問題

---

🎉 **享受在 Firefox 中使用 Base Encoder！**
