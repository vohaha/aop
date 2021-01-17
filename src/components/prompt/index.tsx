import React, { useCallback } from 'react';
import cn from 'classnames';
import { Button } from '../button';
import * as Modal from '@accessible/modal';
import './index.scss';
import { useModal } from '@accessible/modal';

export interface PromptProps {
  id: string;
  title: string;
  rejectText?: string;
  resolveText?: string;
  resolveCb?: () => void;
}

export function Prompt({
  children,
  className,
  id,
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
  const { close } = useModal();
  const submitCb = useCallback(
    (e) => {
      e.preventDefault();
      resolveCb();
      close();
    },
    [close, resolveCb],
  );
  return (
    <section className={cn('prompt', className)} {...props}>
      <header className="prompt__header">
        <h2 className="prompt__title">{title}</h2>
      </header>
      <form id={id} onSubmit={submitCb} className="prompt__body">
        {children}
      </form>
      <footer className="prompt__footer">
        <Modal.CloseButton>
          <Button className="prompt__reject">{rejectText}</Button>
        </Modal.CloseButton>
        <Button
          form={id}
          type="submit"
          className="prompt__resolve button--primary">
          {resolveText}
        </Button>
      </footer>
    </section>
  );
}
