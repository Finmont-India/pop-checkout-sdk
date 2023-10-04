import { ExclamationCircleIcon } from '@heroicons/react/solid';
import React from 'react';

export type FormInputProps = {
  type: string;
  name: string;
  value: string;
  placeholder: string;
  required?: boolean;
  pattern?: string;
  hasError: boolean;
  dataCY?: string;
  onChange: (element: any) => void;
  onFocus?: (element: any) => void;
};

const FormInput = ({
  type = 'text',
  name,
  value,
  placeholder,
  pattern,
  required,
  hasError,
  dataCY,
  onChange,
  onFocus,
}: FormInputProps): JSX.Element => {
  const formInputContainerStyle: React.CSSProperties = {
    position: 'relative',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  };

  const formInputLabelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.875rem',
    color: '#5d6470',
  };

  const formInputStyle: React.CSSProperties = {
    margin: '0.25rem 0',
    width: '100%',
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    paddingLeft: '0.75rem',
    fontSize: '1rem',
    cursor: 'default',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  };

  const formInputErrorIconStyle: React.CSSProperties = {
    position: 'absolute',
    bottom: '-3px',
    top: '3px',
    right: '0',
    paddingRight: '0.75rem',
    display: 'flex',
    alignItems: 'center',
    pointerEvents: 'none',
  };

  const formInputErrorIconSvgStyle: React.CSSProperties = {
    height: '1.25rem',
    width: '1.25rem',
    color: '#e53e3e',
  };

  const formInputErrorTextStyle: React.CSSProperties = {
    marginTop: '0.25rem',
    fontSize: '0.875rem',
    color: '#e53e3e',
  };

  return (
    <div style={formInputContainerStyle}>
      <div>
        <label htmlFor={name} style={formInputLabelStyle}>
          <span style={{ textTransform: 'capitalize' }}>{placeholder}</span>
          <input
            id={name}
            type={type}
            name={name}
            data-cy={dataCY}
            value={value}
            style={{
              ...formInputStyle,
              borderColor: hasError ? '#e53e3e' : '#d2d6dc',
              color: hasError ? '#e53e3e' : '#4a5568',
              // @ts-ignore
              placeholderColor: hasError ? '#e53e3e' : '#d2d6dc',
              focusBorderColor: hasError ? '#e53e3e' : '#4299e1',
              focusBoxShadow: hasError
                ? '0 0 0 3px rgba(229, 62, 62, 0.25)'
                : '0 0 0 3px rgba(66, 153, 225, 0.25)',
            }}
            placeholder={placeholder}
            pattern={pattern}
            required={required}
            onChange={onChange}
            onFocus={onFocus}
          />
        </label>
        {hasError && (
          <div style={formInputErrorIconStyle}>
            <ExclamationCircleIcon
              style={formInputErrorIconSvgStyle}
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {hasError && (
        <p style={formInputErrorTextStyle} id={`${name}-error`}>
          {name} is required
        </p>
      )}
    </div>
  );
};

export default FormInput;
