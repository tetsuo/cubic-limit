import * as D from '@onur1/drawing3d/lib/Drawing'
import * as S from '@onur1/drawing3d/lib/Shape'
import * as RNEA from 'fp-ts/ReadonlyNonEmptyArray'
import * as RA from 'fp-ts/ReadonlyArray'
import * as Color from '@onur1/drawing3d/lib/Color'
import { pipe, tuple } from 'fp-ts/lib/function'

const path = S.path(RNEA.Foldable)

const foldMap = RNEA.foldMap(D.monoidDrawing)

const closed = S.closed(RA.Foldable)

export interface Cube {
  x: number
  y: number
  rotateX: number
  rotateY: number
  scale: number
}

export interface Size {
  width: number
  height: number
}

const getCubeEdges = (i: number): RNEA.ReadonlyNonEmptyArray<number[]> => [
  [i, (i + 1) % 4],
  [i + 4, ((i + 1) % 4) + 4],
  [i, i + 4],
]

const cubePoints = [
  [-1, -1, -1],
  [1, -1, -1],
  [1, 1, -1],
  [-1, 1, -1],
  [-1, -1, 1],
  [1, -1, 1],
  [1, 1, 1],
  [-1, 1, 1],
]

const cubeSides = [
  [
    // abfe
    [-1, -1, -1],
    [1, -1, -1],
    [1, -1, 1],
    [-1, -1, 1],
  ],
  [
    // adhe
    [-1, -1, -1],
    [-1, 1, -1],
    [-1, 1, 1],
    [-1, -1, 1],
  ],
  [
    // bcgf
    [1, -1, -1],
    [1, 1, -1],
    [1, 1, 1],
    [1, -1, 1],
  ],
  [
    // cdhg
    [1, 1, -1],
    [-1, 1, -1],
    [-1, 1, 1],
    [1, 1, 1],
  ],
  [
    // efgh
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ],
  [
    // abcd
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
  ],
]

const renderCube = ({ x, y, scale, rotateX, rotateY }: Cube): D.Drawing =>
  D.translate(
    x,
    y,
    0,
    D.scale(
      scale,
      scale,
      0,
      D.many([
        D.rotate(
          S.degrees(rotateX),
          S.degrees(rotateY),
          S.degrees(0),
          D.many(
            pipe(
              cubeSides.map(m => closed(m.map(v => S.point(v[0] * 0.25, v[1] * 0.25, v[2] * 0.25)))),
              RA.map(shape => D.fill(shape, D.fillStyle(Color.hex('#1c1b17')))),
              RA.concat([
                D.outline(
                  S.composite(
                    pipe(
                      RNEA.range(0, 3),
                      RA.flatMap(i =>
                        pipe(
                          getCubeEdges(i),
                          RNEA.map(ix =>
                            pipe(
                              tuple(cubePoints[ix[0]], cubePoints[ix[1]]),
                              RNEA.map(vec => S.point(vec[0] * 0.25, vec[1] * 0.25, vec[2] * 0.25))
                            )
                          ),
                          RA.chain(m => [path(m)])
                        )
                      )
                    )
                  ),
                  D.outlineColor(Color.white)
                ),
              ])
            )
          )
        ),
        D.clipped(
          closed([
            [-0.25, -0.25, 0],
            [0.25, -0.25, 0],
            [0.25, 0.25, 0],
            [-0.25, 0.25, 0],
          ]),
          D.rotate(
            S.degrees(rotateX),
            S.degrees(rotateY),
            S.degrees(0),
            D.outline(
              S.composite(
                pipe(
                  RNEA.range(0, 3),
                  RA.flatMap(i =>
                    pipe(
                      getCubeEdges(i),
                      RNEA.map(ix =>
                        pipe(
                          tuple(cubePoints[ix[0]], cubePoints[ix[1]]),
                          RNEA.map(vec => S.point(vec[0] * 0.25, vec[1] * 0.25, vec[2] * 0.25))
                        )
                      ),
                      RA.chain(m => [path(m)])
                    )
                  )
                )
              ),
              D.monoidOutlineStyle.concat(
                D.monoidOutlineStyle.concat(D.outlineColor(Color.hex('#fff')), D.lineCap('round')),
                D.lineWidth(4)
              )
            )
          )
        ),
      ])
    )
  )

const withClipping = (n: number, offset = 0, scale = 1, d: D.Drawing): D.Drawing =>
  D.clipped(
    S.composite(
      pipe(
        RNEA.range(0, n - offset),
        RA.map(i =>
          closed([
            [i * (2 * scale) + offset * scale, 0, 0],
            [i * (2 * scale) + scale + offset * scale, 0, 0],
            [i * (2 * scale) + scale + offset * scale, scale + n * (2 * scale), 0],
            [i * (2 * scale) + offset * scale, scale + n * (2 * scale), 0],
          ])
        )
      )
    ),
    d
  )

const renderLines = (n: number, vertical: boolean): D.Drawing =>
  D.many(
    pipe(
      RNEA.range(1, n),
      RA.map(i =>
        D.outline(
          path(
            vertical
              ? [
                  [i * 1, 0, 0],
                  [i * 1, 1 * (n + 1), 0],
                ]
              : [
                  [0, i * 1, 0],
                  [1 * (n + 1), i * 1, 0],
                ]
          ),
          D.outlineColor(Color.white)
        )
      )
    )
  )

export const p197 = ({ width, height }: Size): D.Drawing => {
  const background: D.Drawing = D.fill(
    closed([
      [0, 0, 0],
      [width, 0, 0],
      [width, height, 0],
      [0, width, height],
    ]),
    D.fillStyle(Color.hex('#1c1b17'))
  )

  const scaleFactor: number = Math.max(width, height) / 8

  const scaled = (d: D.Drawing) => {
    const s = scaleFactor
    return D.scale(s - s / 8, s - s / 8, 0, d)
  }

  return D.many([
    background,
    scaled(D.many([renderLines(8, false)])),
    withClipping(
      4,
      0,
      scaleFactor - scaleFactor / 8,
      foldMap(renderCube)(
        pipe(
          RNEA.range(0, 63),
          RNEA.map(i => ({
            x: 1 + (i % 8),
            y: 1 + Math.floor(i / 8),
            scale: scaleFactor - scaleFactor / 8,
            rotateX: Math.random() * 360,
            rotateY: Math.random() * 360,
          }))
        )
      )
    ),
    withClipping(
      4,
      1,
      scaleFactor - scaleFactor / 8,
      foldMap(renderCube)(
        pipe(
          RNEA.range(0, 63),
          RNEA.map(i => ({
            x: 1 + (i % 8),
            y: 1 + Math.floor(i / 8),
            scale: scaleFactor - scaleFactor / 8,
            rotateX: Math.random() * 360,
            rotateY: Math.random() * 360,
          }))
        )
      )
    ),
    scaled(D.many([renderLines(8, true)])),
  ])
}
