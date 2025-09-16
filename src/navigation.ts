import { getPermalink, getBlogPermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Home',
      href: getPermalink('/'),
    },
    {
      text: 'About',
      href: getPermalink('/about'),
    },
    {
      text: 'Services',
      href: getPermalink('/services'),
    },
    {
      text: 'Portfolio',
      href: getPermalink('/portfolio'),
    },
    {
      text: 'Blog',
      href: getBlogPermalink(),
    },
    {
      text: 'Contact',
      href: getPermalink('/contact'),
    },
  ],
  actions: [{ text: 'Hire Me', href: getPermalink('/contact'), target: '_self' }],
};

export const footerData = {
  links: [
    {
      title: 'Services',
      links: [
        { text: 'PLC Programming & Industrial Control', href: getPermalink('/services/plc-programming') },
        { text: 'HMI & SCADA Development', href: getPermalink('/services/hmi-scada') },
        { text: 'Web HMI & Remote Dashboards', href: getPermalink('/services/web-hmi') },
        { text: 'IIoT & Cloud Integration', href: getPermalink('/services/iiot-cloud') },
        { text: 'Control Panel & Electrical Design', href: getPermalink('/services/control-panel-design') },
      ],
    },
    {
      title: 'Skills',
      links: [
        { text: 'Industrial Automation', href: getPermalink('/#skills') },
        { text: 'Edge & Cloud Integration', href: getPermalink('/#skills') },
        { text: 'SCADA & OT Data', href: getPermalink('/#skills') },
        { text: 'Bilingual Collaboration', href: getPermalink('/#skills') },
      ],
    },
    {
      title: 'Quick Links',
      links: [
        { text: 'About', href: getPermalink('/about') },
        { text: 'Portfolio', href: getPermalink('/portfolio') },
        { text: 'Blog', href: getBlogPermalink() },
        { text: 'Contact', href: getPermalink('/contact') },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getPermalink('/terms') },
    { text: 'Privacy Policy', href: getPermalink('/privacy') },
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
