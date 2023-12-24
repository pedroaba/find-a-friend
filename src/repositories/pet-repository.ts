import { Pet, Prisma } from '@prisma/client'

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  fetchAllPetsByOrgs(orgIds: string[], query: string): Promise<Pet[]>
  findById(id: string): Promise<Pet | null>
}
