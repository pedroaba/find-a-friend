import { beforeEach, describe, expect, it } from "vitest";
import { CreateOrgUseCase } from "./create-org";
import { InMemoryOrgRepository } from "@/repositories/in-memory/in-memory-org-repository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

let orgRepository: InMemoryOrgRepository;
let sut: CreateOrgUseCase;

describe("Create Org Use Case", () => {
  beforeEach(() => {
    orgRepository = new InMemoryOrgRepository();
    sut = new CreateOrgUseCase(orgRepository);
  });

  it("it should be able to create an org", async () => {
    const { org } = await sut.execute({
      name: "JavaScript Org",
      password: "123456",
      address: "Cachoeira de Minas",
      phone_number: "9999999999",
    });

    expect(org.id).toEqual(expect.any(String));
    expect(org).toEqual(
      expect.objectContaining({
        address: "Cachoeira de Minas",
        name: "JavaScript Org",
      }),
    );
  });

  it("it should not be able to create an org with same name and address", async () => {
    await sut.execute({
      name: "JavaScript Org",
      password: "123456",
      address: "Cachoeira de Minas",
      phone_number: "9999999999",
    });

    await expect(() =>
      sut.execute({
        name: "JavaScript Org",
        password: "123456",
        address: "Cachoeira de Minas",
        phone_number: "9999999999",
      }),
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
