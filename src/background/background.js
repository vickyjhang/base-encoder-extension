const encoders = require('../utils/encoders');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'encode') {
        const { type, data } = request;
        let result;

        switch (type) {
            case 'base58':
                result = encoders.encodeBase58(data);
                break;
            case 'base64':
                result = encoders.encodeBase64(data);
                break;
            case 'base32':
                result = encoders.encodeBase32(data);
                break;
            default:
                result = 'Unsupported encoding type';
        }

        sendResponse({ result });
    }
});