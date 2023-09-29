import React, { useEffect, useState } from 'react';
import { createCardToken } from '../services/PaymentService';
import { getConfig } from '../config';
import { getCardType } from '../services/CardType';

interface CardFormWidgetProps {
  customStyles?: {
    textStyles?: {
      head?: React.CSSProperties;
      body?: React.CSSProperties;
    };
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

  const styles = { ...customStyles };

  const validateCardNumber = (value: string) => /^[0-9]{0,16}$/.test(value);

  useEffect(() => {
    if (isCardNumberValid && isExpirationDateValid && isCVVValid && cardNumber && expirationDate && cvv) {
      // Create an object with card data
      const cardData = {
        number: cardNumber.replace(/\s+/g, ''), // Remove spaces
        expiryMonth: expirationDate.split('/')[0],
        expiryYear: expirationDate.split('/')[1],
        cvc: cvv,
        cardType: getCardType(cardNumber),
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
  
    // Limit the input to exactly 16 digits
    if (numericValue.length > 16) {
      return; // Do nothing if more than 16 digits
    }
  
    // Format with spaces: add a space every four digits
    let formattedValue = numericValue.replace(/(\d{4})(?=\d)/g, '$1 ');
  
    const isValid = formattedValue === '' || (validateCardNumber(numericValue) && numericValue.length === 16);
  
    setCardNumber(formattedValue);
    setIsCardNumberValid(isValid);
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

    // Validate the formatted value with a regular expression (accepts MM/YYYY or MM/YY)
    const isValid = formattedValue === '' || /^([1-9]|0[1-9]|1[0-2])\/(20\d{2}|[0-9]{2})$/.test(formattedValue);

    setExpirationDate(formattedValue);
    setIsExpirationDateValid(isValid);
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
  };

  return (
    <div id="card-form-widget">
      <h2 style={styles.textStyles?.head}>Enter Card Details</h2>
      <form>
        <div style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <label style={styles.textStyles?.body} htmlFor="cardNumber">Card Number </label>
            <img width="40" height="34" src="https://img.icons8.com/3d-fluency/94/visa.png" alt="visa" />
            <img width="40" height="34" src="https://img.icons8.com/3d-fluency/94/amex.png" alt="amex" />
            <img width="40" height="34" src="https://img.icons8.com/3d-fluency/94/mastercard.png" alt="mastercard" />
          </div>
          <div >
            <input
              type="text"
              id="cardNumber"
              placeholder="Card Number"
              value={cardNumber}
              onChange={handleCardNumberChange}
              style={{
                ...styles.cardNumberInput,
                ...(isCardNumberValid ? {} : styles.invalid),
                width: '70%',
                marginLeft: '5px',
              }}
            />
          </div>
        </div>
        {!isCardNumberValid && <div className="error">Invalid Card Number</div>}
        <div style={{ marginBottom: '10px' }}>
          <label style={styles.textStyles?.body} htmlFor="expirationDate">Expiration Date </label>
          <div>
            <input
              type="text"
              id="expirationDate"
              placeholder="MM/YYYY"
              value={expirationDate}
              onChange={handleExpirationDateChange}
              style={{
                ...styles.expirationDateInput,
                ...(isExpirationDateValid ? {} : styles.invalid),
                width: '70%',
                marginLeft: '5px',
                marginTop: '7px',
              }}
            />
          </div>
        </div>
        {!isExpirationDateValid && <div className="error">Invalid Expiration Date</div>}
        <div>
          <label style={styles.textStyles?.body} htmlFor="cvv">CVV </label>
          <div>
            <input
              type="text"
              id="cvv"
              placeholder="CVV"
              value={cvv}
              onChange={handleCVVChange}
              style={{
                ...styles.cvvInput,
                ...(isCVVValid ? {} : styles.invalid),
                width: '70%',
                marginLeft: '5px',
                marginTop: '7px',
              }}
            />
          </div>
        </div>
        {!isCVVValid && <div className="error">Invalid CVV</div>}
      </form>
    </div>
  );
};

export default CardFormWidget;
