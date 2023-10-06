import React from 'react';
import CardFormWidget from './CardFormWidget';

export interface WidgetProps {
  widgetStyles?: {
    customStyles: {
      widget?: React.CSSProperties;
      cardStyles?: {
        textStyles:{
          head?: React.CSSProperties;
          body?: React.CSSProperties;
        }
        cardNumberInput?: React.CSSProperties;
        expirationDateInput?: React.CSSProperties;
        cvvInput?: React.CSSProperties;
        feedback?: React.CSSProperties;
        invalid?: React.CSSProperties;
        success?: React.CSSProperties;
      };
    };
  };
  type: string;
  onTokenReceived: (token: string, cardType: string) => void;
}

const defaultStyles = {
  
  widget: {
    backgroundColor: 'lightgray',
    padding: '20px',
    border: '1px solid gray',
    borderRadius: '5px',

  },
  cardStyles: {
    textStyles:{
      head:{
        color:"red",
        fontSize: "15px",
        fontWidth: "bold",
      },
      body:{
        color:"black",
        fontSize: "15px",
        fontWidth: "normal",
      },
    },
    cardNumberInput: {
      width: '80%',
      backgroundColor: 'white',
      border: '1px solid gray',
      padding: '6px',
      borderRadius: '5px',
    },
    expirationDateInput: {
      width: '80%',
      backgroundColor: 'white',
      border: '1px solid gray',
      padding: '6px',
      margin: '2px',
      borderRadius: '5px',
    },
    cvvInput: {
      width: '80%',
      backgroundColor: 'white',
      border: '1px solid gray',
      padding: '6px',
      margin: '2px',
      borderRadius: '5px',
    },
    feedback: {
      color: 'red',
      fontSize: '14px',
    },
    invalid: {
      borderColor: 'red',
    },
    success: {
      color: 'green',
      fontWeight: 'bold',
    },
  },
};

// Widget component
export const Widget: React.FC<WidgetProps> = ({ widgetStyles, type, onTokenReceived }) => {
  const mergedWidgetStyles = {
    ...defaultStyles.widget,
    ...(widgetStyles?.customStyles?.widget || {}), // Merge widget styles if they exist
  };
  const mergedCardStyles = {
    ...defaultStyles.cardStyles,
    ...(widgetStyles?.customStyles?.cardStyles || {}), // Merge card styles if they exist
  };

  if (type.toLowerCase() === "card") {
    return (
      <div style={mergedWidgetStyles}>
        <CardFormWidget customStyles={mergedCardStyles} onTokenReceived={onTokenReceived} />
      </div>
    );
  } else if (type.toLowerCase() === "wallet") {
    return <h2>WalletMethodForm</h2>;
  } else {
    return <h1>BankMethodForm</h1>;
  }
};

export default Widget;
