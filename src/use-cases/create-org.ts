import { OrgRepository } from "@/repositories/orgs-repository";
import { Org } from "@prisma/client";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { encryptPassword } from "@/utils/encrypt-password";

interface CreateOrgUseCaseRequest {
  name: string;
  address: string;
  phone_number: string;
  password: string;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(private orgRepository: OrgRepository) {}

  async execute({
    address,
    name,
    password,
    phone_number,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const doesOrgExists = await this.orgRepository.findByAddressAndName({
      address,
      name,
    });

    if (doesOrgExists) {
      throw new OrgAlreadyExistsError();
    }

    const passwordEncrypted = await encryptPassword(password);
    const org = await this.orgRepository.create({
      address,
      name,
      password_hash: passwordEncrypted,
      phone_number,
    });

    return {
      org,
    };
  }
}
