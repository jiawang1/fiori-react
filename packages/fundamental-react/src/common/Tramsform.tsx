import React, { ReactElement } from 'react';
import PropTypes from 'prop-types';
import { IProps } from '../common/BasicTypes';
import { isDOMElement } from '../common/utils';
const FIRST = 1;
const LAST = 2;
const TRANSFORM = 3;
const PLAY = 4;

export interface ITransformWrapperProps extends IProps<TransformWrapper> {
  time?: string;
  transformKey: string;
  animationTime?: string;
  animationMode?: string;
  transformKeys: string;
}

interface ITransformWrapperState{
  transformKeys ?: string;
  step : number;
  transformStr ?: string
}
/**
 * Component used to help implementing animation
 */
export default class TransformWrapper extends React.Component<ITransformWrapperProps,ITransformWrapperState> {
  static propTypes = {
    time: PropTypes.string,
    transformKey: PropTypes.string.isRequired,
    animationTime: PropTypes.string,
    animationMode: PropTypes.string
  };
  ref: React.RefObject<any>;

  state :ITransformWrapperState

  constructor(props: ITransformWrapperProps) {
    super(props);
    const { transformKey, children } = props;

    if (transformKey === undefined) {
      throw new Error(`Must supply transformKey`);
    }

    if (!React.isValidElement(children)) {
      throw new Error(`TransformWrapper nust wrap validate React element`);
    }
    this.ref = React.createRef();
    this.state = {
      step: LAST
    };
  }

  componentDidUpdate(pre: ITransformWrapperProps, preState: ITransformWrapperState, snapShot :any) {
    const { transformKey } = pre;
    if (transformKey === this.props.transformKeys) {
      return;
    }
    if (snapShot) {
      this.moveForward(snapShot, this.getCompareObject());
    }
  }

  getTarget() {
    const { children } = this.props;
    return isDOMElement(children as ReactElement<any>) ? this.ref.current : this.ref.current.firstElementChild;
  }

  getCompareObject() {
    const target = this.getTarget();
    const { opacity = 1 } = window.getComputedStyle(target);
    return Object.assign(target.getBoundingClientRect(), { opacity });
  }

  getSnapshotBeforeUpdate(preProps :ITransformWrapperProps) {
    const { transformKey } = preProps;
    const { transformKey: currentKey } = this.props;
    if (transformKey === currentKey) {
      return null;
    }
    return this.getCompareObject();
  }
  moveForward = (first :any, last :any) => {
    const { step } = this.state;
    const { top: lTop, left: lLeft, width: lWidth, height: lHeight, opacity: lOpacity } = last;
    const { top: fTop, left: fLeft, width: fWidth, height: fHeight, opacity: fOpacity } = first;

    if (step === LAST) {
      const translateStr = lTop !== fTop || lLeft !== fLeft ? `translate(${fLeft - lLeft}px, ${fTop - lTop}px)` : '';
      const transformStr = `${translateStr} ${lWidth !== fWidth || lHeight !== fHeight ? `scale(${lWidth / fWidth}, ${lHeight / fHeight})` : ''}`.trim();

      if (transformStr.length > 0 || fOpacity !== lOpacity) {
        this.setState(
          {
            step: TRANSFORM,
            transformStr
          },
          () => {
            setTimeout(() => {
              this.setState({ step: PLAY });
            }, 1);
          }
        );
      }
    }
  };

  renderDOMChildren() {
    const { children, animationMode = 'ease-in-out', animationTime = '0.4s' } = this.props;
    const { step, transformStr = '' } = this.state;
    let props = { ref: this.ref };

    if (step === TRANSFORM) {
      props = Object.assign(props, {
        style: { transform: transformStr.length > 0 ? transformStr : 'none' }
      });
    } else if (step > TRANSFORM) {
      props = Object.assign(props, {
        style: { transition: `all ${animationMode} ${animationTime}`, transform: 'none' }
      });
    }
    return React.cloneElement(children as ReactElement<any>, props);
  }

  renderComponentChildren() {
    const { children, animationMode = 'ease-in-out', animationTime = '0.4s' } = this.props;
    const { step, transformStr = '' } = this.state;

    if (step <= LAST) {
      return <div ref={this.ref}> {children}</div>;
    } else {
      const props =
        step === TRANSFORM
          ? {
              style: {
                transform: transformStr.length > 0 ? transformStr : 'noen'
              }
            }
          : {
              style: { transition: `all ${animationMode} ${animationTime}`, transform: 'none' }
            };
      return <div ref={this.ref}> {React.cloneElement(children as ReactElement<any>, props)}</div>;
    }
  }

  render() {
    const { children } = this.props;

    if (isDOMElement(children as ReactElement<any>)) {
      return this.renderDOMChildren();
    }
    return this.renderComponentChildren();
  }
}
