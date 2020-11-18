import { equalsIgnoreCase as sut } from './equal-ignore-case'

describe('EqualsIgnoreCase', () => {
  test('Should return true when compare succeeds', () =>
    expect(sut('any_value', 'ANY_VALUE')).toBeTruthy())

  test('Should return false if false values are provided', () => {
    expect(sut('', '')).toBeFalsy()
    expect(sut(null, null)).toBeFalsy()
    expect(sut(undefined, undefined)).toBeFalsy()
  })

  test('Should return false when compare fails', () =>
    expect(sut('any_valuee', 'ANY_VALUE')).toBeFalsy())
})
