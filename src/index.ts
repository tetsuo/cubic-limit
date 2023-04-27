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

const makeCube = (shouldDrawEdge: Predicate<number>): S.Composite =>
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

const isBitSet = (n: number) => (i: number) => Boolean(n & (1 << i))

const cubeFromMagicNumber = flow(isBitSet, makeCube)

const nextNumber = (v: number) => pipe((v | (v - 1)) + 1, t => t | ((((t & -t) / (v & -v)) >> 1) - 1))

const blueOutlineColor = D.outlineColor(Color.hex('#0000cc'))

const cubes = D.rotate(
  S.degrees(30),
  S.degrees(60),
  S.degrees(0),
  D.scale(
    14,
    -14,
    1,
    D.many(
      pipe(
        63,
        RA.chainRecDepthFirst(a => (a < 4095 ? [E.right(a), E.left(nextNumber(a))] : [])),
        RA.map(cubeFromMagicNumber),
        RA.map(s => D.outline(s, blueOutlineColor)),
        RA.mapWithIndex((i, d) =>
          D.translate(-16 + (34 * 31 - 34 * Math.floor(i / 31)), 17.5 + 34 * (i % 31), 0, d)
        )
      )
    )
  )
)

const grid = D.translate(
  1,
  1,
  0,
  D.many(
    pipe(
      RNEA.range(0, 31),
      RA.map(i =>
        D.outline(
          path([
            [34 * i, 0, 0],
            [34 * i, 34 * 31, 0],
          ]),
          blueOutlineColor
        )
      ),
      RA.concat(
        pipe(
          RNEA.range(0, 31),
          RA.map(i =>
            D.outline(
              path([
                [0, 34 * i, 0],
                [34 * 31, 34 * i, 0],
              ]),
              blueOutlineColor
            )
          )
        )
      )
    )
  )
)

const renderCubicLimit = (canvasId: string) =>
  pipe(
    D.render(D.monoidDrawing.concat(grid, cubes)),
    renderTo(canvasId, () => error(`error: unable to find canvas with id "${canvasId}"`))
  )

renderCubicLimit('canvas')()
