import React, { ReactNode } from 'react';
import { IFunctionalProps } from '../common/IProps';

export enum eIdentifierSize {
  xxs = 'xxs',
  xs = 'xs',
  s = 's',
  m ='m',
  l = 'l',
  xl = 'xl',
  xxl = 'xxl'
}

export enum eIdentifierModifier {
  circle = 'circle',
  transparent='transparent',
  default = ''
}

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
  size ?: eIdentifierSize,
  modifier ?: eIdentifierModifier,
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
