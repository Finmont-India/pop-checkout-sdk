// Widget.js
import React from 'react';
import CardFormWidget from './CardFormWidget';

export interface WidgetProps {
  customStyles?: {
    widget?: React.CSSProperties; // Styles for the widget container
    cardFormWidget?: {
      cardNumberInput?: React.CSSProperties; // Styles for cardNumber input
      expirationDateInput?: React.CSSProperties; // Styles for expirationDate input
      cvvInput?: React.CSSProperties; // Styles for cvv input
    };
  };
  type: string;
  onTokenReceived: (token: string) => void;
}

/* export interface MySDKConfig {
  apiKey: string;
  baseUrl: string;
} */



const widgetStyles = {
  // Example styles for the widget container
  backgroundColor: 'lightblue',
  padding: '20px',
  border: '1px solid gray',
};

// Widget component
export const Widget: React.FC<WidgetProps> = ({ customStyles, type, onTokenReceived }) => {
 
  if (type.toLowerCase() === "card") {
    const cardWidgetStyles = {
      ...widgetStyles, // Apply the base styles for the widget container
      ...customStyles?.widget, // Apply custom styles for the widget container if provided
    };

    return (
      <div style={cardWidgetStyles}>
        <CardFormWidget customStyles={customStyles?.cardFormWidget}  onTokenReceived={onTokenReceived}/>
      </div>
    );
  } else if (type.toLowerCase() === "wallet") {
    return <h2>WalletMethodForm</h2>;
  } else {
    return <h1>BankMethodForm</h1>;
  }
}

export default Widget;
// sdk.ts
