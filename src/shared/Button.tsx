/* eslint-disable react/require-default-props */
import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'tiny' | 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  moreClass?: string;
  children: React.ReactNode;
}

const Button = React.forwardRef(
  (
    {
      size = 'medium',
      type = 'button',
      color = 'primary',
      moreClass = '',
      children,
      ...props
    }: ButtonProps,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    const sizes = {
      tiny: 'leading-4 text-sm px-3 py-2',
      small: 'px-4 py-2 text-sm',
      medium: 'px-4 py-2 text-base',
      large: 'px-6 py-3 text-base',
    };

    const colors = {
      primary: 'text-white bg-blue-900 hover:bg-blue-500 border-transparent',
      secondary: 'text-gray-700 bg-white hover:bg-gray-50 border-gray-300',
    };

    return (
      <button
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        // eslint-disable-next-line react/button-has-type
        type={type}
        ref={ref}
        className={classNames(
          'flex justify-center border rounded-md shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-bay-of-many-500 capitalize',
          colors[color],
          sizes[size],
          moreClass,
        )}
      >
        {children}
      </button>
    );
  },
);

export default Button;
