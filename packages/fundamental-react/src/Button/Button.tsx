import React, {ReactEventHandler, ReactNode} from 'react';
import { IFunctionalProps } from '../common/IProps';


export interface IButtonProps  extends IFunctionalProps {
   type: eType,
   option?: eButtonOption,
   compact ?: boolean,
   glyph ?: string,
   dropdown ?: boolean,
   navbar ?:boolean,
   selected ?: boolean,
   disabled: boolean,
   htmlType: string,
   onClick ?: ReactEventHandler
};

export enum eButtonOption {
   empty = '',
   emphasized = 'emphasized',
   light = 'light',
   shell = 'shell'
};

export enum eType {
  empty = '',
  standard = 'standard',
  positive = 'positive',
  negative= 'negative',
  medium = 'medium'
};


export const Button: ( props : IButtonProps) => ReactNode = ({ option, type, compact, glyph, dropdown, navbar, selected = false, disabled = false, htmlType, onClick, children, className, ...props }) => (
  <button className={`${option ? `fd-button--${option}` : ' fd-button'}${type ? ` fd-button--${type}` : ''}${dropdown ? ' fd-dropdown__control' : ''}${
      compact ? ' fd-button--compact' : ''
    }${glyph ? ` sap-icon--${glyph}` : ''}${navbar ? ' fd-global-nav__btn' : ''}${selected ? ' is-selected' : ''}${disabled ? ' is-disabled' : ''}${
      className ? ` ${className}` : ''
    }`}
    {...props}
    disabled={disabled}
    type={htmlType}
    onClick={onClick}
  >
    {children}
  </button>
);


export const ButtonGroup :  ( props : IFunctionalProps) => ReactNode = props => {
  const { children } = props;
  return (
    <div className="fd-button-group" role="group" aria-label="Group label">
      {children}
    </div>
  );
};
