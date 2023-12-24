import { InMemoryPetRepository } from '@/repositories/in-memory/pet-in-memory-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetPetByIdUseCase } from './get-pet-by-id'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let petRepository: InMemoryPetRepository
let sut: GetPetByIdUseCase

describe('Get Pet By Id Use Case', () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository()
    sut = new GetPetByIdUseCase(petRepository)
  })

  it('should be able to get a pet by id', async () => {
    petRepository.items.push({
      breed: 'dog',
      name: 'dog',
      orgId: 'org-nee',
      id: 'pet-1',
    })

    const { pet } = await sut.execute({ petId: 'pet-1' })

    expect(pet.id).toEqual(expect.any(String))
    expect(pet.id).toEqual('pet-1')
    expect(pet.name).toEqual('dog')
  })

  it('should not be able to get a pet with non pet id', async () => {
    await expect(() => sut.execute({ petId: 'nonid' })).rejects.toBeInstanceOf(
      ResourceNotFoundError,
    )
  })
})
