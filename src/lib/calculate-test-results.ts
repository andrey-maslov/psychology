import { AnswerType } from '../types/types';

/**
 * Функция возвращает массив из 5 массивов по 5 числовых значений (5х5).
 * Результат используется как базовый для дальнейших обсчетов.
 * @param answersArr - "сырой" результат теста из 75 значений
 * @returns массив 5х5
 */
export function calculateResults(answersArr: ReadonlyArray<AnswerType>) {
    const arrSum = [[0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]

    arrSum.forEach((item, i) => {
        let k = i
        item.forEach((_value, j) => {
            [0, 0, 0].forEach(() => {
              // eslint-disable-next-line functional/immutable-data
                arrSum[i][j] += +answersArr[k].value
                k += 5
            })
        })
    })
    return arrSum
}
