import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { CreatePetUseCase } from "./create-pet";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { IsNotAOrgError } from "./errors/is-not-a-org-error";

let userRepository: InMemoryUserRepository;
let petRepository: InMemoryPetRepository;
let sut: CreatePetUseCase;

describe("Create Pet Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    petRepository = new InMemoryPetRepository();
    sut = new CreatePetUseCase(petRepository, userRepository);
  });

  it("should be able to create a pet", async () => {
    const org = await userRepository.create({
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      password_hash: "123456",
      address: "Cachoeira de Minas",
      phone_number: "9999999999999",
      is_an_org: true,
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

  it("should not be able to create a pet without orgId", async () => {
    await expect(() =>
      sut.execute({
        name: "Gato 1",
        breed: "CAT",
        description: "",
        orgId: "inexistent-org-id",
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError);
  });

  it("should not be able create a pet with a user that is not an organization", async () => {
    const org = await userRepository.create({
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      password_hash: "123456",
      address: "Cachoeira de Minas",
      phone_number: "9999999999999",
      is_an_org: false,
    });

    await expect(() =>
      sut.execute({
        name: "Gato 1",
        breed: "CAT",
        description: "",
        orgId: org.id,
      }),
    ).rejects.toBeInstanceOf(IsNotAOrgError);
  });
});
