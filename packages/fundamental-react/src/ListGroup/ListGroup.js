import React from 'react';

export const ListGroup = ({ children, className, ...props }) => (
  <ul className={`fd-list-group${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </ul>
);

export const ListGroupItem = ({ children, className, ...props }) => (
  <li className={`fd-list-group__item${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </li>
);

export const ListGroupItemActions = ({ children, className, ...props }) => (
  <span className={`fd-list-group__action${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </span>
);

export const ListGroupItemCheckbox = props => {
  const { children } = props;
  return (
    <div className="fd-form__item fd-form__item--check">
      <label className="fd-form__label" htmlFor="CndSd399">
        <input type="checkbox" className="fd-form__control" id="CndSd399" />
        {children}
      </label>
    </div>
  );
};
