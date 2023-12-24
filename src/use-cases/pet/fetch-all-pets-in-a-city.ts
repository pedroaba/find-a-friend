import { AddressRepository } from '@/repositories/address-repository'
import { OrgRepository } from '@/repositories/org-repository'
import { PetRepository } from '@/repositories/pet-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface FetchAllPetsInACityUseCaseRequest {
  address: string
  query?: string
}

interface FetchAllPetsInACityUseCaseResponse {
  pets: Pet[]
}

export class FetchAllPetsInACityUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
    private addressRepository: AddressRepository,
  ) {}

  async execute({
    address,
    query = '',
  }: FetchAllPetsInACityUseCaseRequest): Promise<FetchAllPetsInACityUseCaseResponse> {
    const addressOnDB = await this.addressRepository.findAnAddressByCityOrState(
      {
        city: address,
        state: address,
      },
    )

    if (!addressOnDB) {
      throw new ResourceNotFoundError()
    }

    const orgs = await this.orgRepository.fetchOrgsByAddress(addressOnDB.id)
    const pets = await this.petRepository.fetchAllPetsByOrgs(
      orgs.map((o) => o.id),
      query,
    )

    return {
      pets,
    }
  }
}
