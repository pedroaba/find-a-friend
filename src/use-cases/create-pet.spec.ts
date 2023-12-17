import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { CreatePetUseCase } from "./create-pet";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

let orgRepository: InMemoryOrgRepository;
let petRepository: InMemoryPetRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    petRepository = new InMemoryPetRepository();
    sut = new CreatePetUseCase(petRepository, orgRepository);
  });

  it("it should be able to create a pet", async () => {
    const org = await orgRepository.create({
      name: "JavaScript Org",
      password_hash: "123456",
      address: "Cachoeira de Minas",
      phone_number: "9999999999",
    });

    const { pet } = await sut.execute({
      name: "Gato 1",
      breed: "CAT",
      description: "",
      orgId: org.id,
    });

    expect(pet.id).toEqual(expect.any(String));
    expect(pet).toEqual(
      expect.objectContaining({
        breed: "CAT",
        name: "Gato 1",
      }),
    );
  });

  it("it should not be able to create a pet without orgId", async () => {
    await expect(() =>
      sut.execute({
        name: "Gato 1",
        breed: "CAT",
        description: "",
        orgId: "inexistent-org-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });
});
