export interface ICustomerRequest {
  getName: () => string

  lowerSalary: (limit: number) => boolean

  equalLowerSalary: (limit: number) => boolean

  topSalary: (limit: number) => boolean

  equalTopSalary: (limit: number) => boolean

  fromSaoPaulo: () => boolean

  youngerThan: (limit: number) => boolean

  olderThan: (limit: number) => boolean
}
