import cn from 'classnames';
import * as React from 'react';
import './index.css';

/*
 * loads files from the "icon" folder and process them with loaders
 * inserts svg sprite to index.html
 * */
const files = (require as any).context(
  '!svg-sprite-loader!svgo-loader!./icons',
  false,
  /.*\.svg$/u,
);

interface IIconInlineStyles {
  [key: string]: {
    height: string;
  };
}

/*
 * gets icon meta to style icon properly
 * */
const iconsInlineStyles: IIconInlineStyles = {};
files.keys().forEach((filePath: any) => {
  const fileData = files(filePath).default;
  const id = fileData.id;
  const [, , width, height] = fileData.viewBox.split(' ');
  iconsInlineStyles[id] = {
    height: `${height / width}em`,
  };
});

export interface IIconProps {
  children: string;
}

export function Icon({
  children: iconName,
  ...props
}: React.SVGProps<SVGSVGElement> & IIconProps) {
  return (
    <svg
      {...props}
      className={cn('icon', props.className)}
      width="1em"
      height={
        iconsInlineStyles[iconName] ? iconsInlineStyles[iconName].height : '1em'
      }
      role={props.role}
      aria-hidden={!props.role}>
      <use xlinkHref={`#${iconName || iconName}`} />
    </svg>
  );
}
