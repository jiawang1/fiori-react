import React, { ReactNode } from 'react';
import { IFunctionalProps, tBasicSize } from '../common/BasicTypes';

export interface IImageProps extends IFunctionalProps {
  size: tBasicSize;
  photo: string;
  type: tImageType;
}

export type tImageType = 'circle' | '';

export const Image: (props: IImageProps) => ReactNode = ({ size, type, photo, className, ...props }) => (
  <span className={`${`fd-image--${size}`}${type ? ` fd-image--${type}` : ''}${className ? ` ${className}` : ''}`} style={{ backgroundImage: `url(${photo})` }} {...props} />
);
