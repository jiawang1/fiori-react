import React, { ReactNode, MouseEvent, KeyboardEvent,HTMLAttributes } from 'react';
import { MenuContext } from './Menu';
import { KeyCode } from '../common/utils';
import { IProps } from '../common/BasicTypes';

export interface IMenuItemProps extends IProps<MenuItem> {
  selected?: boolean;
  separator?: ReactNode;
  itemkey: string | number;
}

export default class MenuItem extends React.Component<IMenuItemProps> {
  static contextType = MenuContext;

  onClick = (e: MouseEvent | KeyboardEvent) => {
    const { itemkey } = this.props;
    const { onClick } = this.context;
    onClick(itemkey, e);
  };

  onKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    const { keyCode } = e;
    if (keyCode === KeyCode.ENTER) {
      this.onClick(e);
    }
  };

  render() {
    const { selected, separator, children, className, itemkey, ...rest } = this.props;

    return (
      <React.Fragment>
        <li role="menuitem" className={className} {...rest as HTMLAttributes<HTMLElement>} onClick={this.onClick} onKeyDown={this.onKeyDown} tabIndex={0}>
          {<div className="fd-menu__addon-before">{selected ? <span className="sap-icon--accept" /> : null}</div>}
          {<span className="fd-menu__item">{children}</span>}
        </li>
        {separator && <hr />}
      </React.Fragment>
    );
  }
}
