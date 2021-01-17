import React from 'react';
import cn from 'classnames';
import { Logo } from '../logo';
import { Menu } from '../menu';
import './index.scss';

const MAIN_MENU = [
  {
    text: 'Dashboard',
    to: '/aop',
  },
  {
    text: 'Community management',
    to: '/aop/1',
    child: {
      text: '> Community management',
      to: '/aop/2',
    },
  },
  {
    text: 'Message feed',
    to: '/aop/3',
  },
  {
    text: 'Notification overview',
    to: '/aop/4',
  },
  {
    text: 'Events',
    to: '/aop/5',
  },
  {
    text: 'Survey & Poll',
    to: '/aop/6',
  },
  {
    text: 'Practical & More',
    to: '/aop/practical',
  },
  {
    text: 'User management',
    to: '/aop/7',
    child: {
      text: '> User management',
      to: '/aop/8',
    },
  },
  {
    text: 'Management',
    to: '/aop/9',
    child: {
      text: '> Management',
      to: '/aop/10',
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
