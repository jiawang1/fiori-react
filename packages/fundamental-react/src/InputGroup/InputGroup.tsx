import React, { ChangeEvent, ReactNode,HTMLAttributes, ReactElement } from 'react';
import classNames from 'classnames';
import { IFunctionalProps } from '../common/BasicTypes';

export const FormGroup = (props:IFunctionalProps) => {
  const { children } = props;
  return <div className="fd-form__group">{children}</div>;
};

export type TInputStatus =  'valid' | 'invalid' | 'warning';
export type TInputType = 'text' | 'number' | 'search';
export interface IInputGroupProps extends IFunctionalProps {
  type: TInputType;
  compact?: boolean;
  placeholder?: string;
  name ?: string;
  value ?: any;
  onChange ?: (e:ChangeEvent)=>void;
  id ?: string,
  prefixIcon?: string|ReactNode;
  suffixIcon ?: string | ReactNode;
  beforeAddon ?: string | ReactNode;
  afterAddon ?: string | ReactNode;
  disabled ?: boolean;
  clearAble?: boolean;
  status ?: TInputStatus
}

export const InputGroup = (props:IInputGroupProps) =>{
const {beforeAddon, afterAddon, compact, prefixIcon, suffixIcon, status, ...rest } = props;
  const frameClass: string = classNames({
    'fd-input-group': true,
     'fd-input-group--after':!!afterAddon || !! suffixIcon,
     'fd-input-group--before': !!beforeAddon || !!prefixIcon,
    'fd-input-group--compact': compact
  })

  const inputClass:string = classNames({
    'fd-input fd-input--compact': compact,
    [`is-${status}`]: status !== undefined
  });

  const renderAddon = (child: ReactElement<any>, position:string) =>{
      const {disabled} = props;
      const classes = classNames({
        'fd-input-group__addon fd-input-group__addon--button': true,
        [`fd-input-group__addon--${position}`]: true
      });
      return  <span className={classes}>
        {
          React.cloneElement(child, {disabled})
        }</span>;
  };

  const renderIcon = (child : string | ReactNode, position :string) => {
    if(child){
      const classes = classNames({
        'fd-input-group__addon': true,
        [`fd-input-group__addon--${position}`]: true
      });
      return  <span className={classes}>{child}</span>;
    }
  }
  return <div className = {frameClass} {...rest as HTMLAttributes<HTMLDivElement>} >
  {beforeAddon && renderAddon(beforeAddon as ReactElement<any>, 'before')}
  {prefixIcon && renderIcon(prefixIcon, 'before')}
    <input className={inputClass} />
  {suffixIcon && renderIcon(suffixIcon, 'after')}
    {afterAddon && renderAddon(afterAddon as ReactElement<any>, 'after')}
  </div>
};

