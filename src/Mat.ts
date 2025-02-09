import { pipe } from 'effect/Function'
import { NonEmptyReadonlyArray, headNonEmpty, map, unsafeGet } from 'effect/Array'
import { Semigroup, make } from '@effect/typeclass/Semigroup'
import { Monoid, fromSemigroup } from '@effect/typeclass/Monoid'
import { Vec, dot } from './Vec'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

export type Mat = NonEmptyReadonlyArray<Vec>

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

export const transpose = (m: Mat): Mat =>
  pipe(
    headNonEmpty(m),
    map((_, i) => col(i)(m))
  )

export const translate = (v: Vec): Mat => [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [v[0], v[1], v[2], 1],
]

export const scale = (v: Vec): Mat => [
  [v[0], 0, 0, 0],
  [0, v[1], 0, 0],
  [0, 0, v[2], 0],
  [0, 0, 0, 1],
]

const sin = (deg: number) => Math.sin((deg * Math.PI) / 180.0)

const cos = (deg: number) => Math.cos((deg * Math.PI) / 180.0)

export const rotateX = (angle: number): Mat => [
  [1, 0, 0, 0],
  [0, cos(angle), sin(angle), 0],
  [0, -sin(angle), cos(angle), 0],
  [0, 0, 0, 1],
]

export const rotateY = (angle: number): Mat => [
  [cos(angle), 0, -sin(angle), 0],
  [0, 1, 0, 0],
  [sin(angle), 0, cos(angle), 0],
  [0, 0, 0, 1],
]

export const rotateZ = (angle: number): Mat => [
  [cos(angle), sin(angle), 0, 0],
  [-sin(angle), cos(angle), 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
]

export const axonometric = (phi: number, theta: number): Mat => [
  [cos(phi), sin(phi) * sin(theta), -sin(phi) * cos(theta), 0],
  [0, cos(theta), sin(theta), 0],
  [sin(phi), -cos(phi) * sin(theta), cos(phi) * cos(theta), 0],
  [0, 0, 0, 1],
]

export const identity: Mat = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
]

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

export const mul =
  (y: Mat): ((x: Mat) => Mat) =>
  x =>
    semigroupMat.combine(x, y)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

export const semigroupMat: Semigroup<Mat> = make((x, y) =>
  pipe(map(transpose(y), dot), fab => map(x, ar => map(fab, f => f(ar))))
)

export const monoidMat: Monoid<Mat> = fromSemigroup(semigroupMat, identity)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

export const row: (n: number) => (m: Mat) => Vec = unsafeGet

export const col: (n: number) => (m: Mat) => Vec = n => map(unsafeGet(n))
