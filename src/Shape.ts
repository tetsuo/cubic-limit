import { MonoidSome } from '@effect/typeclass/data/Boolean'
import { constant } from 'effect/Function'
import { fromSemigroup, Monoid, struct } from '@effect/typeclass/Monoid'
import { Foldable } from '@effect/typeclass/Foldable'
import { make } from '@effect/typeclass/Semigroup'
import { Kind, TypeLambda } from 'effect/HKT'
import { Chunk, append, appendAll, empty } from '@effect/data/Chunk'
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
  readonly points: Chunk<Point>
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
  <F extends TypeLambda>(F: Foldable<F>): ((fa: Kind<F, unknown, unknown, unknown, Point>) => Path) =>
  fa =>
    F.reduce(fa, monoidPath.empty, (b, a) => ({
      _tag: 'Path',
      closed: true,
      points: append(b.points, a),
    }))

export const path =
  <F extends TypeLambda>(F: Foldable<F>): ((fa: Kind<F, unknown, unknown, unknown, Point>) => Path) =>
  fa =>
    F.reduce(fa, monoidPath.empty, (b, a) => ({
      _tag: 'Path',
      closed: false,
      points: append(b.points, a),
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
  points: fromSemigroup(make<Chunk<Point>>(appendAll), empty()),
})
