import { getPermalink, getBlogPermalink } from './utils/permalinks';
import { getLangFromUrl, translatePath } from '~/i18n/utils';
import { t, type Lang } from '~/i18n/ui';

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
        href: getBlogPermalink(),
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
        links: [
          { text: 'PLC Programming & Industrial Control', href: getPermalink('/services/plc-programming') },
          { text: 'HMI & SCADA Development', href: getPermalink('/services/hmi-scada') },
          { text: 'Web HMI & Remote Dashboards', href: getPermalink('/services/web-hmi') },
          { text: 'IIoT & Cloud Integration', href: getPermalink('/services/iiot-cloud') },
          { text: 'Control Panel & Electrical Design', href: getPermalink('/services/control-panel-design') },
        ],
      },
      {
        title: t(lang, 'skills_title'),
        links: [
          { text: 'Industrial Automation', href: translatePath(getPermalink('/#skills'), lang) },
          { text: 'Edge & Cloud Integration', href: translatePath(getPermalink('/#skills'), lang) },
          { text: 'SCADA & OT Data', href: translatePath(getPermalink('/#skills'), lang) },
          { text: 'Bilingual Collaboration', href: translatePath(getPermalink('/#skills'), lang) },
        ],
      },
      {
        title: t(lang, 'quick_links_title'),
        links: [
          { text: t(lang, 'about'), href: translatePath(getPermalink('/about'), lang) },
          { text: t(lang, 'portfolio'), href: translatePath(getPermalink('/portfolio'), lang) },
          { text: t(lang, 'blog'), href: getBlogPermalink() },
          { text: t(lang, 'contact'), href: translatePath(getPermalink('/contact'), lang) },
        ],
      },
    ],
    secondaryLinks: [
      { text: t(lang, 'terms'), href: getPermalink('/terms') },
      { text: t(lang, 'privacy'), href: getPermalink('/privacy') },
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
    footNote: `
      ${new Date().getFullYear()} Eduardo Vieira. All rights reserved.
    `,
  };
};
