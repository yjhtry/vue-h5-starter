export function safeJsonParse<T>(str: string) {
  try {
    const jsonValue: T = JSON.parse(str)

    return jsonValue
  }
  catch {
    return undefined
  }
}

export function safeJsonStringify<T extends object>(value: T) {
  try {
    const result = JSON.stringify(value)

    return result
  }
  catch {
    return undefined
  }
}
