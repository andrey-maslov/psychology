import { baseTestResultType, IOctant, ITendency } from "../types/types";
import { IMember } from "../types/types";
export declare function Team(dataList: readonly baseTestResultType[]): Readonly<{
    profile: {
        index: number;
        value: number;
    }[];
    portrait: readonly IOctant[];
    profileList: (readonly ITendency[])[];
    getCrossFunc: () => number;
    getInteraction: () => number;
    getEmotionalComp: () => number;
    getLoyalty: () => number;
    getLeadingMemberByType: (typeInd: number) => number;
    getCommitment: () => number;
    getDescIndexes: () => readonly number[];
    getNeedfulPsychoType: () => readonly number[];
    getAllCandidates: (poolMembers: readonly IMember[], teamMembers: readonly IMember[]) => readonly IMember[];
    getCandidates: (teamSpecInd: number, allCandidates: readonly IMember[]) => readonly IMember[] | null;
    getUnwanted: (members: readonly IMember[]) => readonly IMember[];
}>;
