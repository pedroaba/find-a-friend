import { Org, Prisma } from "@prisma/client";
import { FindByAddressAndNameParams, OrgRepository } from "../orgs-repository";
import { randomUUID } from "crypto";

export class InMemoryOrgRepository implements OrgRepository {
  public items: Org[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      ...data,
    };

    this.items.push(org);
    return org;
  }

  async findByAddressAndName({ address, name }: FindByAddressAndNameParams) {
    const org = this.items.find(
      (item) => item.address === address && item.name === name,
    );

    if (!org) {
      return null;
    }

    return org;
  }

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id);

    if (!org) {
      return null;
    }

    return org;
  }
}
