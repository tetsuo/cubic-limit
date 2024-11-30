import { Option, none, some } from 'effect/Option'
import { getMonoid } from '@effect/typeclass/data/Array'
import { getOptionalMonoid } from '@effect/typeclass/data/Option'
import { Monoid, fromSemigroup, struct } from '@effect/typeclass/Monoid'
import { make, first } from '@effect/typeclass/Semigroup'
import { Color } from './Color'
import { Angle, Shape } from './Shape'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

export type Drawing = Clipped | Outline | Fill | Many | Translate | Rotate | Scale

export interface Translate {
  readonly _tag: 'Translate'
  readonly translateX: number
  readonly translateY: number
  readonly translateZ: number
  readonly drawing: Drawing
}

export const translate: (
  translateX: number,
  translateY: number,
  translateZ: number,
  drawing: Drawing
) => Drawing = (translateX, translateY, translateZ, drawing) => ({
  _tag: 'Translate',
  translateX,
  translateY,
  translateZ,
  drawing,
})

export interface Rotate {
  readonly _tag: 'Rotate'
  readonly rotateX: Angle
  readonly rotateY: Angle
  readonly rotateZ: Angle
  readonly drawing: Drawing
}

export const rotate: (rotateX: Angle, rotateY: Angle, rotateZ: Angle, drawing: Drawing) => Drawing = (
  rotateX,
  rotateY,
  rotateZ,
  drawing
) => ({
  _tag: 'Rotate',
  rotateX,
  rotateY,
  rotateZ,
  drawing,
})

export interface Scale {
  readonly _tag: 'Scale'
  readonly scaleX: number
  readonly scaleY: number
  readonly scaleZ: number
  readonly drawing: Drawing
}

export const scale: (scaleX: number, scaleY: number, scaleZ: number, drawing: Drawing) => Drawing = (
  scaleX,
  scaleY,
  scaleZ,
  drawing
) => ({
  _tag: 'Scale',
  scaleX,
  scaleY,
  scaleZ,
  drawing,
})

export interface Many {
  readonly _tag: 'Many'
  readonly drawings: ReadonlyArray<Drawing>
}

export const many: (drawings: ReadonlyArray<Drawing>) => Drawing = drawings => ({
  _tag: 'Many',
  drawings,
})

export interface Clipped {
  readonly _tag: 'Clipped'
  readonly shape: Shape
  readonly drawing: Drawing
}

export interface Fill {
  readonly _tag: 'Fill'
  readonly shape: Shape
  readonly style: FillStyle
}

export interface FillStyle {
  readonly color: Option<Color>
}

export interface OutlineStyle {
  readonly color: Option<Color>
  readonly lineWidth: Option<number>
  readonly lineCap: Option<LineCap>
  readonly lineJoin: Option<LineJoin>
}

export type LineCap = 'butt' | 'round' | 'square'

export type LineJoin = 'bevel' | 'miter' | 'round'

export interface Outline {
  readonly _tag: 'Outline'
  readonly shape: Shape
  readonly style: OutlineStyle
}

export const outlineColor: (color: Color) => OutlineStyle = c => ({
  color: some(c),
  lineWidth: none(),
  lineCap: none(),
  lineJoin: none(),
})

export const lineWidth: (lineWidth: number) => OutlineStyle = w => ({
  color: none(),
  lineWidth: some(w),
  lineCap: none(),
  lineJoin: none(),
})

export const lineCap: (lineCap: LineCap) => OutlineStyle = w => ({
  color: none(),
  lineCap: some(w),
  lineWidth: none(),
  lineJoin: none(),
})

export const lineJoin: (lineJoin: LineJoin) => OutlineStyle = w => ({
  color: none(),
  lineJoin: some(w),
  lineWidth: none(),
  lineCap: none(),
})

export const clipped: (shape: Shape, drawing: Drawing) => Drawing = (shape, drawing) => ({
  _tag: 'Clipped',
  shape,
  drawing,
})

export const fill: (shape: Shape, style: FillStyle) => Drawing = (shape, style) => ({
  _tag: 'Fill',
  shape,
  style,
})

export const fillStyle: (color: Color) => FillStyle = c => ({ color: some(c) })

export const outline: (shape: Shape, style: OutlineStyle) => Drawing = (shape, style) => ({
  _tag: 'Outline',
  shape,
  style,
})

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

const getFirstMonoidColor = getOptionalMonoid(first<Color>())
const getFirstMonoidLineCap = getOptionalMonoid(first<LineCap>())
const getFirstMonoidLineJoin = getOptionalMonoid(first<LineJoin>())
const getFirstMonoidLineNumber = getOptionalMonoid(first<number>())

export const monoidFillStyle: Monoid<FillStyle> = struct({ color: getFirstMonoidColor })

export const monoidOutlineStyle: Monoid<OutlineStyle> = struct({
  color: getFirstMonoidColor,
  lineWidth: getFirstMonoidLineNumber,
  lineCap: getFirstMonoidLineCap,
  lineJoin: getFirstMonoidLineJoin,
})

const { combineAll, empty } = getMonoid<Drawing>()

export const monoidDrawing: Monoid<Drawing> = fromSemigroup(
  make((x, y) =>
    x._tag === 'Many' && y._tag === 'Many'
      ? many(combineAll([x.drawings, y.drawings]))
      : x._tag === 'Many'
        ? many(combineAll([x.drawings, [y]]))
        : y._tag === 'Many'
          ? many(combineAll([[x], y.drawings]))
          : many([x, y])
  ),
  many(empty)
)
