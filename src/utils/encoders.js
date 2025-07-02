// Base64 編碼函數
function base64Encode(input) {
  // 先將字串轉換為 UTF-8 編碼，然後進行 Base64 編碼
  return btoa(unescape(encodeURIComponent(input)));
}

// Base64 解碼函數
function base64Decode(input) {
  // 先進行 Base64 解碼，然後將 UTF-8 編碼轉換回字串
  try {
    return decodeURIComponent(escape(atob(input)));
  } catch (error) {
    throw new Error("無效的 Base64 字串");
  }
}

// Base58 編碼函數
function base58Encode(input) {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

  // 將輸入字符串轉換為字節數組
  const bytes = [];
  for (let i = 0; i < input.length; i++) {
    const code = input.codePointAt(i);
    if (code <= 0x7F) {
      bytes.push(code);
    } else if (code <= 0x7FF) {
      bytes.push(0xC0 | (code >> 6));
      bytes.push(0x80 | (code & 0x3F));
    } else if (code <= 0xFFFF) {
      bytes.push(0xE0 | (code >> 12));
      bytes.push(0x80 | ((code >> 6) & 0x3F));
      bytes.push(0x80 | (code & 0x3F));
    } else {
      bytes.push(0xF0 | (code >> 18));
      bytes.push(0x80 | ((code >> 12) & 0x3F));
      bytes.push(0x80 | ((code >> 6) & 0x3F));
      bytes.push(0x80 | (code & 0x3F));
      i++; // 跳過下一個字符（高代理）
    }
  }

  // 轉換為大整數
  let num = BigInt(0);
  for (let i = 0; i < bytes.length; i++) {
    num = num * BigInt(256) + BigInt(bytes[i]);
  }

  // 如果輸入為空，返回空字符串
  if (num === BigInt(0) && bytes.length === 0) {
    return "";
  }

  // 編碼
  let encoded = "";
  while (num > 0) {
    encoded = alphabet[Number(num % BigInt(58))] + encoded;
    num = num / BigInt(58);
  }

  // 處理前導零字節
  for (let i = 0; i < bytes.length && bytes[i] === 0; i++) {
    encoded = alphabet[0] + encoded;
  }

  return encoded || alphabet[0];
}

// Base58 解碼函數
function base58Decode(input) {
  const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";

  if (!input || input.length === 0) {
    return "";
  }

  // 檢查字符是否有效
  for (let i = 0; i < input.length; i++) {
    if (alphabet.indexOf(input[i]) === -1) {
      throw new Error(`無效的 Base58 字符: ${input[i]}`);
    }
  }

  // 轉換為大整數
  let num = BigInt(0);
  for (let i = 0; i < input.length; i++) {
    const index = alphabet.indexOf(input[i]);
    if (index === -1) {
      throw new Error("無效的 Base58 字串");
    }
    num = num * BigInt(58) + BigInt(index);
  }

  // 轉換為字節數組
  const bytes = [];
  while (num > 0) {
    bytes.unshift(Number(num % BigInt(256)));
    num = num / BigInt(256);
  }

  // 處理前導 '1' 字符
  for (let i = 0; i < input.length && input[i] === alphabet[0]; i++) {
    bytes.unshift(0);
  }

  // 將字節數組轉換為 UTF-8 字符串
  let result = "";
  let i = 0;
  while (i < bytes.length) {
    const byte1 = bytes[i];

    if (byte1 < 0x80) {
      // 單字節字符
      result += String.fromCharCode(byte1);
      i++;
    } else if ((byte1 & 0xE0) === 0xC0) {
      // 雙字節字符
      if (i + 1 >= bytes.length) break;
      const byte2 = bytes[i + 1];
      const codePoint = ((byte1 & 0x1F) << 6) | (byte2 & 0x3F);
      result += String.fromCharCode(codePoint);
      i += 2;
    } else if ((byte1 & 0xF0) === 0xE0) {
      // 三字節字符
      if (i + 2 >= bytes.length) break;
      const byte2 = bytes[i + 1];
      const byte3 = bytes[i + 2];
      const codePoint = ((byte1 & 0x0F) << 12) | ((byte2 & 0x3F) << 6) | (byte3 & 0x3F);
      result += String.fromCharCode(codePoint);
      i += 3;
    } else if ((byte1 & 0xF8) === 0xF0) {
      // 四字節字符
      if (i + 3 >= bytes.length) break;
      const byte2 = bytes[i + 1];
      const byte3 = bytes[i + 2];
      const byte4 = bytes[i + 3];
      const codePoint = ((byte1 & 0x07) << 18) | ((byte2 & 0x3F) << 12) | ((byte3 & 0x3F) << 6) | (byte4 & 0x3F);
      result += String.fromCodePoint(codePoint);
      i += 4;
    } else {
      // 無效字節，跳過
      i++;
    }
  }

  return result;
}

// 進制轉換函數
function convertBase(value, fromBase, toBase) {
  // 驗證進制範圍
  if (fromBase < 2 || fromBase > 36 || toBase < 2 || toBase > 36) {
    throw new Error("進制必須在 2-36 之間");
  }

  // 移除空白字符
  value = value.trim().toUpperCase();

  if (!value) {
    return "";
  }

  // 驗證輸入字符是否符合來源進制
  const validChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(0, fromBase);
  for (let i = 0; i < value.length; i++) {
    if (validChars.indexOf(value[i]) === -1) {
      throw new Error(`字符 '${value[i]}' 不符合 ${fromBase} 進制`);
    }
  }

  // 轉換為十進制
  let decimal = BigInt(0);
  for (let i = 0; i < value.length; i++) {
    const digit = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(value[i]);
    decimal = decimal * BigInt(fromBase) + BigInt(digit);
  }

  // 如果目標是十進制，直接返回
  if (toBase === 10) {
    return decimal.toString();
  }

  // 轉換為目標進制
  if (decimal === BigInt(0)) {
    return "0";
  }

  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  while (decimal > 0) {
    result = digits[Number(decimal % BigInt(toBase))] + result;
    decimal = decimal / BigInt(toBase);
  }

  return result;
}

// Unicode 編碼函數
function unicodeEncode(input) {
  return input.split('').map(char => {
    const code = char.codePointAt(0);
    return `\\u${code.toString(16).padStart(4, '0').toUpperCase()}`;
  }).join('');
}

// Unicode 解碼函數
function unicodeDecode(input) {
  // 支援多種 Unicode 格式
  return input
    .replace(/\\u([0-9a-fA-F]{4})/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/U\+([0-9a-fA-F]+)/g, (match, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (match, hex) => String.fromCharCode(parseInt(hex, 16)));
}
