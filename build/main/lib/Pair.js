"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pair = void 0;
const UserResult_1 = require("./UserResult");
function Pair([data1, data2]) {
    const partner1 = UserResult_1.UserResult(data1);
    const partner2 = UserResult_1.UserResult(data2);
    const profile1 = partner1.profile;
    const profile2 = partner2.profile;
    const portrait1 = partner1.portrait;
    const portrait2 = partner2.portrait;
    const leadSegment1 = partner1.mainOctant;
    const leadSegment2 = partner2.mainOctant;
    const leftHemisphere = UserResult_1.octantCodeList.slice(0, 4);
    const rightHemisphere = UserResult_1.octantCodeList.slice(4);
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
        const commonIndex = UserResult_1.octantCodeList.indexOf(code);
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
exports.Pair = Pair;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvUGFpci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSw2Q0FBdUQ7QUFFdkQsU0FBZ0IsSUFBSSxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBZ0M7SUFFOUQsTUFBTSxRQUFRLEdBQWdCLHVCQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDL0MsTUFBTSxRQUFRLEdBQWdCLHVCQUFVLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDL0MsTUFBTSxRQUFRLEdBQXlCLFFBQVEsQ0FBQyxPQUFPLENBQUE7SUFDdkQsTUFBTSxRQUFRLEdBQXlCLFFBQVEsQ0FBQyxPQUFPLENBQUE7SUFDdkQsTUFBTSxTQUFTLEdBQXVCLFFBQVEsQ0FBQyxRQUFRLENBQUE7SUFDdkQsTUFBTSxTQUFTLEdBQXVCLFFBQVEsQ0FBQyxRQUFRLENBQUE7SUFDdkQsTUFBTSxZQUFZLEdBQVksUUFBUSxDQUFDLFVBQVUsQ0FBQTtJQUNqRCxNQUFNLFlBQVksR0FBWSxRQUFRLENBQUMsVUFBVSxDQUFBO0lBRWpELE1BQU0sY0FBYyxHQUFHLDJCQUFjLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtJQUNqRCxNQUFNLGVBQWUsR0FBRywyQkFBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUUvQzs7T0FFRztJQUNILFNBQVMsb0JBQW9CO1FBRXpCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7UUFDNUQsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtRQUU1RCxJQUFJLE9BQU8sS0FBSyxDQUFDLElBQUksT0FBTyxLQUFLLENBQUMsRUFBRTtZQUNoQyxPQUFPLENB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