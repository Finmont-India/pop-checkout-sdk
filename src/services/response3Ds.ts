// Assuming these functions are imported correctly
import axios, { AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { getBaseUrl } from "./FetchBaseUrl";
import { get3DSObject, getCachedRequest } from "./ResponseUtility";
import { initatePayment } from "./sdkFunctions";

export const get3DSResponse = async (receiptReference: string, reference: string) => {
  try {
    const response = await getCachedRequest(reference);
    console.log(response);

    if (response.data.paymentSessionData) {
      const obj3Ds = await get3DSObject(receiptReference);

      if (obj3Ds.data.fullData) {
        const payload = {
          order: response.data.paymentSessionData.order,
          threeDSRequestData: {
            issuer3dsResp: obj3Ds.data.fullData.PaRes,
            session3ds: obj3Ds.data.fullData.MD,
          },
          authzReceiptReference: receiptReference,
          orderPayloadReference: reference,
          integrationType: "sdk",
        };
        const result = await initatePayment(payload);
        return result;
      } else {
        // Return an appropriate error message or handle the error case
        return obj3Ds.data.error || "Missing fullData in 3DS response";
      }
    } else {
      // Return an appropriate error message or handle the error case
      return response.data.error || "Missing paymentSessionData in cached request";
    }
  } catch (error) {
    // Handle any uncaught errors here or log them
    console.error("Error in get3DSResponse:", error);
    return "An error occurred while processing the 3DS response";
  }
};

export const getPaymentResponse = async (recieptReference: string, apiKey: string, env: string) => {
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
      `${BASE_URL}/payments/response/${recieptReference}?platform=sdk`,
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
