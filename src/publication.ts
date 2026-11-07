/** Validazione sintattica: l'accessibilità esterna va verificata dopo il deploy. */
export function isPublicHttpsUrl(value: string): boolean {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    if (host.endsWith('.')) return false;
    if (url.protocol !== 'https:' || url.username || url.password) return false;
    if (
      !host.includes('.') ||
      host.includes(':') ||
      /^\d+(?:\.\d+){3}$/.test(host)
    )
      return false;
    return ![
      'localhost',
      'local',
      'internal',
      'invalid',
      'test',
      'example',
    ].some((suffix) => host === suffix || host.endsWith(`.${suffix}`));
  } catch {
    return false;
  }
}
