import React, { Component, HTMLAttributes } from 'react';
import { IProps, fullStateType } from '../common/BasicTypes';

export interface IAlertProps extends IProps<Alert> {
  dismissable: boolean;
  type: fullStateType;
  url?: string;
  linkText?: string;
  onClose : ()=>{}
}

export class Alert extends Component<IAlertProps, any> {
  constructor(props: IAlertProps) {
    super(props);
    this.state = {
      show: true
    };
  }

  closeAlertHandler = () => {
    const {onClose} = this.props;
    this.setState({
      show: false
    }, onClose);
  };

  render() {
    const { type, url, linkText, dismissable, children, className, ...rest} = this.props;
    return (
      <div>
        {this.state.show && (
          <div className={`fd-alert${dismissable ? ' fd-alert--dismissible' : ''}${type ? ` fd-alert--${type}` : ''}${className ? ` ${className}` : ''}`} role="alert" {...rest as HTMLAttributes<HTMLDivElement>}>
            {dismissable ? <button className="fd-alert__close" aria-controls="j2ALl423" aria-label="Close" onClick={this.closeAlertHandler} /> : null}
            {children}
            {url && (
              <a href={url} className="fd-link">
                {linkText} <span className="sap-icon--arrow-right sap-icon--s" />
              </a>
            )}
          </div>
        )}
      </div>
    );
  }
}
