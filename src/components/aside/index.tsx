import React from 'react';
import cn from 'classnames';
import './index.css';
import { Logo } from '../logo';
import { Menu } from '../menu';

const to = '/';
const MAIN_MENU = [
  {
    text: 'Dashboard',
    to,
  },
  {
    text: 'Community management',
    to,
    child: {
      text: '> Community management',
      to,
    },
  },
  {
    text: 'Message feed',
    to,
  },
  {
    text: 'Notification overview',
    to,
  },
  {
    text: 'Events',
    to,
  },
  {
    text: 'Survey & Poll',
    to,
  },
  {
    text: 'Practical & More',
    to: 'practical',
  },
  {
    text: 'User management',
    to,
    child: {
      text: '> User management',
      to,
    },
  },
  {
    text: 'Management',
    to,
    child: {
      text: '> Management',
      to,
    },
  },
];

export interface AsideProps {}

export function Aside({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  AsideProps) {
  return (
    <aside className={cn('aside', className)} {...props}>
      <div className="aside__logo">
        <Logo size={166} />
      </div>
      <div className="aside__menu">
        <Menu list={MAIN_MENU} />
      </div>
    </aside>
  );
}
