import React, { useCallback, useRef, useState } from 'react';
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
  FilesTree,
  FilesTreeEntity,
  FilesTreeLeaf,
} from '../../components/files-tree';
import { FILES_TREE_TYPES, useFilesTree } from '../../hooks/use-files-tree';
import traverse from 'traverse';
import { v4 } from 'uuid';

const TREE: FilesTreeLeaf = {
  id: 'root',
  name: 'root',
  type: FILES_TREE_TYPES.folder,
  time: '',
  inner: [
    // {
    //   id: '8',
    //   name: 'evacuation plan',
    //   type: FILES_TREE_TYPES.folder,
    //   time: 'Dec 11, 2019',
    //   inner: [{
    //     id: '9',
    //     name: 'evacuation plan',
    //     type: FILES_TREE_TYPES.folder,
    //     time: 'Dec 11, 2019',
    //     inner: [{
    //       id: '8',
    //       name: 'evacuation plan',
    //       type: FILES_TREE_TYPES.file,
    //       time: 'Dec 11, 2019',
    //       inner: [],
    //     }],
    //   }],
    // }

    {
      id: '1',
      name: 'Floor plan',
      type: FILES_TREE_TYPES.folder,
      time: 'Nov 16, 2020',
      inner: [
        {
          id: '2',
          name: 'Floor 1',
          type: FILES_TREE_TYPES.folder,
          time: 'Nov 16, 2020',
          inner: [],
        },
        {
          id: '3',
          name: 'Floor 1 file',
          type: FILES_TREE_TYPES.file,
          time: 'Aug 23, 2020',
          inner: [],
        },
      ],
    },
    {
      id: '4',
      name: 'Manuals',
      type: FILES_TREE_TYPES.file,
      time: 'Aug 23, 2020',
      inner: [],
    },
    {
      id: '5',
      name: 'Home tips and more',
      type: FILES_TREE_TYPES.folder,
      time: 'Jul 17, 2020',
      inner: [],
    },
    {
      id: '6',
      name: 'Partners',
      type: FILES_TREE_TYPES.folder,
      time: 'Mar 05, 2020',
      inner: [],
    },
    {
      id: '7',
      name: 'internal contacts',
      type: FILES_TREE_TYPES.file,
      time: 'Dec 12, 2019',
      inner: [],
    },
    {
      id: '8',
      name: 'evacuation plan',
      type: FILES_TREE_TYPES.file,
      time: 'Dec 11, 2019',
      inner: [],
    },
  ],
};

export interface PracticalProps {}

function useNewFolder() {
  const defaultFolderValue = '';
  const { tree, setTree } = useFilesTree();
  const inputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(defaultFolderValue);
  const onNameChange = useCallback((e) => {
    setName(e.target.value);
  }, []);
  const onCreate = useCallback(() => {
    const clonedTree = traverse.clone(tree);
    clonedTree.inner.push({
      id: v4(),
      name: name,
      type: FILES_TREE_TYPES.folder,
      time: `${Date.now()}`,
      inner: [],
    });
    setTree(clonedTree);
    setName(defaultFolderValue);
  }, [name, setTree, tree]);
  const onFormOpen = useCallback(() => {
    inputRef.current?.focus();
  }, []);
  return {
    onNameChange,
    onCreate,
    name,
    inputRef,
    onFormOpen,
  };
}

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
  const newFolder = useNewFolder();
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
          <div className="practical__content">
            <FilesTree
              className="practical__list"
              tree={TREE}
              itemRenderer={(leaf, tree, setTree) => (
                <FilesTreeEntity leaf={leaf} tree={tree} setTree={setTree} />
              )}
            />
          </div>
        </div>
        <ModalTarget onOpen={newFolder.onFormOpen}>
          <Prompt
            id="newFolderForm"
            resolveText="Create"
            title="Create Folder"
            resolveCb={newFolder.onCreate}>
            <Input
              ref={newFolder.inputRef}
              placeholder="Enter folder name"
              label="Name"
              value={newFolder.name}
              onChange={newFolder.onNameChange}
              fullwidth
            />
          </Prompt>
        </ModalTarget>
      </Page>
    </Modal.Modal>
  );
}
