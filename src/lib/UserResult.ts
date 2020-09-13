import {baseTestResultType, IOctant, ITendency, IUserResult} from '../types/types'

import {getPersonPortrait, getPersonProfile} from "./utils";

export const octantCodeList = ['A1', 'A2', 'B1', 'B2', 'a1', 'a2', 'b1', 'b2']

export function UserResult(testResult: baseTestResultType): IUserResult {

    const profile: readonly ITendency[] = getPersonProfile(testResult)
    const portrait: readonly IOctant[] = getPersonPortrait(profile)
    const sortedOctants: readonly IOctant[] = [...portrait].sort((a, b) => (b.value - a.value))
    const mainOctant: IOctant = sortedOctants[0]
    const mainPsychoTypeList: readonly number[] = getMainPsychoType()
    const mainTendencyList: readonly number[] = getMainTendency()

    function getMainPsychoType(): readonly number[] {

        if (sortedOctants[0].value - sortedOctants[1].value < .2 * sortedOctants[0].value) {
            return [sortedOctants[0].index, sortedOctants[1].index];
        }
        return [sortedOctants[0].index];
    }

    function getMainTendency(): readonly number[] {

        const sortedProfile = [...profile].sort((a, b) => b.value - a.value);
        const value1 = sortedProfile[0].value;
        const value2 = sortedProfile[1].value;
        const diff: number = value1 * 0.2; // difference between 1st and 2nd max values

        if (value1 - value2 < diff) {
            return [sortedProfile[0].index, sortedProfile[1].index];
        }
        return [sortedProfile[0].index];
    }

    return Object.freeze({
        sortedOctants,
        profile,
        portrait,
        mainOctant,
        mainPsychoTypeList,
        mainTendencyList,
    })
}
