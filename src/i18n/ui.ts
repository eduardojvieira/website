export type Lang = 'en' | 'es' | 'pt';

export const languages: Record<Lang, string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
};

export const defaultLang: Lang = 'en';

// UI strings used across navigation/footer and common widgets
export const ui: Record<Lang, Record<string, string>> = {
  en: {
    home: 'Home',
    about: 'About',
    services: 'Services',
    portfolio: 'Portfolio',
    blog: 'Blog',
    contact: 'Contact',
    hire_me: 'Hire Me',
    services_title: 'Services',
    skills_title: 'Skills',
    quick_links_title: 'Quick Links',
    terms: 'Terms',
    privacy: 'Privacy Policy',
    language: 'Language',
  },
  es: {
    home: 'Inicio',
    about: 'Sobre mí',
    services: 'Servicios',
    portfolio: 'Portafolio',
    blog: 'Blog',
    contact: 'Contacto',
    hire_me: 'Contrátame',
    services_title: 'Servicios',
    skills_title: 'Habilidades',
    quick_links_title: 'Enlaces',
    terms: 'Términos',
    privacy: 'Privacidad',
    language: 'Idioma',
  },
  pt: {
    home: 'Início',
    about: 'Sobre',
    services: 'Serviços',
    portfolio: 'Portfólio',
    blog: 'Blog',
    contact: 'Contato',
    hire_me: 'Contrate-me',
    services_title: 'Serviços',
    skills_title: 'Habilidades',
    quick_links_title: 'Links',
    terms: 'Termos',
    privacy: 'Privacidade',
    language: 'Idioma',
  },
};

export function t(lang: Lang, key: string): string {
  return ui[lang]?.[key] ?? ui[defaultLang][key] ?? key;
}



