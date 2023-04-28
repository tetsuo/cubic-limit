// http://www.emohr.com/paris-1975/catalog/layoutcatalog75.html

import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as E from 'fp-ts/Either'
import { Predicate } from 'fp-ts/lib/Predicate'
import { flow, pipe, tuple } from 'fp-ts/lib/function'
import { error } from 'fp-ts/Console'
import * as S from '@onur1/drawing3d/lib/Shape'
import * as Color from '@onur1/drawing3d/lib/Color'
import { Vec } from '@onur1/drawing3d/lib/Vec'
import * as D from '@onur1/drawing3d/lib/Drawing'
import { renderTo } from '@onur1/drawing3d/lib/Canvas'

const path = S.path(RA.Foldable)

const points: ReadonlyArray<Vec> = [
  [-0.5, -0.5, -0.5],
  [0.5, -0.5, -0.5],
  [0.5, 0.5, -0.5],
  [-0.5, 0.5, -0.5],
  [-0.5, -0.5, 0.5],
  [0.5, -0.5, 0.5],
  [0.5, 0.5, 0.5],
  [-0.5, 0.5, 0.5],
]

const getEdges = (i: number): RNEA.ReadonlyNonEmptyArray<number[]> => [
  [i, (i + 1) % 4],
  [i + 4, ((i + 1) % 4) + 4],
  [i, i + 4],
]

const drawCube = (shouldDrawEdge: Predicate<number>): S.Composite =>
  S.composite(
    pipe(
      RNEA.range(0, 3),
      RA.flatMap(i =>
        pipe(
          getEdges(i),
          RNEA.map(ix =>
            pipe(
              tuple(points[ix[0]], points[ix[1]]),
              RNEA.map(vec => S.point(vec[0], vec[1], vec[2]))
            )
          ),
          RA.chainWithIndex((j, m) => (shouldDrawEdge(i + j * 4) ? [path(m)] : []))
        )
      )
    )
  )

const isBitSet = (n: number) => (index: number) => Boolean(n & (1 << index))

const cubeFromNumber = flow(isBitSet, drawCube)

const nextNumber = (v: number) => pipe((v | (v - 1)) + 1, t => t | ((((t & -t) / (v & -v)) >> 1) - 1))

const lineColor = D.outlineColor(Color.white)

const cubeLineStyle = D.monoidOutlineStyle.concat(lineColor, D.lineCap('round'))

const rowsNum = 31

const gridWidth = rowsNum * 34

// http://www.emohr.com/mohr_cube1_161.html
const cube161 = D.rotate(
  S.degrees(30),
  S.degrees(30 * 2),
  S.degrees(0),
  D.scale(
    14.5,
    -14.5,
    1,
    D.many(
      pipe(
        63,
        RA.chainRecDepthFirst(a => (a < 4095 ? [E.right(a), E.left(nextNumber(a))] : [])),
        RA.map(cubeFromNumber),
        RA.map(s => D.outline(s, cubeLineStyle)),
        RA.mapWithIndex((i, d) =>
          D.translate(-17.5 + (34 * rowsNum - 34 * Math.floor(i / rowsNum)), 16 + 34 * (i % rowsNum), 0, d)
        )
      )
    )
  )
)

const grid161 = D.translate(
  0,
  0,
  0,
  D.many(
    pipe(
      RNEA.range(1, 30),
      RA.map(i =>
        D.outline(
          path([
            [34 * i - 0.5, 0, 0],
            [34 * i - 0.5, gridWidth + 2, 0],
          ]),
          cubeLineStyle
        )
      ),
      RA.concat(
        pipe(
          RNEA.range(1, 30),
          RA.map(i =>
            D.outline(
              path([
                [0, 34 * i - 0.5, 0],
                [gridWidth + 2, 34 * i - 0.5, 0],
              ]),
              cubeLineStyle
            )
          )
        )
      )
    )
  )
)

const draw = (d: D.Drawing) => (canvasId: string) =>
  pipe(
    D.render(d),
    renderTo(canvasId, () => error(`error: unable to find canvas with id "${canvasId}"`))
  )

export default {
  p161: draw(D.many([grid161, cube161])),
}
