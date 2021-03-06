import React from 'react';
import PropTypes from 'prop-types';

// ------------------------------------------------- Form Set -----------------------------------------------
export const FormSet = ({ children, className }) => <div className={`fd-form__set${className ? ` ${className}` : ''}`}>{children}</div>;
FormSet.propTypes = {
  className: PropTypes.string
};

// ------------------------------------------------- Form Item -----------------------------------------------
export const FormItem = ({ isCheck, isInline, children, className }) => (
  <div className={`fd-form__item${isInline ? ' fd-form__item--inline' : ''}${isCheck ? ' fd-form__item--check' : ''}${className ? ` ${className}` : ''}`}>{children}</div>
);
FormItem.propTypes = {
  className: PropTypes.string,
  isCheck: PropTypes.bool,
  isInline: PropTypes.bool
};

// ------------------------------------------------- Form Label ----------------------------------------------
export const FormLabel = ({ required, children, labelText, className, ...props }) => (
  <label className={`fd-form__label${required ? ' is-required' : ''}${className ? ` ${className}` : ''}`} {...props}>
    {labelText ? <span>{labelText}</span> : children}
  </label>
);
FormLabel.propTypes = {
  labelText: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool
};

// ------------------------------------------------- Form Message ----------------------------------------------
export const FormMessage = ({ type, children, className, ...props }) => (
  <span className={`fd-form__message${type ? `  fd-form__message--${type}` : ''}${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </span>
);
FormMessage.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['', 'error', 'warning', 'help'])
};

// ------------------------------------------------- Form Input ----------------------------------------------
export const FormInput = ({ state, className, ...props }) => <input className={`fd-form__control${state ? ` is-${state}` : ''}${className ? ` ${className}` : ''}`} {...props} />;
FormInput.propTypes = {
  className: PropTypes.string,
  state: PropTypes.string
};

// ------------------------------------------------- Form Textarea ----------------------------------------------
export const FormTextarea = ({ children, className, ...props }) => (
  <textarea className={`fd-form__control${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </textarea>
);
FormTextarea.propTypes = {
  className: PropTypes.string
};

// ------------------------------------------------- Form Fieldset ----------------------------------------------
export const FormFieldset = ({ children, className, ...props }) => (
  <fieldset className={`fd-form__set${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </fieldset>
);
FormFieldset.propTypes = {
  className: PropTypes.string
};

// ------------------------------------------------- Form Legend ----------------------------------------------
export const FormLegend = ({ children, className, ...props }) => (
  <legend className={`fd-form__legend${className ? ` ${className}` : ''}`} {...props}>
    {children}
  </legend>
);
FormLegend.propTypes = {
  className: PropTypes.string
};

// ------------------------------------------------- Form Select ----------------------------------------------
export const FormSelect = ({ disabled, children, className, ...props }) => (
  <select className={`fd-form__control${className ? ` ${className}` : ''}`} {...props} disabled={disabled ? true : ''}>
    {children}
  </select>
);
FormSelect.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool
};

// ------------------------------------------------- Form Radio ----------------------------------------------
