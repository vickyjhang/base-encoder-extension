document.addEventListener("DOMContentLoaded", function () {
  // 標籤頁元素
  const encodeTab = document.getElementById("encode-tab");
  const convertTab = document.getElementById("convert-tab");
  const unicodeTab = document.getElementById("unicode-tab");
  const encodeSection = document.getElementById("encode-section");
  const convertSection = document.getElementById("convert-section");
  const unicodeSection = document.getElementById("unicode-section");

  // 編碼/解碼區塊元素
  const inputField = document.getElementById("input");
  const outputField = document.getElementById("output");
  const processButton = document.getElementById("process");
  const formatSelect = document.getElementById("format");
  const modeRadios = document.querySelectorAll('input[name="mode"]');

  // 進制轉換區塊元素
  const fromBaseInput = document.getElementById("fromBase");
  const toBaseInput = document.getElementById("toBase");
  const convertInput = document.getElementById("convertInput");
  const convertOutput = document.getElementById("convertOutput");
  const convertButton = document.getElementById("convertButton");
  const clearButton = document.getElementById("clearButton");

  // Unicode 區塊元素
  const unicodeInput = document.getElementById("unicodeInput");
  const unicodeOutput = document.getElementById("unicodeOutput");
  const unicodeProcessButton = document.getElementById("unicodeProcess");
  const unicodeClearButton = document.getElementById("unicodeClear");
  const unicodeModeRadios = document.querySelectorAll(
    'input[name="unicode-mode"]'
  );
  const unicodeInputLabel = document.getElementById("unicode-input-label");
  const unicodeOutputTitle = document.getElementById("unicode-output-title");

  // === 跨瀏覽器 API 兼容性處理 ===

  // 檢測瀏覽器並設置 API
  const browserAPI = (() => {
    if (typeof browser !== "undefined" && browser.storage) {
      // Firefox WebExtensions API
      return browser;
    } else if (typeof chrome !== "undefined" && chrome.storage) {
      // Chrome Extensions API
      return chrome;
    } else {
      return null;
    }
  })();

  // === 數據持久化功能 ===

  // 儲存數據 (支援 Firefox browser 和 Chrome storage API)
  function saveData() {
    const data = {
      // 編碼/解碼區塊
      encodeInput: inputField.value,
      encodeFormat: formatSelect.value,
      encodeMode: document.querySelector('input[name="mode"]:checked').value,
      encodeOutput: outputField.value,

      // 進制轉換區塊
      fromBase: fromBaseInput.value,
      toBase: toBaseInput.value,
      convertInput: convertInput.value,
      convertOutput: convertOutput.value,

      // Unicode 區塊
      unicodeInput: unicodeInput.value,
      unicodeOutput: unicodeOutput.value,
      unicodeMode: document.querySelector('input[name="unicode-mode"]:checked')
        .value,

      // UI 狀態
      activeTab: document.querySelector(".tab-button.active").id,
    };

    // 優先使用瀏覽器 storage API
    if (browserAPI && browserAPI.storage && browserAPI.storage.local) {
      // Firefox 使用 Promise，Chrome 可能使用 callback
      if (browserAPI.storage.local.set.length <= 1) {
        // Firefox style (Promise-based)
        browserAPI.storage.local.set({ encoderExtensionData: data });
      } else {
        // Chrome style (callback-based)
        browserAPI.storage.local.set({ encoderExtensionData: data });
      }
    } else {
      // 備用 localStorage
      try {
        localStorage.setItem("encoderExtensionData", JSON.stringify(data));
      } catch (error) {
        console.log("儲存數據時出錯:", error);
      }
    }
  }

  // 從儲存載入數據
  function loadData() {
    if (browserAPI && browserAPI.storage && browserAPI.storage.local) {
      // Firefox/Chrome storage API
      const getPromise = browserAPI.storage.local.get(["encoderExtensionData"]);

      if (getPromise && typeof getPromise.then === "function") {
        // Firefox style (Promise-based)
        getPromise
          .then(function (result) {
            if (result.encoderExtensionData) {
              restoreDataFromObject(result.encoderExtensionData);
            }
          })
          .catch(function (error) {
            console.log("載入儲存的數據時出錯:", error);
          });
      } else {
        // Chrome style (callback-based)
        browserAPI.storage.local.get(
          ["encoderExtensionData"],
          function (result) {
            if (result.encoderExtensionData) {
              restoreDataFromObject(result.encoderExtensionData);
            }
          }
        );
      }
    } else {
      // 備用 localStorage
      try {
        const savedData = localStorage.getItem("encoderExtensionData");
        if (savedData) {
          const data = JSON.parse(savedData);
          restoreDataFromObject(data);
        }
      } catch (error) {
        console.log("載入儲存的數據時出錯:", error);
      }
    }
  }

  // 從數據物件恢復介面狀態
  function restoreDataFromObject(data) {
    try {
      // 恢復編碼/解碼區塊
      if (data.encodeInput) inputField.value = data.encodeInput;
      if (data.encodeFormat) formatSelect.value = data.encodeFormat;
      if (data.encodeMode) {
        const modeRadio = document.querySelector(
          `input[name="mode"][value="${data.encodeMode}"]`
        );
        if (modeRadio) modeRadio.checked = true;
      }
      if (data.encodeOutput) outputField.value = data.encodeOutput;

      // 恢復進制轉換區塊
      if (data.fromBase) fromBaseInput.value = data.fromBase;
      if (data.toBase) toBaseInput.value = data.toBase;
      if (data.convertInput) convertInput.value = data.convertInput;
      if (data.convertOutput) convertOutput.value = data.convertOutput;

      // 恢復 Unicode 區塊
      if (data.unicodeInput) unicodeInput.value = data.unicodeInput;
      if (data.unicodeOutput) unicodeOutput.value = data.unicodeOutput;
      if (data.unicodeMode) {
        const unicodeModeRadio = document.querySelector(
          `input[name="unicode-mode"][value="${data.unicodeMode}"]`
        );
        if (unicodeModeRadio) unicodeModeRadio.checked = true;
      }

      // 恢復活動標籤頁
      if (data.activeTab) {
        const activeTab = document.getElementById(data.activeTab);
        if (activeTab) {
          if (data.activeTab === "encode-tab") {
            switchTab(encodeTab, encodeSection);
          } else if (data.activeTab === "convert-tab") {
            switchTab(convertTab, convertSection);
          } else if (data.activeTab === "unicode-tab") {
            switchTab(unicodeTab, unicodeSection);
          }
        }
      }

      // 更新對應的 placeholder
      updatePlaceholderFromBase();
      updateEncodeInterface();
      updateUnicodeInterface();
    } catch (error) {
      console.log("恢復數據時出錯:", error);
    }
  }

  // 標籤頁切換功能
  function switchTab(activeTab, activeSection) {
    // 移除所有活動狀態
    document
      .querySelectorAll(".tab-button")
      .forEach((tab) => tab.classList.remove("active"));
    document
      .querySelectorAll(".tab-content")
      .forEach((section) => section.classList.remove("active"));

    // 添加活動狀態
    activeTab.classList.add("active");
    activeSection.classList.add("active");

    // 儲存當前狀態
    saveData();
  }

  // 標籤頁事件監聽
  encodeTab.addEventListener("click", () =>
    switchTab(encodeTab, encodeSection)
  );
  convertTab.addEventListener("click", () =>
    switchTab(convertTab, convertSection)
  );
  unicodeTab.addEventListener("click", () =>
    switchTab(unicodeTab, unicodeSection)
  );

  // === 編碼/解碼功能 ===

  // 更新編碼/解碼介面文字
  function updateEncodeInterface() {
    const selectedMode = document.querySelector(
      'input[name="mode"]:checked'
    ).value;
    const isEncode = selectedMode === "encode";

    processButton.textContent = isEncode ? "編碼" : "解碼";
    inputField.placeholder = isEncode ? "輸入要編碼的內容" : "輸入要解碼的內容";
    outputField.placeholder = isEncode ? "編碼結果" : "解碼結果";
  }

  // 監聽編碼模式變更
  modeRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      updateEncodeInterface();
      saveData();
    });
  });

  // 監聽格式變更
  formatSelect.addEventListener("change", saveData);

  // 處理編碼/解碼
  function processEncodeDecode() {
    const input = inputField.value.trim();
    if (!input) {
      alert("請輸入內容");
      return;
    }

    const mode = document.querySelector('input[name="mode"]:checked').value;
    const format = formatSelect.value;

    try {
      let result;
      if (mode === "encode") {
        // 編碼模式
        switch (format) {
          case "base64":
            result = base64Encode(input);
            break;
          case "base58":
            result = base58Encode(input);
            break;
          default:
            throw new Error("不支援的編碼格式");
        }
      } else {
        // 解碼模式
        switch (format) {
          case "base64":
            result = base64Decode(input);
            break;
          case "base58":
            result = base58Decode(input);
            break;
          default:
            throw new Error("不支援的解碼格式");
        }
      }
      outputField.value = result;
      saveData();
    } catch (error) {
      alert(`處理失敗: ${error.message}`);
    }
  }

  processButton.addEventListener("click", processEncodeDecode);

  // === 進制轉換功能 ===

  // 更新進制轉換的提示文字
  function updatePlaceholderFromBase() {
    const fromBase = parseInt(fromBaseInput.value) || 10;
    if (fromBase >= 2 && fromBase <= 36) {
      const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(
        0,
        fromBase
      );
      convertInput.placeholder = `輸入 ${fromBase} 進制數字 (可用字符: ${chars})`;
    } else {
      convertInput.placeholder = "請先設定有效的來源進制 (2-36)";
    }
  }

  // 監聽進制變更
  fromBaseInput.addEventListener("input", () => {
    updatePlaceholderFromBase();
    saveData();
  });
  toBaseInput.addEventListener("input", saveData);
  convertInput.addEventListener("input", saveData);

  // 進制轉換處理
  function processBaseConversion() {
    const input = convertInput.value.trim();
    const fromBase = parseInt(fromBaseInput.value);
    const toBase = parseInt(toBaseInput.value);

    if (!input) {
      alert("請輸入要轉換的數字");
      return;
    }

    if (!fromBase || fromBase < 2 || fromBase > 36) {
      alert("來源進制必須是 2-36 之間的數字");
      return;
    }

    if (!toBase || toBase < 2 || toBase > 36) {
      alert("目標進制必須是 2-36 之間的數字");
      return;
    }

    try {
      const result = baseConvert(input, fromBase, toBase);
      convertOutput.value = result;
      saveData();
    } catch (error) {
      alert(`轉換失敗: ${error.message}`);
    }
  }

  convertButton.addEventListener("click", processBaseConversion);

  // 清除進制轉換
  function clearBaseConversion() {
    convertInput.value = "";
    convertOutput.value = "";
    saveData();
  }

  clearButton.addEventListener("click", clearBaseConversion);

  // === Unicode 功能 ===

  // 更新 Unicode 介面文字
  function updateUnicodeInterface() {
    const selectedMode = document.querySelector(
      'input[name="unicode-mode"]:checked'
    ).value;
    const isEncode = selectedMode === "encode";

    unicodeProcessButton.textContent = isEncode ? "編碼" : "解碼";
    unicodeInputLabel.textContent = isEncode
      ? "輸入文字 (轉為 Unicode):"
      : "輸入 Unicode 編碼:";
    unicodeOutputTitle.textContent = isEncode ? "Unicode 編碼結果" : "解碼結果";
    unicodeInput.placeholder = isEncode
      ? "輸入要轉換為 Unicode 的文字"
      : "輸入 Unicode 編碼 (如: \\u4E2D\\u6587 或 U+4E2D U+6587)";
    unicodeOutput.placeholder = isEncode ? "Unicode 編碼結果" : "解碼後的文字";
  }

  // 監聽 Unicode 模式變更
  unicodeModeRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      updateUnicodeInterface();
      saveData();
    });
  });

  // 監聽 Unicode 輸入變更
  unicodeInput.addEventListener("input", saveData);

  // 處理 Unicode 編碼/解碼
  function processUnicode() {
    const input = unicodeInput.value.trim();
    if (!input) {
      alert("請輸入內容");
      return;
    }

    const mode = document.querySelector(
      'input[name="unicode-mode"]:checked'
    ).value;

    try {
      let result;
      if (mode === "encode") {
        result = unicodeEncode(input);
      } else {
        result = unicodeDecode(input);
      }
      unicodeOutput.value = result;
      saveData();
    } catch (error) {
      alert(`處理失敗: ${error.message}`);
    }
  }

  unicodeProcessButton.addEventListener("click", processUnicode);

  // 清除 Unicode
  function clearUnicode() {
    unicodeInput.value = "";
    unicodeOutput.value = "";
    saveData();
  }

  unicodeClearButton.addEventListener("click", clearUnicode);

  // === 複製功能 ===

  // 添加複製功能到所有輸出欄位
  function addCopyFunctionality() {
    [outputField, convertOutput, unicodeOutput].forEach((field) => {
      field.addEventListener("click", () => {
        if (field.value) {
          field.select();
          document.execCommand("copy");

          // 顯示複製成功提示
          const originalPlaceholder = field.placeholder;
          field.placeholder = "已複製到剪貼簿！";
          setTimeout(() => {
            field.placeholder = originalPlaceholder;
          }, 1000);
        }
      });
    });
  }

  // === 初始化 ===

  // 載入儲存的數據
  loadData();

  // 初始化介面
  updateEncodeInterface();
  updatePlaceholderFromBase();
  updateUnicodeInterface();

  // 添加複製功能
  addCopyFunctionality();

  // 監聽所有輸入欄位變更以觸發自動儲存
  [inputField, convertInput, unicodeInput].forEach((field) => {
    field.addEventListener("input", saveData);
  });
});
