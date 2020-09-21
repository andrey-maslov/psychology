import { octantCodeList } from "./UserResult";
export function getDescByRange(value, descList) {
    let desc = '';
    let index = null;
    // eslint-disable-next-line functional/no-loop-statement
    for (let i = 0; i < descList.options.length; i++) {
        if (value > (descList.options[i].range[0]) && value <= (descList.options[i].range[1])) {
            desc = descList.options[i].desc;
            index = i;
            break;
        }
    }
    const status = index === 0 ? 0 : (index === descList.options.length ? 2 : 1);
    return { title: descList.title, desc, status };
}
export function getIndexByRange(value, descList) {
    // eslint-disable-next-line functional/no-loop-statement
    for (let i = 0; i < descList.length; i++) {
        if (value > (descList[i].range[0]) && value <= (descList[i].range[1])) {
            return i;
        }
    }
    return -1;
}
export function getKeyResult(value, results) {
    if (value < .2) {
        return results[0];
    }
    else if (value >= .2 && value < .5) {
        return results[1];
    }
    else if (value >= .5 && value < .8) {
        return results[2];
    }
    else {
        return results[3];
    }
}
export function getPersonProfile(testResult) {
    const values = testResult.map(item => {
        let pos = 0;
        let neg = 0;
        item.forEach(value => {
            if (value > 0) {
                pos += value;
            }
            else {
                neg += value * -1;
            }
        });
        return [neg, pos];
    });
    return [
        { index: 0, value: values[1][0] },
        { index: 1, value: values[4][0] },
        { index: 2, value: values[0][0] },
        { index: 3, value: values[2][1] },
        { index: 4, value: values[1][1] },
        { index: 5, value: values[4][1] },
        { index: 6, value: values[0][1] },
        { index: 7, value: values[2][0] },
    ];
}
export function getPersonPortrait(profile) {
    const codeList = octantCodeList;
    const axisValues = profile.map(item => item.value);
    const axisValuesReversed = [...axisValues].reverse();
    const octantsValues = [];
    // eslint-disable-next-line functional/no-loop-statement
    for (let i = 0; i < axisValuesReversed.length; i++) {
        if (i === axisValues.length - 1) {
            // eslint-disable-next-line functional/immutable-data
            octantsValues.unshift(axisValuesReversed[i] * axisValuesReversed[0] * 0.7071 / 2);
            break;
        }
        // eslint-disable-next-line functional/immutable-data
        octantsValues.push(axisValuesReversed[i] * axisValuesReversed[i + 1] * 0.7071 / 2);
    }
    //octant names begin with aggression and go in reverse order. So, change order values
    const swappedValues = [...octantsValues.slice(4), ...octantsValues.slice(0, 4)];
    return swappedValues.map((value, i) => {
        return { code: codeList[i], index: i, value: Number(value.toFixed(2)) };
    });
}
/**
 * Какая вы знаменитость
 * @param octant
 * @param famousList
 * @param sex
 */
export function getFamous(octant, famousList, sex = 0) {
    //sex: 0 - male, 1 - female, 2 - some else
    const value = octant.value;
    const range = [8.75, 42.35, 140, 218.57];
    if (value < range[0] || value > range[3]) {
        return null;
    }
    if (value >= range[0] && value < range[1]) {
        return famousList[octant.index][0].split('/')[sex];
    }
    else if (value >= range[1] && value < range[2]) {
        return famousList[octant.index][1].split('/')[sex];
    }
    return famousList[octant.index][2].split('/')[sex];
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFFM0MsTUFBTSxVQUFVLGNBQWMsQ0FBRSxLQUFhLEVBQUUsUUFBaUY7SUFFNUgsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFBO0lBQ2IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFBO0lBRWxCLHdEQUF3RDtJQUN0RCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDOUMsSUFBSSxLQUFLLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDbkYsSUFBSSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFBO1lBQy9CLEtBQUssR0FBRyxDQUFDLENBQUE7WUFDVCxNQUFLO1NBQ1I7S0FDSjtJQUNELE1BQU0sTUFBTSxHQUFHLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDNUUsT0FBTyxFQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUMsQ0FBQTtBQUNoRCxDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FBRSxLQUFhLEVBQUUsUUFBbUM7SUFFakYsd0RBQXdEO0lBQ3RELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3RDLElBQUksS0FBSyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNuRSxPQUFPLENBQUMsQ0FBQztTQUNaO0tBQ0o7SUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFBO0FBQ2IsQ0FBQztBQUdELE1BQU0sVUFBVSxZQUFZLENBQUMsS0FBYSxFQUFFLE9BQTBCO0lBQ2xFLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtRQUNaLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ3BCO1NBQU0sSUFBSSxLQUFLLElBQUksRUFBRSxJQUFJLEtBQUssR0FBRyxFQUFFLEVBQUU7UUFDbEMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDcEI7U0FBTSxJQUFJLEtBQUssSUFBSSxFQUFFLElBQUksS0FBSyxHQUFHLEVBQUUsRUFBRTtRQUNsQyxPQUFPLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUNwQjtTQUFNO1FBQ0gsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUE7S0FDcEI7QUFDTCxDQUFDO0FBRUQsTUFBTSxVQUFVLGdCQUFnQixDQUFDLFVBQThCO0lBQzNELE1BQU0sTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDakMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNqQixJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUU7Z0JBQ1gsR0FBRyxJQUFJLEtBQUssQ0FBQzthQUNoQjtpQkFBTTtnQkFDSCxHQUFHLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3JCO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDSCxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3RCLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTztRQUNILEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO1FBQy9CLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO1FBQy9CLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO1FBQy9CLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO1FBQy9CLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO1FBQy9CLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO1FBQy9CLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO1FBQy9CLEVBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFDO0tBQ2xDLENBQUM7QUFFTixDQUFDO0FBRUQsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE9BQTZCO0lBRTNELE1BQU0sUUFBUSxHQUFHLGNBQWMsQ0FBQTtJQUUvQixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ25ELE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBRXBELE1BQU0sYUFBYSxHQUFHLEVBQUUsQ0FBQztJQUMzQix3REFBd0Q7SUFDdEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNoRCxJQUFJLENBQUMsS0FBSyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMvQixxREFBcUQ7WUFDbkQsYUFBYSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDbEYsTUFBTTtTQUNUO1FBQ0gscURBQXFEO1FBQ25ELGFBQWEsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztLQUN0RjtJQUVELHFGQUFxRjtJQUNyRixNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFaEYsT0FBTyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2xDLE9BQU8sRUFBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztJQUMxRSxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUMsTUFBZSxFQUFFLFVBQTBDLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFDNUYsMENBQTBDO0lBQzFDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7SUFDMUIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUV4QyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN4QyxPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDekMsT0FBTyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtLQUNuRDtTQUFNLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ2hELE9BQU8sVUFBVSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDbkQ7SUFDRCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0FBQ3BELENBQUMifQ==