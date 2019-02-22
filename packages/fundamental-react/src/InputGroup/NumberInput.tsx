import React, { Component, DOMAttributes, ChangeEvent } from 'react';
import { IInputGroupProps, InputGroup } from './InputGroup';

export class NumberInput extends Component<IInputGroupProps, any> {
  constructor(props: IInputGroupProps) {
    super(props);
    const { value } = props;
    this.state = {
      num: value ? Number(value) : ''
    };
  }

  onClickUp : DOMAttributes<HTMLButtonElement>['onClick'] = e => {
    const {disabled} = this.props;
    if(disabled){return ;}
    this.setState( (pre : any) =>{ 
        let {num} = pre;
        num = Number(num);
        ++num;  
        return {num};
    });
  };

  onChange = (e:ChangeEvent<Element>)=>{
      const {onChange} = this.props;
      this.setState({
          num : (e.target as HTMLInputElement).value
      },()=>{
          if(onChange){
              onChange(e);
          }
      });
  }

  onClickDown : DOMAttributes<HTMLButtonElement>['onClick'] = e => {
    const {disabled} = this.props;
    if(disabled){return ;}
    this.setState( (pre : any) =>{ 
        let {num} = pre;
        num = Number(num);
        --num;
        return {num};
     });
};

  renderNumberControl = () => {
      const {disabled} = this.props;
    return (
      <span className="fd-input-group__addon fd-input-group__addon--button fd-input-group__addon--after">
        <button className="fd-input-group__button fd-input-group__button--step-up sap-icon--slim-arrow-up" aria-label="Step up" disabled ={disabled} onClick={this.onClickUp} />
        <button className="fd-input-group__button fd-input-group__button--step-down sap-icon--slim-arrow-down" aria-label="Step down" disabled ={disabled} onClick={this.onClickDown} />
      </span>
    );
  };

  render() {
    const { type, beforeAddon, afterAddon,value, onChange, ...rest } = this.props;

    return <InputGroup {...rest} type="number" afterAddon={this.renderNumberControl()} onChange={this.onChange} value={this.state.num}/>;
  }
}
