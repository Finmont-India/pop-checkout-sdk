import React from 'react';

type FormSelectProps = {
  placeholder?: string;
  name: string;
  value: string;
  items: any[];
  hasError: boolean;
  dataCY?: string;
  itemWithValue?: boolean;
  onChange: (element: any) => void;
  onFocus?: (element: any) => void;
};

const FormSelect = ({
  placeholder,
  name,
  value,
  items,
  hasError,
  dataCY,
  onChange,
  itemWithValue = false,
  onFocus,
}: FormSelectProps) => {
  const formSelectContainerStyle: React.CSSProperties = {
    position: 'relative',
    width: '100%',
  };

  const formSelectLabelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.875rem',
    color: '#4a5568',
  };

  const formSelectStyle: React.CSSProperties = {
    marginTop: '0.25rem',
    backgroundColor: '#fff',
    width: '100%',
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem',
    boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    paddingLeft: '0.75rem',
    paddingRight: '2.5rem',
    fontSize: '1rem',
    textAlign: 'left',
    cursor: 'default',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
  };

  const formSelectErrorStyle: React.CSSProperties = {
    marginTop: '0.25rem',
    fontSize: '0.875rem',
    color: '#e53e3e',
    textTransform: 'lowercase',
  };

  return (
    <div style={formSelectContainerStyle}>
      <div>
        <label
          htmlFor={name}
          style={formSelectLabelStyle}
        >
          {placeholder}
        </label>

        <select
          id={name}
          data-cy={dataCY}
          name={name}
          value={value}
          style={{
            ...formSelectStyle,
            borderColor: hasError ? '#e53e3e' : '#d2d6dc',
            color: hasError ? '#e53e3e' : '#4a5568',
            // @ts-ignore
            placeholderColor: hasError ? '#e53e3e' : '#d2d6dc',
            focusBorderColor: hasError ? '#e53e3e' : '#4299e1',
            focusBoxShadow: hasError
              ? '0 0 0 3px rgba(229, 62, 62, 0.25)'
              : '0 0 0 3px rgba(66, 153, 225, 0.25)',
          }}
          onChange={onChange}
          onFocus={onFocus}
        >
          <option value="" disabled>
            {name}
          </option>

          {!itemWithValue
            ? items.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))
            : items.map((item) => (
                <option key={item.key} value={item.value}>
                  {item.name}
                </option>
              ))}
        </select>
      </div>

      {hasError && (
        <p style={formSelectErrorStyle}>
          {name} is required
        </p>
      )}
    </div>
  );
};

export default FormSelect;
