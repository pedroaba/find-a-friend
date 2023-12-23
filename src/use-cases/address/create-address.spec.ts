import { InMemoryAddressRepository } from "@/repositories/in-memory/address-in-memory-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateAddressUseCase } from "./create-address";
import { ResourceAlreadyExists } from "../errors/resource-already-exists-error";

let addressRepository: InMemoryAddressRepository;
let sut: CreateAddressUseCase;

describe("Create Address Use Case", () => {
  beforeEach(() => {
    addressRepository = new InMemoryAddressRepository();
    sut = new CreateAddressUseCase(addressRepository);
  });

  it("should be able to create an address", async () => {
    const { address } = await sut.execute({
      city: "Cidade 1",
      state: "Estado 1",
      id: "ID-CIDADE-1",
    });

    expect(address).toEqual(
      expect.objectContaining({
        city: "Cidade 1",
        state: "Estado 1",
      }),
    );
  });

  it("should not be able to create an address with same city and state", async () => {
    addressRepository.create({
      city: "Cidade 1",
      state: "Estado 1",
      id: "ID-CIDADE-1",
    });

    await expect(() =>
      sut.execute({
        city: "Cidade 1",
        state: "Estado 1",
        id: "ID-CIDADE-1",
      }),
    ).rejects.toBeInstanceOf(ResourceAlreadyExists);
  });
});
