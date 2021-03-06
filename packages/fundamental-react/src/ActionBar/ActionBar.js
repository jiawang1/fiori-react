import React from 'react';
import PropTypes from 'prop-types';

export const ActionBar = ({ mobile, width, children, className, ...props }) => (
  <React.Fragment>
    {mobile ? (
      <div style={{ width: width || '319px' }}>
        <div className={`fd-action-bar${className ? ` ${className}` : ''}`} {...props}>
          {children}
        </div>
      </div>
    ) : (
      <div className={`fd-action-bar${className ? ` ${className}` : ''}`} {...props}>
        {children}
      </div>
    )}
  </React.Fragment>
);

ActionBar.propTypes = {
  className: PropTypes.string,
  mobile: PropTypes.bool,
  width: PropTypes.string
};

export const ActionBarBack = ({ onClick, className, ...props }) => (
  <div className={`fd-action-bar__back${className ? ` ${className}` : ''}`} {...props}>
    <button type="button" className="fd-button--light fd-button--compact sap-icon--nav-back" onClick={onClick} />
  </div>
);

ActionBarBack.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};

export const ActionBarHeader = ({ title, description, className, ...props }) => (
  <div className={`fd-action-bar__header${className ? ` ${className}` : ''}`} {...props}>
    <h1 className="fd-action-bar__title">{title}</h1>
    <p className="fd-action-bar__description">{description} </p>
  </div>
);

ActionBarHeader.propTypes = {
  className: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string
};

export const ActionBarActions = ({ children, className, ...props }) => (
  <div className={`fd-action-bar__actions${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </div>
);
