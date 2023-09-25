// Assuming these functions are imported correctly
import axios, { AxiosResponse, RawAxiosRequestHeaders } from "axios";
import { getBaseUrl } from "./FetchBaseUrl";
import { get3DSObject, getCachedsRequest } from "./ResponseUtility";
import { initatePayment } from "./sdkFunctions";

export const get3DSResponse = async (recieptReference: string, reference: string) => {
    const response=await getCachedsRequest(reference);
    
        console.log(response.data);
        const obj3Ds = await get3DSObject(recieptReference);
        console.log(obj3Ds)
        const payload = {
            order : response.data.paymentSessionData.order,
            threeDSRequestData: {
              issuer3dsResp: obj3Ds.data.fullData.PaRes,
              session3ds: obj3Ds.data.fullData.MD,
            },
            authzReceiptReference: recieptReference,
          };
            const result = await initatePayment(reference, payload);
            console.log("result",result);
            return result;
        
   /* try {
        let response = getCachedsRequest(reference);
        response.then((data: any)=>{
        console.log(data)
    }

        // Handle the case when no valid data is available.
        throw new Error("No valid data found.");
    } catch (error) {
        // Handle any errors that might occur during the execution of the code.
        console.error("Error:", error);
        throw error; // Re-throw the error to propagate it up the call stack.
    }
    if (response!== undefined) {
        let Obj3Ds;

        try {
            Obj3Ds = get3DSObject(recieptReference);
        } catch (obj3DsError) {
            console.error("Error fetching Obj3Ds:", obj3DsError);
            throw obj3DsError; // Re-throw the error to propagate it up the call stack.
        }
        console.log(Obj3Ds);
        /*if (Obj3Ds) {
            let PaymentResponse;

            try {
                PaymentResponse = authoriseCard({
                    order: response.data.order,
                    recieptReference,
                    Obj3ds: Obj3Ds.data
                });
            } catch (paymentError) {
                console.error("Error processing PaymentResponse:", paymentError);
                throw paymentError; // Re-throw the error to propagate it up the call stack.
            }

            if (PaymentResponse && PaymentResponse.data) {
                return PaymentResponse.data;
            }
        } 
}}) */
};

export const getPaymentResponse = async(recieptReference: string, apiKey: string, env: string) =>{
    console.log(env)
    const urlObj = getBaseUrl(env);
    console.log(urlObj)
    const BASE_URL = urlObj.paymentUrl;
    console.log(BASE_URL)
    
    const customHeaders: RawAxiosRequestHeaders = {
      "Authorization": `Bearer ${encodeURIComponent(apiKey)}`,
    };
  
    const headers: RawAxiosRequestHeaders = {
      ...customHeaders,
    };
  
    try {
      const response: AxiosResponse = await axios.get(
        `${BASE_URL}/payments/response/${recieptReference}`,
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
    } 
}
