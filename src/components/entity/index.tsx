import React from 'react';
import cn from 'classnames';
import { Icon } from '../icons';
import './index.scss';

export enum EntityType {
  folder = 'folder',
  text = 'text',
  image = 'image',
}

export interface EntityProps {
  type: EntityType;
  name: string;
  time: string;
}

export function Entity({
  children,
  className,
  name,
  time,
  type = EntityType.text,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  EntityProps) {
  return (
    <div className={cn('entity', className)} {...props}>
      <Icon className="entity__hover">draggable</Icon>
      <div className="entity__info">
        <div className="entity__type">
          <Icon>{`doc-${type}`}</Icon>
        </div>
        <div className="entity__name">{name}</div>
        <div className="entity__folder-sign">
          <Icon>chevron-down</Icon>
        </div>
      </div>
      <div className="entity__meta">
        <div className="entity__time">{time}</div>
        <div className="entity__menu">
          <Icon>vertical-hamburger</Icon>
        </div>
      </div>
    </div>
  );
}
