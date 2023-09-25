import React, { useEffect, useState } from 'react';
import { createCardToken } from '../services/PaymentService';
import { getConfig } from '../config';
import { getCardType } from '../services/CardType';

interface CardFormWidgetProps {
  customStyles?: {
    cardNumberInput?: React.CSSProperties;
    expirationDateInput?: React.CSSProperties;
    cvvInput?: React.CSSProperties;
    feedback?: React.CSSProperties;
    invalid?: React.CSSProperties;
    success?: React.CSSProperties;
  };
  onTokenReceived: (token: string) => void;
}

export const CardFormWidget: React.FC<CardFormWidgetProps> = ({ customStyles, onTokenReceived }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCVV] = useState('');
  const [isCardNumberValid, setIsCardNumberValid] = useState(true);
  const [isExpirationDateValid, setIsExpirationDateValid] = useState(true);
  const [isCVVValid, setIsCVVValid] = useState(true);

  const defaultStyles = {
    inputContainer: {
      padding:'15px',
    },
    cardNumberInput: {
      border: '1px solid #ccc',
      padding: '10px',
      width: '100%',
    },
    expirationDateInput: {
      border: '1px solid #ccc',
      padding: '10px',
      width: '100%',
    },
    cvvInput: {
      border: '1px solid #ccc',
      padding: '10px',
      width: '100%',
    },
    invalid: {
      borderColor: 'red',
    },
    success: {
      borderColor: 'green',
    },
  };

  const styles = { ...defaultStyles, ...customStyles };

  const validateCardNumber = (value: string) => /^[0-9]{0,16}$/.test(value);

  useEffect(() => {
    if (isCardNumberValid && isExpirationDateValid && isCVVValid && cardNumber && expirationDate && cvv) {
      // Create an object with card data
      const cardData = {
        number: cardNumber.replace(/\s+/g, ''), // Remove spaces
        expiryMonth: expirationDate.split('/')[0],
        expiryYear: expirationDate.split('/')[1],
        cvc: cvv,
        cardType:getCardType(cardNumber),
      };
      console.log("creating card token");
      // Call the payment service to create a card token 
      createCardToken(cardData)
        .then((token) => {
          // Handle the token (e.g., send it to your server for further processing)
          console.log('Card Token:', token);
          onTokenReceived(token?.data.key);
        })
        .catch((error) => {
          // Handle errors
          console.error('Tokenization Error:', error);
          onTokenReceived(Error.name);
        });
    }
  }, [isCardNumberValid, isExpirationDateValid, isCVVValid, cardNumber, expirationDate, cvv]);
  

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
  
    // Remove all non-numeric characters and spaces
    const numericValue = newValue.replace(/[^\d]/g, '');
  
    // Format with spaces: add a space every four digits
    let formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1 ');
  
    // Limit the input to a maximum of 19 characters (16 digits + 3 spaces)
    if (formattedValue.length > 19) {
      formattedValue = formattedValue.slice(0, 19);
    }
  
    const isValid = formattedValue=== '' || validateCardNumber(numericValue) && numericValue.length === 16;
  
    setCardNumber(formattedValue);
    setIsCardNumberValid(isValid);
  
    // Show an error message when the input is not valid, not 16 digits, or more than 19 characters
    if (!isValid || numericValue.length !== 16 || formattedValue.length > 19) {
      setIsCardNumberValid(false);
    } else {
      setIsCardNumberValid(true); // Clear the error message
    }
  };
  const currentConfig = getConfig() as { env: string, apiKey: string };
   console.log(currentConfig.apiKey);
  const handleExpirationDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
  
    // Remove all non-numeric characters and spaces
    const numericValue = newValue.replace(/[^\d]/g, '');
  
    // Limit the input to a maximum of 5 characters (e.g., 12/23)
    if (numericValue.length > 7) {
      return;
    }
  
    // Format the input as "MM/YY"
    let formattedValue = numericValue;
    if (numericValue.length > 2) {
      formattedValue = `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
    }
  
    // Validate the formatted value with a regular expression
    const isValid = formattedValue=== '' || /^([1-9]|0[1-9]|1[0-2])\/\d{4}$/.test(formattedValue);
  
    setExpirationDate(formattedValue);
    setIsExpirationDateValid(isValid);
  
    // Show an error message when the input is not valid
    if (!isValid) {
      setIsExpirationDateValid(false);
    } else {
      setIsExpirationDateValid(true); // Clear the error message
    }
  };
  

  const handleCVVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
  
    // Remove all non-numeric characters
    const numericValue = newValue.replace(/[^\d]/g, '');
  
    // Limit the input to a maximum of 3 digits
    if (numericValue.length > 3) {
      return;
    }
  
     // Check if the numericValue is empty (no digits) and avoid showing an error message
    const isValid = numericValue === '' || /^\d{3}$/.test(numericValue);

  
    setCVV(numericValue);
    setIsCVVValid(isValid);
  
    // Show an error message when the input is not valid
    if (!isValid) {
      setIsCVVValid(false);
    } else {
      setIsCVVValid(true); // Clear the error message
    }
  };
  

  return (
    <div id="card-form-widget">
      <h2>Enter Card Details</h2>
      <form style={{...styles.inputContainer}}>
        <label htmlFor="cardNumber">Card Number:</label>
        <input
          type="text"
          id="cardNumber"
          placeholder="Card Number"
          value={cardNumber}
          onChange={handleCardNumberChange}
          style={{
            ...styles.cardNumberInput,
            ...(isCardNumberValid ? {} : styles.invalid),
          }}
        />
        {!isCardNumberValid && <div className="error">Invalid Card Number</div>}<br />

        <label htmlFor="expirationDate">Expiration Date:</label>
        <input
          type="text"
          id="expirationDate"
          placeholder="MM/YYYY"
          value={expirationDate}
          onChange={handleExpirationDateChange}
          style={{
            ...styles.expirationDateInput,
            ...(isExpirationDateValid ? {} : styles.invalid),
          }}
        />
        {!isExpirationDateValid && <div className="error">Invalid Expiration Date</div>}<br />

        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          placeholder="CVV"
          value={cvv}
          onChange={handleCVVChange}
          style={{
            ...styles.cvvInput,
            ...(isCVVValid ? {} : styles.invalid),
          }}
        />
        {!isCVVValid && <div className="error">Invalid CVV</div>}<br />

        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

export default CardFormWidget;
