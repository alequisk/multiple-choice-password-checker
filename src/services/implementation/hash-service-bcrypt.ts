import { HashService } from "../hash-service";
import bcrypt from 'bcrypt'

export class HashServiceBcrypt implements HashService {
  async hash(str: string): Promise<string> {
    const hashedStr = await bcrypt.hash(str, 2)
    return hashedStr
  }
  async compare(hash: string, text: string): Promise<boolean> {
    return await bcrypt.compare(text, hash)
  }
}