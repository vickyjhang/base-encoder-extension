function base64Encode(input) {
  // 先將字串轉換為 UTF-8 編碼，然後進行 Base64 編碼
  return btoa(unescape(encodeURIComponent(input)));
}

function base64Decode(input) {
  // 先進行 Base64 解碼，然後將 UTF-8 編碼轉換回字串
  try {
    return decodeURIComponent(escape(atob(input)));
  } catch (error) {
    throw new Error("無效的 Base64 字串");
  }
}

function base58Encode(input) {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let num = BigInt(0);

  for (let i = 0; i < input.length; i++) {
    num = num * BigInt(256) + BigInt(input.charCodeAt(i));
  }

  let encoded = "";
  while (num > 0) {
    encoded = alphabet[num % BigInt(58)] + encoded;
    num /= BigInt(58);
  }

  for (let i = 0; i < input.length && input[i] === "\0"; i++) {
    encoded = alphabet[0] + encoded;
  }

  return encoded;
}

function base58Decode(input) {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  let num = BigInt(0);

  for (let i = 0; i < input.length; i++) {
    num = num * BigInt(58) + BigInt(alphabet.indexOf(input[i]));
  }

  let decoded = "";
  while (num > 0) {
    decoded = String.fromCharCode(Number(num % BigInt(256))) + decoded;
    num /= BigInt(256);
  }

  return decoded;
}

function customBaseEncode(input, base) {
  // 檢查進制範圍
  if (base < 2 || base > 36) {
    throw new Error("進制必須在 2 到 36 之間");
  }

  // 檢查輸入是否為純數字
  const isNumeric = /^\d+$/.test(input.trim());

  if (isNumeric) {
    // 純數字模式：將十進制數字轉換為指定進制
    const decimal = parseInt(input, 10);
    if (isNaN(decimal)) {
      throw new Error("無效的數字");
    }
    return decimal.toString(base).toUpperCase();
  } else {
    // 文字模式：將每個字符轉換為其字符碼，然後轉換為指定進制
    let result = "";
    for (let i = 0; i < input.length; i++) {
      const charCode = input.charCodeAt(i);
      const encoded = charCode.toString(base).toUpperCase();
      result += encoded;
      if (i < input.length - 1) {
        result += "-"; // 使用破折號分隔避免混淆
      }
    }
    return result;
  }
}

function customBaseDecode(input, base) {
  // 檢查進制範圍
  if (base < 2 || base > 36) {
    throw new Error("進制必須在 2 到 36 之間");
  }

  try {
    // 檢查是否包含破折號（文字模式）
    if (input.includes("-")) {
      // 文字模式：按破折號分割，然後將每個部分從指定進制轉換回字符
      const parts = input.split("-");
      let result = "";

      for (let part of parts) {
        if (part) {
          const charCode = parseInt(part, base);
          if (isNaN(charCode)) {
            throw new Error(`無效的 Base${base} 字串`);
          }
          result += String.fromCharCode(charCode);
        }
      }
      return result;
    } else {
      // 純數字模式：將指定進制的數字轉換為十進制
      const decimal = parseInt(input, base);
      if (isNaN(decimal)) {
        throw new Error(`無效的 Base${base} 字串`);
      }
      return decimal.toString(10);
    }
  } catch (error) {
    throw new Error(`無效的 Base${base} 字串: ${error.message}`);
  }
}

// 新增：純進制轉換函數
function baseConvert(input, fromBase, toBase) {
  // 檢查進制範圍
  if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
    throw new Error("進制必須在 2 到 36 之間");
  }

  try {
    // 先轉換為十進制
    const decimal = parseInt(input, fromBase);
    if (isNaN(decimal)) {
      throw new Error(`"${input}" 不是有效的 ${fromBase} 進制數字`);
    }

    // 再轉換為目標進制
    return decimal.toString(toBase).toUpperCase();
  } catch (error) {
    throw new Error(`進制轉換錯誤: ${error.message}`);
  }
}

// 新增：Unicode 編碼函數
function unicodeEncode(input) {
  let result = "";
  for (let i = 0; i < input.length; i++) {
    const codePoint = input.codePointAt(i);
    if (codePoint > 0xffff) {
      // 處理超過 BMP 的字符（如 emoji）
      result +=
        "\\u" + ("000" + ((codePoint - 0x10000) >> 10) + 0xd800).slice(-4);
      result +=
        "\\u" + ("000" + ((codePoint - 0x10000) & 0x3ff) + 0xdc00).slice(-4);
      i++; // 跳過下一個字符，因為這是一個代理對
    } else {
      result += "\\u" + ("000" + codePoint.toString(16)).slice(-4);
    }
  }
  return result;
}

// 新增：Unicode 解碼函數
function unicodeDecode(input) {
  try {
    // 移除可能的額外空格
    input = input.trim();

    // 處理不同格式的 Unicode 編碼
    let processedInput = input;

    // 處理 &#x 格式 (如 &#x71df;)
    processedInput = processedInput.replace(
      /&#x([0-9a-fA-F]+);/g,
      (match, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
      }
    );

    // 處理 &# 格式 (如 &#29151;)
    processedInput = processedInput.replace(/&#(\d+);/g, (match, decimal) => {
      return String.fromCharCode(parseInt(decimal, 10));
    });

    // 處理 \u 格式 (如 \u71df)
    processedInput = processedInput.replace(
      /\\u([0-9a-fA-F]{4})/g,
      (match, hex) => {
        return String.fromCharCode(parseInt(hex, 16));
      }
    );

    // 處理 \U 格式 (如 \U000071df)
    processedInput = processedInput.replace(
      /\\U([0-9a-fA-F]{8})/g,
      (match, hex) => {
        const codePoint = parseInt(hex, 16);
        return String.fromCodePoint(codePoint);
      }
    );

    // 處理 U+ 格式 (如 U+71df)
    processedInput = processedInput.replace(
      /U\+([0-9a-fA-F]+)/g,
      (match, hex) => {
        const codePoint = parseInt(hex, 16);
        return String.fromCodePoint(codePoint);
      }
    );

    return processedInput;
  } catch (error) {
    throw new Error("無效的 Unicode 編碼格式");
  }
}

// 新增：將文字轉換為不同格式的 Unicode 編碼
function unicodeEncodeFormat(input, format = "backslash") {
  let result = "";

  for (let i = 0; i < input.length; i++) {
    const codePoint = input.codePointAt(i);

    switch (format) {
      case "backslash": // \u格式
        if (codePoint > 0xffff) {
          // 處理代理對
          const high = Math.floor((codePoint - 0x10000) / 0x400) + 0xd800;
          const low = ((codePoint - 0x10000) % 0x400) + 0xdc00;
          result += "\\u" + high.toString(16).padStart(4, "0");
          result += "\\u" + low.toString(16).padStart(4, "0");
          i++; // 跳過低代理
        } else {
          result += "\\u" + codePoint.toString(16).padStart(4, "0");
        }
        break;

      case "html_hex": // &#x格式
        result += "&#x" + codePoint.toString(16) + ";";
        if (codePoint > 0xffff) i++; // 跳過低代理
        break;

      case "html_decimal": // &#格式
        result += "&#" + codePoint + ";";
        if (codePoint > 0xffff) i++; // 跳過低代理
        break;

      case "u_plus": // U+格式
        result +=
          "U+" + codePoint.toString(16).toUpperCase().padStart(4, "0") + " ";
        if (codePoint > 0xffff) i++; // 跳過低代理
        break;

      default:
        result += "\\u" + codePoint.toString(16).padStart(4, "0");
        if (codePoint > 0xffff) i++; // 跳過低代理
    }
  }

  return result.trim();
}

// 將函數暴露到全域作用域以供 popup.js 使用
window.base64Encode = base64Encode;
window.base64Decode = base64Decode;
window.base58Encode = base58Encode;
window.base58Decode = base58Decode;
window.customBaseEncode = customBaseEncode;
window.customBaseDecode = customBaseDecode;
window.baseConvert = baseConvert;
window.unicodeEncode = unicodeEncode;
window.unicodeDecode = unicodeDecode;
window.unicodeEncodeFormat = unicodeEncodeFormat;
