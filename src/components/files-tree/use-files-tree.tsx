import { createContext, useContext, useState } from 'react';
import { FilesTreeLeaf } from './index';

export enum FILES_TREE_TYPES {
  file = 'file',
  folder = 'folder',
}

export interface FilesTreeContextValue {
  tree: FilesTreeLeaf;
  setTree: any;
}

const FilesTreeContextValueDefault = {
  tree: {
    id: 'root',
    name: 'root',
    type: FILES_TREE_TYPES.folder,
    time: '',
    inner: [],
  },
  setTree: () => {},
};

export const FilesTreeContext = createContext<FilesTreeContextValue>(
  FilesTreeContextValueDefault,
);

export const useFilesTree = () => useContext(FilesTreeContext);

export const useResetBrokerProvider = () => {
  const [tree, setTree] = useState(FilesTreeContextValueDefault.tree);
  return {
    tree,
    setTree,
  };
};

export const ProvideFilesTree = ({ children }: any) => {
  const filesTreeContext = useResetBrokerProvider();
  return (
    <FilesTreeContext.Provider value={filesTreeContext}>
      {children}
    </FilesTreeContext.Provider>
  );
};
