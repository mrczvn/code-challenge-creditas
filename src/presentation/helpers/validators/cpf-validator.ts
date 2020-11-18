import { IValidator } from '../protocols'

export class CpfValidator implements IValidator {
  private readonly BLACKLIST: string[] = [
    '00000000000',
    '11111111111',
    '22222222222',
    '33333333333',
    '44444444444',
    '55555555555',
    '66666666666',
    '77777777777',
    '88888888888',
    '99999999999',
    '12345678909'
  ]

  private checkCpfDigits(digits: string, digitsLenght: number): any {
    const parseIntDigits: number[] = digits
      .substring(0, digitsLenght)
      .split('')
      .map((digit) => parseInt(digit, 10))

    const multipliedDigits: number[] = parseIntDigits.map(
      (digit, index) => digit * (digitsLenght + 1 - index)
    )

    const sumDigit: number = multipliedDigits.reduce(
      (previousDigit, curentDigit) => previousDigit + curentDigit
    )

    const mod: number = (sumDigit * 10) % 11

    if (mod === 10 || mod === 11) return 0

    return mod
  }

  private removeCpfFormatting(cpf: string): string {
    return (cpf || '').replace(/[.-]/g, '')
  }

  isValid(cpf: string): boolean {
    const plainCpf: string = this.removeCpfFormatting(cpf)

    if (plainCpf.length !== 11 || this.BLACKLIST.includes(plainCpf)) {
      return false
    }

    const checkFirstNineDigitsCpf: number = this.checkCpfDigits(plainCpf, 9)
    const checkFirstTeenDigitsCpf: number = this.checkCpfDigits(plainCpf, 10)

    if (
      parseInt(plainCpf.substring(9, 10)) !== checkFirstNineDigitsCpf ||
      parseInt(plainCpf.substring(10, 11)) !== checkFirstTeenDigitsCpf
    ) {
      return false
    }

    return true
  }
}
