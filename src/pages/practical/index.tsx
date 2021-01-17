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
              <Modal.Trigger>
                <Button fullwidth className="button--primary">
                  Upload file
                </Button>
              </Modal.Trigger>
            </div>
          </div>
        </header>
        <div className="practical__body">
          <div style={{ height: '100%' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit
            labore nam natus veritatis voluptatum. Ipsum labore neque odit rem
            vero voluptate, voluptates! Assumenda repudiandae, veritatis.
            Deleniti dicta explicabo ipsa necessitatibus quos? Amet aperiam
            architecto cupiditate dignissimos doloribus, eligendi, esse
            exercitationem facilis illo in laboriosam laborum magnam
            necessitatibus nisi odio officia officiis provident quo
            reprehenderit, similique suscipit totam vero vitae voluptate
            voluptatibus! Accusantium amet aperiam, asperiores atque blanditiis
            consectetur dolore dolorum error est facere facilis iure laboriosam
            magnam magni minima nam nisi officiis quam repudiandae similique
            suscipit tempore unde ut? Debitis deserunt doloribus enim expedita
            hic impedit incidunt ipsa itaque laborum odio odit optio quas qui
            reprehenderit, rerum sequi tempora vel veritatis vero voluptatem. At
            deleniti error expedita quisquam. Aspernatur assumenda blanditiis
            dignissimos ea eius eligendi, error fugiat inventore ipsum
            laudantium neque nihil nobis officia perferendis, quasi quidem
            recusandae reiciendis rerum vero voluptatibus! Corporis distinctio
            molestias nulla recusandae voluptatum. Aliquam corporis cupiditate
            debitis distinctio mollitia quaerat rerum? Cupiditate eos, nostrum
            quisquam reiciendis rerum sit soluta! Consequuntur deleniti
            doloremque in nihil non reprehenderit sunt. Assumenda consectetur
            consequatur corporis cum deleniti deserunt dicta dolore eligendi
            esse et ex fugiat harum hic inventore iusto, laboriosam modi
            molestias mollitia necessitatibus optio placeat quae quam quasi
            quidem recusandae rem repellat similique suscipit temporibus ut. Ad,
            architecto, consequatur dicta et facilis fugit nulla porro provident
            quidem repudiandae sed sit temporibus velit veniam veritatis.
            Aperiam beatae culpa cumque doloremque ducimus labore laborum
            laudantium, molestias odio placeat quaerat quam quasi quidem
            sapiente tenetur voluptas voluptates. Culpa distinctio enim error,
            ipsam libero minima modi omnis optio porro quam quas quos vel.
            Aliquid animi aspernatur at corporis cumque deserunt distinctio
            dolorem doloremque doloribus dolorum earum esse est ex excepturi
            exercitationem, fuga fugiat id iste itaque laboriosam laborum
            laudantium maiores, modi nam nesciunt odio officiis possimus qui
            quia repudiandae sequi similique sint tempore totam vel voluptatem
            voluptatum. Accusantium beatae consectetur cumque doloremque
            incidunt natus nisi quae totam! Aperiam aut consequuntur corporis
            cupiditate esse est excepturi facere illo in labore laborum nam odit
            reprehenderit repudiandae, sapiente? Ad excepturi, fugiat ipsum
            molestiae nisi quod sequi. Alias amet, aperiam commodi ex facilis
            molestiae quos repudiandae tempore voluptatibus voluptatum. Aut
            eaque eius explicabo nam nesciunt voluptatibus? Alias assumenda
            cupiditate et, eum fuga iure, non nulla officia sit tempore vel
            veniam vero. Cumque eos, harum repellendus tempora tenetur veniam
            voluptate voluptates? Alias at, dolorum impedit itaque laudantium
            maiores quidem rem repellat sint tempora. Cupiditate ducimus fugiat
            illum inventore nulla odit officiis, qui sit soluta sunt! A adipisci
            aspernatur culpa dignissimos ex expedita fugiat hic illo, incidunt
            itaque laboriosam laudantium libero molestiae, natus pariatur
            provident saepe sit tempore unde velit? Aut dolore error
            exercitationem fuga itaque laborum magnam natus nihil nisi, odit
            officiis quisquam rerum sapiente sint, temporibus totam
            voluptatibus! A corporis dignissimos laboriosam, nemo nesciunt odio
            quaerat quidem. Consequatur cupiditate dolor excepturi labore
            nostrum placeat quis rerum tenetur? A enim facere facilis id iste,
            maiores mollitia necessitatibus quisquam repellendus. Accusantium,
            ad distinctio eaque fugiat illo iusto molestiae necessitatibus omnis
            tempore unde ut vel velit. Assumenda, ipsa, iusto.
          </div>
          {/*<FilesTree*/}
          {/*  className="practical__list"*/}
          {/*  tree={TREE}*/}
          {/*  itemRenderer={(leaf, tree, setTree) => (*/}
          {/*    <FilesTreeEntity leaf={leaf} tree={tree} setTree={setTree} />*/}
          {/*  )}*/}
          {/*/>*/}
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
