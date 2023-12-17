import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUserRepository implements UserRepository {
  public items: User[] = [];

  async create(data: Prisma.UserCreateInput) {
    const user: User = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      address: data.address,
      phone_number: data.phone_number,
      password_hash: data.password_hash,
      is_an_org: data.is_an_org ?? false,
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

  async findById(id: string) {
    const user = this.items.find((item) => item.id === id);

    if (!user) {
      return null;
    }

    return user;
  }
}
