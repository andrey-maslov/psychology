export function getAndDecodeData(key = 'encdata', encodedValue?: string): {
    readonly encoded: string | null,
    readonly decoded: string | null,
    readonly data: readonly (readonly number[])[] | null,
} {

    const value = encodedValue ? encodedValue.trim() : parseUrl(key)

    if (!value || !isBase64(value)) {
        return {
            encoded: null,
            decoded: null,
            data: null,
        }
    }
    const userDataString = atob(value)

    if (!validateDecodedData(userDataString) || !IsJsonString(userDataString)) {
        return {
            encoded: null,
            decoded: null,
            data: null,
        }
    }

    return {
        encoded: value,
        decoded: userDataString,
        data: JSON.parse(userDataString),
    }
}

export function parseUrl(key  = 'encdata'): string | null {
    let value = null;
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        value = urlParams.get(key);
    }
    return value;
}

export function validateDecodedData(value: string): boolean {

    //TODO needs improvement
    const regex = /^\[\[([+-]?\d,?){3}],\[(\[([+-]?\d,?){5}],?){5}\]\]$/

    return value.search(regex) === 0
}

export function isBase64(str: string): boolean {
    try {
        return btoa(atob(str)) === str;
    } catch (err) {
        return false;
    }
}

export function IsJsonString(str: string): boolean {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}