import { InMemoryRepository } from '@/core/entities'
import { FindOrgByNameAndAddressParams, OrgRepository } from '../org-repository'
import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgRepository
  extends InMemoryRepository<Org>
  implements OrgRepository
{
  async create(data: Prisma.OrgUncheckedCreateInput) {
    const org = {
      id: data.id ?? randomUUID(),
      name: data.name,
      addressId: data.addressId,
    }

    this.items.push(org)

    return org
  }

  async findOrgByNameAndAddress({
    addressId,
    orgName,
  }: FindOrgByNameAndAddressParams) {
    const org = this.items.find(
      (item) => item.name === orgName && item.addressId === addressId,
    )

    if (!org) {
      return null
    }

    return org
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async fetchOrgsByAddress(addressId: string) {
    const orgs = this.items.filter((item) => item.addressId === addressId)

    return orgs
  }
}
