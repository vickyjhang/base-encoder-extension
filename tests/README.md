# 測試檔案目錄

這個資料夾包含所有的測試檔案和相關文檔。

## 檔案結構

### HTML 測試檔案
- `test.html` - 主要測試檔案
- `test-base-conversion.html` - Base 轉換測試
- `test-base32-conversion.html` - Base32 轉換測試  
- `test-base36.html` - Base36 轉換測試
- `test-custom-base.html` - 自訂 Base 轉換測試
- `test-extension.html` - 擴充功能整體測試
- `test-final-conversion.html` - 最終轉換測試
- `test-persistence.html` - 資料持久化測試
- `test-popup-standalone.html` - 獨立彈出視窗測試
- `unicode-function-test.html` - Unicode 功能測試
- `unicode-test.html` - Unicode 測試
- `verify-base32.html` - Base32 驗證

### Shell 腳本
- `quick-test.sh` - 快速測試腳本
- `run-tests.sh` - 執行所有測試的腳本

### 文檔 (docs/)
- `SCREENSHOT_TEST_GUIDE.md` - 截圖測試指南
- `TESTING_GUIDE.md` - 測試指南
- `UNICODE_TEST_REPORT.md` - Unicode 測試報告

## 如何運行測試

1. 使用瀏覽器開啟 HTML 測試檔案
2. 或執行 `./run-tests.sh` 來運行自動化測試
3. 使用 `./quick-test.sh` 進行快速測試

## 注意事項

- 確保在測試前已正確設置擴充功能
- 某些測試可能需要載入擴充功能到 Chrome 開發者模式
- 詳細的測試說明請參考 `docs/` 資料夾中的文檔
