import classNames from 'classnames';
import React, { ChangeEvent, Component, DetailedHTMLProps,InputHTMLAttributes,FieldsetHTMLAttributes } from 'react';
import { IFunctionalProps, IProps } from '../common/BasicTypes';

export type TRadioGroupDirection = 'horizental' | 'vertical';

export interface IRadioGroupProps extends IProps<RadioGroup> {
  direction: TRadioGroupDirection;
  title?: string;
  name: string;
  disabled: boolean;
  onChange?: (e: ChangeEvent) => void;
  defaultValue ?: string
}

interface IRadioContextValue {
  direction: TRadioGroupDirection;
  name : string;
  onChange ?: (e: ChangeEvent<HTMLInputElement>) => void;
  selectedValue ?: string;
  disabled ?: boolean
}

const RadioContext = React.createContext<IRadioContextValue>({ direction: 'vertical', name:''});

export class RadioGroup extends Component<IRadioGroupProps, any>{
  constructor(props : IRadioGroupProps){
    super(props);
    const {defaultValue} = props;
    this.state={
      selectedValue : defaultValue
    };
  }

  onChange = ( e:ChangeEvent<HTMLInputElement>  )=>{
    const { onChange} = this.props;
    const {value} = e.target;
    this.setState({
      selectedValue : value
    });
    if(onChange){
      onChange(e);
    }
  }

  render(){
    const { title, direction, name, children, className, disabled = false, ...rest } = this.props;
    const {selectedValue} = this.state;
    const classes = classNames({
      'fd-form__set':true,
      [`${className}`]: !!className
    });
    return (
      <RadioContext.Provider value={{direction, name, selectedValue, disabled, onChange : this.onChange}}>
        <fieldset className={classes} {...rest as DetailedHTMLProps<FieldsetHTMLAttributes<HTMLFieldSetElement>, HTMLFieldSetElement>}>
          <legend className="fd-form__legend">{title}</legend>
          {/* {renderChildren(direction, name, disabled, children, value)} */}
          {direction === 'horizental'? <div className="fd-form__group">{children}</div> : children }
        </fieldset>
      </RadioContext.Provider>
    );
  }
}

export interface IRadioProps extends IFunctionalProps {
  disabled?: boolean;
  value: string;
}

export const Radio = ({value, disabled, children, className, ...rest} : IRadioProps)=>{
  return <RadioContext.Consumer>
        {({direction, name, selectedValue, disabled : parentDidable, onChange})=>{
           const radioClass = classNames({
             'fd-form__item fd-form__item--check': true,
             'fd-form__item--inline': direction === 'horizental',
             [`${className}`]: !!className
           });
           return (
             <div className={radioClass}>
               <label className="fd-form__label">
                 <input type="radio" value={value} className="fd-form__control" {...rest as DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>}
                 checked={value === selectedValue} name={name} onChange={onChange} disabled={disabled || parentDidable}/>
                 <span>{children}</span>
               </label>
             </div>
           );
        }}
      </RadioContext.Consumer>;
};

Radio.RadioGroup = RadioGroup;
