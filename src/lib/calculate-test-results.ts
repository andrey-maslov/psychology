import { AnswerType } from '..';

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
