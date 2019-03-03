import React, { ReactEventHandler, FunctionComponent } from 'react';
import classNames from 'classnames';
import { IFunctionalProps, tIconType } from '../common/BasicTypes';

export type TIconAnimation = 'spin' | 'pulse';
export interface IIconProps extends IFunctionalProps {
  glyph: string;
  clickHandler?: ReactEventHandler;
  size: tIconType;
  animation?: TIconAnimation;
}

export const Icon: FunctionComponent<IIconProps> = ({ glyph, size, clickHandler, className, animation, ...rest }) => {
  const classes = classNames({
    [`sap-icon--${glyph}`]: typeof glyph === 'string',
    [`sap-icon--${size}`]:  typeof size === 'string',
    [`sap-icon--animate-${animation}`]: typeof glyph === 'string' && typeof animation === 'string',
    className: !!className
  });
  return <span className={classes} onClick={clickHandler} {...rest} />;
};
