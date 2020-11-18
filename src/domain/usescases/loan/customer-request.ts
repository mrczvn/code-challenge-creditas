import { CustomerModel } from '../../models'
import { ICustomerRequest } from '../../protocols'
import { equalsIgnoreCase } from '../../../presentation/util/equal-ignore-case'

export class CustomerRequest implements ICustomerRequest {
  constructor(private readonly customer: CustomerModel) {}

  getName(): string {
    return this.customer.name
  }

  lowerSalary(limit: number): boolean {
    return this.customer.income < limit
  }

  equalLowerSalary(limit: number): boolean {
    return this.customer.income <= limit
  }

  topSalary(limit: number): boolean {
    return this.customer.income > limit
  }

  equalTopSalary(limit: number): boolean {
    return this.customer.income >= limit
  }

  fromSaoPaulo(): boolean {
    return equalsIgnoreCase(this.customer.location, 'SP')
  }

  youngerThan(limit: number): boolean {
    return this.customer.age < limit
  }

  olderThan(limit: number): boolean {
    return this.customer.age > limit
  }
}
