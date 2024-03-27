export const getCardType = (cardNumber: string) => {
  // Define regular expressions for different card types
  const cardTypes = [
    {
      type: 'Visa',
      pattern: /^4/,
    },
    {
      type: 'MasterCard',
      pattern: /^5[1-5]|^2[1-5]/,
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
      pattern: /^3(?:0[0-5]|[68]\d)\d{11}$/,
    },
    {
      type: 'BCcard and DinaCard',
      pattern: /^6555/,
    },
    {
      type: 'JCB',
      pattern: /^(?:2131|1800|35\d{3})/,
    },
    {
      type: 'Maestro',
      pattern: /^(5018|5020|5038|6304|6759|6761|6763)[0-9]{8,15}$/,
    },
    {
      type: 'UnionPay',
      pattern: /^62/,
    },
    // Add more card types here as needed
  ];

  // Check card type based on the card number pattern
  for (const cardType of cardTypes) {
    if (cardType.pattern.test(cardNumber)) {
      console.log(`Card number: ${cardNumber}, Matched pattern for ${cardType.type}: ${cardType.pattern}`);

      return cardType.type;
    }
  }

  return 'Unknown'; // If no match is found
};
