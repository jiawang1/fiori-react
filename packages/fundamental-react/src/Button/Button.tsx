import React, { ReactEventHandler, FunctionComponent } from 'react';
import classNames from 'classnames';
import { IFunctionalProps, TButtonOption, TButtonType } from '../common/BasicTypes';

export interface IButtonProps extends IFunctionalProps {
  type?: TButtonType;
  option?: TButtonOption;
  isCompact?: boolean;
  glyph?: string;
  isDropdown?: boolean;
  isNavbar?: boolean;
  selected?: boolean;
  disabled?: boolean;
  htmlType?: string;
  onClick?: ReactEventHandler;
}

export const Button: FunctionComponent<IButtonProps> = ({
  option,
  type = 'standard',
  isCompact,
  glyph,
  isDropdown,
  isNavbar,
  selected = false,
  disabled = false,
  htmlType = 'button',
  onClick,
  children,
  className,
  ...props
}) => {
  const classes = classNames({
    [`fd-button--${option}`]: typeof option === 'string',
    'fd-button': !option,
    [`fd-button--${type}`]: typeof type === 'string',
    'fd-dropdown__control': isDropdown,
    'fd-button--compact': isCompact,
    'fd-global-nav__btn': isNavbar,
    [`sap-icon--${glyph}`]: typeof glyph === 'string',
    'is-selected': selected,
    'is-disabled': disabled,
    className
  });
  return (
    <button className={classes} {...props} disabled={disabled} type={htmlType} onClick={onClick}>
      {children}
    </button>
  );
};

export const ButtonGroup: FunctionComponent<IFunctionalProps> = props => {
  const { children } = props;
  return (
    <div className="fd-button-group" role="group" aria-label="Group label">
      {children}
    </div>
  );
};
