import React, { Component, ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { IProps, TDirection, IFunctionalProps } from '../common/BasicTypes';
import { getRandomNumber } from '../common/utils';
import classes from 'classnames';

export interface ICheckBoxProps extends IProps<CheckBox> {
  defaultChecked: boolean;
  id?: string | number;
  disabled?: boolean;
  onChange?: (e: ChangeEvent) => void;
}

interface ICheckBoxContextValue {
  direction: TDirection;
  disabled?: boolean;
}

const CheckBoxContext = React.createContext<ICheckBoxContextValue>({ direction: 'vertical', disabled: false });

export class CheckBox extends Component<ICheckBoxProps, any> {
  static contextType = CheckBoxContext;
  constructor(props: ICheckBoxProps) {
    super(props);
    const { defaultChecked = false, id } = props;
    this.state = {
      checked: defaultChecked,
      id: id || getRandomNumber()
    };
  }

  onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    this.setState((pre: any) => ({
      checked: !pre.checked
    }));

    if (onChange) {
      onChange(e);
    }
  };

  render() {
    const { disabled, className, children, defaultChecked, onChange ,...rest } = this.props;
    const { direction, disabled: parentDisable } = this.context;
    const checkBoxClass = classes({
      'fd-form__item fd-form__item--check': true,
      'fd-form__item--inline': direction === 'horizental',
      [`${className}`]: !!className
    });

    return (
      <div className={checkBoxClass}>
        <label className="fd-form__label" htmlFor={this.state.id}>
          <input
            type="checkbox"
            className="fd-form__control"
            id={this.state.id}
            checked={this.state.checked}
            disabled={disabled || parentDisable}
            onChange={this.onChange}
            {...rest as DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>}
          />
          <span>{children}</span>
        </label>
      </div>
    );
  }
}

export interface ICheckBoxGroupProps extends IFunctionalProps{
  direction: TDirection;
  disabled?: boolean;
  name ?: string
}
export const CheckGroup = ({direction = 'vertical', disabled = false, name = '',children , ...rest}: ICheckBoxGroupProps)=>{

  return (<fieldset className="fd-form__set">
            <legend className="fd-form__legend">{name}</legend>
              <CheckBoxContext.Provider value={{direction, disabled}}>
              {children}
              </CheckBoxContext.Provider>
          </fieldset>);
};
