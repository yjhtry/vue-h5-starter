export function invariant(cond: any, message?: string): asserts cond {
  if (cond)
    return

  throw new Error(message)
}
