import { ReactNode, Props } from 'react';

export interface IFunctionalProps {
  children?: ReactNode;
  className?: string;
}

export interface IProps<T> extends Props<T> {
  className?: string;
}
