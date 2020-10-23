import { DecodedDataType } from '../types/types';
export declare function getAndDecodeData(key?: string, encodedValue?: string): {
    readonly encoded: string | null;
    readonly decoded: string | null;
    readonly data: DecodedDataType | null;
};
export declare function parseUrl(key?: string): string | null;
export declare function validateDecodedData(value: string): boolean;
export declare function isBase64Browser(str: string): boolean;
export declare function IsJsonString(str: string): boolean;
