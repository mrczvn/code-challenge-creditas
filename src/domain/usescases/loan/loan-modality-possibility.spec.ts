import { LoanModalityPossibility } from './loan-modality-possibility'
import { typeLoanModality } from '../../models'

const makeSut = (): LoanModalityPossibility =>
  new LoanModalityPossibility(typeLoanModality.personal, 4)

describe('LoanModalityPossibility', () => {
  describe('getLoan', () => {
    test('Should returns loan modality model', () => {
      const sut = makeSut()

      expect(sut.getLoan()).toEqual({
        type: typeLoanModality.personal,
        taxes: 4
      })
    })
  })
})
