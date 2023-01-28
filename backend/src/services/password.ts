import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  // Hash a plaintext password using scrypt and return the hashed password as a string
  static async toHash(password: string) {
    // Generate a random salt
    const salt = randomBytes(8).toString("hex");
    // Hash the password using the salt
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;

    // Return the hashed password and salt concatenated as a single string
    return `${buf.toString("hex")}.${salt}`;
  }

  // Compare a plaintext password with a stored hashed password
  static async compare(storedPassword: string, suppliedPassword: string) {
    // Split the stored password string into hashed password and salt
    const [hashedPassword, salt] = storedPassword.split(".");
    // Hash the supplied password using the stored salt
    const buf = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;

    // Compare the stored hashed password with the newly hashed supplied password
    return buf.toString("hex") === hashedPassword;
  }
}
