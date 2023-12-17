import { Org, Prisma } from "@prisma/client";

export type FindByAddressAndNameParams = {
  name: string;
  address: string;
};

export interface OrgRepository {
  create(data: Prisma.OrgCreateInput): Promise<Org>;
  findByAddressAndName(query: FindByAddressAndNameParams): Promise<Org | null>;
  findById(id: string): Promise<Org | null>;
}
