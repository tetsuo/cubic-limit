import * as C from '@tetsuo/graphics3d-ts/lib/Canvas'
import * as D from '@tetsuo/graphics3d-ts/lib/Drawing'
import * as IO from 'fp-ts/IO'
import { error } from 'fp-ts/lib/Console'
import { flow, pipe } from 'fp-ts/lib/function'
import { p197 } from './p197'
import { p161 } from './p161'

const draw =
  (f: ({ width, height }: { width: number; height: number }) => D.Drawing) =>
  (canvasId: string): IO.IO<void> => {
    const canvas = C.unsafeGetCanvasElementById(canvasId)
    const rect = canvas.getBoundingClientRect()

    const dpr = window.devicePixelRatio

    // Set the "actual" size of the canvas
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    // Set the "drawn" size of the canvas
    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    return pipe(
      C.getContext2D(canvas),
      IO.chain(ctx => {
        // Scale the 2d context to ensure correct drawing operations
        ctx.scale(dpr, dpr)

        return pipe(
          C.getDimensions(canvas),
          IO.map(dim => ({ width: dim.width / dpr, height: dim.height / dpr })),
          IO.chain(
            flow(
              f,
              D.render,
              C.renderTo(canvasId, () => error(`no canvas not found with id ${canvasId}`))
            )
          )
        )
      })
    )
  }

export default {
  p197: draw(p197),
  p161: draw(p161),
}
