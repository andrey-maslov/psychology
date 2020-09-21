"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResult = exports.octantCodeList = void 0;
const utils_1 = require("./utils");
exports.octantCodeList = ['A1', 'A2', 'B1', 'B2', 'a1', 'a2', 'b1', 'b2'];
function UserResult(testResult) {
    const profile = utils_1.getPersonProfile(testResult);
    const portrait = utils_1.getPersonPortrait(profile);
    const sortedOctants = [...portrait].sort((a, b) => (b.value - a.value));
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
        // difference between 1st and 2nd max values
        const diff = value1 * 0.2;
        if (value1 - value2 < diff) {
            return [sortedProfile[0].index, sortedProfile[1].index];
        }
        return [sortedProfile[0].index];
    }
    return Object.freeze({
        profile,
        portrait,
        sortedOctants,
        mainOctant: sortedOctants[0],
        mainPsychoTypeList: getMainPsychoType(),
        mainTendencyList: getMainTendency()
    });
}
exports.UserResult = UserResult;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVXNlclJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQSxtQ0FBNkQ7QUFFaEQsUUFBQSxjQUFjLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7QUFFOUUsU0FBZ0IsVUFBVSxDQUFDLFVBQThCO0lBRXZELE1BQU0sT0FBTyxHQUF5Qix3QkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUNsRSxNQUFNLFFBQVEsR0FBdUIseUJBQWlCLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDL0QsTUFBTSxhQUFhLEdBQXVCLENBQUMsR0FBRyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFFM0YsU0FBUyxpQkFBaUI7UUFFeEIsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDakYsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQ3hEO1FBQ0QsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNqQyxDQUFDO0lBRUQsU0FBUyxlQUFlO1FBRXRCLE1BQU0sYUFBYSxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNwRSxNQUFNLE1BQU0sR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFBO1FBQ3JDLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7UUFDckMsNENBQTRDO1FBQzVDLE1BQU0sSUFBSSxHQUFXLE1BQU0sR0FBRyxHQUFHLENBQUE7UUFFakMsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLElBQUksRUFBRTtZQUMxQixPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDeEQ7UUFDRCxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFFRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7UUFDbkIsT0FBTztRQUNQLFFBQVE7UUFDUixhQUFhO1FBQ2IsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFDNUIsa0JBQWtCLEVBQUUsaUJBQWlCLEVBQUU7UUFDdkMsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFO0tBQ3BDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUFwQ0QsZ0NBb0NDIn0=