# Base Encoder Extension

一個全功能的瀏覽器擴充功能，提供 Base64、Base58 編碼解碼和進制轉換功能，支援完整 Unicode 字符和數據持久化。

**🌟 現在支援 Chrome 和 Firefox！**

## 🚀 跨瀏覽器支援

### Chrome 版本
- 使用 Manifest V3
- Chrome Extensions API
- 位於 `src/` 資料夾

### Firefox 版本  
- 使用 Manifest V2
- Firefox WebExtensions API
- 位於 `firefox-extension/` 資料夾
- 完全兼容 Chrome 版本的所有功能

## Features

- **📝 Base64/Base58 編碼解碼** - 支援完整 Unicode 字符的編碼與解碼
- **🔢 進制轉換 (2-36)** - 獨立的進制轉換功能，支援任意進制之間的數字轉換
- **🎯 分頁式介面** - 編碼/解碼與進制轉換功能完全分離，操作更直觀
- **💾 數據持久化** - 自動保存輸入內容，重新開啟擴充功能時恢復上次狀態
- **🌐 完整 Unicode 支援** - 處理中文、日文、Emoji 等所有 Unicode 字符
- **⚡ 即時處理** - 支援 Enter 鍵快速操作
- **💡 智能提示** - 根據進制提供相應的輸入範例

## Interface Overview

### 📱 編碼/解碼標籤頁
- **模式選擇**: 編碼或解碼
- **格式支援**: Base64、Base58
- **Unicode 友善**: 完整支援多語言和特殊符號
- **狀態保持**: 自動保存輸入內容和選擇的格式

### 🔢 進制轉換標籤頁  
- **靈活進制**: 來源進制和目標進制獨立設定 (2-36)
- **預設值**: 來源進制預設為 36，目標進制預設為 10
- **智能識別**: 自動判斷數字格式
- **即時轉換**: 一鍵轉換並顯示詳細結果
- **狀態保持**: 保存進制設定和轉換內容

## Supported Characters

All encoding formats support the complete Unicode character set:
- English: `Hello World`
- Chinese: `你好世界`
- Japanese: `こんにちは`
- Emojis: `😀🌟❤️`
- Special symbols: `©®™`

## Installation

### Chrome 版本安裝

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the `src/` directory
5. The extension icon will appear in the toolbar

### Firefox 版本安裝

1. 開啟 Firefox 並前往 `about:debugging`
2. 點擊「This Firefox」
3. 點擊「Load Temporary Add-on...」
4. 選擇 `firefox-extension/manifest.json` 檔案
5. 或者安裝建構好的 XPI 檔案：
   ```bash
   cd firefox-extension
   ./build-firefox.sh
   # 安裝 release/base-encoder-firefox-v1.2.xpi
   ```

詳細安裝說明請參考：
- Chrome: 專案根目錄的文檔
- Firefox: `firefox-extension/INSTALL_GUIDE.md`

## Usage

### Basic Operation
1. Click the extension icon to open the popup
2. **數據持久化**: 擴充功能會自動保存您的輸入內容和設定
3. Choose operation mode: **Encode** or **Decode**
4. Select encoding format: **Base64**, **Base58**
5. Enter your text in the input field
6. Click the process button or press Enter
7. **重新開啟**: 關閉後重新開啟擴充功能，所有內容會自動恢復

### 進制轉換操作
1. 切換至「進制轉換」標籤頁
2. 設定來源進制 (預設: 36) 和目標進制 (預設: 10)
3. 輸入要轉換的數字
4. 點擊「轉換」按鈕查看結果
5. 使用「清除」按鈕重設為預設值
6. **狀態保持**: 進制設定和輸入內容會自動保存

### Data Persistence Features
- ✅ **自動保存**: 所有輸入內容即時保存
- ✅ **狀態恢復**: 重新開啟時恢復上次的標籤頁和設定
- ✅ **格式記憶**: 記住選擇的編碼格式和進制設定
- ✅ **結果保留**: 處理結果也會一併保存
- ✅ **跨會話**: 即使重啟瀏覽器，數據仍會保留

### Custom Base Feature
When selecting "Custom Base (2-36)":
1. An additional input field appears for the base number
2. Enter any number between 2 and 36
3. The system encodes each character separately using the specified base
4. Results are separated by hyphens for clarity

### Examples

**Base64:**
```
Input: Hello 世界
Output: SGVsbG8g5LiW55WM
```

**Base58:**
```
Input: Hello
Output: 9Ajdvzr
```

**Custom Base (Hexadecimal):**
```
Input: Hi
Output: 48-69
(H=72→48₁₆, i=105→69₁₆)
```

**Custom Base (Binary):**
```
Input: A
Output: 1000001
(A=65→1000001₂)
```

## Testing

Run the included test suite:
```bash
# Execute automated tests
./run-tests.sh

# Or open test page in browser
open test-custom-base.html
```

See `TESTING_GUIDE.md` for detailed testing instructions.

## Development

### Project Structure
```
base-encoder-extension/
├── manifest.json           # Extension configuration
├── src/
│   ├── popup/
│   │   ├── popup.html      # Popup interface
│   │   ├── popup.css       # Styling
│   │   └── popup.js        # Main logic
│   ├── background/
│   │   └── background.js   # Background service worker
│   └── utils/
│       └── encoders.js     # Encoding/decoding functions
├── icons/                  # Extension icons
├── test-*.html            # Test files
└── docs/                  # Documentation
```

### Key Functions

**encoders.js:**
- `base64Encode(text)` / `base64Decode(text)`
- `base58Encode(text)` / `base58Decode(text)`  
- `customBaseEncode(text, base)` / `customBaseDecode(text, base)`

### Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests for new functionality
4. Ensure all tests pass
5. Submit a pull request

## Technical Details

- **Manifest Version:** 3
- **Permissions:** activeTab, storage
- **Data Storage:** Chrome storage API with localStorage fallback
- **Unicode Handling:** Proper UTF-8 support via character code conversion
- **Error Handling:** Comprehensive input validation and error messages
- **Performance:** Efficient algorithms for large text processing
- **Persistence:** Automatic data saving and restoration across sessions

## License

This project is licensed under the MIT License. See the LICENSE file for details.