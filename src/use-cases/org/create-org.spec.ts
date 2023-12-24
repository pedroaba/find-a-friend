import { InMemoryOrgRepository } from '@/repositories/in-memory/org-in-memory-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'
import { InMemoryAddressRepository } from '@/repositories/in-memory/address-in-memory-repository'
import { AddressNonExistentError } from '../errors/address-nonexistent-error'
import { ResourceAlreadyExists } from '../errors/resource-already-exists-error'

let addressRepository: InMemoryAddressRepository
let orgRepository: InMemoryOrgRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    addressRepository = new InMemoryAddressRepository()
    sut = new CreateOrgUseCase(orgRepository, addressRepository)
  })

  it('should be able to create an org', async () => {
    addressRepository.items.push({
      city: 'City-one',
      state: 'State-one',
      id: 'address-one',
    })

    const { org } = await sut.execute({
      name: 'ORG 1',
      addressId: 'address-one',
      id: 'Org one',
    })

    expect(org).toEqual(
      expect.objectContaining({
        name: 'ORG 1',
        addressId: 'address-one',
      }),
    )
  })

  it('should not be able to create an org with nonexistent address', async () => {
    await expect(() =>
      sut.execute({
        name: 'Org one',
        addressId: 'Estado 1',
        id: 'org-nee',
      }),
    ).rejects.toBeInstanceOf(AddressNonExistentError)
  })

  it('should not be able to create an org with same name and address', async () => {
    addressRepository.items.push({
      city: 'City-one',
      state: 'State-one',
      id: 'address-one',
    })

    orgRepository.items.push({
      name: 'ORG 1',
      addressId: 'address-one',
      id: 'Org one',
    })

    await expect(() =>
      sut.execute({
        name: 'ORG 1',
        addressId: 'address-one',
        id: 'org-nee',
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExists)
  })
})
