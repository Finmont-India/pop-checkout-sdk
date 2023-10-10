import React from 'react';
import CardFormWidget, { CardFormWidgetProps } from './CardFormWidget';
import './Widget.css';

export interface WidgetProps {
  widgetStyles?: {
    customStyles?: {
      widget?: any;
      cardStyles?: CardFormWidgetProps;
    };
  };
  type: string;
  onTokenReceived: (token: string, cardType: string) => void;
}

export const Widget: React.FC<WidgetProps> = ({ widgetStyles, type, onTokenReceived }) => {
  console.log(widgetStyles);
  // Destructure the customStyles property
  const { customStyles } = widgetStyles || {};

  if (type.toLowerCase() === "card") {
    return (
      <div
      className={`widget-container ${customStyles?.widget || ''}`}
    >
        <CardFormWidget customStyles={customStyles?.cardStyles} onTokenReceived={onTokenReceived} />
      </div>
    );
  } else if (type.toLowerCase() === "wallet") {
    return <h2>WalletMethodForm</h2>;
  } else {
    return <h1>BankMethodForm</h1>;
  }
};


export default Widget;
