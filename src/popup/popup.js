document.addEventListener("DOMContentLoaded", function () {
  // 標籤頁元素
  const encodeTab = document.getElementById("encode-tab");
  const convertTab = document.getElementById("convert-tab");
  const encodeSection = document.getElementById("encode-section");
  const convertSection = document.getElementById("convert-section");

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

  // === 數據持久化功能 ===

  // 儲存數據 (支援 Chrome storage 和 localStorage)
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

      // UI 狀態
      activeTab: document.querySelector(".tab-button.active").id,
    };

    // 優先使用 Chrome storage API
    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.local
    ) {
      chrome.storage.local.set({ encoderExtensionData: data });
    } else {
      // 備用 localStorage
      localStorage.setItem("encoderExtensionData", JSON.stringify(data));
    }
  }

  // 從儲存載入數據
  function loadData() {
    if (
      typeof chrome !== "undefined" &&
      chrome.storage &&
      chrome.storage.local
    ) {
      // 使用 Chrome storage API
      chrome.storage.local.get(["encoderExtensionData"], function (result) {
        if (result.encoderExtensionData) {
          restoreDataFromObject(result.encoderExtensionData);
        }
      });
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

      // 恢復活動標籤頁
      if (data.activeTab) {
        const activeTab = document.getElementById(data.activeTab);
        if (activeTab) {
          if (data.activeTab === "encode-tab") {
            switchTab(encodeTab, encodeSection);
          } else if (data.activeTab === "convert-tab") {
            switchTab(convertTab, convertSection);
          }
        }
      }

      // 更新對應的 placeholder
      updatePlaceholderFromBase();
      updateEncodeInterface();
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
    radio.addEventListener("change", function () {
      updateEncodeInterface();
      saveData(); // 儲存狀態
    });
  });

  // 監聽格式選擇變更
  formatSelect.addEventListener("change", saveData);

  // 監聽輸入欄位變更
  inputField.addEventListener("input", saveData);

  // 編碼/解碼處理
  processButton.addEventListener("click", function () {
    const inputText = inputField.value.trim();
    const selectedFormat = formatSelect.value;
    const selectedMode = document.querySelector(
      'input[name="mode"]:checked'
    ).value;

    if (inputText === "") {
      outputField.value = "";
      outputField.className = "";
      return;
    }

    try {
      let result;

      if (selectedMode === "encode") {
        // 編碼模式
        switch (selectedFormat) {
          case "base64":
            result = base64Encode(inputText);
            break;
          case "base58":
            result = base58Encode(inputText);
            break;
          default:
            throw new Error("不支援的編碼格式");
        }
      } else {
        // 解碼模式
        switch (selectedFormat) {
          case "base64":
            result = base64Decode(inputText);
            break;
          case "base58":
            result = base58Decode(inputText);
            break;
          default:
            throw new Error("不支援的解碼格式");
        }
      }

      outputField.value = result;
      outputField.className = "success";
      saveData(); // 儲存結果
    } catch (error) {
      outputField.value = `錯誤: ${error.message}`;
      outputField.className = "error";
      saveData(); // 儲存錯誤狀態
    }
  });

  // 編碼區塊 Enter 鍵支援
  inputField.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      processButton.click();
    }
  });

  // === 進制轉換功能 ===

  // 進制轉換處理
  function performBaseConversion() {
    const inputText = convertInput.value.trim();
    const fromBase = parseInt(fromBaseInput.value);
    const toBase = parseInt(toBaseInput.value);

    if (inputText === "") {
      convertOutput.value = "";
      convertOutput.className = "";
      return;
    }

    // 驗證進制範圍
    if (isNaN(fromBase) || fromBase < 2 || fromBase > 36) {
      convertOutput.value = "錯誤: 來源進制必須在 2-36 之間";
      convertOutput.className = "error";
      return;
    }

    if (isNaN(toBase) || toBase < 2 || toBase > 36) {
      convertOutput.value = "錯誤: 目標進制必須在 2-36 之間";
      convertOutput.className = "error";
      return;
    }

    try {
      const result = baseConvert(inputText, fromBase, toBase);
      convertOutput.value = `${inputText} (${fromBase}進制) = ${result} (${toBase}進制)`;
      convertOutput.className = "success";
      saveData(); // 儲存轉換結果
    } catch (error) {
      convertOutput.value = `錯誤: ${error.message}`;
      convertOutput.className = "error";
      saveData(); // 儲存錯誤狀態
    }
  }

  // 清除進制轉換輸入
  function clearConversion() {
    convertInput.value = "";
    convertOutput.value = "";
    convertOutput.className = "";
    fromBaseInput.value = "36";
    toBaseInput.value = "10";
    updatePlaceholderFromBase();
    saveData(); // 儲存清除後的狀態
  }

  // 進制轉換事件監聽
  convertButton.addEventListener("click", performBaseConversion);
  clearButton.addEventListener("click", clearConversion);

  // 進制轉換區塊 Enter 鍵支援
  convertInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      performBaseConversion();
    }
  });

  // 進制輸入變更時更新提示
  function updatePlaceholderFromBase() {
    const base = parseInt(fromBaseInput.value);
    if (base === 2) convertInput.placeholder = "例如: 1010101";
    else if (base === 8) convertInput.placeholder = "例如: 777";
    else if (base === 10) convertInput.placeholder = "例如: 255";
    else if (base === 16) convertInput.placeholder = "例如: FF";
    else if (base === 32) convertInput.placeholder = "例如: 8k2n0";
    else if (base === 36) convertInput.placeholder = "例如: ZZ";
    else convertInput.placeholder = "輸入要轉換的數字";
  }

  fromBaseInput.addEventListener("change", function () {
    updatePlaceholderFromBase();
    saveData(); // 儲存進制變更
  });

  // 監聽進制轉換相關輸入變更
  toBaseInput.addEventListener("change", saveData);
  convertInput.addEventListener("input", saveData);

  // 初始化功能
  function initialize() {
    // 先載入儲存的數據
    loadData();

    // 初始化介面
    updateEncodeInterface();

    // 設定初始提示文字
    updatePlaceholderFromBase();

    // 延遲檢查是否需要設定預設標籤頁
    setTimeout(() => {
      if (!document.querySelector(".tab-button.active")) {
        switchTab(encodeTab, encodeSection);
      }
    }, 100);
  }

  // 執行初始化
  initialize();
});
