import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { RouteComponentProps } from '@reach/router';
import { Page } from '../../components/page';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import './index.scss';

export interface PracticalProps {}

export function Practical({
  children,
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  RouteComponentProps &
  PracticalProps) {
  const [value, setValue] = useState('');
  const onChangeCb = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return (
    <Page className={cn('practical', className)}>
      <header className="practical__header">
        <div className="practical__search">
          <Input
            fullwidth
            icon="search"
            placeholder="Search document"
            onChange={onChangeCb}
            value={value}
          />
        </div>
        <div className="practical__controls">
          <div className="practical__control-1">
            <Button fullwidth className="button--primary">
              Create folder
            </Button>
          </div>
          <div className="practical__control-2">
            <Button fullwidth className="button--primary">
              Upload file
            </Button>
          </div>
        </div>
      </header>
    </Page>
  );
}
