export interface HashService {
  hash(str: string): Promise<string>
  compare(hash: string, text: string): Promise<boolean>
}