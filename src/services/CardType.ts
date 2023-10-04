export const getCardType=(cardNumber: any)=> {
    // Define regular expressions for different card types
    const cardTypes = [
      {
        type: 'Visa',
        pattern: /^4/,
      },
      {
        type: 'MasterCard',
        pattern: /^5[1-5]/,
      },
      {
        type: 'American Express',
        pattern: /^3[47]/,
      },
      {
        type: 'Discover',
        pattern: /^6(?:011|5)/,
      },
      {
        type: 'Diners Club',
        pattern: /^3(?:0[0-5]|[68][0-9])/,
      },
      {
        type: 'JCB',
        pattern: /^(?:2131|1800|35\d{3})/,
      },
    ];
  
    // Check card type based on the card number pattern
    for (const cardType of cardTypes) {
      if (cardType.pattern.test(cardNumber)) {
        return cardType.type;
      }
    }
  
    return 'Unknown'; // If no match is found
  }