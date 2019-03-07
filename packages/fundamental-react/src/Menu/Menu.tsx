import React, { HTMLAttributes, MouseEvent ,ReactElement, FunctionComponent} from 'react';
import {IFunctionalProps, IProps} from '../common/BasicTypes';

// ------------------------------------------- Menu ------------------------------------------
export interface IMenuProps extends IProps<Menu> {
  defaultSelectedKeys: Array<number | string>;
  showSelection ?: boolean;
  onClick: (key: string | number, originSelectedKeys: Array<string | number>, e: MouseEvent | KeyboardEvent) => void;
}

export interface IMenuState {
  selectedKeys: Array<string | number>;
}

const noop = ()=>{}; // tslint:disable-line

type MenuClickHandler = (key: string | number, e: MouseEvent) => void;

interface IMenuContext {
  menuState: IMenuState;
  showSelection : boolean;
  onClick: MenuClickHandler;
}

export const MenuContext = React.createContext<IMenuContext>({ menuState: { selectedKeys: [] }, onClick: noop, showSelection:true });

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
    const { children, className, onClick, defaultSelectedKeys, showSelection = true, ...restProps  } = this.props;
    return (
      <MenuContext.Provider value={{ menuState: this.state, onClick: this.handleClick ,showSelection }}>
        <nav className={className} {...restProps as HTMLAttributes<HTMLElement>}>
          <MenuList>{children}</MenuList>
        </nav>
      </MenuContext.Provider>
    );
  }
}

// ---------------------------------------- Menu List ----------------------------------------

export const MenuList :FunctionComponent<IFunctionalProps>  = ({ children, className }: IFunctionalProps) => (
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

export const MenuGroup : FunctionComponent<IMenuGroupProps> = ({ title, children, className, ...props } :IMenuGroupProps) => (
  <div className={`fd-menu__group${className ? ` ${className}` : ''}`} {...props}>
    <div className="fd-menu__title">{title}</div>
    <MenuList>{children}</MenuList>
  </div>
);

