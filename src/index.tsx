// sdk.js

import { configure } from './config';
import * as sdkFunctions from './services/sdkFunctions';
import * as response3Ds from './services/response3Ds';
import Widget from './components/Widget';

let isSdkConfigured = false;

// Function to configure the SDK
const configureSdk = (apiKey: string, env: string) => {
  // Configure the SDK with the API key and environment
 configure(apiKey,env)
  
  // Set the configuration flag to true
  isSdkConfigured = true;
};

// Export a function that checks if the SDK is configured and then exports the SDK functions and components
export const useSdk = () => {
  if (!isSdkConfigured) {
    throw new Error('SDK is not configured. Call configureSdk() first.');
  }

  return {
    ...sdkFunctions,
    Widget,
    ...response3Ds,
  };
};

// Export configureSdk function separately
export { configureSdk };
