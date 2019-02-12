import PropTypes from 'prop-types';
import React, { HTMLAttributes, MouseEvent ,ReactElement} from 'react';
import {IFunctionalProps, IProps} from '../common/IProps';

// ------------------------------------------- Menu ------------------------------------------
export interface IMenuProps extends IProps<Menu> {
  className?: string;
  defaultSelectedKeys: Array<number | string>;
  onClick: (key: string | number, originSelectedKeys: Array<string | number>, e: MouseEvent | KeyboardEvent) => void;
}

export interface IMenuState {
  selectedKeys: Array<string | number>;
}

const noop = ()=>{}; // tslint:disable-line

type MenuClickHandler = (key: string | number, e: MouseEvent) => void;

interface IMenuContext {
  menuState: IMenuState;
  onClick: MenuClickHandler;
}

export const MenuContext = React.createContext<IMenuContext>({ menuState: { selectedKeys: [] }, onClick: noop });

export class Menu extends React.Component<IMenuProps> {
  state: IMenuState = {
    selectedKeys: []
  };

  constructor(props: IMenuProps) {
    super(props);
    const { defaultSelectedKeys = [] } = props;
    this.state = {
      selectedKeys: defaultSelectedKeys
    };
  }

  handleClick: MenuClickHandler = (key, e) => {
    const { onClick } = this.props;
    const { selectedKeys } = this.state;
    const originSelectedKeys = selectedKeys.slice();

    if (selectedKeys.some(sk => sk === key)) {
      selectedKeys.splice(selectedKeys.indexOf(key), 1);
    } else {
      selectedKeys.push(key);
    }

    this.setState({ selectedKeys });

    if (onClick) {
      onClick(key, originSelectedKeys, e);
    }
  };

  render() {
    const { children, className, onClick, defaultSelectedKeys, ...restProps  } = this.props;
    return (
      <MenuContext.Provider value={{ menuState: this.state, onClick: this.handleClick }}>
        <nav className={className} {...restProps as HTMLAttributes<HTMLElement>}>
          <MenuList>{children}</MenuList>
        </nav>
      </MenuContext.Provider>
    );
  }
}

// ---------------------------------------- Menu List ----------------------------------------

export const MenuList = ({ children, className }: IFunctionalProps) => (
  <MenuContext.Consumer>
    {({ menuState: { selectedKeys } }) => (
      <ul className={`fd-menu__list${className ? ` ${className}` : ''}`}>
        {React.Children.map(children as ReactElement<any>, item => {
          const itemkey = item.props.itemkey || item.key;
          const selected = selectedKeys.some(sk => sk === itemkey);
          return React.cloneElement(item, { itemkey, selected });
        })}
      </ul>
    )}
  </MenuContext.Consumer>
);
// ---------------------------------------- Menu Group ----------------------------------------
interface IMenuGroupProps extends IFunctionalProps {
  title: string;
}

export const MenuGroup = ({ title, children, className, ...props }: IMenuGroupProps) => (
  <div className={`fd-menu__group${className ? ` ${className}` : ''}`} {...props}>
    <div className="fd-menu__title">{title}</div>
    <MenuList>{children}</MenuList>
  </div>
);

MenuGroup.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string
};
