export function getAndDecodeData(key = 'encdata', encodedValue) {
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
export function parseUrl(key = 'encdata') {
    let value = null;
    if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        value = urlParams.get(key);
    }
    return value;
}
export function validateDecodedData(value) {
    //TODO needs improvement
    const regex = /^\[\[([+-]?\d,?){3}],\[(\[([+-]?\d,?){5}],?){5}\]\]$/;
    return value.search(regex) === 0;
}
export function isBase64(str) {
    try {
        return btoa(atob(str)) === str;
    }
    catch (err) {
        return false;
    }
}
export function IsJsonString(str) {
    try {
        JSON.parse(str);
    }
    catch (e) {
        return false;
    }
    return true;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW5jb2RlZC1kYXRhLXBhcnNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvZW5jb2RlZC1kYXRhLXBhcnNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsR0FBRyxHQUFHLFNBQVMsRUFBRSxZQUFxQjtJQU1uRSxNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBRWhFLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDNUIsT0FBTztZQUNILE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUE7S0FDSjtJQUNELE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUVsQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDdkUsT0FBTztZQUNILE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLElBQUk7WUFDYixJQUFJLEVBQUUsSUFBSTtTQUNiLENBQUE7S0FDSjtJQUVELE9BQU87UUFDSCxPQUFPLEVBQUUsS0FBSztRQUNkLE9BQU8sRUFBRSxjQUFjO1FBQ3ZCLElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztLQUNuQyxDQUFBO0FBQ0wsQ0FBQztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBRyxHQUFJLFNBQVM7SUFDckMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO0lBQ2pCLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxFQUFFO1FBQy9CLE1BQU0sU0FBUyxHQUFHLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDOUQsS0FBSyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDOUI7SUFDRCxPQUFPLEtBQUssQ0FBQztBQUNqQixDQUFDO0FBRUQsTUFBTSxVQUFVLG1CQUFtQixDQUFDLEtBQWE7SUFFN0Msd0JBQXdCO0lBQ3hCLE1BQU0sS0FBSyxHQUFHLHNEQUFzRCxDQUFBO0lBRXBFLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7QUFDcEMsQ0FBQztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsR0FBVztJQUNoQyxJQUFJO1FBQ0EsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDO0tBQ2xDO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDVixPQUFPLEtBQUssQ0FBQztLQUNoQjtBQUNMLENBQUM7QUFFRCxNQUFNLFVBQVUsWUFBWSxDQUFDLEdBQVc7SUFDcEMsSUFBSTtRQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDbkI7SUFBQyxPQUFPLENBQUMsRUFBRTtRQUNSLE9BQU8sS0FBSyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9