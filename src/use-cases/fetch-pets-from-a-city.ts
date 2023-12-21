import { PetRepository } from "@/repositories/pets-repository";

interface FetchPetsFromACityUseCaseRequest {
  page: number,
  city: string
}

interface FetchPetsFromACityUseCaseResponse {}

export class FetchPetsFromACityUseCase {
  constructor(
    private petRepository: PetRepository
  ) {}

  async execute({city,page}: FetchPetsFromACityUseCaseRequest): Promise<FetchPetsFromACityUseCaseResponse> {
    const pets = await this.petRepository.
  }
}
