import React, { Component } from 'react';
import { IInputGroupProps, InputGroup } from './InputGroup';

export class SearchInput extends Component<IInputGroupProps, any> {
  constructor(props: IInputGroupProps) {
    super(props);
  }

  render() {
    const { type, prefixIcon, beforeAddon, ...rest } = this.props;
    return <InputGroup {...rest} type="search" />;
  }
}
