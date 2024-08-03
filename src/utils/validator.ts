export const isString = (value: any) => {
    return (typeof value === 'string' || value instanceof String)
}

export const isArray = (value: any) => {
    return Array.isArray(value)
}

export const isInt = (value: any) => {
    return Number.isInteger(value)
}


export const isEmail = (value: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return isString(value) && emailRegex.test(value.toString())
}

export const isTrue = (value: any) => {
    return ['true', true, 1, '1'].includes(value)
}

export const isFalse = (value: any) => {
    return ['false', false, 0, '0'].includes(value)
}