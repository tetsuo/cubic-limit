import * as RA from 'fp-ts/ReadonlyArray'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as E from 'fp-ts/Either'
import { Predicate } from 'fp-ts/lib/Predicate'
import { flow, pipe, tuple } from 'fp-ts/lib/function'
import * as S from '@onur1/drawing3d/lib/Shape'
import * as Color from '@onur1/drawing3d/lib/Color'
import { Vec } from '@onur1/drawing3d/lib/Vec'
import * as D from '@onur1/drawing3d/lib/Drawing'

const path = S.path(RA.Foldable)

const points: ReadonlyArray<Vec> = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
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

const closed = S.closed(RA.Foldable)

export interface Size {
  width: number
  height: number
}

const renderLines = (n: number, height: number, vertical: boolean): D.Drawing => {
  const size = height / n
  return D.many(
    pipe(
      RNEA.range(1, n),
      RA.map(i =>
        D.outline(
          path(
            vertical
              ? [
                  [i * size, 0, 0],
                  [i * size, height, 0],
                ]
              : [
                  [0, i * size, 0],
                  [height, i * size, 0],
                ]
          ),
          D.outlineColor(Color.white)
        )
      )
    )
  )
}

export const p161 = ({ width, height }: Size) => {
  const background: D.Drawing = D.fill(
    closed([
      [0, 0, 0],
      [width, 0, 0],
      [width, height, 0],
      [0, width, height],
    ]),
    D.fillStyle(Color.hex('#1c1b17'))
  )

  const scaleFactor: number = width / 31

  return D.many([
    background,
    renderLines(31, width, false),
    renderLines(31, height, true),
    D.rotate(
      S.degrees(30),
      S.degrees(-60),
      S.degrees(0),
      D.scale(
        scaleFactor / 5,
        scaleFactor / 5,
        1,
        D.many(
          pipe(
            63,
            RA.chainRecDepthFirst(a => (a < 4095 ? [E.right(a), E.left(nextNumber(a))] : [])),
            RA.map(cubeFromNumber),
            RA.map(s => D.outline(s, cubeLineStyle)),
            RA.mapWithIndex((i, d) =>
              D.translate(
                -(scaleFactor / 2) + (scaleFactor * 31 - scaleFactor * Math.floor(i / 31)),
                scaleFactor / 2 + scaleFactor * (i % 31),
                0,
                d
              )
            )
          )
        )
      )
    ),
  ])
}
