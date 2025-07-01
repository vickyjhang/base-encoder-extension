# Chrome 擴充功能自訂進制功能檢查清單

## 🔧 重新載入擴充功能

### 步驟 1: 重新載入擴充功能
1. 開啟 Chrome 瀏覽器
2. 在網址列輸入：`chrome://extensions/`
3. 找到「Base Encoder」擴充功能
4. 點選重新載入按鈕 (🔄)
5. 確認擴充功能狀態為「已啟用」

### 步驟 2: 測試自訂進制功能
1. 點選工具列的擴充功能圖示
2. 確認看到三個選項：
   - Base64
   - Base58
   - **自訂進制 (2-36)** ← 這個是新加入的
3. 選擇「自訂進制 (2-36)」
4. 確認出現進制輸入框

### 步驟 3: 功能測試
**測試案例 1 - 十六進制編碼**
- 模式：編碼
- 格式：自訂進制 (2-36)
- 進制：16
- 輸入：Hello
- 預期結果：48-65-6C-6C-6F

**測試案例 2 - 二進制編碼**
- 模式：編碼
- 格式：自訂進制 (2-36)
- 進制：2
- 輸入：A
- 預期結果：1000001

**測試案例 3 - 中文編碼**
- 模式：編碼
- 格式：自訂進制 (2-36)
- 進制：10
- 輸入：你好
- 預期結果：20320-22909

### 步驟 4: 解碼測試
**測試解碼功能**
- 模式：解碼
- 格式：自訂進制 (2-36)
- 進制：16
- 輸入：48-65-6C-6C-6F
- 預期結果：Hello

## 🐛 故障排除

### 如果自訂進制選項沒有出現：
1. 檢查 `popup.html` 是否包含：
   ```html
   <option value="custom">自訂進制 (2-36)</option>
   ```

2. 檢查控制台是否有 JavaScript 錯誤：
   - 按 F12 開啟開發者工具
   - 切換到 Console 標籤
   - 查看是否有紅色錯誤訊息

### 如果進制輸入框沒有出現：
1. 確認 `popup.js` 包含 `toggleCustomBaseInput` 函數
2. 確認 CSS 中有 `.custom-base-input` 樣式

### 如果編碼/解碼失敗：
1. 確認 `encoders.js` 包含：
   - `customBaseEncode` 函數
   - `customBaseDecode` 函數
   - 正確的 `window.customBaseEncode` 暴露

2. 檢查進制範圍是否在 2-36 之間

## 📝 替代測試方法

如果 Chrome 擴充功能仍有問題，可以使用獨立測試頁面：

1. 開啟 `test-popup-standalone.html`
2. 這個頁面模擬了完整的 popup 功能
3. 可以驗證所有編碼/解碼邏輯是否正確

## 🔍 檢查檔案內容

確認以下檔案包含正確內容：

### popup.html
```html
<option value="custom">自訂進制 (2-36)</option>
<div class="custom-base-input" id="customBaseInput" style="display: none;">
    <label>進制 (2-36):</label>
    <input type="number" id="baseNumber" min="2" max="36" value="16">
</div>
```

### popup.js
```javascript
case "custom":
    const baseNumber = parseInt(baseNumberInput.value);
    if (isNaN(baseNumber) || baseNumber < 2 || baseNumber > 36) {
        throw new Error("進制必須在 2 到 36 之間");
    }
    result = customBaseEncode(inputText, baseNumber);
    break;
```

### encoders.js
```javascript
window.customBaseEncode = customBaseEncode;
window.customBaseDecode = customBaseDecode;
```

如果這些內容都正確，重新載入擴充功能後應該就能看到自訂進制功能了！
