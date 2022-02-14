import crypto from "crypto";

class UUIDGenerator {
  generate(): string {
    return crypto.randomUUID();
  }
}

export default new UUIDGenerator();
