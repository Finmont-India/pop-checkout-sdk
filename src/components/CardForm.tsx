import React, { ChangeEvent, useEffect, useState } from 'react';
import Payment from 'payment';
import { ReactCreditCardProps } from 'react-credit-cards';
import { Controller, useForm } from 'react-hook-form';
import 'react-credit-cards/es/styles-compiled.css';
import FormSelect from '../shared/FormSelect';
import FormInput from '../shared/FormInput';
import { getCardType } from '../services/CardType';
import { createCardToken } from '../services/PaymentService';

type CardFormProps = {
  card: ReactCreditCardProps;
  handleSetCard: (key: string, value: any) => void;
  onTokenReceived: (token: string, cardType: string) => void;
};

function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}

export function formatCreditCardNumber(value: string) {
  if (!value) {
    return value;
  }

  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
    case 'amex':
      nextValue = `${clearValue.slice(0, 4)}${clearValue.slice(
        4,
        10,
      )}${clearValue.slice(10, 15)}`;
      break;
    case 'dinersclub':
      nextValue = `${clearValue.slice(0, 4)}${clearValue.slice(
        4,
        10,
      )}${clearValue.slice(10, 14)}`;
      break;
    default:
      nextValue = `${clearValue.slice(0, 4)}${clearValue.slice(
        4,
        8,
      )}${clearValue.slice(8, 12)}${clearValue.slice(12, 19)}`;
      break;
  }

  return nextValue.trim();
}

export function formatCVC(
  value: string,
  allValues: any = {},
) {
  const clearValue = clearNumber(value);
  let maxLength = 4;

  if (allValues.number) {
    const issuer = Payment.fns.cardType(allValues.number);
    maxLength = issuer === 'amex' ? 4 : 3;
  }

  return clearValue.slice(0, maxLength);
}

const currentYear = new Date().getFullYear();
// @ts-ignore
const monthsArr = Array.from({ length: 12 }, (x, i) => {
  const month = i + 1;
  return month <= 9 ? `0${month}` : `${month}`;
});
const yearsArr = Array.from(
  { length: 20 },
  (_x, i) => `${currentYear + i}`,
);

const cardContainerStyle: React.CSSProperties = {
  marginTop: '8px',
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '4px',
};

const cardPreviewErrorStyle: React.CSSProperties = {
  color: '#e53e3e',
  fontSize: '0.875rem',
  marginTop: '0.5rem',
};


const cardInputContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
};


const cardSelectContainerStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '0.5rem',
};


const cardSelectMonthStyle: React.CSSProperties = {
  gridColumn: 'span 1',
};

const cardSelectYearStyle: React.CSSProperties = {
  gridColumn: 'span 1',
};

const hiddenInputStyle: React.CSSProperties = {
  display: 'none',
};

const CardForm = ({
  card,
  handleSetCard,
  onTokenReceived,
}: CardFormProps): JSX.Element => {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const { control: subControl } = useForm();
  const [tokenizationError, setTokenizationError] = useState<any>('');

  const validateAndProcessCard = () => {
    const isCardNumberValid = Payment.fns.validateCardNumber(
      card.number.toString()
    );
    const isExpirationDateValid = Payment.fns.validateCardExpiry(
      card.expiry.toString()
    );
    const isCVVValid = Payment.fns.validateCardCVC(
      card.cvc.toString(),
      Payment.fns.cardType(card.number.toString())
    );

    if (isCardNumberValid && isExpirationDateValid && isCVVValid) {
      // Create an object with card data
      const cardData = {
        number: card.number.toString().replace(/\s+/g, ''), // Remove spaces
        expiryMonth: card.expiry.toString().split('/')[0],
        expiryYear: card.expiry.toString().split('/')[1],
        cvc: card.cvc,
        cardType: getCardType(card.number),
      };
      // Call the payment service to create a card token
      const response = createCardToken(cardData);
      response.then((token) => {
        // Handle the token (e.g., send it to your server for further processing)
        if (token?.success === true) {
          onTokenReceived(token.data, getCardType(card.number));
          setTokenizationError(null);
          return;
        }
        return setTokenizationError(
          'Card verification failed, check the card details.'
        );
      });
    }
  };

  // Update this useEffect to call validateAndProcessCard whenever card data changes
  useEffect(() => {
    validateAndProcessCard();
  }, [card]);

  const getExpiry = (): { month: string; year: string } => {
    if (!card.expiry) {
      return { month: '', year: '' };
    }
    const s = card.expiry.toString().split('/');
    return { month: s[0], year: s[1] || '' };
  };

  const setExpiry = (evt: any, isMonth = true) => {
    const { value } = evt.target;
    const s = card.expiry.toString().split('/');
    const toSet = isMonth ? `${value}/${s[1] || ''}` : `${s[0]}/${value}`;

    setErrors({
      ...errors,
      [isMonth ? 'month' : 'year']: !value.trim(),
    });

    handleSetCard('expiry', toSet);
  };

  const handleInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    let { value } = target;

    setErrors({
      ...errors,
      [target.name]: !value.trim(),
    });

    if (target.name === 'number') {
      value = formatCreditCardNumber(target.value);
    } else if (target.name === 'cvc') {
      value = formatCVC(target.value);
    }

    handleSetCard(target.name, value);
  };

  const handleInputFocus = ({ target }: any) => {
    handleSetCard('focused', target.name);
  };

  return (
    <div style={cardContainerStyle}>
      {tokenizationError && (
        <div style={cardPreviewErrorStyle}>{tokenizationError}</div>
      )}

      <Controller
        name="card.number"
        control={subControl}
        render={() => (
          <FormInput
            type="tel"
            name="number"
            dataCY="number"
            value={card.number as any}
            placeholder="Card Number E.g.: 49..., 51..., 36..., 37..."
            hasError={errors?.number}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        )}
      />

      <Controller
        name="card.name"
        control={subControl}
        render={() => (
          <FormInput
            type="text"
            name="name"
            dataCY="name"
            value={card.name as any}
            placeholder="Name"
            hasError={errors?.name}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
        )}
      />

      <div style={cardInputContainerStyle}>
        <div style={cardSelectContainerStyle}>
          <div style={cardSelectMonthStyle}>
            <Controller
              name="card.expiryMonth"
              control={subControl}
              render={() => (
                <FormSelect
                  name="Month"
                  placeholder='Expiry month'
                  dataCY="month"
                  hasError={errors?.month}
                  value={getExpiry().month}
                  items={monthsArr}
                  onChange={(s: any) => setExpiry(s)}
                  onFocus={() =>
                    handleInputFocus({ target: { name: 'expiry' } })
                  }
                />
              )}
            />
          </div>

          <div style={cardSelectYearStyle}>
            <Controller
              name="card.expiryYear"
              control={subControl}
              render={() => (
                <FormSelect
                  name="Year"
                  placeholder='Expiry year'
                  dataCY="year"
                  hasError={errors?.year}
                  value={getExpiry().year}
                  items={yearsArr}
                  onChange={(s: any) => setExpiry(s, false)}
                  onFocus={() =>
                    handleInputFocus({ target: { name: 'expiry' } })
                  }
                />
              )}
            />
          </div>
        </div>

        <Controller
          name="card.cvc"
          control={subControl}
          render={() => (
            <FormInput
              type="tel"
              name="cvc"
              dataCY="cvc"
              value={card.cvc as any}
              placeholder="CVC"
              hasError={errors?.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
          )}
        />
      </div>

      <input
        type="hidden"
        name="issuer"
        value={card.issuer}
        style={hiddenInputStyle}
      />
    </div>
  );
};

export default CardForm;
