import { OrgRepository } from "@/repositories/org-repository";
import { PetRepository } from "@/repositories/pet-repository";
import { Pet } from "@prisma/client";
import { InvalidOrgError } from "../errors/invalid-org-error";

interface CreatePetUseCaseRequest {
  id?: string;
  name: string;
  breed: string;
  orgId: string;
}

interface CreatePetUseCaseResponse {
  pet: Pet;
}

export class CreatePetUseCase {
  constructor(
    private petRepository: PetRepository,
    private orgRepository: OrgRepository,
  ) {}

  async execute({
    breed,
    name,
    orgId,
    id,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const doesOrgExists = await this.orgRepository.findById(orgId);

    if (!doesOrgExists) {
      throw new InvalidOrgError();
    }

    const pet = await this.petRepository.create({
      breed,
      name,
      orgId,
      id,
    });

    return {
      pet,
    };
  }
}
