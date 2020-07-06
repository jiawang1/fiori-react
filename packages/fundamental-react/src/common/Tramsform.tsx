import React, { ReactElement, ReactChild } from 'react';
import PropTypes from 'prop-types';
import { IProps } from '../common/BasicTypes';
import { isDOMElement } from '../common/utils';
const FIRST = 1;
const LAST = 2;
const TRANSFORM = 3;
const PLAY = 4;

const REX_ROTATE = /\((-?\d+)deg/;
const REX_TRANSLATE = /translate(?:X|Y)?\s*\((.*)\)/;
const REX_SCALE = /scale(?:X|Y)?\s*\((.*)\)/;

const supportedTransform = ["translate", "scale", "rotate"];

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
  transformStr ?: string;
  transformKey : string;
  originTransform ?: IStyleObject;
  finalTransform ?: IStyleObject;
  revertTransformStr?: string
}

interface IStyleObject {
  rotate ?: string;
  translateX ?: string;
  translateY ?: string;
  scaleX ?: string;
  scaleY ?: string;
  transformStr : string;
  opacity ?: string
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
  static getDerivedStateFromProps(props :ITransformWrapperProps, state :ITransformWrapperState) {
    if (props.transformKey !== state.transformKey) {
      return {
        transformKey: props.transformKey,
        step: LAST,
        originTransform: {},
        finalTransform: {}
      };
    }
    return null;
  }
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
      step: LAST,
      transformKey
    };
  }

  componentDidUpdate(pre: ITransformWrapperProps, preState: ITransformWrapperState, snapShot :any) {
    const { transformKey } = pre;
    if (transformKey === this.state.transformKeys) {
      return;
    }
    const lastCompareObject = this.getCompareObject();
    lastCompareObject.finalTransform = this.getOriginTransform();

    if (snapShot) {
      this.moveForward(
        {
          ...snapShot,
          top: snapShot.top,
          left: snapShot.left,
          width: snapShot.width,
          height: snapShot.height
        },
        lastCompareObject
      );
    }
  }

  getTarget() {
    const { children } = this.props;
    return isDOMElement(children as ReactElement<any>) ? this.ref.current : this.ref.current.firstElementChild;
  }
  getOriginTransform() {
    const target = this.getTarget();
    let originStyle :IStyleObject = { transformStr : ''};

    /**
     * only capture translate, scale and rotate, computed style
     * will take precedence over style attribute
     */
    const transformStr : string =
      target.style && target.style.transform
        ? `${target.style.transform} ${
            window.getComputedStyle(target).transform
          }`
        : window.getComputedStyle(target).transform || '';

    originStyle = transformStr.split(" ")
      .filter(fragment =>
        supportedTransform.some(st => fragment.indexOf(st) === 0)
      )
      .reduce((ors , fragment) => {
        let matched = null;
        if ((matched = fragment.match(REX_ROTATE))) {
          ors.rotate = matched[1];
        } else if ((matched = fragment.match(REX_TRANSLATE))) {
          const movePart = matched[1];
          if (movePart.indexOf(",") > 0) {
            ors.translateX = movePart.split(",")[0];
            ors.translateY = movePart.split(",")[1];
          } else if (fragment.indexOf("translateY") >= 0) {
            ors.translateY = movePart;
          } else {
            ors.translateX = movePart;
          }
        } else if ((matched = fragment.match(REX_SCALE))) {
          const scale = matched[1];
          if (scale.indexOf(",") > 0) {
            ors.scaleX = scale.split(",")[0];
            ors.scaleY = scale.split(",")[1];
          } else if (fragment.indexOf("translateY") >= 0) {
            ors.scaleY = scale;
          } else if (fragment.indexOf("translateX") >= 0) {
            ors.scaleX = scale;
          } else {
            ors.scaleX = ors.scaleY = scale;
          }
        }
        return ors;
      }, originStyle);

    originStyle.transformStr = transformStr
      .split(" ")
      .filter(fragment =>
        supportedTransform.some(st => fragment.indexOf(st) === 0)
      )
      .join(" ");
    return originStyle;
  }

  getCompareObject() {
    const target = this.getTarget();
    const { transform, opacity } = target.style;
    const oStyle :IStyleObject = {transformStr : ''};
    if (transform !== undefined) {
      const matched = transform.match(/\((\d+)deg/);
      if (matched) {
        oStyle.rotate = matched[1];
      }
    } else {
      oStyle.rotate = "0";
    }
    if (opacity !== "") {
      oStyle.opacity = opacity;
    } else {
      oStyle.opacity = window.getComputedStyle(target).opacity || "1";
    }
    return Object.assign(target.getBoundingClientRect(), oStyle);
  }

  getSnapshotBeforeUpdate(preProps :ITransformWrapperProps) {
    const { transformKey } = preProps;
    const { transformKey: currentKey } = this.props;
    if (transformKey === currentKey) {
      return null;
    }
    const compareObj = this.getCompareObject();
    compareObj.originTransform = this.getOriginTransform();
    return compareObj;
  }
  moveForward = (first :any, last :any) => {
    const { step } = this.state;
    const {
      top: lTop,
      left: lLeft,
      width: lWidth,
      height: lHeight,
      opacity: lOpacity,
      rotate: lRotate,
      finalTransform
    } = last;
    const {
      top: fTop,
      left: fLeft,
      width: fWidth,
      height: fHeight,
      opacity: fOpacity,
      rotate: fRotate,
      originTransform
    } = first;

    if (step === LAST) {
      const translateStr =
        lTop !== fTop || lLeft !== fLeft
          ? `translate(${fLeft -
              lLeft +
              (finalTransform.translateX || 0)}px, ${fTop -
              lTop +
              (finalTransform.translateY || 0)}px)`.trim()
          : "";
      const rotateStr =
        fRotate && lRotate !== fRotate ? `rotate(${fRotate}deg)`.trim() : "";

      const scaleStr =
        lWidth !== fWidth || lHeight !== fHeight
          ? `scale(${(lWidth / fWidth) *
              (finalTransform.scaleX || 1)}, ${(lHeight / fHeight) *
              (finalTransform.scaleY || 1)})`.trim()
          : "";
          let revertTransformStr = `${translateStr} ${rotateStr} ${scaleStr}`.trim();
      if(translateStr.length === 0 &&(finalTransform.translateX || finalTransform.translateY )){
        revertTransformStr = `${revertTransformStr} translate(${finalTransform.translateX || 0}, ${finalTransform.translateY || 0})`
      }

      if(rotateStr.length === 0 && finalTransform.rotate){
        revertTransformStr = `${revertTransformStr} rotate(${finalTransform.rotate}deg)`;
      }

      if(scaleStr.length === 0 && (finalTransform.scaleX || finalTransform.scaleY)){
        revertTransformStr = `${revertTransformStr} scale(${finalTransform.scaleX || 1}, ${finalTransform.scaleY || 1})`
      }
      if (revertTransformStr.length > 0 || fOpacity !== lOpacity) {
        this.setState(
          {
            step: TRANSFORM,
            revertTransformStr,
            originTransform,
            finalTransform
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
    const {
      children,
      animationMode = "ease-in-out",
      animationTime = "0.4s"
    } = this.props;
    const { step, revertTransformStr } = this.state;
    let props = { ref: this.ref };

    if (step === TRANSFORM) {
      props = Object.assign(props, {
        style: {
          transform: revertTransformStr!.length > 0 ? revertTransformStr : "none"
        }
      });
    } else if (step > TRANSFORM) {
      props = Object.assign(props, {
        style: {
          transition: `all ${animationMode} ${animationTime}`,
          transform: "none"
        }
      });
    }
    return React.cloneElement(children as ReactElement<any>, props);
  }

  renderComponentChildren() {
    const {
      children,
      animationMode = "ease-in-out",
      animationTime = "0.4s"
    } = this.props;
    const {
      step,
      revertTransformStr = '',
      originTransform ,
      finalTransform
    } = this.state;

    if (step <= LAST) {
      return <div ref={this.ref}> {children}</div>;
    } else {
      let styleProps =
        step === TRANSFORM
          ? {
              style: {
                transform:
                  revertTransformStr.length > 0
                    ? revertTransformStr
                    : originTransform!.transformStr.length > 0
                    ? originTransform!.transformStr
                    : "none"
              }
            }
          : {
              style: {
                transition: `all ${animationMode} ${animationTime}`,
                transform:
                  finalTransform!.transformStr.length > 0
                    ? finalTransform!.transformStr
                    : "none"
              }
            };
      if ( (children as ReactElement).props.style) {
        styleProps = { ...(children as ReactElement).props.style, ...styleProps.style };
      }

      return <div ref={this.ref}> {React.cloneElement(children as ReactElement<any>, { style: styleProps })}</div>;
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
