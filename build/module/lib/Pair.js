import { octantCodeList, UserResult } from './UserResult';
export function Pair([data1, data2]) {
    const partner1 = UserResult(data1);
    const partner2 = UserResult(data2);
    const profile1 = partner1.profile;
    const profile2 = partner2.profile;
    const portrait1 = partner1.portrait;
    const portrait2 = partner2.portrait;
    const leadSegment1 = partner1.mainOctant;
    const leadSegment2 = partner2.mainOctant;
    const leftHemisphere = octantCodeList.slice(0, 4);
    const rightHemisphere = octantCodeList.slice(4);
    /**
     * Принятие особенностей партнера
     */
    function getPartnerAcceptance() {
        const maxVal1 = profile1[partner1.mainTendencyList[0]].value;
        const maxVal2 = profile2[partner2.mainTendencyList[0]].value;
        if (maxVal1 === 0 || maxVal2 === 0) {
            return 0;
        }
        return (maxVal1 < maxVal2 ? maxVal1 / maxVal2 : maxVal2 / maxVal1);
    }
    /**
     * Взаимное понимание
     */
    function getUnderstanding() {
        let result = 1; // init result value
        const fraction = 0.125;
        portrait1.forEach((octant, i) => {
            if ((octant.value === 0 && portrait2[i].value !== 0)
                ||
                    (octant.value !== 0 && portrait2[i].value === 0)) {
                result -= fraction;
            }
        });
        return result;
    }
    /**
     * Бессознательное притяжение
     */
    function getAttraction() {
        const oppositeSegmentForUser1 = portrait2[getOppositeSegmentIndex(leadSegment1.code)];
        const oppositeSegmentForUser2 = portrait1[getOppositeSegmentIndex(leadSegment2.code)];
        const oppositeVals1 = [oppositeSegmentForUser1.value, leadSegment1.value];
        const oppositeVals2 = [oppositeSegmentForUser2.value, leadSegment2.value];
        if ((oppositeVals1[0] === 0 && oppositeVals1[1] === 0) || oppositeVals2[0] === 0 && oppositeVals2[1] === 0) {
            return [0, 0];
        }
        const ratio1 = oppositeVals1[0] < oppositeVals1[1] ? oppositeVals1[0] / oppositeVals1[1] : oppositeVals1[1] / oppositeVals1[0];
        const ratio2 = oppositeVals2[0] < oppositeVals2[1] ? oppositeVals2[0] / oppositeVals2[1] : oppositeVals2[1] / oppositeVals2[0];
        return [ratio1, ratio2];
    }
    /**
     * Находим индекс противоположного сегмента (октанта)
     * @param code
     */
    function getOppositeSegmentIndex(code) {
        //get place of out lead letter index in letter indexes list
        const commonIndex = octantCodeList.indexOf(code);
        if (commonIndex < 4) {
            return commonIndex + 4;
        }
        return commonIndex - 4;
    }
    /**
     * Сходство жизненных установок
     */
    function getLifeAttitudes() {
        const code1 = leadSegment1.code;
        const code2 = leadSegment2.code;
        //Ведущие сегменты совпадают: 100%'
        if (code1 === code2) {
            return 1;
        }
        //Ведущие сегменты в одной четверти: 50%'
        if (code1[0] === code2[0]) {
            return 0.5;
        }
        //Ведущие сегменты в одном полушарии: 25%
        if ((leftHemisphere.includes(code1) && leftHemisphere.includes(code2)) || (rightHemisphere.includes(code1) && rightHemisphere.includes(code2))) {
            return 0.25;
        }
        return 0;
    }
    /**
     * Схожесть мышления
     */
    function getSimilarityThinking() {
        const code1 = leadSegment1.code;
        const code2 = leadSegment2.code;
        //Ведущие сегменты совпадают или в одной четверти; 100%'
        if (code1 === code2 || code1[0] === code2[0]) {
            return 1;
        }
        //Ведущие сегменты в одном полушарии; 50%
        if ((leftHemisphere.includes(code1) && leftHemisphere.includes(code2)) || (rightHemisphere.includes(code1) && rightHemisphere.includes(code2))) {
            return 0.5;
        }
        return 0;
    }
    /**
     * Психологическая взрослость
     */
    function getPsyMaturity() {
        const value1 = portrait1.filter((octant) => octant.value !== 0);
        const value2 = portrait2.filter((octant) => octant.value !== 0);
        return [value1.length / 8, value2.length / 8];
    }
    /**
     * Дополняемость
     */
    function getComplementarity() {
        const indexOfSegment1 = leadSegment1.index;
        const indexOfSegment2 = leadSegment2.index;
        if (partner1.mainOctant.code === partner2.mainOctant.code) {
            return [indexOfSegment1];
        }
        return [indexOfSegment1, indexOfSegment2];
    }
    return Object.freeze({
        partner1,
        partner2,
        profile1,
        profile2,
        portrait1,
        portrait2,
        leadSegment1,
        leadSegment2,
        getPartnerAcceptance,
        getUnderstanding,
        getAttraction,
        getLifeAttitudes,
        getSimilarityThinking,
        getPsyMaturity,
        getComplementarity
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvUGFpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxPQUFPLEVBQUMsY0FBYyxFQUFFLFVBQVUsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUV2RCxNQUFNLFVBQVUsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBZ0M7SUFFOUQsTUFBTSxRQUFRLEdBQWdCLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUMvQyxNQUFNLFFBQVEsR0FBZ0IsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQy9DLE1BQU0sUUFBUSxHQUF5QixRQUFRLENBQUMsT0FBTyxDQUFBO0lBQ3ZELE1BQU0sUUFBUSxHQUF5QixRQUFRLENBQUMsT0FBTyxDQUFBO0lBQ3ZELE1BQU0sU0FBUyxHQUF1QixRQUFRLENBQUMsUUFBUSxDQUFBO0lBQ3ZELE1BQU0sU0FBUyxHQUF1QixRQUFRLENBQUMsUUFBUSxDQUFBO0lBQ3ZELE1BQU0sWUFBWSxHQUFZLFFBQVEsQ0FBQyxVQUFVLENBQUE7SUFDakQsTUFBTSxZQUFZLEdBQVksUUFBUSxDQUFDLFVBQVUsQ0FBQTtJQUVqRCxNQUFNLGNBQWMsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNqRCxNQUFNLGVBQWUsR0FBRyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBRS9DOztPQUVHO0lBQ0gsU0FBUyxvQkFBb0I7UUFFekIsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtRQUM1RCxNQUFNLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1FBRTVELElBQUksT0FBTyxLQUFLLENBQUMsSUFB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