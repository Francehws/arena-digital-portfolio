import { describe, it, expect } from 'vitest';
import { social } from './config';
describe('recapiti social pubblicabili', () => {
  it('accetta soltanto il dominio HTTPS configurato senza credenziali o porte', () => {
    expect(social('https://www.linkedin.com/in/demo', 'linkedin.com')).toBe(
      'https://www.linkedin.com/in/demo',
    );
    for (const input of [
      'https://utente:segreto@example.invalid/',
      'https://utente:segreto@linkedin.com/in/demo',
      'https://linkedin.com:8443/in/demo',
      'javascript:alert(1)',
      'https://linkedin.com.example.invalid/in/demo',
    ])
      expect(social(input, 'linkedin.com')).toBe('');
  });
});
