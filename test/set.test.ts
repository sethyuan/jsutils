import { diff, intersection, union } from "../src/index"

test("union", () => {
  const s1 = new Set([1, 2])
  const s2 = new Set([3, 2])
  const s3 = new Set([4, 2, 3])
  const result = union(s1, s2, s3)
  expect(Array.from(result).sort()).toEqual([1, 2, 3, 4])
})

test("intersection", () => {
  const s1 = new Set([1, 2])
  const s2 = new Set([3, 2])
  const s3 = new Set([4, 2, 3])
  const result = intersection(s1, s2, s3)
  expect(Array.from(result).sort()).toEqual([2])
})

test("diff", () => {
  const s1 = new Set([1, 2, 4, 5])
  const s2 = new Set([3, 2])
  const s3 = new Set([4, 2, 3])
  const result = diff(s1, s2, s3)
  expect(Array.from(result).sort()).toEqual([1, 5])
})
