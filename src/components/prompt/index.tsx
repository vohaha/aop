import React from 'react';
import cn from 'classnames';
import { Button } from '../button';
import * as Modal from '@accessible/modal';
import './index.scss';

export interface PromptProps {
  title: string;
  rejectText?: string;
  resolveText?: string;
  resolveCb?: () => void;
}

export function Prompt({
  children,
  className,
  rejectText = 'Cancel',
  resolveText = 'Ok',
  resolveCb = () => {},
  title,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  PromptProps) {
  return (
    <section className={cn('prompt', className)} {...props}>
      <header className="prompt__header">
        <h2 className="prompt__title">{title}</h2>
      </header>
      <div className="prompt__body">{children}</div>
      <footer className="prompt__footer">
        <Modal.CloseButton>
          <Button className="prompt__reject">{rejectText}</Button>
        </Modal.CloseButton>
        <Button className="prompt__resolve button--primary" onClick={resolveCb}>
          {resolveText}
        </Button>
      </footer>
    </section>
  );
}
