import React, { Component, ReactElement } from 'react';
import { IProps } from '../common/BasicTypes';
import {getRandomNumber} from '../common/utils';
import { KeyCode } from '../common/utils';

type PopoverAlignment = 'left' | 'right' | '';

export interface IPopoverProps extends IProps<Popover> {
  disabled?: boolean;
  noArrow?: boolean;
  alignment?: PopoverAlignment;
  control?: ReactElement<any>;
  id ?: string
}

export class Popover extends Component<IPopoverProps, any> {

  private node : React.RefObject<HTMLDivElement>
  constructor(props: IPopoverProps) {
    super(props);
    this.state = {
      isDisabled: this.props.disabled,
      isExpanded: false
    };
    this.node = React.createRef();
  }

  componentDidMount() {
    document.addEventListener('keydown', this.pressEsc, false);
    document.addEventListener('mousedown', this.handleOutsideClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.pressEsc, false);
    document.removeEventListener('mousedown', this.handleOutsideClick, false);
  }

  pressEsc = (event: KeyboardEvent) => {
    if (event.keyCode === KeyCode.ESC && this.state.isExpanded === true) {
      this.setState({
        isExpanded: false
      });
    }
  };

  handleOutsideClick = (e: Event) => {
    if (!this.state.isDisabled && this.node.current && !this.node.current.contains(e.target as Node)) {
      if (this.state.isExpanded) {
        this.setState({
          isExpanded: false
        });
      }
    }
  };

  triggerBody = () => {
    if (!this.state.isDisabled) {
      this.setState( (prevState: any) => ({
        isExpanded: !prevState.isExpanded
      }));
    }
  };

  render() {
    const { id = String(getRandomNumber()), alignment, noArrow, control, className, children, ...rest } = this.props;
    return (
      <div ref={this.node} className={`fd-popover${alignment ? ` fd-popover--${alignment}` : ''}${className ? ` ${className}` : ''}`}
        {...rest}
      >
        <div className="fd-popover__control" aria-expanded={this.state.isExpanded} onClick={this.triggerBody} aria-controls={id}>
          {control}
        </div>
        <div
          className={`fd-popover__body${alignment ? ` fd-popover__body--${alignment}` : ''}${noArrow ? ' fd-popover__body--no-arrow' : ''}`}
          aria-hidden={!this.state.isExpanded}
          id={id}
        >
          {children}
        </div>
      </div>
    );
  }
}
