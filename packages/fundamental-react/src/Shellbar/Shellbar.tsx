import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import { IProps, IFunctionalProps } from '../common/BasicTypes';
import { Image } from '../Image';

interface ICompanyLogoProps extends IFunctionalProps {
  url: string;
}
const CompanyLogo = ({ url, children, className, ...rest }: ICompanyLogoProps) => {
  const classes = classNames({
    [`fd-shellbar__logo${React.isValidElement(children) && children.type === Image ? '--image-replaced' : ' '}`]: true,
    className: typeof className === 'string'
  });

  return (
    <a href={url} className={classes} {...rest}>
      {children}
    </a>
  );
};

export interface IShellbarProps extends IProps<Shellbar> {
  companyLogoComponent: ReactElement<any>;
}

export class Shellbar extends Component<IShellbarProps> {
  static CompanyLogo = CompanyLogo;
  constructor(props: IShellbarProps) {
    super(props);
  }

  render() {
    const { companyLogoComponent } = this.props;
    return (
      <div className="fd-shellbar">
        <div className="fd-shellbar__group fd-shellbar__group--start">{companyLogoComponent}</div>
        <div className="fd-shellbar__group fd-shellbar__group--middle">middle</div>
        <div className="fd-shellbar__group fd-shellbar__group--end">end</div>
      </div>
    );
  }
}
