import axios, { AxiosResponse, RawAxiosRequestHeaders } from 'axios'; // Import AxiosRequestConfig

import { getConfig } from '../config';
import { getBaseUrl } from './FetchBaseUrl';


// Add a flag to track whether card token creation is in progress
let isCreateCardTokenInProgress = false;



export const createCardToken = async (cardData: any) => {

  if (isCreateCardTokenInProgress) {
    console.log('Card token creation is already in progress.');
    return; // Don't start a new request if one is already ongoing
  }

  const { env, apiKey } = getConfig();
  const urlObj = getBaseUrl(env);
  const BASE_URL = urlObj.tokenizationUrl;
  
  const customHeaders: RawAxiosRequestHeaders = {
    "Authorization": `Bearer ${encodeURIComponent(apiKey)}`,
  };

  const headers: RawAxiosRequestHeaders = {
    ...customHeaders,
  };

  try {
    const response: AxiosResponse = await axios.post(
      `${BASE_URL}/tokeniser?schema=card`,
      cardData,
      // @ts-ignore
      {headers}
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
  } finally {
    isCreateCardTokenInProgress = false; // Reset the flag when the request is complete
  }
};
