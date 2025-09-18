import type { Lang } from './ui';
import { defaultLang, languages } from './ui';
import { BLOG_BASE, CATEGORY_BASE, TAG_BASE } from '~/utils/permalinks';

function isLocalizablePath(pathname: string): boolean {
  const localizableRoots = [
    '/',
    '/about',
    '/services',
    '/portfolio',
    '/contact',
    '/pricing',
    '/privacy',
    '/terms',
  ];

  if (BLOG_BASE) {
    localizableRoots.push(`/${BLOG_BASE}`);
  }
  if (CATEGORY_BASE) {
    localizableRoots.push(`/${CATEGORY_BASE}`);
  }
  if (TAG_BASE) {
    localizableRoots.push(`/${TAG_BASE}`);
  }

  if (pathname === '/') return true;

  // Strip any trailing slash for comparison
  const clean = pathname.replace(/\/$/, '');
  return (
    localizableRoots.includes(clean) ||
    clean.startsWith('/services/') ||
    clean.startsWith('/landing/') ||
    clean.startsWith('/homes/') ||
    (BLOG_BASE ? clean.startsWith(`/${BLOG_BASE}/`) : false) ||
    (CATEGORY_BASE ? clean.startsWith(`/${CATEGORY_BASE}/`) : false) ||
    (TAG_BASE ? clean.startsWith(`/${TAG_BASE}/`) : false)
  );
}

export function getLangFromUrl(url: URL): Lang {
  const [, maybeLang] = url.pathname.split('/');
  if (maybeLang && Object.keys(languages).includes(maybeLang)) {
    return maybeLang as Lang;
  }
  return defaultLang;
}

export function removeLangFromPathname(pathname: string): string {
  const parts = pathname.split('/');
  const maybeLang = parts[1];
  if (maybeLang && Object.keys(languages).includes(maybeLang)) {
    return '/' + parts.slice(2).join('/');
  }
  return pathname;
}

export function translatePath(path: string, targetLang: Lang): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (!isLocalizablePath(clean)) return clean;
  // Avoid adding a trailing slash for the site root when prefixing a locale.
  if (clean === '/') {
    return targetLang === defaultLang ? clean : `/${targetLang}`;
  }
  return targetLang === defaultLang ? clean : `/${targetLang}${clean}`;
}

export function useTranslatedPath(currentUrl: URL) {
  const currentLang = getLangFromUrl(currentUrl);
  const basePath = removeLangFromPathname(currentUrl.pathname) || '/';
  return function to(lang: Lang) {
    return translatePath(basePath, lang);
  };
}


