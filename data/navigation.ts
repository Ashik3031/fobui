export interface NavItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'WORK', href: '#work' },
  { id: 'solutions', label: 'SOLUTIONS', href: '#capabilities' },
  { id: 'approach', label: 'APPROACH', href: '#approach' },
  { id: 'company', label: 'COMPANY', href: '#brand-statement' },
  { id: 'ideas', label: 'IDEAS', href: '#ideas' },
  { id: 'careers', label: 'CAREERS', href: '#contact' },
];

export const FOOTER_NAV_ITEMS: NavItem[] = [
  { id: 'work', label: 'WORK', href: '#work' },
  { id: 'solutions', label: 'SOLUTIONS', href: '#capabilities' },
  { id: 'approach', label: 'APPROACH', href: '#approach' },
  { id: 'company', label: 'COMPANY', href: '#brand-statement' },
  { id: 'ideas', label: 'IDEAS', href: '#ideas' },
  { id: 'careers', label: 'CAREERS', href: '#contact' },
  { id: 'contact', label: 'CONTACT', href: '#contact' },
];

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/fobmedia' },
  { label: 'LinkedIn', href: 'https://linkedin.com/company/fobmedia' },
  { label: 'Facebook', href: 'https://facebook.com/fobmedia' },
  { label: 'YouTube', href: 'https://youtube.com/@fobmedia' },
];
