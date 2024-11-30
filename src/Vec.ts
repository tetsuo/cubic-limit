import { pipe } from 'effect/Function'
import { NonEmptyReadonlyArray, reduce, zipWith } from 'effect/Array'
import { multiply, sum } from 'effect/Number'

export type Vec = NonEmptyReadonlyArray<number>

export const dot =
  (b: Vec): ((a: Vec) => number) =>
  a =>
    pipe(zipWith(a, b, multiply), reduce(0, sum))
