import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { getConfig } from "../config";
import { getBaseUrl } from "./FetchBaseUrl";

let ref='';
export function createHiddenForm(data: any ) {
  console.log(data);
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = data.response3Ds.url;

  const paReqInput = document.createElement('input');
  paReqInput.type = 'hidden';
  paReqInput.name = 'PaReq';
  paReqInput.value = data.response3Ds.reference;
  form.appendChild(paReqInput);

  const mdInput = document.createElement('input');
  mdInput.type = 'hidden';
  mdInput.name = 'MD';
  mdInput.value = data.response3Ds.token;
  form.appendChild(mdInput);

  const termUrlInput = document.createElement('input');
  termUrlInput.type = 'hidden';
  termUrlInput.name = 'TermUrl';
  termUrlInput.value = "";
  form.appendChild(termUrlInput);

  form.addEventListener('submit', () => {
    console.log('Form submitted to initiate 3D Secure flow.');
  });

  return form;
}



export const initatePayment = async (ref: string, order: any) => {
  console.log("initiate")
  console.log(order, ref);
  const { env, apiKey } = getConfig();
  const BASE_URL = getBaseUrl(env).paymentUrl
  const reqOrder = {
    ...{...order,orderPayloadReference:ref},
    integrationType: "sdk",
  };

  const customHeaders = {
    Authorization: `Bearer ${encodeURIComponent(apiKey)}`,
  };

  const headers = {
    ...customHeaders,
  };
  console.log("postSession triggered")
  try {
    // @ts-ignore
    const requestData: AxiosRequestConfig<any> = {
      method: 'post',
      url: `${BASE_URL}/payments/card`,
      headers,
      data: reqOrder,
    };

    const response: AxiosResponse<any> = await axios(requestData);

    console.log(response.data);
    return { data: response.data}

    // @ts-ignore
  } catch (error: AxiosError<any>) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response Data:', error.response.data);
      console.error('Status Code:', error.response.status);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error:', error.message);
    }

    // Return an error object or throw an error as needed
    throw error;
  }
}


export async function authorizeCard(order: { amount: any; returnUrl: any }): Promise<any> {
  const { apiKey, env } = getConfig();
  console.log(getConfig())
  const customHeaders = {
    Authorization: `Bearer ${encodeURIComponent(apiKey)}`,
  };

  const headers = {
    ...customHeaders,
  };
  console.log("function triggered");
  try {
    const urlObj = getBaseUrl(env);
    console.log(env);
    const BASE_URL = urlObj.paymentUrl;
    console.log(BASE_URL);
    // @ts-ignore
    const requestData: AxiosRequestConfig<any> = {
      method: 'post',
      url: `${BASE_URL}/payment-session?redirect=false`,
      headers,
      data: order,
    };

    const response: AxiosResponse<any> = await axios(requestData);

    console.log(response.data);
    ref = response.data.cacheReference
    console.log(ref);
    
    // Call the initiatePayment function here and store its result
    const paymentResult = await initatePayment(response.data.cacheReference, order);

    // Use the paymentResult as needed
    
    console.log(paymentResult);
    if (
      paymentResult.data.response3Ds &&
      paymentResult.data.response3Ds.url
    ) {
      console.log("3ds authentication initated")
      const { receiptReference } = response.data;
      const checkoutCallbackURL = `${BASE_URL}/three-ds-callback?receiptReference=${receiptReference}&reference=${ref}`
      console.log(checkoutCallbackURL);
      window.location.href=paymentResult.data.response3Ds.url

      // const form = createHiddenForm(paymentResult.data ); // Create the hidden form using the imported function
      // document.body.appendChild(form);
      // form.submit();
    
      console.log('End of 3ds post')
  }
    // @ts-ignore
  } catch (error: AxiosError<any>) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response Data:', error.response.data);
      console.error('Status Code:', error.response.status);
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received from the server');
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error:', error.message);
    }

    // Return an error object or throw an error as needed
    throw error;
  }
}

