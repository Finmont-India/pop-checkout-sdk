import React, { useState } from 'react';
import Cards, { ReactCreditCardProps } from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import CardForm from './CardForm';

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
  onTokenReceived: (token: string, cardType: string) => void;
}

const cardContainerStyle: React.CSSProperties = {
  maxWidth: '70%',
  margin: '0 auto',
  padding: '20px',
};

const cardPreviewStyle: React.CSSProperties = {
  width:'20px',
  height: '10px',
  marginBottom: '10px',
};

const Card = (
  // eslint-disable-next-line
  customStyles: CardFormWidgetProps,
  onTokenReceived: (token: string, cardType: string) => void,
): JSX.Element => {
  console.log(customStyles);

  const useCard = () => {
    let defaultCard: ReactCreditCardProps = {
      cvc: '',
      expiry: '',
      name: '',
      issuer: '',
      number: '',
      focused: undefined,
    };
    const [card, setCard] = useState<ReactCreditCardProps>(defaultCard);

    const handleSetCard = (key: string, value: any) => {
      setCard({
        ...card,
        [key]: value,
      });
    };

    return {
      card,
      handleSetCard,
    };
  };

  // For now, get order data from the one set in the store by the merchant page
  const { card, handleSetCard } = useCard();

  return (
    <div style={cardContainerStyle}> {/* Apply your inline CSS style here */}
      <div style={cardPreviewStyle}> {/* Apply your inline CSS style here */}
        <Cards
          number={(card.number as string).replace(/\d{4}(?=\d{4})/g, '####')}
          cvc={(card.cvc as any).replace(/\d{1}(?=\d{1})/g, '*')}
          expiry={card.expiry}
          focused={card.focused}
          name={card.name}
          issuer={card.issuer}
          preview
        />
      </div>

      <CardForm
        card={card}
        handleSetCard={handleSetCard}
        onTokenReceived={onTokenReceived}
      />
    </div>
  );
};

export default Card;
