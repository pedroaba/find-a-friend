import { OrgRepository } from "@/repositories/orgs-repository";
import { PetRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CreatePetUseCaseRequest {
  name: string;
  breed: "CAT" | "DOG";
  description: string | null;
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
    description,
    name,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const doesOrgExists = await this.orgRepository.findById(orgId);

    if (!doesOrgExists) {
      throw new ResourceNotFoundError();
    }

    const pet = await this.petRepository.create({
      name,
      orgId,
      breed,
      description,
    });

    return { pet };
  }
}
