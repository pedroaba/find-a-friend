import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      ...data,
    };

    this.items.push(user);
    return user;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
