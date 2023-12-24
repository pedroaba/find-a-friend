import { hash } from 'bcryptjs'

export async function encryptPassword(password: string): Promise<string> {
  const SALT_TO_HASH_PASSWORD = 6

  return hash(password, SALT_TO_HASH_PASSWORD)
}
