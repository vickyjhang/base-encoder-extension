# 🚀 Chrome Web Store 發佈快速指南

## 📦 已準備好的檔案

✅ **發佈檔案**：`release/base-encoder-extension-v1.1.zip` (28.4KB)

## 🔗 立即發佈

### 1. 前往 Chrome Web Store Dashboard
👉 [Chrome Web Store Developer Console](https://chrome.google.com/webstore/devconsole)

### 2. 上傳擴充功能
1. 點擊「新增項目」或「Add new item」
2. 上傳 `release/base-encoder-extension-v1.1.zip`
3. 等待處理完成

### 3. 填寫商店資訊

#### 📝 基本資訊
- **名稱**：`Base Encoder`
- **簡短描述**：
  ```
  Chrome extension for Base64/Base58 encoding/decoding and base conversion (2-36) with Unicode support and data persistence.
  ```
- **類別**：開發者工具 (Developer Tools)
- **語言**：繁體中文、英文

#### 📖 詳細描述
複製貼上 `CHROME_WEB_STORE_CONTENT.md` 中的「詳細描述」部分

#### 🖼️ 螢幕截圖
- 使用 `screenshot-generator.html` 產生螢幕截圖
- 建議尺寸：1280x800
- 至少上傳 1 張，最多 5 張

#### 🔒 隱私權資訊

**隱私權政策**：
```
此擴充功能不收集任何個人資料。所有功能均在本地執行，使用 storage 權限僅為保存用戶設定和輸入內容到本地瀏覽器中。不會傳輸任何資料到外部伺服器。完整隱私權政策請參考：[您的隱私權政策連結或直接貼上 PRIVACY_POLICY.md 內容]
```

**Storage 權限說明**：
```
本擴充功能使用 storage 權限來保存用戶的編碼/解碼輸入內容和設定偏好。所有資料僅存儲在用戶本地瀏覽器中，不會上傳到任何伺服器或與第三方分享。
```

**遠端程式碼說明**：
```
此擴充功能不包含任何遠端託管的程式碼。所有功能均在本地執行，沒有任何程式碼從遠端伺服器載入。
```

### 4. 提交審核
- 檢查所有欄位已填寫完成
- 點擊「提交審核」或「Submit for review」
- 等待 1-3 個工作天的審核結果

## 📧 聯絡資訊設定

### 開發者帳戶
- **帳戶類型**：選擇「非交易商帳戶」(Non-trader account)
- **聯絡電子郵件**：填寫並驗證您的電子郵件

## 🎯 審核要點

### ✅ 通過要點
- [x] Manifest v3 格式正確
- [x] 權限最小化（僅 storage）
- [x] 功能完整且穩定
- [x] 描述清晰詳細
- [x] 隱私權政策完整
- [x] 圖示規格正確

### ⚠️ 注意事項
- 確保螢幕截圖清晰展示功能
- 描述要準確反映實際功能
- 不要使用誤導性關鍵字
- 確保所有連結都有效

## 📱 發佈後

### 立即任務
1. 關注 Google 發送的審核通知郵件
2. 如果被拒絕，根據反饋修正後重新提交
3. 通過後，測試擴充功能在商店中的安裝

### 後續維護
- 定期檢查用戶反饋和評分
- 根據需要發佈更新版本
- 保持隱私權政策的時效性

## 🆘 如果遇到問題

### 常見問題解決
參考 `FINAL_PUBLISH_CHECKLIST.md` 中的「常見問題預防」部分

### 支援資源
- [Chrome Web Store 開發者政策](https://developer.chrome.com/docs/webstore/program-policies/)
- [發佈指南](https://developer.chrome.com/docs/webstore/publish/)

---

🎉 **準備就緒！您的 Base Encoder 擴充功能已經完全準備好發佈到 Chrome Web Store 了！**

檔案位置：`/Users/vicky.jhang/Documents/ai/chrome_plugin/base-encoder-extension/release/base-encoder-extension-v1.1.zip`
