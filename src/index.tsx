import { configure } from './config';
import * as sdkFunctions from './services/sdkFunctions';
import * as response3Ds from './services/response3Ds';
import Modal3DS from './components/Modal3DS';
import Widget from './components/Widget';
import NethoneProfiling from './services/NethoneProfiling';
import * as fetchInfo from './services/fetchInfo';

let isSdkConfigured = false;

const configureSdk = (apiKey: string, env: string) => {
  // Configure the SDK with the API key and environment
  configure(apiKey, env);
  
  // Set the configuration flag to true
  isSdkConfigured = true;
};

export const useSdk = () => {
  if (!isSdkConfigured) {
    throw new Error('SDK is not configured. Call configureSdk() first.');
  }

  return {
    ...sdkFunctions,
    Widget,
    ...response3Ds,
    Modal3DS,
    ...fetchInfo,
    NethoneProfiling,
  };
};

export { configureSdk };
