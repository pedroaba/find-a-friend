import { Org, Prisma } from "@prisma/client";

export interface FindOrgByNameAndAddressParams {
  orgName: string;
  addressId: string;
}

export interface OrgRepository {
  create(data: Prisma.OrgUncheckedCreateInput): Promise<Org>;
  findOrgByNameAndAddress(
    params: FindOrgByNameAndAddressParams,
  ): Promise<Org | null>;
  findById(id: string): Promise<Org | null>;
}
