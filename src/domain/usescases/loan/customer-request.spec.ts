import { CustomerRequest } from './customer-request'
import { CustomerModel } from '../../models'

interface ISutTypes {
  sut: CustomerRequest
  customer: CustomerModel
}

const makeCustomer = (): CustomerModel => ({
  name: 'Erikaya',
  cpf: '123.456.789-10',
  age: 29,
  location: 'SP',
  income: 3000
})

const makeSut = (): ISutTypes => {
  const customer = makeCustomer()

  const sut = new CustomerRequest(customer)

  return { sut, customer }
}

describe('CustomerRequest', () => {
  describe('getName', () => {
    test('Should returns customer name', () => {
      const { sut, customer } = makeSut()

      expect(sut.getName()).toBe(customer.name)
    })
  })

  describe('lowerSalary', () => {
    test('Should return false if income higher than the limit', () => {
      const { sut } = makeSut()

      expect(sut.lowerSalary(3000)).toBeFalsy()
    })

    test('Should return true if income is less than the limit', () => {
      const { sut } = makeSut()

      expect(sut.lowerSalary(3001)).toBeTruthy()
    })
  })

  describe('equalLowerSalary', () => {
    test('Should return false if income higher than the limit', () => {
      const { sut } = makeSut()

      expect(sut.equalLowerSalary(2999)).toBeFalsy()
    })

    test('Should return true if income is less than or equal to the limit', () => {
      const { sut } = makeSut()

      expect(sut.equalLowerSalary(3000)).toBeTruthy()
    })
  })

  describe('topSalary', () => {
    test('Should return false if income is below the limit', () => {
      const { sut } = makeSut()

      expect(sut.topSalary(3001)).toBeFalsy()
    })

    test('return true if income higher than the limit', () => {
      const { sut } = makeSut()

      expect(sut.topSalary(2999)).toBeTruthy()
    })
  })

  describe('equalTopSalary', () => {
    test('Should returns false if the income is less than the limit', () => {
      const { sut } = makeSut()

      expect(sut.equalTopSalary(3001)).toBeFalsy()
    })

    test('Should returns true if income is equal to or greater than the limit', () => {
      const { sut } = makeSut()

      expect(sut.equalTopSalary(3000)).toBeTruthy()
    })
  })

  describe('fromSaoPaulo', () => {
    test('Should returns true if from Sao Paulo', () => {
      const { sut } = makeSut()

      expect(sut.fromSaoPaulo()).toBeTruthy()
    })

    test('Should returns false if not from Sao Paulo', () => {
      const { sut } = makeSut()

      jest.spyOn(sut, 'fromSaoPaulo').mockReturnValueOnce(false)

      expect(sut.fromSaoPaulo()).toBeFalsy()
    })
  })

  describe('youngerThan', () => {
    test('Should returns true if younger than the limit', () => {
      const { sut } = makeSut()

      expect(sut.youngerThan(30)).toBeTruthy()
    })

    test('Should returns false if older than the limit', () => {
      const { sut } = makeSut()

      expect(sut.youngerThan(28)).toBeFalsy()
    })
  })

  describe('olderThan', () => {
    test('Should returns true if older than the limit', () => {
      const { sut } = makeSut()

      expect(sut.olderThan(28)).toBeTruthy()
    })

    test('Should returns false if older than the limit', () => {
      const { sut } = makeSut()

      expect(sut.olderThan(29)).toBeFalsy()
    })
  })
})
