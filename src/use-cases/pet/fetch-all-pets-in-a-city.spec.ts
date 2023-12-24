import { InMemoryPetRepository } from '@/repositories/in-memory/pet-in-memory-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryOrgRepository } from '@/repositories/in-memory/org-in-memory-repository'
import { InMemoryAddressRepository } from '@/repositories/in-memory/address-in-memory-repository'
import { FetchAllPetsInACityUseCase } from './fetch-all-pets-in-a-city'

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let addressRepository: InMemoryAddressRepository
let sut: FetchAllPetsInACityUseCase

describe('Fetch Pet Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository()
    addressRepository = new InMemoryAddressRepository()
    sut = new FetchAllPetsInACityUseCase(
      petRepository,
      orgRepository,
      addressRepository,
    )
  })

  it('should be able to fetch all pets in a city', async () => {
    addressRepository.items.push({
      city: 'city-one',
      state: 'state-one',
      id: 'city-one',
    })

    orgRepository.items.push({
      name: 'ORG 1',
      addressId: 'city-one',
      id: 'org-nee',
    })

    for (let i = 1; i <= 3; i++) {
      petRepository.items.push({
        breed: `Dog ${i}`,
        name: `Doguinho ${i}`,
        orgId: 'org-nee',
        id: `pet-${i}`,
      })
    }

    const { pets } = await sut.execute({
      address: 'city-one',
    })

    expect(pets).toHaveLength(3)
    expect(pets[1]).toEqual(
      expect.objectContaining({
        name: 'Doguinho 2',
      }),
    )
  })

  it('should be able to fetch all pets filtering by query', async () => {
    addressRepository.items.push({
      city: 'city-one',
      state: 'state-one',
      id: 'city-one',
    })

    orgRepository.items.push({
      name: 'ORG 1',
      addressId: 'city-one',
      id: 'org-nee',
    })

    for (let i = 1; i <= 3; i++) {
      petRepository.items.push({
        breed: `Dog ${i}`,
        name: `Doguinho ${i}`,
        orgId: 'org-nee',
        id: `pet-${i}`,
      })
    }

    const { pets } = await sut.execute({
      address: 'city-one',
      query: '2',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0]).toEqual(
      expect.objectContaining({
        name: 'Doguinho 2',
      }),
    )
  })
})
