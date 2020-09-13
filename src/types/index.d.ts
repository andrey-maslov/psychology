/**
 * If you import a dependency which does not include its own type definitions,
 * TypeScript will try to find a definition for it by following the `typeRoots`
 * compiler option in tsconfig.json. For this project, we've configured it to
 * fall back to this folder if nothing is found in node_modules/@types.
 *
 * Often, you can install the DefinitelyTyped
 * (https://github.com/DefinitelyTyped/DefinitelyTyped) type definition for the
 * dependency in question. However, if no one has yet contributed definitions
 * for the package, you may want to declare your own. (If you're using the
 * `noImplicitAny` compiler options, you'll be required to declare it.)
 *
 * This is an example type definition which allows import from `module-name`,
 * e.g.:
 * ```ts
 * import something from 'module-name';
 * something();
 * ```
 */
declare module 'psychology' {
  export type baseTestResultType = readonly (readonly number[])[];

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

  export type DecodedDataType = readonly [readonly number[], readonly (readonly number[])[]]

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
}
