import React, { ReactEventHandler, ReactNode } from 'react';
import { IFunctionalProps,tIconType } from '../common/BasicTypes';

export interface IIconProps extends IFunctionalProps {
  glyph : string;
  clickHandler?: ReactEventHandler;
  size: tIconType
}

export const Icon: (props: IIconProps) => ReactNode = ({ glyph, size, clickHandler, className, ...props }) => (
  <span className={`${`sap-icon--${glyph}`}${size ? ` sap-icon--${size}` : ''}${className ? ` ${className}` : ''}`} onClick={clickHandler} {...props} />
);
