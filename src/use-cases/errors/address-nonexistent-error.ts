export class AddressNonExistentError extends Error {
  constructor() {
    super("Address does not exists");
  }
}
