import { Address, Prisma } from '@prisma/client'
import {
  AddressRepository,
  FindAnAddressByCityAndStateParams,
} from '../address-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryAddressRepository implements AddressRepository {
  public items: Address[] = []

  async create(data: Prisma.AddressCreateInput) {
    const address = {
      id: data.id ?? randomUUID(),
      city: data.city,
      state: data.state,
    }

    this.items.push(address)

    return address
  }

  async findAnAddressByCityAndState({
    city,
    state,
  }: FindAnAddressByCityAndStateParams) {
    const address = this.items.find(
      (item) => item.city === city && item.state === state,
    )

    if (!address) {
      return null
    }

    return address
  }

  async findAddressById(id: string) {
    const address = this.items.find((item) => item.id === id)

    if (!address) {
      return null
    }

    return address
  }

  async findAnAddressByCityOrState({
    city,
    state,
  }: FindAnAddressByCityAndStateParams) {
    const address = this.items.find(
      (item) => item.city === city || item.state === state,
    )

    if (!address) {
      return null
    }

    return address
  }
}
