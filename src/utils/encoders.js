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

// 將函數暴露到全域作用域以供 popup.js 使用
window.base64Encode = base64Encode;
window.base64Decode = base64Decode;
window.base58Encode = base58Encode;
window.base58Decode = base58Decode;
window.customBaseEncode = customBaseEncode;
window.customBaseDecode = customBaseDecode;
window.baseConvert = baseConvert;
