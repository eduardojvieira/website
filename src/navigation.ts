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
          text: 'Embedded Systems Development',
          href: getPermalink('/services/embedded-systems'),
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
        { text: 'Embedded Systems Development', href: getPermalink('/services/embedded-systems') },
        { text: 'Raspberry Pi Development', href: getPermalink('/services/raspberry-pi') },
        { text: 'Web-Based HMI', href: getPermalink('/services/web-hmi') },
        { text: 'Mechanical Engineering', href: getPermalink('/services/mechanical-engineering') },
      ],
    },
    {
      title: 'Skills',
      links: [
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
    { ariaLabel: 'LinkedIn', icon: 'tabler:brand-linkedin', href: 'https://www.linkedin.com/in/eduardojv/', target: '_blank' },
    { ariaLabel: 'GitHub', icon: 'tabler:brand-github', href: 'https://github.com/eduardojvieira', target: '_blank' },
    { ariaLabel: 'Upwork', icon: 'tabler:brand-upwork', href: 'https://www.upwork.com/freelancers/eduardojv', target: '_blank' },
  ],
  footNote: `
    ${new Date().getFullYear()} Eduardo Vieira. All rights reserved.
  `,
};
