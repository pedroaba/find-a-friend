import { UserRepository } from "@/repositories/users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { RegisterUseCase } from "./register";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let userRepository: UserRepository;
let sut: RegisterUseCase;

describe("Register Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new RegisterUseCase(userRepository);
  });

  it("should be able to register", async () => {
    const { user } = await sut.execute({
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      password: "123456",
      address: "Cachoeira de Minas",
      phone_number: "9999999999999",
      is_an_org: false,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user).toEqual(
      expect.objectContaining({
        email: "jhondoe@example.com",
      }),
    );
  });

  it("should not be able to register with same e-mail", async () => {
    const email = "jhondoe@example.com";

    await sut.execute({
      name: "Jhon Doe",
      email,
      password: "123456",
      address: "Cachoeira de Minas",
      phone_number: "9999999999999",
      is_an_org: false,
    });

    await expect(() =>
      sut.execute({
        name: "Jhon Doe",
        email,
        password: "123456",
        address: "Cachoeira de Minas",
        phone_number: "9999999999999",
        is_an_org: false,
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });

  it("should be able to register as a org", async () => {
    const { user } = await sut.execute({
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      password: "123456",
      address: "Cachoeira de Minas",
      phone_number: "9999999999999",
      is_an_org: true,
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user).toEqual(
      expect.objectContaining({
        email: "jhondoe@example.com",
        is_an_org: true,
      }),
    );
  });
});
