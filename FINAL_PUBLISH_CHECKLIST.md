# Chrome Web Store 發佈最終檢查清單

## ✅ 技術要求檢查

### Manifest.json 檢查
- [x] manifest_version: 3
- [x] 名稱：Base Encoder
- [x] 版本：1.1
- [x] 描述：122 字元（符合 132 字元限制）
- [x] 權限：僅 storage（必要且已說明用途）
- [x] 圖示：16x16, 48x48, 128x128 PNG 格式

### 檔案結構檢查
- [x] 所有路徑正確
- [x] 圖示檔案存在且格式正確
- [x] HTML/CSS/JS 語法無錯誤
- [x] 無多餘或測試檔案

## ✅ 功能測試檢查

### 編碼/解碼功能
- [x] Base64 編碼解碼正常
- [x] Base58 編碼解碼正常
- [x] Unicode 字元支援
- [x] 錯誤處理機制

### 進制轉換功能
- [x] 2-36 進制轉換正常
- [x] 預設值設定（36→10）
- [x] 大數值處理
- [x] 錯誤檢測和提示

### 使用者體驗
- [x] 分頁切換流暢
- [x] 資料持久化正常
- [x] 介面響應式設計
- [x] 按鈕和輸入框正常運作

## ✅ Chrome Web Store 要求

### 基本資訊
- [ ] 聯絡電子郵件（需填寫並驗證）
- [ ] 開發者帳戶註冊（建議選「非交易商帳戶」）
- [ ] 類別選擇：開發者工具
- [ ] 語言：繁體中文 + 英文

### 描述內容
- [ ] 簡短描述：使用提供的 132 字元版本
- [ ] 詳細描述：使用 CHROME_WEB_STORE_CONTENT.md 內容
- [ ] 更新說明：「首次發佈」

### 螢幕截圖要求
- [ ] 至少 1 張螢幕截圖（1280x800 推薦）
- [ ] 最多 5 張螢幕截圖
- [ ] 建議使用 screenshot-generator.html 產生

### 隱私權和權限
- [ ] 隱私權政策：使用 PRIVACY_POLICY.md 內容
- [ ] Storage 權限說明：
  ```
  本擴充功能使用 storage 權限來保存用戶的編碼/解碼輸入內容和設定偏好。
  所有資料僅存儲在用戶本地瀏覽器中，不會上傳到任何伺服器或與第三方分享。
  ```
- [ ] 遠端程式碼說明：
  ```
  此擴充功能不包含任何遠端託管的程式碼。
  所有功能均在本地執行，沒有任何程式碼從遠端伺服器載入。
  ```

### 發佈檔案
- [ ] 使用 prepare-release.sh 建立 ZIP 檔案
- [ ] ZIP 檔案大小檢查（應該很小，約幾百KB）
- [ ] 確認 ZIP 內容僅包含必要檔案

## 📋 發佈步驟

### 1. 準備階段
```bash
# 建立發佈 ZIP
cd /Users/vicky.jhang/Documents/ai/chrome_plugin/base-encoder-extension
chmod +x prepare-release.sh
./prepare-release.sh
```

### 2. Chrome Web Store 後台設定
1. 登入 [Chrome Web Store Developer Console](https://chrome.google.com/webstore/devconsole)
2. 點擊「新增項目」
3. 上傳 base-encoder-extension.zip
4. 填寫所有必要欄位（使用上述提供的內容）
5. 上傳螢幕截圖
6. 設定隱私權政策和權限說明
7. 提交審核

### 3. 審核等待
- 首次發佈通常需要 1-3 個工作天
- 注意查看 Google 發送的審核通知郵件
- 如有問題，根據反饋進行修正

## 🚨 常見問題預防

### 權限過多
- ✅ 已最小化權限，僅使用必要的 storage

### 描述過長
- ✅ 描述已控制在 132 字元以內

### 圖示問題
- ✅ 圖示已提供完整尺寸且格式正確

### 功能不明確
- ✅ 已提供詳細功能說明和使用場景

### 隱私權政策
- ✅ 已建立完整的隱私權政策說明

## 📞 如果審核被拒絕

常見拒絕原因和解決方案：

1. **權限說明不清楚**
   - 使用提供的權限說明範本

2. **功能描述不詳細**
   - 使用 CHROME_WEB_STORE_CONTENT.md 的詳細描述

3. **隱私權政策不完整**
   - 使用 PRIVACY_POLICY.md 的完整內容

4. **螢幕截圖品質不佳**
   - 重新使用 screenshot-generator.html 產生高品質螢幕截圖

5. **Manifest 問題**
   - 當前 manifest.json 已最佳化，應該沒問題

準備好發佈了！所有技術要求都已滿足，只需要在 Chrome Web Store 後台填寫資訊即可。
