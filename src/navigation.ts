import { getPermalink, getBlogPermalink } from './utils/permalinks';
import { getLangFromUrl, translatePath } from '~/i18n/utils';
import { t, type Lang } from '~/i18n/ui';

const serviceLinkHrefs = {
  plcProgramming: getPermalink('/services/plc-programming'),
  hmiScada: getPermalink('/services/hmi-scada'),
  webHmi: getPermalink('/services/web-hmi'),
  iiotCloud: getPermalink('/services/iiot-cloud'),
  controlPanel: getPermalink('/services/control-panel-design'),
} as const;

const serviceLinkTexts: Record<Lang, Record<keyof typeof serviceLinkHrefs, string>> = {
  en: {
    plcProgramming: 'PLC Programming & Industrial Control',
    hmiScada: 'HMI & SCADA Development',
    webHmi: 'Web HMI & Remote Dashboards',
    iiotCloud: 'IIoT & Cloud Integration',
    controlPanel: 'Control Panel & Electrical Design',
  },
  es: {
    plcProgramming: 'Programación PLC & Control Industrial',
    hmiScada: 'Desarrollo de HMI & SCADA',
    webHmi: 'Web HMI & Dashboards Remotos',
    iiotCloud: 'IIoT & Integración en la Nube',
    controlPanel: 'Diseño de Tableros & Control Eléctrico',
  },
};

const skillTexts: Record<Lang, string[]> = {
  en: ['Industrial Automation', 'Edge & Cloud Integration', 'SCADA & OT Data', 'Bilingual Collaboration'],
  es: ['Automatización Industrial', 'Integración Edge & Nube', 'SCADA & Datos OT', 'Colaboración Bilingüe'],
};

export const headerData = (url?: URL) => {
  const lang = url ? (getLangFromUrl(url) as Lang) : ('en' as Lang);
  return {
    links: [
      {
        text: t(lang, 'home'),
        href: translatePath(getPermalink('/'), lang),
      },
      {
        text: t(lang, 'about'),
        href: translatePath(getPermalink('/about'), lang),
      },
      {
        text: t(lang, 'services'),
        href: translatePath(getPermalink('/services'), lang),
      },
      {
        text: t(lang, 'portfolio'),
        href: translatePath(getPermalink('/portfolio'), lang),
      },
      {
        text: t(lang, 'blog'),
        href: translatePath(getBlogPermalink(), lang),
      },
      {
        text: t(lang, 'contact'),
        href: translatePath(getPermalink('/contact'), lang),
      },
    ],
    actions: [{ text: t(lang, 'hire_me'), href: translatePath(getPermalink('/contact'), lang), target: '_self' }],
  };
};

export const footerData = (url?: URL) => {
  const lang = url ? (getLangFromUrl(url) as Lang) : ('en' as Lang);
  return {
    links: [
      {
        title: t(lang, 'services_title'),
        links: (Object.entries(serviceLinkHrefs) as Array<
          [keyof typeof serviceLinkHrefs, (typeof serviceLinkHrefs)[keyof typeof serviceLinkHrefs]]
        >).map(([key, href]) => ({
          text: serviceLinkTexts[lang][key],
          href: translatePath(href, lang),
        })),
      },
      {
        title: t(lang, 'skills_title'),
        links: skillTexts[lang].map((text) => ({
          text,
          href: translatePath(getPermalink('/#skills'), lang),
        })),
      },
      {
        title: t(lang, 'quick_links_title'),
        links: [
          { text: t(lang, 'about'), href: translatePath(getPermalink('/about'), lang) },
          { text: t(lang, 'portfolio'), href: translatePath(getPermalink('/portfolio'), lang) },
          { text: t(lang, 'blog'), href: translatePath(getBlogPermalink(), lang) },
          { text: t(lang, 'contact'), href: translatePath(getPermalink('/contact'), lang) },
        ],
      },
    ],
    secondaryLinks: [
      { text: t(lang, 'terms'), href: translatePath(getPermalink('/terms'), lang) },
      { text: t(lang, 'privacy'), href: translatePath(getPermalink('/privacy'), lang) },
    ],
    socialLinks: [
    {
      ariaLabel: 'LinkedIn',
      icon: 'tabler:brand-linkedin',
      href: 'https://www.linkedin.com/in/eduardojv/',
      target: '_blank',
    },
      { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/eduardojvieira', target: '_blank' },
    {
      ariaLabel: 'Upwork',
      icon: 'tabler:brand-upwork',
      href: 'https://www.upwork.com/freelancers/eduardojv',
      target: '_blank',
    },
    ],
    footNote: `${new Date().getFullYear()} Eduardo Vieira. ${t(lang, 'footnote_rights')}`,
  };
};
