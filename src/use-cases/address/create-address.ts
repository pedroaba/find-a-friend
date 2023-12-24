import { AddressRepository } from '@/repositories/address-repository'
import { Address } from '@prisma/client'
import { ResourceAlreadyExists } from '../errors/resource-already-exists-error'

interface CreateAddressUseCaseRequest {
  id?: string
  city: string
  state: string
}

interface CreateAddressUseCaseResponse {
  address: Address
}

export class CreateAddressUseCase {
  constructor(private addressRepository: AddressRepository) {}

  async execute({
    city,
    id,
    state,
  }: CreateAddressUseCaseRequest): Promise<CreateAddressUseCaseResponse> {
    const addressOnDB =
      await this.addressRepository.findAnAddressByCityAndState({
        city,
        state,
      })

    if (addressOnDB) {
      throw new ResourceAlreadyExists()
    }

    const address = await this.addressRepository.create({
      city,
      state,
      id,
    })

    return { address }
  }
}
