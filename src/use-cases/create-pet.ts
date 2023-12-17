import { PetRepository } from "@/repositories/pets-repository";
import { Pet } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { UserRepository } from "@/repositories/users-repository";
import { IsNotAOrgError } from "./errors/is-not-a-org-error";

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
    private userRepository: UserRepository,
  ) {}

  async execute({
    breed,
    description,
    name,
    orgId,
  }: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> {
    const doesOrgExists = await this.userRepository.findById(orgId);

    if (!doesOrgExists) {
      throw new ResourceNotFoundError();
    }

    if (!doesOrgExists.is_an_org) {
      throw new IsNotAOrgError();
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
