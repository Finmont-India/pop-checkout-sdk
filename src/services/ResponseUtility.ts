import axios, { AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { getConfig } from "../config"
import { getBaseUrl } from "./FetchBaseUrl";

export const getCachedsRequest = async (reference: string) => {
  const { env, apiKey } = getConfig();
  const urlObj = getBaseUrl(env);
  const BASE_URL = urlObj.paymentUrl;

  const customHeaders: RawAxiosRequestHeaders = {
    "Authorization": `Bearer ${encodeURIComponent(apiKey)}`,
  };

  const headers: RawAxiosRequestHeaders = {
    ...customHeaders,
  };

  try {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/payment-session/${reference}?platform=sdk`,
      // @ts-ignore
      { headers }
    );

    return { data: response.data };
    // @ts-ignore
  } catch (error: any) {
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

export const get3DSObject = async (recieptReference: string) => {
  const { env, apiKey } = getConfig();
  const urlObj = getBaseUrl(env);
  const BASE_URL = urlObj.paymentUrl;

  const customHeaders: RawAxiosRequestHeaders = {
    "Authorization": `Bearer ${encodeURIComponent(apiKey)}`,
  };

  const headers: RawAxiosRequestHeaders = {
    ...customHeaders,
  };

  try {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/three-ds-callback?receiptReference=${recieptReference}&platform=sdk`,
      // @ts-ignore
      { headers }
    );

    return { data: response.data };
    // @ts-ignore
  } catch (error: any) {
    // Handle errors
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response Data:', error.response.data);
      console.error('Status Code:', error.response.status);
      return error;
    } else if (error.request) {
      // The request was made, but no response was received
      console.error('No response received from the server');
      return error;
    } else {
      // Something happened in setting up the request that triggered an error
      console.error('Error:', error.message);
      return error;
    }
  }
}
