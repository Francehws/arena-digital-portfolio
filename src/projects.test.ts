import { describe, it, expect } from 'vitest';
import { nativeUrl } from './projects';
describe('URL di ingresso alle demo native', () => {
  it('consente HTTP soltanto per copie locali e HTTPS per demo pubbliche', () => {
    expect(nativeUrl('http://127.0.0.1:4181/demo/prova')).toBe(
      'http://127.0.0.1:4181/demo/prova',
    );
    expect(nativeUrl('https://demo.example.invalid/progetto')).toBe(
      'https://demo.example.invalid/progetto',
    );
    for (const value of [
      'http://127.0.0.1.example.invalid:4181/',
      'http://demo.example.invalid/',
      'https://utente:segreto@demo.example.invalid/',
      'javascript:alert(1)',
      'not a url',
      '',
    ])
      expect(nativeUrl(value)).toBe('');
  });
});
