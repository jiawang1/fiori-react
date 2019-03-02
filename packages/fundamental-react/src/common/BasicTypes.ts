import { ReactNode, Props } from 'react';

export interface IFunctionalProps {
  children?: ReactNode;
  className?: string;
}

export interface IProps<T> extends Props<T> {
  className?: string;
}

export type stateType = '' | 'success' | 'warning' | 'error';
export type fullStateType = stateType | 'information';
export type fullStatusType = stateType | 'available' | 'away' | 'busy' | 'offline';

export type tBasicSize = '' | 'm' | 's' | 'l';
export type tToggleSize = tBasicSize | 'xs';
export type tIconType = tBasicSize | 'compact' | 'normal';
export type tFullSize = tBasicSize | 'xxs' | 'xs' | 'xl' | 'xxl';
export type TDirection = 'horizental' | 'vertical';
