export class IsNotAOrgError extends Error {
  constructor() {
    super("User is not a org.");
  }
}
