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
      links: [
        {
          text: 'Industrial Automation',
          href: getPermalink('/services/industrial-automation'),
        },
        {
          text: 'Raspberry Pi Development',
          href: getPermalink('/services/raspberry-pi'),
        },
        {
          text: 'Web-Based HMI',
          href: getPermalink('/services/web-hmi'),
        },
        {
          text: 'Mechanical Engineering',
          href: getPermalink('/services/mechanical-engineering'),
        },
      ],
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
        { text: 'Industrial Automation', href: getPermalink('/services/industrial-automation') },
        { text: 'Raspberry Pi Development', href: getPermalink('/services/raspberry-pi') },
        { text: 'Web-Based HMI', href: getPermalink('/services/web-hmi') },
        { text: 'Mechanical Engineering', href: getPermalink('/services/mechanical-engineering') },
      ],
    },
    {
      title: 'Skills',
      links: [
        { text: 'PLC Programming', href: getPermalink('/skills/plc') },
        { text: 'Node.js', href: getPermalink('/skills/nodejs') },
        { text: 'Angular', href: getPermalink('/skills/angular') },
        { text: 'Python', href: getPermalink('/skills/python') },
        { text: 'SolidWorks', href: getPermalink('/skills/solidworks') },
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
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: '#' },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: '#' },
    { ariaLabel: 'Upwork', icon: 'tabler:brand-upwork', href: 'https://www.upwork.com/freelancers/~01a2a7536c4c8543b5' },
  ],
  footNote: `
    © ${new Date().getFullYear()} Eduardo Vieira. All rights reserved.
  `,
};
