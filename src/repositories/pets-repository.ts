import { Pet, Prisma } from "@prisma/client";

export type PetCreateInputParams = Omit<Prisma.PetCreateInput, "org"> & {
  orgId: string;
};

export interface PetRepository {
  create(data: PetCreateInputParams): Promise<Pet>;
}
