export const isString = (value: any) => {
    return (typeof value === 'string' || value instanceof String)
}

export const isEmail = (value: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return isString(value) && emailRegex.test(value.toString())
  }