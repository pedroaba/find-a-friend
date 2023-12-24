import { InMemoryPetRepository } from '@/repositories/in-memory/pet-in-memory-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePetUseCase } from './create-pet'
import { InvalidOrgError } from '../errors/invalid-org-error'
import { InMemoryOrgRepository } from '@/repositories/in-memory/org-in-memory-repository'

let orgRepository: InMemoryOrgRepository
let petRepository: InMemoryPetRepository
let sut: CreatePetUseCase

describe('Create Pet Use Case', () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository()
    petRepository = new InMemoryPetRepository()
    sut = new CreatePetUseCase(petRepository, orgRepository)
  })

  it('should be able to create a pet', async () => {
    orgRepository.items.push({
      name: 'ORG 1',
      addressId: 'address-one',
      id: 'org-nee',
    })

    const { pet } = await sut.execute({
      breed: 'Dog',
      name: 'DOGGGG',
      orgId: 'org-nee',
    })

    expect(pet).toEqual(
      expect.objectContaining({
        breed: 'Dog',
        name: 'DOGGGG',
        orgId: 'org-nee',
      }),
    )
  })

  it('should not be able to create a pet without a org', async () => {
    await expect(() =>
      sut.execute({
        breed: 'Dog',
        name: 'DOGGGG',
        orgId: 'org-nee',
      }),
    ).rejects.toBeInstanceOf(InvalidOrgError)
  })
})
