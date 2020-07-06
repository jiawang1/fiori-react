import React from 'react';
import { TransformWrapper } from '@jay.wang/fundamental-react';
import { DocsTile, DocsText, Separator, Header, Description, Import, Properties } from '../documentation';

export class TransformComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transitionState : null,
      scaleState: null,
      opacityState :null
    };
  }

  render() {
    return null;
  }
}
