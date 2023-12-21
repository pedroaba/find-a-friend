import { Pet, Prisma } from "@prisma/client";

export type PetCreateInputParams = Omit<
  Prisma.PetCreateInput,
  "org" | "is_available_for_adoption"
> & {
  orgId: string;
};

export type PetFindManyAvailableForAdoptsByCity = {
  city: string;
  page: number;
};

export interface PetRepository {
  create(data: PetCreateInputParams): Promise<Pet>;
  findManyAvailableForAdoptsByCity(
    data: PetFindManyAvailableForAdoptsByCity,
  ): Promise<Pet[]>;
}
