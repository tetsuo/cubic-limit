import { Tag } from 'effect/Context'
import { Micro, andThen, forEach, provideService, service, succeed } from 'effect/Micro'
import { Option, isSome, some, none } from 'effect/Option'
import { flow, pipe } from 'effect/Function'
import { matchLeft, isNonEmptyReadonlyArray, NonEmptyReadonlyArray, map, append } from 'effect/Array'
import { compact } from '@effect/typeclass/Filterable'
import { Filterable } from '@effect/typeclass/data/Array'
import { identity, Mat, rotateX, rotateY, rotateZ, scale, semigroupMat, translate, mul } from './Mat'
import * as D from './Drawing'
import * as Color from './Color'
import { angle, Point, Shape } from './Shape'
import { fromShape } from './Path3D'

class Render extends Tag('Render')<
  Render,
  {
    readonly lineTo: (point: Point) => Micro<void>
    readonly moveTo: (point: Point) => Micro<void>
    readonly fill: (fillRule?: CanvasFillRule) => Micro<void>
    readonly clip: (fillRule?: CanvasFillRule) => Micro<void>
    readonly stroke: () => Micro<void>
    readonly beginPath: () => Micro<void>
    readonly closePath: () => Micro<void>
    readonly save: () => Micro<void>
    readonly restore: () => Micro<void>
    readonly setFillStyle: (style: string) => Micro<void>
    readonly setStrokeStyle: (style: string) => Micro<void>
    readonly setLineWidth: (width: number) => Micro<void>
    readonly setLineCap: (cap: D.LineCap) => Micro<void>
    readonly setLineJoin: (join: D.LineJoin) => Micro<void>
  }
>() {}

const success: Micro<void> = succeed(undefined)

const validateNonEmpty = <A>(as: ReadonlyArray<A>): Option<NonEmptyReadonlyArray<A>> =>
  isNonEmptyReadonlyArray(as) ? some(as) : none()

const compactArray = compact(Filterable)

const toCoords = (shape: Shape, transform: Mat): ReadonlyArray<ReadonlyArray<Point>> =>
  pipe(fromShape(shape), map(validateNonEmpty), compactArray, map(map(append(1))), map(mul(transform)))

const renderDrawing = (d: D.Drawing): Micro<void, never, Render> =>
  service(Render).pipe(
    andThen(c => {
      const withContext = (fa: Micro<void>) =>
        pipe(
          c.save(),
          andThen(() => fa),
          andThen(c.restore)
        )

      const applyStyle: <A>(o: Option<A>, f: (a: A) => Micro<void>) => Micro<void> = (fa, f) =>
        isSome(fa) ? f(fa.value) : success

      const renderSubPath: (subPath: ReadonlyArray<Point>) => Micro<void> = matchLeft({
        onEmpty: () => success,
        onNonEmpty: (head, tail) =>
          pipe(
            c.moveTo(head),
            andThen(() => forEach(tail, c.lineTo, { discard: true }))
          ),
      })

      const renderShape = (shape: Shape, transform: Mat) =>
        forEach(toCoords(shape, transform), renderSubPath, { discard: true })

      const go: (drawing: D.Drawing, transform: Mat) => Micro<void> = (d, t) => {
        switch (d._tag) {
          case 'Many':
            return forEach(d.drawings, d => go(d, t), { discard: true })
          case 'Scale':
            return go(d.drawing, semigroupMat.combine(t, scale([d.scaleX, d.scaleY, d.scaleZ])))
          case 'Rotate':
            return go(
              d.drawing,
              semigroupMat.combineMany(t, [
                rotateZ(angle(d.rotateZ)),
                rotateY(angle(d.rotateY)),
                rotateX(angle(d.rotateX)),
              ])
            )
          case 'Translate':
            return go(
              d.drawing,
              semigroupMat.combine(t, translate([d.translateX, d.translateY, d.translateZ]))
            )
          case 'Outline':
            return withContext(
              pipe(
                applyStyle(d.style.color, flow(Color.toCss, c.setStrokeStyle)),
                andThen(() => applyStyle(d.style.lineWidth, c.setLineWidth)),
                andThen(() => applyStyle(d.style.lineCap, c.setLineCap)),
                andThen(() => applyStyle(d.style.lineJoin, c.setLineJoin)),
                andThen(c.beginPath),
                andThen(() => renderShape(d.shape, t)),
                andThen(c.stroke)
              )
            )
          case 'Fill':
            return withContext(
              pipe(
                applyStyle(d.style.color, flow(Color.toCss, c.setFillStyle)),
                andThen(c.beginPath),
                andThen(() => renderShape(d.shape, t)),
                andThen(() => c.fill())
              )
            )
          case 'Clipped':
            return withContext(
              pipe(
                c.beginPath(),
                andThen(() => renderShape(d.shape, t)),
                andThen(() => c.clip()),
                andThen(() => go(d.drawing, t))
              )
            )
        }
      }
      return go(d, identity)
    })
  )

export const render = (d: D.Drawing, ctx: CanvasRenderingContext2D): Micro<void, never, never> =>
  provideService(renderDrawing(d), Render, {
    fill(fillRule) {
      if (typeof fillRule !== 'undefined') {
        ctx.fill(fillRule)
      } else {
        ctx.fill()
      }
      return success
    },
    clip(fillRule) {
      if (typeof fillRule !== 'undefined') {
        ctx.clip(fillRule)
      } else {
        ctx.clip()
      }
      return success
    },
    setFillStyle(style: string) {
      ctx.fillStyle = style
      return success
    },
    setStrokeStyle(style: string) {
      ctx.strokeStyle = style
      return success
    },
    setLineWidth(width: number) {
      ctx.lineWidth = width
      return success
    },
    setLineJoin(join: D.LineJoin) {
      ctx.lineJoin = join
      return success
    },
    setLineCap(cap: D.LineCap) {
      ctx.lineCap = cap
      return success
    },
    stroke() {
      ctx.stroke()
      return success
    },
    save() {
      ctx.save()
      return success
    },
    restore() {
      ctx.restore()
      return success
    },
    lineTo(p) {
      ctx.lineTo(p[0], p[1])
      return success
    },
    moveTo(p) {
      ctx.moveTo(p[0], p[1])
      return success
    },
    beginPath() {
      ctx.beginPath()
      return success
    },
    closePath() {
      ctx.closePath()
      return success
    },
  })
