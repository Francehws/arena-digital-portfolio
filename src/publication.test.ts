import { describe, it, expect } from 'vitest';
import { isPublicHttpsUrl } from './publication';
describe('blocco degli indirizzi privati nella build pubblica', () => {
  it('accetta HTTPS pubblico e rifiuta credenziali, localhost, IP e domini di prova', () => {
    expect(isPublicHttpsUrl('https://github.com/Francehws')).toBe(true);
    for (const value of [
      'http://github.com/Francehws',
      'https://user:secret@github.com/',
      'https://127.0.0.1:4181/',
      'https://[::1]/',
      'https://10.1.2.3/',
      'https://demo.localhost/',
      'https://localhost./',
      'https://salone.local./',
      'https://demo.internal/',
      'https://demo.example.invalid/',
      'https://demo.test/',
      'https://demo.example/',
      'not a url',
    ])
      expect(isPublicHttpsUrl(value), value).toBe(false);
  });
});
