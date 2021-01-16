import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { RouteComponentProps } from '@reach/router';
import { Page } from '../../components/page';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import { Entity, EntityType } from '../../components/entity';
import * as Modal from '@accessible/modal';
import { Prompt } from '../../components/prompt';
import { ModalTarget } from '../../components/modal';
import './index.scss';

const ENTITIES = [
  {
    name: 'Floor plan',
    type: EntityType.folder,
    time: 'Nov 16, 2020',
    children: [],
  },
  {
    name: 'Manuals',
    type: EntityType.folder,
    time: 'Aug 23, 2020',
    children: [],
  },
  {
    name: 'Home tips and more',
    type: EntityType.folder,
    time: 'Jul 17, 2020',
    children: [],
  },
  {
    name: 'Partners',
    type: EntityType.folder,
    time: 'Mar 05, 2020',
    children: [],
  },
  {
    name: 'internal contacts',
    type: EntityType.text,
    time: 'Dec 12, 2019',
    children: [],
  },
  {
    name: 'evacuation plan',
    type: EntityType.image,
    time: 'Dec 11, 2019',
    children: [],
  },
];

export interface PracticalProps {}

export function Practical({
  className,
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
  const [treeData, setTreeData] = useState<any>([
    { title: 'Chicken', children: [{ title: 'Egg' }] },
    { title: 'Fish', children: [{ title: 'fingerline' }] },
  ]);
  const treDataOnChange = useCallback((treeData) => setTreeData(treeData), []);
  return (
    <Modal.Modal>
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
              <Modal.Trigger>
                <Button fullwidth className="button--primary">
                  Create folder
                </Button>
              </Modal.Trigger>
            </div>
            <div className="practical__control-2">
              <Button fullwidth className="button--primary">
                Upload file
              </Button>
            </div>
          </div>
        </header>
        <div className="practical__body">
          <ul className="practical__list">
            {ENTITIES.map((entity) => (
              <li key={entity.name + entity.time}>
                <Entity {...entity} />
              </li>
            ))}
          </ul>
        </div>
        <ModalTarget>
          <Prompt resolveText="Create" title="Create Folder">
            <Input placeholder="Enter folder name" label="Name" fullwidth />
          </Prompt>
        </ModalTarget>
      </Page>
    </Modal.Modal>
  );
}
