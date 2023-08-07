import { HashComparer } from '@app/data/protocols/cryptography/hash-comparer';
import { Hasher } from '@app/data/protocols/cryptography/hasher';
import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';

@Injectable()
export class BcryptAdapter implements Hasher, HashComparer {
  private salt = 12;

  async hash(plaintext: string): Promise<string> {
    return hashSync(plaintext, this.salt);
  }

  async comparer(plaintext: string, digest: string): Promise<boolean> {
    return compareSync(plaintext, digest);
  }
}
