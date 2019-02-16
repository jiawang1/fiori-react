import React, { ReactNode } from 'react';
import { IFunctionalProps,tFullSize } from '../common/BasicTypes';

type tIdentifierModifier = ''| 'circle' | 'transparent';

export enum eIdentifierColor {
  orange = 1,
  brown,
  pink,
  violet,
  blue,
  azure,
  cyan,
  green,
  purple
}

export interface IIdentifierProps extends IFunctionalProps{
  glyph : string,
  size ?: tFullSize,
  modifier ?: tIdentifierModifier,
  color ?:eIdentifierColor,
  label ?: string,
  backgroundImageUrl ?: string
}

export const Identifier : (props : IIdentifierProps)=>ReactNode  = ({ glyph, size, modifier, color, label, backgroundImageUrl, children, className, ...props }) => {
  const styles = {
    backgroundImage: `url(${backgroundImageUrl})`
  };
  return (
    <span
      className={`${size ? `fd-identifier--${size}` : 'fd-identifier'}${glyph ? ` sap-icon--${glyph}` : ''}${modifier ? ` fd-identifier--${modifier}` : ''}${
        color ? ` fd-has-background-color-accent-${color}` : ''
      }${backgroundImageUrl ? ' fd-identifier--thumbnail' : ''}${className ? ` ${className}` : ''}`}
      style={backgroundImageUrl? styles : undefined}
      role={`${!children ? 'presentation' : ''}`}
      aria-label={label}
      {...props}
    >
      {children}
    </span>
  );
};
