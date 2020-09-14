/**
 * Результат калькуляции теста
 */
export type baseTestResultType = readonly (readonly number[])[]

/**
 * Результат калькуляции теста + доп данные (пол, возраст, семейный статус)
 */
export type DecodedDataType = readonly [readonly number[], baseTestResultType]

export interface IDescWithRange {
  readonly desc: string,
  readonly range: readonly [number, number]
}

export interface IDescWithStatus {
  readonly title: string,
  readonly desc: string,
  readonly status: number
}

export interface IOctant {
  readonly code: string,
  readonly index: number,
  readonly value: number
}

export interface ITendency {
  readonly index: number,
  readonly value: number
}

export interface IMember {
  readonly id: string
  readonly name: string,
  readonly position: string,
  readonly decData: DecodedDataType
  readonly baseID: number
}

export interface IUserResult {
  readonly sortedOctants: readonly IOctant[],
  readonly profile: readonly ITendency[],
  readonly portrait: readonly IOctant[],
  readonly mainOctant: IOctant,
  readonly mainPsychoTypeList: readonly number[],
  readonly mainTendencyList: readonly number[],
}

export type AnswerType = {
  readonly id: string
  readonly value: string
}
