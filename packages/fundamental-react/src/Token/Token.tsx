import React, { ReactNode, ReactEventHandler } from 'react';
import { IFunctionalProps } from '../common/IProps';

export interface ITokenProps extends IFunctionalProps {
  clickHandler: ReactEventHandler;
}

export const Token: (props: ITokenProps) => ReactNode = props => {
  const { children, clickHandler, className, ...rest } = props;
  return (
    <span className={`fd-token${className ? ` ${className}` : ''}`} role="button" onClick={clickHandler} {...rest}>
      {children}
    </span>
  );
};
