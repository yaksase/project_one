import PropTypes from 'prop-types'

import s from './Input.module.css';

Input.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string
}

export default function Input({ value, setValue, placeholder = '', className = ''}) {
  const handlePriceChange = (e) => {
    let input = e.target.value.replace(',', '.');

    const validChar = /^([1-9]\d*|0)?(\.\d*)?$/;

    if (validChar.test(input) || input === '') {
      const parts = input.split('.');
      if (parts[0].length > 1 && parts[0].startsWith('0') && !parts[0].startsWith('0.') || input[0] == '.') {
        parts[0] = '0';
      }
      input = parts.join('.');
      setValue(input);
    }
  };

  const handleBlur = () => {
    if (value.endsWith('.')) {
      setValue(value.slice(0, -1));
    }
  };

  return (
    <input className={`${s.input} ${className}`}
      placeholder={placeholder}
      type='text'
      value={value}
      inputMode='decimal'
      onChange={handlePriceChange} 
      onBlur={handleBlur} />
  )
}