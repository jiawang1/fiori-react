import React, { ReactNode } from 'react';
import { IFunctionalProps } from '../common/BasicTypes';

export interface IImageProps extends IFunctionalProps {
  size: eImageSize,
  photo: string,
  type: eImageType
}

export enum eImageSize {
  small = 's',
  medium = 'm',
  large = 'l'
}
export enum eImageType {
  circle = 'circle',
  default = ''
}

export const Image: (props: IImageProps)=> ReactNode = ({ size, type, photo, className, ...props }) => (
  <span className={`${`fd-image--${size}`}${type ? ` fd-image--${type}` : ''}${className ? ` ${className}` : ''}`} style={{ backgroundImage: `url(${photo})` }} {...props} />
);
