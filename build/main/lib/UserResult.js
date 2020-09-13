"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResult = exports.octantCodeList = void 0;
const utils_1 = require("./utils");
exports.octantCodeList = ['A1', 'A2', 'B1', 'B2', 'a1', 'a2', 'b1', 'b2'];
function UserResult(testResult) {
    const profile = utils_1.getPersonProfile(testResult);
    const portrait = utils_1.getPersonPortrait(profile);
    const sortedOctants = [...portrait].sort((a, b) => (b.value - a.value));
    const mainOctant = sortedOctants[0];
    const mainPsychoTypeList = getMainPsychoType();
    const mainTendencyList = getMainTendency();
    function getMainPsychoType() {
        if (sortedOctants[0].value - sortedOctants[1].value < .2 * sortedOctants[0].value) {
            return [sortedOctants[0].index, sortedOctants[1].index];
        }
        return [sortedOctants[0].index];
    }
    function getMainTendency() {
        const sortedProfile = [...profile].sort((a, b) => b.value - a.value);
        const value1 = sortedProfile[0].value;
        const value2 = sortedProfile[1].value;
        const diff = value1 * 0.2; // difference between 1st and 2nd max values
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
    });
}
exports.UserResult = UserResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVXNlclJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxtQ0FBNEQ7QUFFL0MsUUFBQSxjQUFjLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFFOUUsU0FBZ0IsVUFBVSxDQUFDLFVBQThCO0lBRXJELE1BQU0sT0FBTyxHQUF5Qix3QkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNsRSxNQUFNLFFBQVEsR0FBdUIseUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDL0QsTUFBTSxhQUFhLEdBQXVCLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDM0YsTUFBTSxVQUFVLEdBQVksYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzVDLE1BQU0sa0JBQWtCLEdBQXNCLGlCQUFpQixFQUFFLENBQUE7SUFDakUsTUFBTSxnQkFBZ0IsR0FBc0IsZUFBZSxFQUFFLENBQUE7SUFFN0QsU0FBUyxpQkFBaUI7UUFFdEIsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDL0UsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNEO1FBQ0QsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQsU0FBUyxlQUFlO1FBRXBCLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNyRSxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDdEMsTUFBTSxJQUFJLEdBQVcsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLDRDQUE0QztRQUUvRSxJQUFJLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxFQUFFO1lBQ3hCLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzRDtRQUNELE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUVELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNqQixhQUFhO1FBQ2IsT0FBTztRQUNQLFFBQVE7UUFDUixVQUFVO1FBQ1Ysa0JBQWtCO1FBQ2xCLGdCQUFnQjtLQUNuQixDQUFDLENBQUE7QUFDTixDQUFDO0FBdENELGdDQXNDQyJ9