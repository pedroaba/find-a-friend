import { Pet } from "@prisma/client";
import { PetCreateInputParams, PetRepository } from "../pets-repository";
import { randomUUID } from "node:crypto";

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = [];
  async create(data: PetCreateInputParams) {
    const pet: Pet = {
      id: randomUUID(),
      breed: data.breed ?? "CAT",
      description: data.description ?? "",
      name: data.name,
      orgId: data.orgId,
    };

    this.items.push(pet);
    return pet;
  }
}
