import { Monoid, fromSemigroup, struct } from '@effect/typeclass/Monoid'
import { make } from '@effect/typeclass/Semigroup'
import { getMonoid } from '@effect/typeclass/data/Array'
import { MonoidSome } from '@effect/typeclass/data/Boolean'
import { constant } from 'effect/Function'
import { append } from 'effect/Array'
import { Foldable } from '@effect/typeclass/Foldable'
import { Kind, TypeLambda } from 'effect/HKT'
import { Vec } from './Vec'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

export type Angle = Degrees | Radians

export interface Degrees {
  readonly _tag: 'Degrees'
  readonly degrees: number
}

export interface Radians {
  readonly _tag: 'Radians'
  readonly radians: number
}

export type Point = Vec

export type Shape = Composite | Path

export interface Composite {
  readonly _tag: 'Composite'
  readonly shapes: ReadonlyArray<Shape>
}

export interface Path {
  readonly _tag: 'Path'
  readonly closed: boolean
  readonly points: ReadonlyArray<Point>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

export const degrees = (degrees: number): Degrees => ({ _tag: 'Degrees', degrees })

export const radians = (radians: number): Radians => ({ _tag: 'Radians', radians })

export const point = (x: number, y: number, z: number): Point => [x, y, z]

export const composite = (shapes: ReadonlyArray<Shape>): Composite => ({
  _tag: 'Composite',
  shapes,
})

export const closed =
  <F extends TypeLambda>(F: Foldable<F>): (<E, A>(fa: Kind<F, unknown, E, A, Point>) => Path) =>
  fa =>
    F.reduce(fa, monoidPath.empty, (b, a) => ({
      _tag: 'Path',
      closed: true,
      points: append(a)(b.points),
    }))

export const path =
  <F extends TypeLambda>(F: Foldable<F>): (<E, A>(fa: Kind<F, unknown, E, A, Point>) => Path) =>
  fa =>
    F.reduce(fa, monoidPath.empty, (b, a) => ({
      _tag: 'Path',
      closed: false,
      points: append(a)(b.points),
    }))

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

export const angle = (angle: Angle): number => {
  switch (angle._tag) {
    case 'Radians':
      return angle.radians * (180 / Math.PI)
    case 'Degrees':
      return angle.degrees
  }
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

export const monoidPath: Monoid<Path> = struct({
  _tag: fromSemigroup<'Path'>(make(constant('Path')), 'Path'),
  closed: MonoidSome,
  points: getMonoid<Point>(),
})
