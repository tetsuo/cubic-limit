import { Tag } from 'effect/Context'
import { Micro, andThen, forEach, provideService, service, succeed } from 'effect/Micro'
import { Option, isSome } from 'effect/Option'
import { flow, pipe } from 'effect/Function'
import { matchLeft } from 'effect/Array'
import { toCoords, Transform3D } from './Transform3D'
import { identity, mul, rotateX, rotateY, rotateZ, scale, semigroupMat, translate } from './Mat'
import * as D from './Drawing'
import * as Color from './Color'
import { angle } from './Shape'
import { Vec } from './Vec'

class Render extends Tag('Render')<
  Render,
  {
    readonly lineTo: (point: Vec) => Micro<void>
    readonly moveTo: (point: Vec) => Micro<void>
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

const renderDrawing = (d: D.Drawing): Micro<void, never, Render> =>
  service(Render).pipe(
    andThen(c => {
      const withContext = (fa: Micro<void>) =>
        pipe(
          c.save(),
          andThen(() => fa),
          andThen(c.restore)
        )

      const applyStyle: <A>(o: Option<A>, f: (a: A) => Micro<void>) => Micro<void> = (fa, f) => {
        if (isSome(fa)) {
          return f(fa.value)
        } else {
          return success
        }
      }

      const renderSubPath: (subPath: ReadonlyArray<Vec>) => Micro<void> = matchLeft({
        onEmpty: () => success,
        onNonEmpty: (head, tail) =>
          pipe(
            c.moveTo(head),
            andThen(() => forEach(tail, c.lineTo, { discard: true }))
          ),
      })

      const go: (transform: Transform3D) => (drawing: D.Drawing) => Micro<void> = t => d => {
        switch (d._tag) {
          case 'Many':
            return forEach(d.drawings, go(t), { discard: true })
          case 'Scale':
            return go(mul(scale([d.scaleX, d.scaleY, d.scaleZ]))(t))(d.drawing)
          case 'Rotate':
            return go(
              semigroupMat.combine(
                mul(rotateX(angle(d.rotateX)))(rotateY(angle(d.rotateY))),
                mul(rotateZ(angle(d.rotateZ)))(t)
              )
            )(d.drawing)
          case 'Translate':
            return go(mul(translate([d.translateX, d.translateY, d.translateZ]))(t))(d.drawing)
          case 'Outline':
            return withContext(
              pipe(
                applyStyle(d.style.color, flow(Color.toCss, c.setStrokeStyle)),
                andThen(() => applyStyle(d.style.lineWidth, c.setLineWidth)),
                andThen(() => applyStyle(d.style.lineCap, c.setLineCap)),
                andThen(() => applyStyle(d.style.lineJoin, c.setLineJoin)),
                andThen(c.beginPath),
                andThen(() => forEach(toCoords(d.shape, t), renderSubPath, { discard: true })),
                andThen(c.stroke)
              )
            )
          case 'Fill':
            return withContext(
              pipe(
                applyStyle(d.style.color, flow(Color.toCss, c.setFillStyle)),
                andThen(c.beginPath),
                andThen(() => forEach(toCoords(d.shape, t), renderSubPath, { discard: true })),
                andThen(() => c.fill())
              )
            )
          case 'Clipped':
            return withContext(
              pipe(
                c.beginPath(),
                andThen(() => forEach(toCoords(d.shape, t), renderSubPath, { discard: true })),
                andThen(() => c.clip()),
                andThen(() => go(t)(d.drawing))
              )
            )
        }
      }
      return go(identity)(d)
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
