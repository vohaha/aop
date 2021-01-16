import React, { useCallback } from 'react';
import cn from 'classnames';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './index.scss';
import { Entity, EntityData, EntityProps, EntityType } from '../entity';

export enum FILES_TREE_TYPES {
  file = 'file',
  folder = 'folder',
}

export interface FilesTreeLeaf {
  type: FILES_TREE_TYPES;
  name: string;
  time: string;
  inner: FilesTreeLeaf[];
}

export interface FilesTreeProps {
  tree: FilesTreeLeaf[];
  itemRenderer: (props: FilesTreeLeaf) => React.ReactChild;
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
  tree,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  FilesTreeProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cn('files-tree', className, classes?.tree)}>
        <FilesTreePlot type={FILES_TREE_TYPES.folder} isRoot>
          {tree.map((leaf) =>
            leaf.type === FILES_TREE_TYPES.folder ? (
              <FilesTreePlot
                type={leaf.type}
                key={leaf.name + leaf.time}
                className={classes?.plot}>
                <FilesTreeItem className={classes?.item} type={leaf.type}>
                  {itemRenderer(leaf)}
                </FilesTreeItem>
              </FilesTreePlot>
            ) : (
              <FilesTreeItem className={classes?.item} type={leaf.type}>
                {itemRenderer(leaf)}
              </FilesTreeItem>
            ),
          )}
        </FilesTreePlot>
      </div>
    </DndProvider>
  );
}

export interface FilesTreePlotProps {
  type: FILES_TREE_TYPES;
  isRoot?: boolean;
  tag?: string;
}

export function FilesTreePlot({
  children,
  className,
  tag = 'div',
  type,
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
    drop: (item, monitor) => {
      console.log('DragObject', item);
      console.log('DropTargetMonitor', monitor);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
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
}

export function FilesTreeItem({
  children,
  className,
  type,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  FilesTreeItemProps) {
  const [{ opacity }, dragRef] = useDrag({
    item: { type },
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
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  FilesTreeEntityProps) {
  const entityData = transformLeafToEntity(leaf);
  const renderCb = useCallback((entityProps: EntityProps) => {
    const filesTreeType =
      entityProps.data.type === EntityType.folder
        ? FILES_TREE_TYPES.folder
        : FILES_TREE_TYPES.file;
    return (
      <FilesTreePlot
        type={filesTreeType}
        key={entityProps.data.time + entityProps.data.name}>
        <FilesTreeItem type={filesTreeType}>
          <Entity {...entityProps} />
        </FilesTreeItem>
      </FilesTreePlot>
    );
  }, []);
  return (
    <Entity
      className={cn('files-tree-entity', className)}
      {...props}
      data={entityData}
      innerComponent={renderCb}
    />
  );
}
