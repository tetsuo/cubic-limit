import { pipe } from 'effect/Function'
import { NonEmptyReadonlyArray, append, isNonEmptyReadonlyArray, map } from 'effect/Array'
import { Option, none, some } from 'effect/Option'
import { compact } from '@effect/typeclass/Filterable'
import { Filterable } from '@effect/typeclass/data/Array'
import { Mat, mul } from './Mat'
import { Path3D } from './Path3D'

export type Transform3D = Mat

const validateNonEmpty = <A>(as: ReadonlyArray<A>): Option<NonEmptyReadonlyArray<A>> =>
  isNonEmptyReadonlyArray(as) ? some(as) : none()

const compactArray = compact(Filterable)

const VT: Mat = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 1],
]

export const toCoords = (path: Path3D, transform: Transform3D): ReadonlyArray<Mat> =>
  pipe(path, map(validateNonEmpty), compactArray, map(map(append(1))), map(mul(transform)), map(mul(VT)))
