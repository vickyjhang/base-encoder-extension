# Base Encoder - Firefox Extension

這是 Base Encoder 的 Firefox 版本，提供與 Chrome 版本相同的功能。

## 🎯 功能特色

- **Base64/Base58 編碼解碼**：支援文字的 Base64 和 Base58 編碼/解碼
- **進制轉換**：支援 2-36 進制間的數字轉換
- **Unicode 編碼解碼**：支援 Unicode 字符編碼/解碼
- **數據持久化**：自動保存輸入內容和設定
- **跨瀏覽器兼容**：兼容 Firefox WebExtensions API

## 📋 系統需求

- Firefox 57.0 或更新版本
- 支援 WebExtensions API

## 🚀 安裝方式

### 開發者模式安裝（測試用）

1. 開啟 Firefox
2. 前往 `about:debugging`
3. 點擊「This Firefox」
4. 點擊「Load Temporary Add-on...」
5. 選擇此資料夾中的 `manifest.json` 檔案

### Firefox Add-ons Store 安裝

*（準備中）*

## 🔧 開發說明

### 檔案結構

```
firefox-extension/
├── manifest.json           # Firefox 擴充功能配置 (Manifest V2)
├── README.md               # 說明文檔
├── icons/                  # 圖示檔案
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   └── icon128.png
└── src/
    ├── popup/
    │   ├── popup.html      # 彈出視窗介面
    │   ├── popup.css       # 樣式表
    │   └── popup.js        # Firefox 兼容版本的主要邏輯
    └── utils/
        └── encoders.js     # 編碼解碼函數庫
```

### 與 Chrome 版本的差異

1. **Manifest 版本**：使用 Manifest V2（Firefox 支援較好）
2. **API 兼容性**：同時支援 `browser` (Firefox) 和 `chrome` (Chrome) API
3. **權限配置**：使用 `browser_action` 而非 `action`
4. **應用程式 ID**：包含 `applications.gecko` 配置

### 跨瀏覽器 API 兼容性

```javascript
// 自動檢測並使用正確的 API
const browserAPI = (() => {
  if (typeof browser !== "undefined" && browser.storage) {
    return browser; // Firefox WebExtensions API
  } else if (typeof chrome !== "undefined" && chrome.storage) {
    return chrome;  // Chrome Extensions API
  } else {
    return null;
  }
})();
```

## 🧪 測試

### 功能測試

1. **編碼/解碼測試**
   - Base64 編碼：輸入「Hello」，應輸出「SGVsbG8=」
   - Base58 編碼：輸入「Hello」，應輸出「9Ajdvzr」
   - Unicode 編碼：輸入「中文」，應輸出「\\u4E2D\\u6587」

2. **進制轉換測試**
   - 十進制轉二進制：15 → 1111
   - 二進制轉十六進制：1111 → F
   - 十六進制轉十進制：FF → 255

3. **數據持久化測試**
   - 輸入資料後關閉擴充功能
   - 重新開啟應該恢復所有輸入內容

### 自動化測試

可以使用相同的測試檔案（在 `../tests/` 資料夾中），只需在 Firefox 中開啟即可。

## 🔨 建構和打包

### 建立 XPI 檔案（Firefox 擴充功能包）

```bash
# 進入 Firefox 擴充功能目錄
cd firefox-extension

# 創建 XPI 檔案
zip -r base-encoder-firefox.xpi . -x "*.DS_Store" "*.git*" "README.md"
```

### 本地測試

```bash
# 在 Firefox 中載入擴充功能進行測試
# 1. 前往 about:debugging
# 2. 點擊 "This Firefox"
# 3. 點擊 "Load Temporary Add-on..."
# 4. 選擇 manifest.json
```

## 📝 發佈到 Firefox Add-ons

1. 前往 [Firefox Add-ons Developer Hub](https://addons.mozilla.org/developers/)
2. 註冊開發者帳號
3. 上傳 XPI 檔案
4. 填寫擴充功能資訊
5. 等待審核

## 🐛 故障排除

### 常見問題

1. **載入失敗**
   - 檢查 manifest.json 語法
   - 確認所有檔案路徑正確
   - 查看 Firefox 錯誤訊息

2. **儲存功能不工作**
   - 確認 storage 權限已設定
   - 檢查瀏覽器 API 兼容性

3. **介面顯示異常**
   - 檢查 CSS 檔案載入
   - 確認 HTML 結構正確

### 除錯

在 `about:debugging` 中點擊「Inspect」來開啟開發者工具進行除錯。

## 📄 授權

此專案採用 MIT 授權條款。

## 🤝 貢獻

歡迎提交 Pull Request 或回報 Issue！

---

🦊 **適用於 Firefox 的 Base Encoder** - 讓編碼解碼變得簡單！
