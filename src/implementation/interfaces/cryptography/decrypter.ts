export interface Decrypter {
  decrypt(value: string): Promise<any>
}
