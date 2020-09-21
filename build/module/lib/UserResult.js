import { getPersonPortrait, getPersonProfile } from './utils';
export const octantCodeList = ['A1', 'A2', 'B1', 'B2', 'a1', 'a2', 'b1', 'b2'];
export function UserResult(testResult) {
    const profile = getPersonProfile(testResult);
    const portrait = getPersonPortrait(profile);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclJlc3VsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9saWIvVXNlclJlc3VsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFPQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxTQUFTLENBQUE7QUFFN0QsTUFBTSxDQUFDLE1BQU0sY0FBYyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO0FBRTlFLE1BQU0sVUFBVSxVQUFVLENBQUMsVUFBOEI7SUFFdkQsTUFBTSxPQUFPLEdBQXlCLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFBO0lBQ2xFLE1BQU0sUUFBUSxHQUF1QixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMvRCxNQUFNLGFBQWEsR0FBdUIsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUUzRixTQUFTLGlCQUFpQjtRQUV4QixJQUFJLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNqRixPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDeEQ7UUFDRCxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2pDLENBQUM7SUFFRCxTQUFTLGVBQWU7UUFFdEIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ3BFLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7UUFDckMsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTtRQUNyQyw0Q0FBNEM7UUFDNUMsTUFBTSxJQUFJLEdBQVcsTUFBTSxHQUFHLEdBQUcsQ0FBQTtRQUVqQyxJQUFJLE1BQU0sR0FBRyxNQUFNLEdBQUcsSUFBSSxFQUFFO1lBQzFCLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUN4RDtRQUNELE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVELE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztRQUNuQixPQUFPO1FBQ1AsUUFBUTtRQUNSLGFBQWE7UUFDYixVQUFVLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztRQUM1QixrQkFBa0IsRUFBRSxpQkFBaUIsRUFBRTtRQUN2QyxnQkFBZ0IsRUFBRSxlQUFlLEVBQUU7S0FDcEMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyJ9