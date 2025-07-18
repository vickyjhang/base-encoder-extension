# 🚀 Chrome Web Store 發佈問題解決指南

## 📋 問題清單與解決方案

### ✅ 步驟 1: 設定開發者帳戶資訊

#### 1.1 前往帳戶設定
```
1. 開啟 https://chrome.google.com/webstore/devconsole
2. 點擊右上角的「帳戶」或「Account」分頁
3. 確認您已登入正確的 Google 帳戶
```

#### 1.2 填寫開發者資訊
```
必填項目：
- 開發者名稱：Base Encoder Team（或您的名稱）
- 聯絡電子郵件：[輸入您的有效電子郵件]
- 網站（選填）：可留空或填入您的網站
```

#### 1.3 驗證電子郵件
```
1. 輸入聯絡電子郵件後，點擊「發送驗證郵件」
2. 檢查您的收件匣（包含垃圾郵件資料夾）
3. 點擊 Google 發送的驗證連結
4. 返回控制台確認「已驗證」狀態
```

---

### ✅ 步驟 2: 設定隱私權實務規範

#### 2.1 前往隱私權分頁
```
1. 回到您的擴充功能編輯頁面
2. 點擊「隱私權實務規範」分頁
3. 準備填寫資料使用聲明
```

#### 2.2 填寫資料使用資訊

**問題 1：您的項目是否會處理使用者資料？**
```
選擇：是
原因：使用 storage 權限保存使用者輸入
```

**問題 2：收集哪些資料類型？**
```
☑️ 個人通訊 (Personal communications)
  說明：使用者輸入的文字內容（編碼/解碼用）

☑️ 應用程式活動 (App activity)  
  說明：使用者的介面設定和偏好
```

**問題 3：資料使用目的**
```
☑️ 應用程式功能 (App functionality)
  說明：
  - 儲存使用者輸入以便繼續編輯
  - 記住介面設定提升使用體驗
```

**問題 4：資料處理方式**
```
☑️ 資料在本地處理 (Data is processed locally)
說明：所有資料僅儲存在使用者本地設備，不傳送到遠端
```

**問題 5：資料分享**
```
選擇：不與第三方分享資料
```

**問題 6：資料販售**
```
選擇：不販售使用者資料
```

**問題 7：資料使用限制**
```
☑️ 資料使用僅限於已揭露的用途
```

---

### ✅ 步驟 3: 完成發佈設定

#### 3.1 檢查所有必填項目
```
確認清單：
☑️ 開發者聯絡電子郵件已填寫
☑️ 電子郵件已驗證
☑️ 隱私權實務規範已完成
☑️ 商品說明已填寫
☑️ 圖示已上傳
☑️ 螢幕截圖已上傳
```

#### 3.2 儲存並提交
```
1. 點擊「儲存草稿」
2. 檢查頁面上方是否還有錯誤提示
3. 如無錯誤，點擊「提交審核」
```

---

## 🔍 常見問題排解

### Q1: 電子郵件驗證郵件沒收到
**解決方案：**
- 檢查垃圾郵件資料夾
- 確認電子郵件地址拼寫正確
- 等待 5-10 分鐘後重新發送
- 嘗試使用其他電子郵件地址

### Q2: 隱私權政策 URL 要求
**解決方案：**
- 如果沒有個人網站，可以在表單中選擇「不適用」
- 或使用免費平台（如 GitHub Pages）建立簡單的隱私權政策頁面

### Q3: 開發者費用問題
**解決方案：**
- 首次發佈需支付一次性 $5 USD 開發者註冊費
- 使用信用卡或 PayPal 付款
- 付款後可能需要等待幾小時生效

---

## ⚡ 快速檢查清單

發佈前請確認：

### 帳戶設定
- [ ] 聯絡電子郵件已填寫
- [ ] 電子郵件已驗證  
- [ ] 開發者費用已支付（$5 USD）

### 擴充功能設定
- [ ] manifest.json 無錯誤
- [ ] 圖示已上傳（16x16, 48x48, 128x128）
- [ ] 螢幕截圖已上傳（1280x800）
- [ ] 商品說明已填寫

### 隱私權合規
- [ ] 隱私權實務規範已完成
- [ ] 資料使用聲明準確
- [ ] 符合 Chrome Web Store 政策

---

## 📞 需要協助？

如果仍有問題：

1. **Google 支援文件**：
   https://developer.chrome.com/docs/webstore/publish/

2. **Chrome Web Store 政策**：
   https://developer.chrome.com/docs/webstore/program_policies/

3. **開發者論壇**：
   https://groups.google.com/a/chromium.org/g/chromium-extensions

---

🎯 **完成這些步驟後，您的 Base Encoder 擴充功能就可以成功提交審核了！**

審核時間通常為 1-3 個工作天，審核通過後就會在 Chrome Web Store 上線。
