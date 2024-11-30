import * as assert from 'node:assert'
import { Foldable } from '@effect/typeclass/data/Array'
import * as _ from '../src/Shape'

const deepStrictEqual = <A>(actual: A, expected: A) => {
  assert.deepStrictEqual(actual, expected)
}

const path = _.path(Foldable)

const closed = _.closed(Foldable)

describe('Shape', () => {
  it('composite', () => {
    deepStrictEqual(
      _.composite([
        path([
          [1, 2],
          [3, 4],
        ]),
        closed([
          [1, 2],
          [3, 4],
        ]),
      ]),
      {
        _tag: 'Composite',
        shapes: [
          {
            _tag: 'Path',
            closed: false,
            points: [
              [1, 2],
              [3, 4],
            ],
          },
          {
            _tag: 'Path',
            closed: true,
            points: [
              [1, 2],
              [3, 4],
            ],
          },
        ],
      }
    )
  })
  it('angle', () => {
    const d = _.degrees(180)
    deepStrictEqual(_.angle(d), 180)
    const r = _.radians(Math.PI)
    deepStrictEqual(_.angle(r), 180)
  })
  it('monoidPath', () => {
    deepStrictEqual(
      _.monoidPath.combine(
        path([
          [1, 2, 3, 4],
          [5, 6, 7, 8],
        ]),
        closed([
          [11, 22, 33, 44],
          [55, 66, 77, 88],
        ])
      ),
      {
        _tag: 'Path',
        closed: true,
        points: [
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [11, 22, 33, 44],
          [55, 66, 77, 88],
        ],
      }
    )
  })
})
