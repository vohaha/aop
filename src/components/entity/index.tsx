import React from 'react';
import cn from 'classnames';
import { Icon } from '../icons';
import './index.scss';

export enum EntityType {
  folder = 'folder',
  text = 'text',
  image = 'image',
}

export interface EntityData {
  type: EntityType;
  name: string;
  time: string;
  inner: EntityData[];
}

export interface EntityProps {
  data: EntityData;
  innerComponent: (props: EntityProps) => React.ReactChild;
}

export function Entity({
  children,
  className,
  data: { name, time, inner, type = EntityType.text },
  innerComponent,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  EntityProps) {
  return (
    <div className={cn('entity', className)} {...props}>
      <div className="entity__main">
        <Icon className="entity__hover">draggable</Icon>
        <div className="entity__info">
          <div className="entity__type">
            <Icon>{`doc-${type}`}</Icon>
          </div>
          <div className="entity__name">{name}</div>
          {inner.length ? (
            <div className="entity__folder-sign">
              <Icon>chevron-down</Icon>
            </div>
          ) : null}
        </div>
        <div className="entity__meta">
          <div className="entity__time">{time}</div>
          <div className="entity__menu">
            <Icon>vertical-hamburger</Icon>
          </div>
        </div>
      </div>
      {inner.length ? (
        <ul className="entity__inner">
          {inner.map((child) =>
            innerComponent({
              data: child,
              innerComponent,
            }),
          )}
        </ul>
      ) : null}
    </div>
  );
}
