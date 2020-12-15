import {
  baseTestResultType,
  IOctant,
  ITendency,
  IUserResult
} from '../types/types'

import { getPersonPortrait, getPersonProfile } from './utils'

export const octantCodeList = ['A1', 'A2', 'B1', 'B2', 'a1', 'a2', 'b1', 'b2']

/**
 * Функция конструктор, возвращает ряд базовых значений для характеристики пользователя
 * Использование:
 * ```
 * import { UserResult } from "psychology"
 * const user = UserResult(testResultList)
 * user.profile // Психологический профиль пользователя:  ITendency[]
 * user.portrait // психологический портрет пользователя:  IOctant[]
 * user.sortedOctants // список октант портрета пользователя, сортированный по полю value (max -> min): IOctant[]
 * user.mainOctant // октант (сектор портрета) с максимальным значением value:  IOctant
 * user.mainPsychoTypeList // массив числовых значений (поле index) основных октант пользователя. Максимальная + вторая, если она не менее чем на  20% отличаются от первой по полю value. Опциональный параметр diff (default = .2)
 * user.mainTendencyList // массив числовых значений (поле index) основных тенденций пользователя. Максимальная + вторая, если она не менее чем на  20% отличаются от первой по полю value. Опциональный параметр diff (default = .2)
 * ```
 * @param testResult
 * @param diff - для определения списка главных тенденций и психотипов. По умолчанию = .2 (20%). Для списка берется тенденция (или октант) с максимальным значением value и те, следующие за ним, значение которых менее чем на 20% отличается от главной.
 * @constructor
 */
export function UserResult(testResult: baseTestResultType, diff = .2): IUserResult {

  const profile: readonly ITendency[] = getPersonProfile(testResult)
  const portrait: readonly IOctant[] = getPersonPortrait(profile)
  const sortedOctants: readonly IOctant[] = [...portrait].sort((a, b) => (b.value - a.value))

  /**
   *
   */
  function getMainPsychoType(): readonly number[] {

    if (sortedOctants[0].value - sortedOctants[1].value < diff * sortedOctants[0].value) {
      return [sortedOctants[0].index, sortedOctants[1].index]
    }
    return [sortedOctants[0].index]
  }

  /**
   *
   */
  function getMainTendency(): readonly number[] {

    const sortedProfile = [...profile].sort((a, b) => b.value - a.value)
    const value1 = sortedProfile[0].value
    const value2 = sortedProfile[1].value
    // difference between 1st and 2nd max values

    if (value1 - value2 < diff) {
      return [sortedProfile[0].index, sortedProfile[1].index]
    }
    return [sortedProfile[0].index]
  }

  return Object.freeze({
    profile,
    portrait,
    sortedOctants,
    mainOctant: sortedOctants[0],
    mainPsychoTypeList: getMainPsychoType(),
    mainTendencyList: getMainTendency()
  })
}
