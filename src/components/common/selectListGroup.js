import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";

const SelectListGroup = ({
  name,
  value,
  error,
  info,
  label,
  id,
  onChange,
  options
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return(
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-mute">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired

};

SelectListGroup.defaultProps = {
  error: '',
  info: '',
  label: '',
  id: ''

};

export default SelectListGroup;
