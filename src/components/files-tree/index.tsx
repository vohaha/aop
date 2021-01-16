import React, { useCallback, useState } from 'react';
import cn from 'classnames';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './index.scss';
import { Entity, EntityData, EntityProps, EntityType } from '../entity';
import traverse from 'traverse';

export enum FILES_TREE_TYPES {
  file = 'file',
  folder = 'folder',
}

export interface FilesTreeLeaf {
  id: string;
  type: FILES_TREE_TYPES;
  name: string;
  time: string;
  inner: FilesTreeLeaf[];
}

export interface FilesTreeProps {
  tree: FilesTreeLeaf[];
  itemRenderer: (
    props: FilesTreeLeaf,
    tree: FilesTreeLeaf[],
    setTree: any,
  ) => React.ReactChild;
  classes?: {
    tree?: string;
    plot?: string;
    item?: string;
  };
}

export function FilesTree({
  children,
  className,
  itemRenderer,
  classes,
  tree: initTree,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  FilesTreeProps) {
  const [tree, setTree] = useState(initTree);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cn('files-tree', className, classes?.tree)}>
        {/*<FilesTreePlot type={FILES_TREE_TYPES.folder} isRoot id="root">*/}
        {/*  */}
        {/*</FilesTreePlot>*/}
        {tree
          .filter((item) => item != null)
          .map((leaf) => (
            <FilesTreePlot
              id={leaf.id}
              type={leaf.type}
              key={leaf.name + leaf.time}
              className={classes?.plot}>
              <FilesTreeItem
                tree={tree}
                setTree={setTree}
                className={classes?.item}
                type={leaf.type}
                id={leaf.id}>
                {itemRenderer(leaf, tree, setTree)}
              </FilesTreeItem>
            </FilesTreePlot>
          ))}
      </div>
    </DndProvider>
  );
}

export interface FilesTreePlotProps {
  type: FILES_TREE_TYPES;
  id: string;
  isRoot?: boolean;
  tag?: string;
}

export function FilesTreePlot({
  children,
  className,
  tag = 'div',
  type,
  id,
  isRoot,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  FilesTreePlotProps) {
  const [{ isOver }, drop] = useDrop({
    accept:
      type === FILES_TREE_TYPES.folder
        ? [FILES_TREE_TYPES.folder, FILES_TREE_TYPES.file]
        : [],
    drop: (item, monitor) => ({
      dropId: id,
      dragItem: {
        ...item,
        dragType: monitor.getItemType(),
      },
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
    }),
  });
  const Tag: any = `${tag}`;
  return (
    <Tag
      ref={drop}
      className={cn('files-tree__plot', className, {
        'files-tree__plot--is-over': isOver,
        'files-tree__plot--root': isRoot,
      })}
      {...props}>
      {children}
    </Tag>
  );
}

export interface FilesTreeItemProps {
  type: FILES_TREE_TYPES;
  id: FilesTreeLeaf['id'];
  tree: FilesTreeLeaf[];
  setTree: any;
}

export function FilesTreeItem({
  children,
  className,
  type,
  id,
  tree,
  setTree,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  FilesTreeItemProps) {
  const [{ opacity }, dragRef] = useDrag({
    item: { type },
    end: (item, monitor) => {
      if (monitor.didDrop()) {
        const copiedTree = [...tree];
        const dropResult = monitor.getDropResult();
        traverse(copiedTree).forEach(function (node) {
          if (node?.id === dropResult?.dragItem.dragId) {
            const copiedDrag = traverse.clone(this.node);
            if (this.parent) {
              this.remove(true);
              traverse(copiedTree).forEach(function (node) {
                if (node?.id === dropResult?.dropId) {
                  const dropItem = this.node;
                  this.update({
                    ...dropItem,
                    inner: [...dropItem.inner, copiedDrag],
                  });
                }
              });
            }
          }
        });
        setTree(copiedTree);
      }
    },
    begin: (monitor) => ({
      ...monitor.getItem(),
      dragId: id,
    }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  return (
    <div
      ref={dragRef}
      className={cn('files-tree__item', className)}
      style={{ opacity }}
      {...props}>
      {children}
    </div>
  );
}

export interface FilesTreeEntityProps {
  leaf: FilesTreeLeaf;
  tree: FilesTreeLeaf[];
  setTree: any;
}

export function transformLeafToEntity(leaf: FilesTreeLeaf) {
  let transformedEntityType: EntityType;
  let transformedEntityInner: EntityData[] = [];
  switch (leaf.type) {
    case FILES_TREE_TYPES.file:
      transformedEntityType = EntityType.text;
      break;
    case FILES_TREE_TYPES.folder:
      transformedEntityType = EntityType.folder;
      break;
    default:
      transformedEntityType = EntityType.text;
  }
  if (leaf.inner != null) {
    transformedEntityInner = leaf.inner.map(transformLeafToEntity);
  }
  return {
    ...leaf,
    type: transformedEntityType,
    inner: transformedEntityInner,
  };
}

export function FilesTreeEntity({
  children,
  className,
  leaf,
  tree,
  setTree,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  FilesTreeEntityProps) {
  const entityData = transformLeafToEntity(leaf);
  const renderCb = useCallback(
    (entityProps: EntityProps) => {
      const filesTreeType =
        entityProps.data.type === EntityType.folder
          ? FILES_TREE_TYPES.folder
          : FILES_TREE_TYPES.file;
      return (
        <FilesTreePlot
          id={entityProps.data.id}
          type={filesTreeType}
          key={entityProps.data.time + entityProps.data.name}>
          <FilesTreeItem
            type={filesTreeType}
            id={entityProps.data.id}
            tree={tree}
            setTree={setTree}>
            <Entity {...entityProps} />
          </FilesTreeItem>
        </FilesTreePlot>
      );
    },
    [setTree, tree],
  );
  return (
    <Entity
      className={cn('files-tree-entity', className)}
      {...props}
      data={entityData}
      innerComponent={renderCb}
    />
  );
}
