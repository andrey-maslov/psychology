"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const UserResult_1 = require("./UserResult");
const utils_1 = require("./utils");
function Team(dataList) {
    const resultList = dataList.map((member) => UserResult_1.UserResult(member));
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
            return { code: UserResult_1.octantCodeList[i], index: i, value };
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
            const profile = utils_1.getPersonProfile(item.decData[1]);
            const portrait = utils_1.getPersonPortrait(profile);
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
        return members.filter(item => !checkIntensity(utils_1.getPersonProfile(item.decData[1])));
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
exports.Team = Team;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVhbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVGVhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw2Q0FBdUQ7QUFDdkQsbUNBQTJEO0FBRTNELFNBQWdCLElBQUksQ0FBQyxRQUF1QztJQUV4RCxNQUFNLFVBQVUsR0FBMkIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsdUJBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQ3ZGLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUE7SUFDcEMsTUFBTSxXQUFXLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUM1RCxNQUFNLFlBQVksR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzlELE1BQU0sT0FBTyxHQUFHLGNBQWMsRUFBRSxDQUFBO0lBQ2hDLE1BQU0sUUFBUSxHQUFHLGVBQWUsRUFBRSxDQUFBO0lBQ2xDLE1BQU0sU0FBUyxHQUFHLGtCQUFrQixFQUFFLENBQUE7SUFDdEMsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQWEsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUE7SUFHckY7O09BRUc7SUFDSCxTQUFTLGNBQWM7UUFDbkIsTUFBTSxTQUFTLEdBQUcsWUFBWSxDQUF1QixXQUFXLENBQUMsQ0FBQTtRQUNqRSxPQUFPLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDOUIsT0FBTyxFQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFDLENBQUE7UUFDNUIsQ0FBQyxDQUFDLENB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