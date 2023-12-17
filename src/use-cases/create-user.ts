import { UserRepository } from "@/repositories/users-repository";
import { encryptPassword } from "@/utils/encrypt-password";
import { User } from "@prisma/client";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
}

interface CreateUserUseCaseResponse {
  user: User;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    name,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const doesUserExists = await this.userRepository.findByEmail(email);

    if (doesUserExists) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await encryptPassword(password);
    const user = await this.userRepository.create({
      email,
      name,
      password_hash: passwordHash,
    });

    return {
      user,
    };
  }
}
