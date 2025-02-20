import { pipe } from 'effect/Function'
import {
  append,
  empty,
  isNonEmptyReadonlyArray,
  lastNonEmpty,
  map,
  matchLeft,
  modifyNonEmptyLast,
  reduce,
  setNonEmptyLast,
} from 'effect/Array'
import { toReadonlyArray } from '@effect/data/Chunk'
import { Shape, Point } from './Shape'

const isPointFinite = (point: Point): boolean =>
  isFinite(point[0]) && isFinite(point[1]) && isFinite(point[2])

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

export type Path3D = ReadonlyArray<ReadonlyArray<Point>>

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

export const fromShape: (shape: Shape) => Path3D = shape => {
  switch (shape._tag) {
    case 'Composite':
      return shape.shapes.flatMap(fromShape)
    case 'Path':
      return pipe(
        toReadonlyArray(shape.points),
        matchLeft({
          onEmpty: empty,
          onNonEmpty: (head, tail) =>
            pipe(
              tail,
              map(lineTo),
              reduce(moveTo(head)([]), (a, f) => f(a)),
              path => (shape.closed ? closePath(path).slice(0, -1) : path)
            ),
        })
      )
  }
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

export const moveTo =
  (point: Point) =>
  (path: Path3D): Path3D =>
    isPointFinite(point)
      ? // Create a new subpath with the specified point.
        append(path, [point])
      : path

export const lineTo =
  (point: Point) =>
  (path: Path3D): Path3D =>
    isPointFinite(point)
      ? isNonEmptyReadonlyArray(path)
        ? // Connect the last point in the subpath to the given point.
          pipe(path, modifyNonEmptyLast(append(point)))
        : // If path has no subpaths, ensure there is a subpath.
          moveTo(point)(path)
      : path

export const closePath = (path: Path3D): Path3D => {
  // Do nothing if path has no subpaths.
  if (!isNonEmptyReadonlyArray(path)) {
    return path
  }

  const cur = lastNonEmpty(path)

  // Do nothing if the last path contains a single point.
  if (!(isNonEmptyReadonlyArray(cur) && cur.length > 1)) {
    return path
  }

  const end = lastNonEmpty(cur)
  const start = cur[0]

  // Do nothing if both ends are the same point.
  if (end[0] === start[0] && end[1] === start[1] && end[2] === start[2]) {
    return path
  }

  // Mark the last path as closed adding a new subpath whose first point
  // is the same as the previous subpath's first point.
  return append(setNonEmptyLast(append(cur, start) as ReadonlyArray<Point>)(path), [start])
}
