import React, { ReactNode } from 'react';
import { IFunctionalProps } from '../common/BasicTypes';

export interface IInlineHelpProps extends IFunctionalProps{
  text : string,
  placement:TInlineHelpPosition
}

export type TInlineHelpPosition = 'left' | 'right' | 'bottom-right' | 'bottom-left' | 'bottom-center';

export const InlineHelp : (props :IInlineHelpProps )=> ReactNode = ({ text, placement, className, ...props }) => (
  <span className="fd-inline-help">
    <span className={`fd-inline-help__content fd-inline-help__content--${placement}${className ? ` ${className}` : ''}`} {...props}>
      {text}
    </span>
  </span>
);
