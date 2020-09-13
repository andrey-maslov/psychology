import { baseTestResultType, IOctant, ITendency, IUserResult } from "../types/types";
export declare function Pair([data1, data2]: readonly baseTestResultType[]): Readonly<{
    partner1: IUserResult;
    partner2: IUserResult;
    profile1: readonly ITendency[];
    profile2: readonly ITendency[];
    portrait1: readonly IOctant[];
    portrait2: readonly IOctant[];
    leadSegment1: IOctant;
    leadSegment2: IOctant;
    getPartnerAcceptance: () => number;
    getUnderstanding: () => number;
    getAttraction: () => readonly number[];
    getLifeAttitudes: () => number;
    getSimilarityThinking: () => number;
    getPsyMaturity: () => readonly number[];
    getComplementarity: () => readonly number[];
}>;
