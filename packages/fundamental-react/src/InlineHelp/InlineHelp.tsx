import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { IFunctionalProps } from '../common/BasicTypes';

export interface IInlineHelpProps extends IFunctionalProps {
  text: string;
  placement: TInlineHelpPosition;
  defaultSpread: boolean;
}

export type TInlineHelpPosition = 'left' | 'right' | 'bottom-right' | 'bottom-left' | 'bottom-center';

export const InlineHelp: (props: IInlineHelpProps) => ReactNode = ({ text, placement, className, defaultSpread = false, ...props }) => {
  const classnames = classNames({
    [`${className}`] : className !== undefined,
    'fd-inline-help__content': !defaultSpread,
    'fd-form__message fd-form__message--help': defaultSpread,
    [`fd-inline-help__content--${placement}`]: !defaultSpread
  });
  const frameClass = classNames({
     'fd-inline-help': ! defaultSpread 
  });
  return (
    <span className={frameClass}>
      <span className={classnames} {...props} style={{float:'left'}}>
        {text}
      </span>
    </span>
  );
};
