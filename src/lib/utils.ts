import {
  baseTestResultType, FamousList,
  IDescList,
  IDescWithRange,
  IDescWithStatus, IFamous,
  IOctant,
  ITendency
} from '../types/types';

import { octantCodeList } from './UserResult';

/**
 * Отдает, в виде строки, описание в зависимости от интенсивности значения (value)
 * @param value - значение интенсивности
 * @param descList - список описаний из API
 */
export function getDescByRange(value: number, descList: IDescList): IDescWithStatus {

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

/**
 * Отдает, в виде числового индекса, описание в зависимости от интенсивности значения (value)
 * @param value - значение интенсивности
 * @param descList - список описаний из API
 */
export function getIndexByRange(value: number, descList: readonly IDescWithRange[]): number {

  // eslint-disable-next-line functional/no-loop-statement
  for (let i = 0; i < descList.length; i++) {
    if (value > (descList[i].range[0]) && value <= (descList[i].range[1])) {
      return i;
    }
  }
  return -1;
}

/**
 * отдает ключевое описание в зависимости от интенсивности
 * @param value
 * @param results
 * @param range - брейкпоинты для сравнения с переданной интенсивностью. По умолчанию range = [.2, .5, .8] идентично [20%, 50%, 80%]
 */
export function getKeyResult(value: number, results: readonly string[], range = [ .2, .5, .8 ]): string {
  if (value < range[0]) {
    return results[0];
  } else if (value >= range[0] && value < range[1]) {
    return results[1];
  } else if (value >= range[1] && value < range[2]) {
    return results[2];
  } else {
    return results[3];
  }
}

/**
 * Функция обсчитывает результат пользователя вида 5х5
 * Словесные значения добавляются в программе с помощью маппинга в зависимости от языка
 * @param testResult
 * @returns Психологический профиль пользователя (8 тенденций, например тревожность, лабильность и далее).
 *
 */
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
    return [ neg, pos ];
  });

  return [
    { index: 0, value: values[1][0] },
    { index: 1, value: values[4][0] },
    { index: 2, value: values[0][0] },
    { index: 3, value: values[2][1] },
    { index: 4, value: values[1][1] },
    { index: 5, value: values[4][1] },
    { index: 6, value: values[0][1] },
    { index: 7, value: values[2][0] }
  ];

}

/**
 * Функция обсчитывает результат пользователя вида 5х5
 * Словесные значения добавляются в программе с помощью маппинга в зависимости от языка
 * @param profile
 * @returns Психологический портрет пользователя (8 октант или секторов, например модник, консерватор и далее)
 */
export function getPersonPortrait(profile: readonly ITendency[]): readonly IOctant[] {

  const codeList = octantCodeList;

  const axisValues = profile.map(item => item.value);
  const axisValuesReversed = [ ...axisValues ].reverse();
  // sinus of 45 degrees
  const sin45 = 0.7071;

  const octantsValues = [];
  // eslint-disable-next-line functional/no-loop-statement
  for (let i = 0; i < axisValuesReversed.length; i++) {
    if (i === axisValues.length - 1) {
      // eslint-disable-next-line functional/immutable-data
      octantsValues.unshift(axisValuesReversed[i] * axisValuesReversed[0] * sin45 / 2);
      break;
    }
    // eslint-disable-next-line functional/immutable-data
    octantsValues.push(axisValuesReversed[i] * axisValuesReversed[i + 1] * sin45 / 2);
  }

  //octant names begin with aggression and go in reverse order. So, change order values
  const swappedValues = [ ...octantsValues.slice(4), ...octantsValues.slice(0, 4) ];

  return swappedValues.map((value, i) => {
    return { code: codeList[i], index: i, value: Number(value.toFixed(2)) };
  });
}

/**
 * Какая вы знаменитость
 * @param octant
 * @param famousList - список знаменитостей из API
 * @param sex - пол пользователя
 * @param range - брейкпоинты для определения к конкретной интенсивности. По умолчанию [0, 42.35, 140, 1000]
 */
export function getFamous(octant: IOctant, famousList: FamousList, sex = 0, range = [ 0, 42.35, 140, 1000 ]): IFamous | null {
  //sex: 0 - male, 1 - female, 2 - some else
  const value = octant.value;

  if (value < range[0] || value > range[3]) {
    return null;
  }

  if (value >= range[0] && value < range[1]) {
    return {
      person: famousList[octant.index][0][sex],
      picture: `${octant.index}_0_${sex}`
    };
  } else if (value >= range[1] && value < range[2]) {
    return {
      person: famousList[octant.index][1][sex],
      picture: `${octant.index}_1_${sex}`
    };
  }
  return {
    person: famousList[octant.index][2][sex],
    picture: `${octant.index}_2_${sex}`
  };
}
