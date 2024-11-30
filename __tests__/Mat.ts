import * as assert from 'node:assert'
import * as _ from '../src/Mat'

const deepStrictEqual = <A>(actual: A, expected: A) => {
  assert.deepStrictEqual(actual, expected)
}

describe('Mat', () => {
  it('col', () => {
    const m: _.Mat = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ]
    deepStrictEqual(_.col(1)(m), [2, 6, 10])
  })
  it('transpose', () => {
    const m: _.Mat = [
      [1, 2],
      [3, 4],
      [5, 6],
    ]
    deepStrictEqual(_.transpose(m), [
      [1, 3, 5],
      [2, 4, 6],
    ])
  })
  it('mul', () => {
    const m2: _.Mat = [
      [1, 2],
      [3, 4],
      [5, 6],
    ]
    const m1: _.Mat = [
      [1, 2, 3],
      [4, 5, 6],
    ]
    deepStrictEqual(_.mul(m2)(m1), [
      [22, 28],
      [49, 64],
    ])
    deepStrictEqual(_.mul(m1)(m2), [
      [9, 12, 15],
      [19, 26, 33],
      [29, 40, 51],
    ])
  })
})
