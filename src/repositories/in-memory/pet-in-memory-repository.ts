import { InMemoryRepository } from '@/core/entities'
import { Pet, Prisma } from '@prisma/client'
import { PetRepository } from '../pet-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetRepository
  extends InMemoryRepository<Pet>
  implements PetRepository
{
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      breed: data.breed,
      orgId: data.orgId,
    }

    this.items.push(pet)
    return pet
  }

  async fetchAllPetsByOrgs(orgIds: string[], query: string) {
    const pets = this.items.filter(
      (item) =>
        orgIds.includes(item.orgId) &&
        item.name.toUpperCase().includes(query.toUpperCase()),
    )

    return pets
  }

  async findById(id: string) {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }
}
