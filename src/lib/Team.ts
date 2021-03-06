import {
  baseTestResultType,
  IMember,
  IOctant,
  ITendency,
  IUserResult
} from '../types/types';

import { octantCodeList, UserResult } from './UserResult';
import { getPersonPortrait, getPersonProfile } from './utils';

/**
 * Функция конструктор, возвращает ряд значений для характеристики взаимодействия внутри команды
 * Использование:
 * ```
 * import { Team } from "psychology"
 * const team = Team(testResultList)
 * team.profile // Психологический профиль команды:  ITendency[]
 * team.portrait // Психологический портрет команды:  IOctant[]
 * team.profileList
 * team.getCrossFunc // Кроссфункциональность команды: number
 * team.getInteraction
 * team.getEmotionalComp // Уровень эмоциональной совместимости: number
 * team.getLoyalty // Уровень лояльности внутри команды:  number
 * team.getLeadingMemberByType // Индекс октанта для определения лидера в данной специализации:  number
 * team.getCommitment
 * team.getDescIndexes
 * team.getNeedfulPsychoType // Психотип, которого не достает команде
 * team.getAllCandidates // Все кандидаты из пула, которых нет в команде: IMember[]
 * team.getCandidates // Кандидаты из пула, которые нужны команде согласно психологическим предпосылкам
 * team.getUnwanted // Работники команды, которые нежелательны в ней: IMember[] | null
 * ```
 * @returns
 * @param dataList - Массив результатов пользователей. (5х5)[]
 * @constructor
 */
export function Team(dataList: readonly baseTestResultType[]) {

  const resultList: readonly IUserResult[] = dataList.map((member) => UserResult(member));
  const membersCount = dataList.length;
  const profileList = resultList.map(result => result.profile);
  const portraitList = resultList.map(result => result.portrait);
  const profile = getTeamProfile();
  const portrait = getTeamPortrait();
  const maxSector = getMaxSectorSquare();
  const majorOctants = portrait.filter((item: IOctant) => item.value >= maxSector * .3);


  /**
   * Психологический профиль команды
   */
  function getTeamProfile() {
    const avgValues = getAvgValues<readonly ITendency[]>(profileList);
    return avgValues.map((value, i) => {
      return { index: i, value };
    });
  }

  /**
   * get psychological portrait of the team
   */
  function getTeamPortrait(): readonly IOctant[] {
    const avgValues = getAvgValues<readonly IOctant[]>(portraitList);
    return avgValues.map((value, i) => {
      return { code: octantCodeList[i], index: i, value };
    });
  }

  /**
   * Вычисления средних значений профиля и портрета команды из профилей и портретов участников
   */
  function getAvgValues<T>(list: ReadonlyArray<T>): readonly number[] {
    const arrSum = [ 0, 0, 0, 0, 0, 0, 0, 0 ];

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
  function getTeamMaxIntensity(): number {
    const maxValues = profileList.map(profile => {
      const sorted = [ ...profile ].sort((a, b) => b.value - a.value);
      return sorted[0].value;
    });
    return maxValues.reduce((a, b) => a + b) / membersCount;
  }

  /**
   * Get maximum fact (theoretical) value of sector square
   */
  function getMaxSectorSquare(): number {
    const sorted = [ ...portrait ].sort((a, b) => (b.value - a.value));
    return sorted[0].value;
  }

  /**
   * Get cross-functionality value
   */
  function getCrossFunc(): number {

    if (maxSector === 0) {
      return -1;
    }

    const maxCircleSquare = maxSector * 8; // 8 -> number of octants in full circle
    const factCircleSquare = portrait.map(item => item.value).reduce((a, b) => a + b);

    return factCircleSquare / maxCircleSquare;
  }

  /**
   *
   */
  function getInteraction(): number {
    const allMaxValues = resultList.map(item => item.sortedOctants[0].value);
    const max = Math.max.apply(null, allMaxValues);
    const min = Math.min.apply(null, allMaxValues);
    return min / max;
  }

  /**
   * get emotion compatibility
   */
  function getEmotionalComp(): number {
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
  function getLoyalty(): number {

    const values = profile.map(item => item.value);
    const topSum = [ values[0], values[1], values[7] ].reduce((a, b) => a + b);
    const bottomSum = values.slice(3, 6).reduce((a, b) => a + b);

    if (bottomSum === 0) {
      return topSum / 0.1;
    }
    return topSum / bottomSum;
  }

  /**
   * @param typeInd (number from 1 to 8 of octants. Leader role equals Innovator type, for example)
   */
  function getLeadingMemberByType(typeInd: number): number {
    const values = portraitList.map(octant => octant[typeInd].value);
    const max = Math.max.apply(null, values);

    return values.indexOf(max);
  }

  /**
   *
   */
  function getCommitment(): number {
    //list item = value of responsibility of one member from data block "Привязанность-отдельность"
    const respValsList: readonly number[] = dataList.map(item => item[3][0]);
    return respValsList.reduce((a, b) => a + b);
  }

  /**
   * @return {number} list of number indexes for get especial descriptions from array
   */
  function getDescIndexes(): readonly number[] {
    return portrait
      .filter(octant => octant.value >= maxSector / 2)
      .map(item => item.index);
  }

  /**
   *
   */
  function getNeedfulPsychoType(): readonly number[] {
    const minorOctants: readonly IOctant[] = portrait.filter((item: IOctant) => item.value < maxSector * .3);
    return minorOctants.map(item => item.index);
  }

  /**
   * get full list of potential candidates without psychological filters
   * @param poolMembers
   * @param teamMembers
   */
  function getAllCandidates(poolMembers: readonly IMember[], teamMembers: readonly IMember[]): readonly IMember[] {
    const teamIdList = teamMembers.map(item => item.baseID);
    return poolMembers.filter(item => !teamIdList.includes(item.baseID));
  }


  /**
   *
   * @param teamSpecInd
   * @param allCandidates
   */
  function getCandidates(teamSpecInd: number, allCandidates: readonly IMember[]): readonly IMember[] | null {
    const specsList = [ [ 'A1', 'A2', 'B1', 'B2', 'a1', 'a2', 'b1', 'b2' ], [ 'A1', 'A2' ], [ 'B1', 'B2' ], [ 'a1', 'a2' ], [ 'b1', 'b2' ] ];
    const majorCodes = majorOctants.map(item => item.code);

    if (!isSmbNeeded(teamSpecInd, specsList)) {
      return null;
    }
    if (majorOctants.length === 8) {
      return null;
    }

    return allCandidates.filter(item => {

      const profile = getPersonProfile(item.decData[1]);
      const portrait = getPersonPortrait(profile);
      const sortedOctants = [ ...portrait ].sort((a, b) => (b.value - a.value));

      if (!checkIntensity(profile)) {
        return false;
      }
      return (
        (majorCodes.includes(sortedOctants[0].code) && specsList[teamSpecInd].includes(sortedOctants[1].code))
        ||
        (majorCodes.includes(sortedOctants[1].code) && specsList[teamSpecInd].includes(sortedOctants[0].code))
      );
    });
  }

  /**
   * Проверяет, не слишком ли расходится интенсивность кандидата и команды
   * @param memberProfile
   */
  function checkIntensity(memberProfile: readonly ITendency[]): boolean {
    const teamMaxIntensity = getTeamMaxIntensity();
    const sortedMemberProfile = [ ...memberProfile ].sort((a, b) => b.value - a.value);
    return !(sortedMemberProfile[0].value > teamMaxIntensity * 1.3 || sortedMemberProfile[0].value < teamMaxIntensity * .7);
  }

  /**
   * for getCandidate
   * @param specInd
   * @param specsList
   */
  function isSmbNeeded(specInd: number, specsList: readonly (readonly string[])[]): boolean {
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
  function getUnwanted(members: readonly IMember[]): readonly IMember[] {
    return members.filter(item => !checkIntensity(getPersonProfile(item.decData[1])));
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
