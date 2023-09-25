import {
  DEV_CHECKOUT_URL,
  DEV_PAYMENT_URL,
  DEV_TOKENISATION_URL,
  PROD_CHECKOUT_URL,
  PROD_PAYMENT_URL,
  PROD_TOKENISATION_URL,
  STAGE_CHECKOUT_URL,
  STAGE_PAYMENT_URL,
  STAGE_TOKENISATION_URL,
} from "../SupportingUrls"

export const getBaseUrl = (env: string) => {
  let urlObj = {
    checkoutUrl: '',
    paymentUrl: '',
    tokenizationUrl: '',
  }
  if (env.toLowerCase() === 'Prod') {
    urlObj.checkoutUrl = PROD_CHECKOUT_URL;
    urlObj.paymentUrl = PROD_PAYMENT_URL;
    urlObj.tokenizationUrl = PROD_TOKENISATION_URL;
  }
  else if (env.toLowerCase() === 'dev' || env.toLowerCase() === 'test') {
    urlObj.checkoutUrl = DEV_CHECKOUT_URL;
    urlObj.paymentUrl = DEV_PAYMENT_URL;
    urlObj.tokenizationUrl = DEV_TOKENISATION_URL;
  }
  else if (env.toLowerCase() === 'stg') {
    urlObj.checkoutUrl = STAGE_CHECKOUT_URL;
    urlObj.paymentUrl = STAGE_PAYMENT_URL;
    urlObj.tokenizationUrl = STAGE_TOKENISATION_URL;
  }


  return urlObj;

}