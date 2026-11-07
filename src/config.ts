const env = import.meta.env;
const email = env.VITE_CONTACT_EMAIL?.trim() || '';
const phone = env.VITE_WHATSAPP_NUMBER?.trim() || '393517324068';
export const social = (value: string | undefined, hostname: string) => {
  if (!value) return '';
  try {
    const url = new URL(value);
    return url.protocol === 'https:' &&
      !url.username &&
      !url.password &&
      !url.port &&
      (url.hostname === hostname || url.hostname === `www.${hostname}`)
      ? url.href
      : '';
  } catch {
    return '';
  }
};
export const config = {
  brand: 'Arena Digital',
  name: 'Francesco',
  github: 'https://github.com/Francehws',
  email: /^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(email) ? email : '',
  whatsapp: /^[1-9]\d{7,14}$/.test(phone) ? `https://wa.me/${phone}` : '',
  linkedin: social(env.VITE_LINKEDIN_URL, 'linkedin.com'),
  instagram: social(
    env.VITE_INSTAGRAM_URL?.trim() ||
      'https://www.instagram.com/arenafrancescovito02/',
    'instagram.com',
  ),
};
export const href = (path = '/') =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
export const currentPath = () => {
  if (typeof window === 'undefined') return '/';
  const base = import.meta.env.BASE_URL;
  const path = window.location.pathname;
  return (
    (
      '/' +
      (path.startsWith(base)
        ? path.slice(base.length)
        : path.replace(/^\//, ''))
    ).replace(/\/$/, '') || '/'
  );
};
