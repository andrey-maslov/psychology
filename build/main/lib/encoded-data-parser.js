"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsJsonString = exports.isBase64 = exports.validateDecodedData = exports.parseUrl = exports.getAndDecodeData = void 0;
function getAndDecodeData(key = 'encdata', encodedValue) {
    const value = encodedValue ? encodedValue.trim() : parseUrl(key);
    if (!value || !isBase64(value)) {
        return {
            encoded: null,
            decoded: null,
            data: null,
        };
    }
    const userDataString = atob(value);
    if (!validateDecodedData(userDataString) || !IsJsonString(userDataString)) {
        return {
            encoded: null,
            decoded: null,
            data: null,
        };
    }
    return {
        encoded: value,
        decoded: userDataString,
        data: JSON.parse(userDataString),
    };
}
exports.getAndDecodeData = getAndDecodeData;
function parseUrl(key = 'encdata') {
    let value = null;
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        value = urlParams.get(key);
    }
    return value;
}
exports.parseUrl = parseUrl;
function validateDecodedData(value) {
    //TODO needs improvement
    const regex = /^\[\[([+-]?\d,?){3}],\[(\[([+-]?\d,?){5}],?){5}\]\]$/;
    return value.search(regex) === 0;
}
exports.validateDecodedData = validateDecodedData;
function isBase64(str) {
    try {
        return btoa(atob(str)) === str;
    }
    catch (err) {
        return false;
    }
}
exports.isBase64 = isBase64;
function IsJsonString(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
exports.IsJsonString = IsJsonString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RlZC1kYXRhLXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZW5jb2RlZC1kYXRhLXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxTQUFnQixnQkFBZ0IsQ0FBQyxHQUFHLEdBQUcsU0FBUyxFQUFFLFlBQXFCO0lBTW5FLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUE7SUFFaEUsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUM1QixPQUFPO1lBQ0gsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQTtLQUNKO0lBQ0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBRWxDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsRUFBRTtRQUN2RSxPQUFPO1lBQ0gsT0FBTyxFQUFFLElBQUk7WUFDYixPQUFPLEVBQUUsSUFBSTtZQUNiLElBQUksRUFBRSxJQUFJO1NBQ2IsQ0FBQTtLQUNKO0lBRUQsT0FBTztRQUNILE9BQU8sRUFBRSxLQUFLO1FBQ2QsT0FBTyxFQUFFLGNBQWM7UUFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDO0tBQ25DLENBQUE7QUFDTCxDQUFDO0FBOUJELDRDQThCQztBQUVELFNBQWdCLFFBQVEsQ0FBQyxHQUFHLEdBQUksU0FBUztJQUNyQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUM7SUFDakIsSUFBSSxPQUFPLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDL0IsTUFBTSxTQUFTLEdBQUcsSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5RCxLQUFLLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUM5QjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2pCLENBQUM7QUFQRCw0QkFPQztBQUVELFNBQWdCLG1CQUFtQixDQUFDLEtBQWE7SUFFN0Msd0JBQXdCO0lBQ3hCLE1BQU0sS0FBSyxHQUFHLHNEQUFzRCxDQUFBO0lBRXBFLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDcEMsQ0FBQztBQU5ELGtEQU1DO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLEdBQVc7SUFDaEMsSUFBSTtRQUNBLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQztLQUNsQztJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1YsT0FBTyxLQUFLLENBQUM7S0FDaEI7QUFDTCxDQUFDO0FBTkQsNEJBTUM7QUFFRCxTQUFnQixZQUFZLENBQUMsR0FBVztJQUNwQyxJQUFJO1FBQ0EsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNuQjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1IsT0FBTyxLQUFLLENBQUM7S0FDaEI7SUFDRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBUEQsb0NBT0MifQ==