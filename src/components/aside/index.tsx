import React from 'react';
import cn from 'classnames';
import './index.css';
import { Logo } from '../logo';
import { Menu } from '../menu';

const MAIN_MENU = [
  {
    text: 'Dashboard',
    to: '/',
  },
  {
    text: 'Community management',
    to: '1',
    child: {
      text: '> Community management',
      to: '2',
    },
  },
  {
    text: 'Message feed',
    to: '3',
  },
  {
    text: 'Notification overview',
    to: '4',
  },
  {
    text: 'Events',
    to: '5',
  },
  {
    text: 'Survey & Poll',
    to: '6',
  },
  {
    text: 'Practical & More',
    to: 'practical',
  },
  {
    text: 'User management',
    to: '7',
    child: {
      text: '> User management',
      to: '8',
    },
  },
  {
    text: 'Management',
    to: '9',
    child: {
      text: '> Management',
      to: '10',
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
