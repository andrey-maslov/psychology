import {baseTestResultType, IDescWithRange, IDescWithStatus, IOctant, ITendency} from "../types/types"

import {octantCodeList} from "./UserResult"

export function getDescByRange (value: number, descList: { readonly title: string, readonly options: readonly IDescWithRange[] }): IDescWithStatus {

    let desc = ''
    let index = null

  // eslint-disable-next-line functional/no-loop-statement
    for (let i = 0; i < descList.options.length; i++) {
        if (value > (descList.options[i].range[0]) && value <= (descList.options[i].range[1])) {
            desc = descList.options[i].desc
            index = i
            break
        }
    }
    const status = index === 0 ? 0 : (index === descList.options.length ? 2 : 1)
    return {title: descList.title, desc, status}
}

export function getIndexByRange (value: number, descList: readonly IDescWithRange[]): number {

  // eslint-disable-next-line functional/no-loop-statement
    for (let i = 0; i < descList.length; i++) {
        if (value > (descList[i].range[0]) && value <= (descList[i].range[1])) {
            return i;
        }
    }
    return -1
}


export function getKeyResult(value: number, results: readonly string[]): string {
    if (value < .2) {
        return results[0]
    } else if (value >= .2 && value < .5) {
        return results[1]
    } else if (value >= .5 && value < .8) {
        return results[2]
    } else {
        return results[3]
    }
}

export function getPersonProfile(testResult: baseTestResultType): readonly ITendency[] {
    const values = testResult.map(item => {
        let pos = 0;
        let neg = 0;
        item.forEach(value => {
            if (value > 0) {
                pos += value;
            } else {
                neg += value * -1;
            }
        });
        return [neg, pos];
    });

    return [
        {index: 0, value: values[1][0]},
        {index: 1, value: values[4][0]},
        {index: 2, value: values[0][0]},
        {index: 3, value: values[2][1]},
        {index: 4, value: values[1][1]},
        {index: 5, value: values[4][1]},
        {index: 6, value: values[0][1]},
        {index: 7, value: values[2][0]},
    ];

}

export function getPersonPortrait(profile: readonly ITendency[]): readonly IOctant[] {

    const codeList = octantCodeList

    const axisValues = profile.map(item => item.value);
    const axisValuesReversed = [...axisValues].reverse()

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
        return {code: codeList[i], index: i, value: Number(value.toFixed(2))};
    });
}

/**
 * Какая вы знаменитость
 * @param octant
 * @param famousList
 * @param sex
 */
export function getFamous(octant: IOctant, famousList: readonly (readonly string[])[], sex = 0): string | null {
  //sex: 0 - male, 1 - female, 2 - some else
  const value = octant.value
  const range = [8.75, 42.35, 140, 218.57]

  if (value < range[0] || value > range[3]) {
    return null;
  }

  if (value >= range[0] && value < range[1]) {
    return famousList[octant.index][0].split('/')[sex]
  } else if (value >= range[1] && value < range[2]) {
    return famousList[octant.index][1].split('/')[sex]
  }
  return famousList[octant.index][2].split('/')[sex]
}
