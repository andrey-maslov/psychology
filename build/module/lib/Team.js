import { octantCodeList, UserResult } from './UserResult';
import { getPersonPortrait, getPersonProfile } from "./utils";
export function Team(dataList) {
    const resultList = dataList.map((member) => UserResult(member));
    const membersCount = dataList.length;
    const profileList = resultList.map(result => result.profile);
    const portraitList = resultList.map(result => result.portrait);
    const profile = getTeamProfile();
    const portrait = getTeamPortrait();
    const maxSector = getMaxSectorSquare();
    const majorOctants = portrait.filter((item) => item.value >= maxSector * .3);
    /**
     * Психологический профиль команды
     */
    function getTeamProfile() {
        const avgValues = getAvgValues(profileList);
        return avgValues.map((value, i) => {
            return { index: i, value };
        });
    }
    /**
     * get psychological portrait of the team
     */
    function getTeamPortrait() {
        const avgValues = getAvgValues(portraitList);
        return avgValues.map((value, i) => {
            return { code: octantCodeList[i], index: i, value };
        });
    }
    /**
     * Вычисления средних значений профиля и портрета команды из профилей и портретов участников
     */
    function getAvgValues(list) {
        const arrSum = [0, 0, 0, 0, 0, 0, 0, 0];
        list.forEach(item => {
            // eslint-disable-next-line functional/immutable-data
            arrSum.forEach((_val, i) => arrSum[i] += item[i].value);
        });
        return arrSum.map(item => {
            return +(item / membersCount).toFixed(1);
        });
    }
    /**
     * Get average value based on main tendencies of each member
     */
    function getTeamMaxIntensity() {
        const maxValues = profileList.map(profile => {
            const sorted = [...profile].sort((a, b) => b.value - a.value);
            return sorted[0].value;
        });
        return maxValues.reduce((a, b) => a + b) / membersCount;
    }
    /**
     * Get maximum fact (theoretical) value of sector square
     */
    function getMaxSectorSquare() {
        const sorted = [...portrait].sort((a, b) => (b.value - a.value));
        return sorted[0].value;
    }
    /**
     * Get cross-functionality value
     */
    function getCrossFunc() {
        if (maxSector === 0) {
            return -1;
        }
        const maxCircleSquare = maxSector * 8; // 8 -> number of octants in full circle
        const factCircleSquare = portrait.map(item => item.value).reduce((a, b) => a + b);
        return factCircleSquare / maxCircleSquare;
    }
    /**
     *
     * @param sortedPortraits
     */
    function getInteraction() {
        const allMaxValues = resultList.map(item => item.sortedOctants[0].value);
        const max = Math.max.apply(null, allMaxValues);
        const min = Math.min.apply(null, allMaxValues);
        return min / max;
    }
    /**
     * get emotion compatibility
     */
    function getEmotionalComp() {
        const values = portrait.map(octant => octant.value);
        const rightSum = values.slice(0, 4).reduce((a, b) => a + b);
        const leftSum = values.slice(4).reduce((a, b) => a + b);
        if (leftSum === 0) {
            return -1;
        }
        if (rightSum === 0) {
            return -1;
        }
        return (leftSum <= rightSum) ? leftSum / rightSum : rightSum / leftSum;
    }
    /**
     * get team loyalty
     */
    function getLoyalty() {
        const values = profile.map(item => item.value);
        const topSum = [values[0], values[1], values[7]].reduce((a, b) => a + b);
        const bottomSum = values.slice(3, 6).reduce((a, b) => a + b);
        if (bottomSum === 0) {
            return topSum / 0.1;
        }
        return topSum / bottomSum;
    }
    /**
     * @param typeInd (number from 1 to 8 of octants. Leader role equals Innovator type, for example)
     */
    function getLeadingMemberByType(typeInd) {
        const values = portraitList.map(octant => octant[typeInd].value);
        const max = Math.max.apply(null, values);
        return values.indexOf(max);
    }
    /**
     *
     */
    function getCommitment() {
        //list item = value of responsibility of one member from data block "Привязанность-отдельность"
        const respValsList = dataList.map(item => item[3][0]);
        return respValsList.reduce((a, b) => a + b);
    }
    /**
     * @return {number} list of number indexes for get especial descriptions from array
     */
    function getDescIndexes() {
        return portrait
            .filter(octant => octant.value >= maxSector / 2)
            .map(item => item.index);
    }
    /**
     *
     */
    function getNeedfulPsychoType() {
        const minorOctants = portrait.filter((item) => item.value < maxSector * .3);
        return minorOctants.map(item => item.index);
    }
    /**
     * get full list of potential candidates without psychological filters
     * @param poolMembers
     * @param teamMembers
     */
    function getAllCandidates(poolMembers, teamMembers) {
        const teamIdList = teamMembers.map(item => item.baseID);
        return poolMembers.filter(item => !teamIdList.includes(item.baseID));
    }
    /**
     *
     * @param teamSpecInd
     * @param allCandidates
     */
    function getCandidates(teamSpecInd, allCandidates) {
        const specsList = [['A1', 'A2', 'B1', 'B2', 'a1', 'a2', 'b1', 'b2'], ['A1', 'A2'], ['B1', 'B2'], ['a1', 'a2'], ['b1', 'b2']];
        const majorCodes = majorOctants.map(item => item.code);
        if (!isSmbNeeded(teamSpecInd, specsList)) {
            return null;
        }
        if (majorOctants.length === 8) {
            return null;
        }
        return allCandidates.filter(item => {
            const profile = getPersonProfile(item.decData[1]);
            const portrait = getPersonPortrait(profile);
            const sortedOctants = [...portrait].sort((a, b) => (b.value - a.value));
            if (!checkIntensity(profile)) {
                return false;
            }
            return ((majorCodes.includes(sortedOctants[0].code) && specsList[teamSpecInd].includes(sortedOctants[1].code))
                ||
                    (majorCodes.includes(sortedOctants[1].code) && specsList[teamSpecInd].includes(sortedOctants[0].code)));
        });
    }
    /**
     * Проверяет, не слишком ли расходится интенсивность кандидата и команды
     * @param memberProfile
     */
    function checkIntensity(memberProfile) {
        const teamMaxIntensity = getTeamMaxIntensity();
        const sortedMemberProfile = [...memberProfile].sort((a, b) => b.value - a.value);
        return !(sortedMemberProfile[0].value > teamMaxIntensity * 1.3 || sortedMemberProfile[0].value < teamMaxIntensity * .7);
    }
    /**
     * for getCandidate
     * @param specInd
     * @param specsList
     */
    function isSmbNeeded(specInd, specsList) {
        const majorOctantsCodes = majorOctants.map(item => item.code);
        if (majorOctantsCodes.includes(specsList[specInd][0]) && majorOctantsCodes.includes(specsList[specInd][1])) {
            const specOctants = majorOctants.filter(octant => octant.code === specsList[specInd][0] || octant.code === specsList[specInd][1]);
            const maxOctant = specOctants[0].value > specOctants[1].value ? specOctants[0] : specOctants[1];
            if (Math.abs(specOctants[0].value - specOctants[1].value) < maxOctant.value * .3) {
                return false;
            }
        }
        return true;
    }
    /**
     * Get unwanted members in the team ("white crow")
     * @param members
     */
    function getUnwanted(members) {
        return members.filter(item => !checkIntensity(getPersonProfile(item.decData[1])));
    }
    return Object.freeze({
        profile,
        portrait,
        profileList,
        getCrossFunc,
        getInteraction,
        getEmotionalComp,
        getLoyalty,
        getLeadingMemberByType,
        getCommitment,
        getDescIndexes,
        getNeedfulPsychoType,
        getAllCandidates,
        getCandidates,
        getUnwanted
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVGVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUMsY0FBYyxFQUFFLFVBQVUsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN2RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUMsTUFBTSxTQUFTLENBQUE7QUFFM0QsTUFBTSxVQUFVLElBQUksQ0FBQyxRQUF1QztJQUV4RCxNQUFNLFVBQVUsR0FBMkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7SUFDdkYsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQTtJQUNwQyxNQUFNLFdBQVcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzVELE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDOUQsTUFBTSxPQUFPLEdBQUcsY0FBYyxFQUFFLENBQUE7SUFDaEMsTUFBTSxRQUFRLEdBQUcsZUFBZSxFQUFFLENBQUE7SUFDbEMsTUFBTSxTQUFTLEdBQUcsa0JBQWtCLEVBQUUsQ0FBQTtJQUN0QyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBYSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUdyRjs7T0FFRztJQUNILFNBQVMsY0FBYztRQUNuQixNQUFNLFNBQVMsR0FBRyxZQUFZLENBQXVCLFdBQVcsQ0FBQyxDQUFBO1FBQ2pFLE9BQU8sU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFD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