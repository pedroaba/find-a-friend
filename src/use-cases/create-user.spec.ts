import { UserRepository } from "@/repositories/users-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserUseCase } from "./create-user";
import { InMemoryUserRepository } from "@/repositories/in-memory/in-memory-user-repository";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

let userRepository: UserRepository;
let sut: CreateUserUseCase;

describe("Create User Use Case", () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    sut = new CreateUserUseCase(userRepository);
  });

  it("it should be able to create an user", async () => {
    const { user } = await sut.execute({
      name: "Jhon Doe",
      email: "jhondoe@example.com",
      password: "123456",
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user).toEqual(
      expect.objectContaining({
        email: "jhondoe@example.com",
      }),
    );
  });

  it("it should not be able to create an user with same e-mail", async () => {
    const email = "jhondoe@example.com";

    await sut.execute({
      name: "Jhon Doe",
      email,
      password: "123456",
    });

    await expect(() =>
      sut.execute({
        name: "Jhon Doe",
        email,
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError);
  });
});
