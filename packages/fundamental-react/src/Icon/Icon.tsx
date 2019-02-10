import React, { ReactEventHandler, ReactNode } from 'react';
import { IFunctionalProps } from '../common/IProps';

export interface IIconProps extends IFunctionalProps {
  glyph : string;
  clickHandler?: ReactEventHandler;
  size: eIconSize
}

export enum eIconSize {
  extremSmall = 'xs',
  compact = 'compact',
  small = 's',
  normal = 'normal',
  large = 'l'
}

export const Icon: (props: IIconProps) => ReactNode = ({ glyph, size, clickHandler, className, ...props }) => (
  <span className={`${`sap-icon--${glyph}`}${size ? ` sap-icon--${size}` : ''}${className ? ` ${className}` : ''}`} onClick={clickHandler} {...props} />
);
