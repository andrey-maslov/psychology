import { baseTestResultType, IDescWithRange, IDescWithStatus, IOctant, ITendency } from "..";
export declare function getDescByRange(value: number, descList: {
    readonly title: string;
    readonly variants: readonly IDescWithRange[];
}): IDescWithStatus;
export declare function getIndexByRange(value: number, descList: readonly IDescWithRange[]): number;
export declare function getKeyResult(value: number, results: readonly string[]): string;
export declare function getPersonProfile(testResult: baseTestResultType): readonly ITendency[];
export declare function getPersonPortrait(profile: readonly ITendency[]): readonly IOctant[];
/**
 * Какая вы знаменитость
 * @param octant
 * @param famousList
 * @param sex
 */
export declare function getFamous(octant: IOctant, famousList: readonly (readonly string[])[], sex?: number): string | null;