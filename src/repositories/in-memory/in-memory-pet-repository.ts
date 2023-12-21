import { Pet } from "@prisma/client";
import {
  PetCreateInputParams,
  PetFindManyAvailableForAdoptsByCity,
  PetRepository,
} from "../pets-repository";
import { randomUUID } from "node:crypto";
import { getPageIntervalToFetchData } from "@/utils/get-page-interval-to-fetch-data";

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = [];
  async create(data: PetCreateInputParams) {
    const pet: Pet = {
      id: randomUUID(),
      breed: data.breed ?? "CAT",
      description: data.description ?? "",
      name: data.name,
      orgId: data.orgId,
      is_available_for_adoption: true,
    };

    this.items.push(pet);
    return pet;
  }

  async findManyAvailableForAdoptsByCity({
    city,
    page,
  }: PetFindManyAvailableForAdoptsByCity) {
    const pageToTake = getPageIntervalToFetchData(page);

    const pets = this.items
      .filter((item) => item.name === city)
      .slice(pageToTake.startRow, pageToTake.endRow);
    return pets;
  }
}
