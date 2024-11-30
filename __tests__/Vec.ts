import * as assert from 'node:assert'
import * as _ from '../src/Vec'

const deepStrictEqual = <A>(actual: A, expected: A) => {
  assert.deepStrictEqual(actual, expected)
}

describe('Vec', () => {
  it('dot', () => {
    const v1: _.Vec = [1, 2, -3]
    const v2: _.Vec = [1, 2, 1]
    deepStrictEqual(_.dot(v1)(v2), 2)
  })
})
