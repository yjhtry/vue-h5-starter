import { describe, expect, it } from 'vitest'

describe('utils.json.safeJsonParse.test', () => {
  it('should parse valid json', () => {
    expect(safeJsonParse(JSON.stringify({ name: 'john', age: 22 }))).toBeDefined()
  })

  it('should parse undefined', () => {
    expect(safeJsonParse('')).toBeUndefined()
  })
})

describe('utils.json.safeJsonStringify.test', () => {
  it('should stringify object', () => {
    const data = { name: 'john', age: 22 }
    expect(safeJsonStringify(data)).toBe(JSON.stringify(data))
  })

  it('should stringify undefined', () => {
    const obj = {} as any
    obj.self = obj
    expect(safeJsonStringify(obj)).toBeUndefined()
  })
})

describe('utils.invariant.test', () => {
  it('should undefined and nothing happens', () => {
    expect(invariant(true)).toBeUndefined()
  })

  it('should throw Error', () => {
    try {
      invariant(false, 'error message')
    }
    catch (error) {
      expect((error as any).message).toBe('error message')
    }
  })
})
