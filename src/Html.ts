import { constant, flow, pipe } from 'effect/Function'
import { Micro, succeed, sync, andThen, runSync } from 'effect/Micro'
import { fromNullable, Option, getOrThrowWith } from 'effect/Option'
import { Drawing } from './Drawing'
import { render } from './Render'

const unsafeGetCanvasElementById: (canvasId: string) => HTMLCanvasElement = canvasId =>
  document.getElementById(canvasId) as HTMLCanvasElement

const getCanvasElementById = (canvasId: string): Micro<Option<HTMLCanvasElement>, never, never> =>
  sync(() => fromNullable(unsafeGetCanvasElementById(canvasId)))

const unsafeGetContext2D: (canvas: HTMLCanvasElement) => CanvasRenderingContext2D = c =>
  c.getContext('2d') as CanvasRenderingContext2D

const getContext2D: (canvas: HTMLCanvasElement) => Micro<Option<CanvasRenderingContext2D>, never, never> =
  flow(unsafeGetContext2D, fromNullable, constant, sync)

const dpr: Micro<number, never, never> = succeed(window.devicePixelRatio)

export interface Size {
  width: number
  height: number
}

export const renderTo = (f: (size: Size) => Drawing, canvasId: string): void =>
  pipe(
    getCanvasElementById(canvasId),
    andThen(getOrThrowWith(() => new Error(`Unable to find canvas with id ${canvasId}`))),
    andThen(canvas => {
      const rect = canvas.getBoundingClientRect()
      return dpr.pipe(
        andThen(dpr => {
          canvas.width = rect.width * dpr
          canvas.height = rect.height * dpr

          canvas.style.width = `${rect.width}px`
          canvas.style.height = `${rect.height}px`

          return pipe(
            getContext2D(canvas),
            andThen(getOrThrowWith(() => new Error('Unable to get context 2D'))),
            andThen(ctx => {
              ctx.scale(dpr, dpr)
              return render(f({ height: canvas.height / dpr, width: canvas.width / dpr }), ctx)
            })
          )
        })
      )
    })
  ).pipe(runSync)
