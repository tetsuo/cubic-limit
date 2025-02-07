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
import { Vec } from './Vec'

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

const points: NonEmptyReadonlyArray<Vec> = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
]

const getEdges = (i: number): NonEmptyReadonlyArray<Vec> => [
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
          mapArray((ix, j) =>
            path(
              shouldDrawEdge(i + j * 4)
                ? pipe(
                    tuple(points[ix[0]], points[ix[1]]),
                    mapArray(vec => S.point(vec[0], vec[1], vec[2]))
                  )
                : []
            )
          )
        )
      )
    )
  )

const isBitSet = (n: number) => (index: number) => Boolean(n & (1 << index))

const cubeFromNumber = flow(isBitSet, drawCube)

const nextNumber = (v: number) => pipe((v | (v - 1)) + 1, t => t | ((((t & -t) / (v & -v)) >> 1) - 1))

const cubeLineStyle = D.monoidOutlineStyle.combine(lineColor, D.lineCap('round'))

const drawCubes = (numCells: number, cellSize: number): D.Drawing => {
  const translateCube = (drawing: D.Drawing, i: number): D.Drawing => {
    const translateX = cellSize * (numCells - Math.floor(i / numCells) - 0.5)
    const translateY = cellSize * (0.5 + (i % numCells))
    return D.translate(translateX, translateY, 0, drawing)
  }

  return D.rotate(
    S.degrees(30),
    S.degrees(-60),
    S.degrees(0),
    D.scale(
      cellSize / 5,
      cellSize / 5,
      1,
      D.many(
        pipe(
          unfold(63, a => (a < 4095 ? some([a, nextNumber(a)]) : none())),
          mapArray(flow(cubeFromNumber, cube => D.outline(cube, cubeLineStyle))),
          mapArray(translateCube)
        )
      )
    )
  )
}

const drawBackground = ({ width, height }: Size, bgColor: Color): D.Drawing =>
  D.fill(
    closed([
      [0, 0, 0],
      [width, 0, 0],
      [width, height, 0],
      [0, height, 0],
    ]),
    D.fillStyle(bgColor)
  )

const cubicLimit = (size: Size, bgColor: Color): D.Drawing => {
  const numCells = 31
  const cellSize = size.width / numCells

  const background = drawBackground(size, bgColor)

  const lines = D.many([drawLines(numCells, size.width, false), drawLines(numCells, size.height, true)])

  const cubes = drawCubes(numCells, cellSize)

  return D.many([background, lines, cubes])
}

const drawCubicLimit = (name: string, color: string) => draw(s => cubicLimit(s, hex(color)), name)

export default drawCubicLimit
