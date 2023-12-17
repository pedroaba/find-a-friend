import { UserRepository } from "@/repositories/users-repository";
import { encryptPassword } from "@/utils/encrypt-password";
import { User } from "@prisma/client";
import { UserAlreadyExistsError } from "./errors/user-already-exists-error";

interface RegisterUseCaseRequest {
  name: string;
  email: string;
  password: string;
  address: string;
  phone_number: string;
  is_an_org: boolean | null;
}

interface RegisterUseCaseResponse {
  user: User;
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    name,
    password,
    address,
    phone_number,
    is_an_org = false,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const doesUserExists = await this.userRepository.findByEmail(email);

    if (doesUserExists) {
      throw new UserAlreadyExistsError();
    }

    const passwordHash = await encryptPassword(password);
    const user = await this.userRepository.create({
      email,
      name,
      password_hash: passwordHash,
      address,
      phone_number,
      is_an_org,
    });

    return {
      user,
    };
  }
}
