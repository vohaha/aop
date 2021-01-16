import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { RouteComponentProps } from '@reach/router';
import { Page } from '../../components/page';
import { Input } from '../../components/input';
import { Button } from '../../components/button';
import * as Modal from '@accessible/modal';
import { Prompt } from '../../components/prompt';
import { ModalTarget } from '../../components/modal';
import './index.scss';
import {
  FILES_TREE_TYPES,
  FilesTree,
  FilesTreeEntity,
  FilesTreeLeaf,
} from '../../components/files-tree';

const TREE: FilesTreeLeaf[] = [
  {
    name: 'Floor plan',
    type: FILES_TREE_TYPES.folder,
    time: 'Nov 16, 2020',
    inner: [
      {
        name: 'Floor 1',
        type: FILES_TREE_TYPES.file,
        time: 'Nov 16, 2020',
        inner: [],
      },
    ],
  },
  {
    name: 'Manuals',
    type: FILES_TREE_TYPES.file,
    time: 'Aug 23, 2020',
    inner: [],
  },
  {
    name: 'Home tips and more',
    type: FILES_TREE_TYPES.folder,
    time: 'Jul 17, 2020',
    inner: [],
  },
  {
    name: 'Partners',
    type: FILES_TREE_TYPES.folder,
    time: 'Mar 05, 2020',
    inner: [],
  },
  {
    name: 'internal contacts',
    type: FILES_TREE_TYPES.file,
    time: 'Dec 12, 2019',
    inner: [],
  },
  {
    name: 'evacuation plan',
    type: FILES_TREE_TYPES.file,
    time: 'Dec 11, 2019',
    inner: [],
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
          <FilesTree
            tree={TREE}
            itemRenderer={(leaf) => <FilesTreeEntity leaf={leaf} />}
          />
          {/*<ul className="practical__list">*/}
          {/*  {TREE.map((entity) => (*/}
          {/*    <FilesTreePlot key={entity.name + entity.time} tag="li">*/}
          {/*      <FilesTreeItem type={FILES_TREE_TYPES.file}>*/}
          {/*        <Entity {...entity} />*/}
          {/*      </FilesTreeItem>*/}
          {/*    </FilesTreePlot>*/}
          {/*  ))}*/}
          {/*</ul>*/}
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
