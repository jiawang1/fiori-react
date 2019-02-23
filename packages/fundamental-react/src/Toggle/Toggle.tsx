import React, { ChangeEvent,HTMLAttributes } from 'react';
import {IProps,tToggleSize} from '../common/BasicTypes';

export interface IToggleProps extends IProps<Toggle>{
  disabled : boolean,
  defaultChecked : boolean,
  size :tToggleSize
  onChange ?: ( checked : boolean, e : ChangeEvent<HTMLInputElement> ) => void
}

interface IToggleState {
  checked : boolean | string
}
 
export class Toggle extends React.Component<IToggleProps, IToggleState> {
  constructor(props:IToggleProps) {
    super(props);
    this.state = { checked: this.calChecked(props.defaultChecked) };
  }

  handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    this.setState( ({checked}, {onChange})=>{
      const checkedVal = this.calChecked(!checked);
      if(onChange){
        onChange(checkedVal, e);
      }
      return {checked : checkedVal};
    });
  }

  render() {
    const { size, disabled, children, className, ...rest } = this.props;
    const checkedValue = this.calChecked(this.state.checked);
    return (
      <div className={`fd-form__item fd-form__item--check${className ? ` ${className}` : ''}`} {...rest as HTMLAttributes<HTMLDivElement>}>
        <label className="fd-form__label">
          <span className={`fd-toggle${size ? ` fd-toggle--${size}` : ''} fd-form__control`}>
            <input type="checkbox" checked={checkedValue} onChange={this.handleChange} disabled={disabled} />
            <span className="fd-toggle__switch" role="presentation" />
          </span>
          {children}
        </label>
      </div>
    );
  }
  private calChecked = (checked: boolean| string) =>{
      return String(checked) === 'true' ? true : false;
  }
}
