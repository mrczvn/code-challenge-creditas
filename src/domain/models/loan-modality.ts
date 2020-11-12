export enum typeLoanModality {
  personal = 'personal',
  warranty = 'warranty',
  consigned = 'consigned'
}

export interface LoanModalityModel {
  type: typeLoanModality
  taxes: number
}
