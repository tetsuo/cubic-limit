import { flow, pipe } from 'effect/Function'
import { NonEmptyReadonlyArray, flatMap as flatMapArray, map as mapArray, range, unfold } from 'effect/Array'
import { Foldable } from '@effect/typeclass/data/Array'
import { Predicate } from 'effect/Predicate'
import { tuple } from 'effect/Data'
import { none, some } from 'effect/Option'
import { Color, hex, white } from './Color'
import * as S from './Shape'
import * as D from './Drawing'
import { draw, Size } from './draw'

const path = S.path(Foldable)

const closed = S.closed(Foldable)

const lineColor = D.outlineColor(white)

const drawLines = (n: number, height: number, vertical: boolean): D.Drawing => {
  const size = height / n
  return D.many(
    pipe(
      range(1, n - 1),
      mapArray(i =>
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
          lineColor
        )
      )
    )
  )
}

const points: NonEmptyReadonlyArray<NonEmptyReadonlyArray<number>> = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
]

const getEdges = (i: number): NonEmptyReadonlyArray<NonEmptyReadonlyArray<number>> => [
  [i, (i + 1) % 4],
  [i + 4, ((i + 1) % 4) + 4],
  [i, i + 4],
]

const drawCube = (shouldDrawEdge: Predicate<number>): S.Composite =>
  S.composite(
    pipe(
      range(0, 3),
      flatMapArray(i =>
        pipe(
          getEdges(i),
          mapArray(ix =>
            pipe(
              tuple(points[ix[0]], points[ix[1]]),
              mapArray(vec => S.point(vec[0], vec[1], vec[2]))
            )
          ),
          flatMapArray((m, j) => (shouldDrawEdge(i + j * 4) ? [path(m)] : []))
        )
      )
    )
  )

const isBitSet = (n: number) => (index: number) => Boolean(n & (1 << index))

const cubeFromNumber = flow(isBitSet, drawCube)

const nextNumber = (v: number) => pipe((v | (v - 1)) + 1, t => t | ((((t & -t) / (v & -v)) >> 1) - 1))

const cubeLineStyle = D.monoidOutlineStyle.combine(lineColor, D.lineCap('round'))

const cubicLimit = ({ width, height }: Size, bgColor: Color): D.Drawing => {
  const background: D.Drawing = D.fill(
    closed([
      [0, 0, 0],
      [width, 0, 0],
      [width, height, 0],
      [0, width, height],
    ]),
    D.fillStyle(bgColor)
  )

  const n = 31

  const scaleFactor: number = width / n

  return D.many([
    background,
    drawLines(n, width, false),
    drawLines(n, height, true),
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
            unfold(63, a => (a < 4095 ? some([a, nextNumber(a)]) : none())),
            mapArray(flow(cubeFromNumber, s => D.outline(s, cubeLineStyle))),
            mapArray((d, i) =>
              D.translate(
                -(scaleFactor / 2) + (scaleFactor * n - scaleFactor * Math.floor(i / n)),
                scaleFactor / 2 + scaleFactor * (i % n),
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

const drawCubicLimit = (name: string, color: string) => draw(s => cubicLimit(s, hex(color)), name)

export default drawCubicLimit
