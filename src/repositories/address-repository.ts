import { Address, Prisma } from "@prisma/client";

export interface FindAnAddressByCityAndStateParams {
  city: string;
  state: string;
}

export interface AddressRepository {
  create(data: Prisma.AddressCreateInput): Promise<Address>;
  findAnAddressByCityAndState(
    params: FindAnAddressByCityAndStateParams,
  ): Promise<Address | null>;
  findAddressById(id: string): Promise<Address | null>;
}
