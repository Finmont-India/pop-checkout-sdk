import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { getConfig } from "../config";
import { getBaseUrl } from "./FetchBaseUrl";

export const initatePayment = async ( order: any) => {
  const { env, apiKey } = getConfig();
  const BASE_URL = getBaseUrl(env).paymentUrl

  const customHeaders = {
    Authorization: `Bearer ${encodeURIComponent(apiKey)}`,
  };
  const headers = {
    ...customHeaders,
  };
  try {
    // @ts-ignore
    const requestData: AxiosRequestConfig<any> = {
      method: 'post',
      url: `${BASE_URL}/payments/card?platform=sdk`,
      headers,
      data: order,
    };

    const response: AxiosResponse<any> = await axios(requestData);

    return { data: response.data }

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
    throw error.response;
  }
}

export async function authorizeCard(order: { }): Promise<any> {
  const { apiKey, env } = getConfig();
  const customHeaders = {
    Authorization: `Bearer ${encodeURIComponent(apiKey)}`,
  };

  const headers = {
    ...customHeaders,
  };
  try {
    const urlObj = getBaseUrl(env);
    const BASE_URL = urlObj.paymentUrl;
    // @ts-ignore
    const requestData: AxiosRequestConfig<any> = {
      method: 'post',
      url: `${BASE_URL}/payment-session?redirect=false`,
      headers,
      data: order,
    };

    const response: AxiosResponse<any> = await axios(requestData);

    const reqOrder = {
      ...{...order,orderPayloadReference:response.data?.cacheReference},
      integrationType: "sdk",
    };
    
    // Call the initiatePayment function here and store its result
    const paymentResult = await initatePayment(reqOrder);

    // Use the paymentResult as needed
    if (
      !paymentResult.data.response3Ds
     ) {
      return paymentResult.data
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
