import { isArray, isEmail, isFalse, isInt, isString, isTrue } from "../../src/utils/validator"

describe('Validators', () => {
  describe('isString', () => {
    it('should return true for string literals', () => {
      expect(isString('test')).toBe(true)
    })

    it('should return true for String objects', () => {
      expect(isString(new String('test'))).toBe(true)
    })

    it('should return false for non-string values', () => {
      expect(isString(123)).toBe(false)
      expect(isString([])).toBe(false)
      expect(isString({})).toBe(false)
      expect(isString(null)).toBe(false)
      expect(isString(undefined)).toBe(false)
    })
  })

  describe('isArray', () => {
    it('should return true for arrays', () => {
      expect(isArray([])).toBe(true)
      expect(isArray([1, 2, 3])).toBe(true)
    })

    it('should return false for non-array values', () => {
      expect(isArray('test')).toBe(false)
      expect(isArray(123)).toBe(false)
      expect(isArray({})).toBe(false)
      expect(isArray(null)).toBe(false)
      expect(isArray(undefined)).toBe(false)
    })
  })

  describe('isInt', () => {
    it('should return true for integers', () => {
      expect(isInt(123)).toBe(true)
      expect(isInt(-123)).toBe(true)
    })

    it('should return false for non-integers', () => {
      expect(isInt(123.45)).toBe(false)
      expect(isInt('123')).toBe(false)
      expect(isInt([])).toBe(false)
      expect(isInt({})).toBe(false)
      expect(isInt(null)).toBe(false)
      expect(isInt(undefined)).toBe(false)
    })
  })

  describe('isEmail', () => {
    it('should return true for valid email addresses', () => {
      expect(isEmail('test@example.com')).toBe(true)
      expect(isEmail('user.name+tag+sorting@example.com')).toBe(true)
    })

    it('should return false for invalid email addresses', () => {
      expect(isEmail('plainaddress')).toBe(false)
      expect(isEmail('test@.com')).toBe(false)
      expect(isEmail('@example.com')).toBe(false)
      expect(isEmail('test@example')).toBe(false)
    })

    it('should return false for non-string values', () => {
      expect(isEmail(123)).toBe(false)
      expect(isEmail([])).toBe(false)
      expect(isEmail({})).toBe(false)
      expect(isEmail(null)).toBe(false)
      expect(isEmail(undefined)).toBe(false)
    })
  })

  describe('isTrue', () => {
    it('should return true for true-like values', () => {
      expect(isTrue('true')).toBe(true)
      expect(isTrue(true)).toBe(true)
      expect(isTrue(1)).toBe(true)
      expect(isTrue('1')).toBe(true)
    })

    it('should return false for false-like values', () => {
      expect(isTrue('false')).toBe(false)
      expect(isTrue(false)).toBe(false)
      expect(isTrue(0)).toBe(false)
      expect(isTrue('0')).toBe(false)
    })

    it('should return false for non-true-like values', () => {
      expect(isTrue(123)).toBe(false)
      expect(isTrue([])).toBe(false)
      expect(isTrue({})).toBe(false)
      expect(isTrue(null)).toBe(false)
      expect(isTrue(undefined)).toBe(false)
    })
  })

  describe('isFalse', () => {
    it('should return true for false-like values', () => {
      expect(isFalse('false')).toBe(true)
      expect(isFalse(false)).toBe(true)
      expect(isFalse(0)).toBe(true)
      expect(isFalse('0')).toBe(true)
    })

    it('should return false for true-like values', () => {
      expect(isFalse('true')).toBe(false)
      expect(isFalse(true)).toBe(false)
      expect(isFalse(1)).toBe(false)
      expect(isFalse('1')).toBe(false)
    })

    it('should return false for non-false-like values', () => {
      expect(isFalse(123)).toBe(false)
      expect(isFalse([])).toBe(false)
      expect(isFalse({})).toBe(false)
      expect(isFalse(null)).toBe(false)
      expect(isFalse(undefined)).toBe(false)
    })
  })
})
