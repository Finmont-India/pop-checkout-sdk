# pop-checkout-sdk

>pop-checkout-SDK is a tool for simplifying complex tasks in your applications that provides the widgets along with the functions useful in processing the payments.

## Installation

You can install the SDK using npm:

```bash
npm install pop-checkout-sdk

or

yarn add pop-checkout-sdk
```




## Requirements

The minimum supported version of React is v16.0. If you use an older version,
upgrade React to use this library. 


## Getting Started

To get started with pop-checkout-sdk, import it and configure it:

```javascript
import configureSdk from 'pop-checkout-sdk';

configureSdk(apiKey, envValue);;

#### Using hooks

// App.tsx

import React, { useEffect, useState } from 'react';
import { configureSdk, useSdk } from 'pop-checkout-sdk';

import 'pop-checkout-sdk/dist/index.css';

const App = () => {

  const params = new URLSearchParams(window.location.search);
  const recieptRef = params.get("receiptReference");
  const ref = params.get("reference");
  const recieptReference = recieptRef ? recieptRef : '';
  const reference = ref ? ref : '';
  const [token, setToken] = useState(''); // State to store the token

  const key =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6ImFsbCB0b2tlbmlzYXRpb24gYXV0aG9yaXNhdGlvbiIsIm1lcmNoYW50UmVmZXJlbmNlIjoiZTY2MDRiY2YtYTFiNS00ZTJlLWIzZDAtYTFhNmE4OWIzZjA5IiwiZXhwIjoyMDUxMDU4MjM4LCJpc3MiOiJhcGktdG9rZW4tc2VydmljZSJ9.CxeveIRYjl_p8pJ5z7alqj20IhYBr_sq9IWOmzSY1EuTEDhT3rR5cfbmfaZtnL-vyhPUI46hZMNzz2bXNGmtrdrcXyank1OZIChTa-tsR4ZT08u3aN56KzzDSB9j-l08NdNgTWIctWp5pUfCm0to_MjlagrznoYghyu-RbP51Kf85kaH2SlKTFInwWIaT5L_5eDEGERItSFsh67L5Oev44VpAlxKSUpRqpgf9Ej6jTXzqUGhn_a0qwPwLBd7zTC7qsnKNt_VVDe2O3ddgs9FGJMkvWNiLwEqz47ffP4nsm-9q52cSH3gylfx8z8wEs0ZL9ZcGTUb0BEwnFpadO3hZbTMVEUjoHzQZloRXVJg3vTzl1z23wF0ra7N18KY69VT4cc_m76eYYU-QyqaGfi-dxUrJlZzdx1bVkDMnsZyK3MC4TGnhV9TGWbkPNaxxxJGIlrcUQnaZRm494zpIOHAMpoCKpYe1yxF-0qKH5_sr4qYkpKuEy_d1mn74Oy0p2fqaXLqnmbsg1ALcQt5zgL-WyKpo8n_n4EHf7YuN6ZrJl23l-0VEo9AG-7kcK1l2icjfPFL5-_rTa04E_DeuCowBOBWgXqqpvhE5W3OASc8cy9pN2pMbOZYfD_r2vVw8OMHCmFMceIZgkprP4j_hDe1Ml3LoAdtFUtux8jSrOte6T4"; // Replace with your API key

  const customStyles = {
    widget: {
      backgroundColor: 'white',
      width: '50%',
      maxWidth: '80%',
      padding: '20px',
      border: '1px solid gray',
    },
    cardFormWidget: {
      // Define custom styles for CardFormWidget here
    },
  };
  const order={
    amount: {
        currency: "GBP",
        value: 100
    },
    customerEmail: "shopper@gmail.com",
    order: {
        reference: "1255",
        orderPayloadReference : "8bb1558a-21ac-43c6-8c20-de6c5572023e"
    },
    billingAddress: {
        city: "Berlin",
        country: "CA",
        houseNumberName: "Laurens Cl",
        name: "John Doe",
        postalCode: "872823",
        stateProvince: "Berl",
        street: "Laurens"
    },
    browserInfo: {
        acceptHeader: "*/*",
        colorDepth: 24,
        ip: "192.168.12.1",
        javaEnabled: true,
        jsEnabled: true,
        language: "EN",
        name: "Firefox",
        screenHeight: 580,
        screenWidth: 443,
        timezoneOffset: 0,
        userAgent: "Chrome/51.0.2704.103 Safari/537.36",
        version: "15"
    },
    card: {
        token: "67ae538a-1559-4e63-b416-08b91c02368c",
        type: "visa"
    },
    returnUrl:"http://localhost:3001",
}

  // Callback function to handle the received token
  const handleTokenReceived = (receivedToken: string) => {
    setToken(receivedToken);
    // You can perform further actions with the token here
  };

  configureSdk(key, "dev");

  const { get3DSResponse } = useSdk(); // Assuming the SDK provides a function named get3DSResponse

  const callGet3DSResponse = async () => {
    try {
      const result = await get3DSResponse(recieptReference, reference);
      console.log("Payment Result:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };


  useEffect(() => {
    // Configure the SDK with your API key and environment (e.g., "dev")
    if(recieptReference && ref){
      callGet3DSResponse();
    }
  }, [key]);
  const { Widget, authorizeCard } = useSdk();
  const orderReq = {
    ...order,
    card:{
      token: token,
      type: 'visa'
    }
  };
  const { getPaymentResponse } = useSdk()
  const getPaymentStatus = async() => {
    if(recieptReference) {
      const resp = await getPaymentResponse(recieptReference, key, "dev");
      console.log(resp);
    }
  }

  

  // Define a function to handle the authorization
  const handleAuthorizeCard = () => {
    if(token){
      console.log("calling");
    const res= authorizeCard(orderReq);
    console.log(res);
    }
  };

  return (
    <>
      <Widget
        type="card"
        customStyles={customStyles}
        onTokenReceived={handleTokenReceived} // Pass the callback function to the CardFormWidget
      />
      <button onClick={handleAuthorizeCard} type="button">
        Pay Securely
      </button>
      <button type="button" onClick={()=>getPaymentStatus()}  >getPayment status</button>
      <button type="button" onClick={()=>callGet3DSResponse()}  >getPayment 3Ds</button>
    </>
  );
};

export default App;
```


## License

MIT © [Finmont](https://github.com/Finmont-India)
