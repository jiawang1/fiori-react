import React, { Component, ReactElement, FunctionComponent, ReactEventHandler } from 'react';
import classNames from 'classnames';
import { IProps, IFunctionalProps } from '../common/BasicTypes';
import { Image } from '../Image';
import Popover from '../Popover';
import Button from '../Button';
import {Counter} from '../Badge';

interface ICompanyLogoProps extends IFunctionalProps {
  url: string;
}
const CompanyLogo: FunctionComponent<ICompanyLogoProps> = ({ url, children, className, ...rest }) => {
  const classes = classNames({
    [`fd-shellbar__logo${ children === undefined? '--image-replaced' : ''}`]: true,
    [`${className}`]: typeof className === 'string'
  });

  return (
    <a href={url} className={classes} {...rest}>
      {children}
    </a>
  );
};

interface IProductMenuProps extends IFunctionalProps {
  title: string;
}

const ProductComponent: FunctionComponent<IProductMenuProps> = ({ title, children, className, ...rest }) => {
  const classes = classNames({
    'fd-shellbar__product': true,
    className
  });
  if (!children) {
    return (
      <div className={classes} {...rest}>
        <span className="fd-shellbar__title">{title}</span>
      </div>
    );
  }

  return (
    <div className={classes} {...rest}>
      <div className="fd-product-menu">
        <Popover
          alignment="right"
          control={
            <Button type="standard" option="shell" htmlType="button" className="fd-product-menu__control fd-shellbar__title fd-product-menu__title">
              {title}
            </Button>
          }
        >
          {children}
        </Popover>
      </div>
    </div>
  );
};

export interface IUserProfileProps extends IFunctionalProps {
  url: string;
}

const UserProfileComponent: FunctionComponent<IUserProfileProps> = ({ url, children }) => {
  return (
    <div className="fd-shellbar__action fd-shellbar__action--show-always">
      <div className="fd-user-menu">
        <Popover
          alignment="right"
          control={
            <Image type="circle" photo={url} size="m" className=" fd-shellbar__title fd-product-menu__title" style={{ maxWidth: 28, maxHeight: 28, minWidth: 28, minHeight: 28 }} /> // should be fixed, why design here is 28px
          }
        >
          {children}
        </Popover>
      </div>
    </div>
  );
};

export interface IActionButtonProps extends IFunctionalProps {
  glyph?: string;
  count ?: number|string
  onClick?: ReactEventHandler;
}

const ActionButton: FunctionComponent<IActionButtonProps> = ({ glyph, onClick, count, className, style, ...rest }) => {

  const classes = classNames({
   'fd-shellbar__action fd-shellbar__action--collapsible':true,
   [`${className}`] :className
  });
  return (
    <div className={classes} style={style && {}} {...rest}>
      <Button type="standard" option="shell" htmlType="button" glyph={glyph} onClick={onClick} >
        {count!== undefined? <Counter notification = {true}>{count}</Counter>:null}
      </Button>
    </div>
  );
};
export interface IShellbarProps extends IProps<Shellbar> {
  companyLogoComponent?: ReactElement<any>;
  productComponent?: ReactElement<any>;
  userProfileComponent: ReactElement<any>;
  actionButtons: Array<ReactElement<any>>
  subTitle?: string;
  withCopilot ?: boolean
}

export class Shellbar extends Component<IShellbarProps> {
  static CompanyLogo = CompanyLogo;
  static ProductComponent = ProductComponent;
  static UserProfileComponent = UserProfileComponent;
  static ActionButton = ActionButton;
  constructor(props: IShellbarProps) {
    super(props);
  }

  render() {
    const { companyLogoComponent, productComponent, subTitle, userProfileComponent, actionButtons,withCopilot = false } = this.props;
    return (
      <div className="fd-shellbar">
        <div className="fd-shellbar__group fd-shellbar__group--start">
          {companyLogoComponent}
          {productComponent}
          {subTitle && <div className="fd-shellbar__subtitle">{subTitle}</div>}
        </div>
        <div className="fd-shellbar__group fd-shellbar__group--middle">{withCopilot && <img src="//unpkg.com/fiori-fundamentals/dist/images/copilot.png" alt="CoPilot" width="30" height="30"/> }</div>
        <div className="fd-shellbar__group fd-shellbar__group--end">{actionButtons} {userProfileComponent} </div>
      </div>
    );
  }
}
