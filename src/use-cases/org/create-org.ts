import { AddressRepository } from "@/repositories/address-repository";
import { OrgRepository } from "@/repositories/org-repository";
import { Org } from "@prisma/client";
import { AddressNonExistentError } from "../errors/address-nonexistent-error";
import { ResourceAlreadyExists } from "../errors/resource-already-exists-error";

interface CreateOrgUseCaseRequest {
  id?: string;
  name: string;
  addressId: string;
}

interface CreateOrgUseCaseResponse {
  org: Org;
}

export class CreateOrgUseCase {
  constructor(
    private orgRepository: OrgRepository,
    private addressRepository: AddressRepository,
  ) {}

  async execute({
    addressId,
    id,
    name,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const doesAddressExists =
      await this.addressRepository.findAddressById(addressId);

    if (!doesAddressExists) {
      throw new AddressNonExistentError();
    }

    const orgOnDB = await this.orgRepository.findOrgByNameAndAddress({
      orgName: name,
      addressId,
    });

    if (orgOnDB) {
      throw new ResourceAlreadyExists();
    }

    const org = await this.orgRepository.create({
      addressId,
      name,
      id,
    });

    return { org };
  }
}
