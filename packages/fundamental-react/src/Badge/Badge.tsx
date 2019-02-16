import React from 'react';
import { IFunctionalProps, stateType, fullStatusType } from '../common/BasicTypes';

type badgeModifier = 'pill' | 'filled' | '';

export interface IBadgeProps extends ILabelProps {
  modifier: badgeModifier;
}

export const Badge = ({ type, modifier, children, className, ...props }: IBadgeProps) => (
  <span className={`fd-badge${type ? ` fd-badge--${type}` : ''}${modifier ? ` fd-badge--${modifier}` : ''}${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </span>
);

export interface ILabelProps extends IFunctionalProps {
  type: stateType;
}

export const Label = ({ type, children, className, ...props }: ILabelProps) => (
  <span className={`fd-label${type ? ` fd-label--${type}` : ''}${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </span>
);

export interface IStatusProps extends IFunctionalProps {
  type: fullStatusType;
  glyph: string;
}

export const Status = ({ type, glyph, children, className, ...props }: IStatusProps) => (
  <span className={`fd-status-label${type ? ` fd-status-label--${type}` : ''}${glyph ? ` sap-icon--${glyph}` : ''}${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </span>
);

export interface ICounterProps extends IFunctionalProps {
  notification: boolean;
}

export const Counter = ({ notification, children, className, ...props }: ICounterProps) => (
  <span className={`fd-counter${notification ? ' fd-counter--notification' : ''}${className ? ` ${className}` : ''}`} aria-label="Unread count" {...props}>
    {children}
  </span>
);
