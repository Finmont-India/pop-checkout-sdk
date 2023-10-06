// App.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { configureSdk, useSdk } from 'pop-checkout-sdk';

import 'pop-checkout-sdk/dist/index.css';

const App = () => {

  const params = new URLSearchParams(window.location.search);
  const recieptRef = params.get("receiptReference");
  const ref = params.get("reference");
  const recieptReference = recieptRef ? recieptRef : '';
  const reference = ref ? ref : '';
  const [paymentResult, setPaymentResult] = useState<any>();
  console.log(paymentResult);

  const key =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6ImFsbCB0b2tlbmlzYXRpb24gYXV0aG9yaXNhdGlvbiIsIm1lcmNoYW50UmVmZXJlbmNlIjoiZTY2MDRiY2YtYTFiNS00ZTJlLWIzZDAtYTFhNmE4OWIzZjA5IiwiZXhwIjoyMDUxMDU4MjM4LCJpc3MiOiJhcGktdG9rZW4tc2VydmljZSJ9.CxeveIRYjl_p8pJ5z7alqj20IhYBr_sq9IWOmzSY1EuTEDhT3rR5cfbmfaZtnL-vyhPUI46hZMNzz2bXNGmtrdrcXyank1OZIChTa-tsR4ZT08u3aN56KzzDSB9j-l08NdNgTWIctWp5pUfCm0to_MjlagrznoYghyu-RbP51Kf85kaH2SlKTFInwWIaT5L_5eDEGERItSFsh67L5Oev44VpAlxKSUpRqpgf9Ej6jTXzqUGhn_a0qwPwLBd7zTC7qsnKNt_VVDe2O3ddgs9FGJMkvWNiLwEqz47ffP4nsm-9q52cSH3gylfx8z8wEs0ZL9ZcGTUb0BEwnFpadO3hZbTMVEUjoHzQZloRXVJg3vTzl1z23wF0ra7N18KY69VT4cc_m76eYYU-QyqaGfi-dxUrJlZzdx1bVkDMnsZyK3MC4TGnhV9TGWbkPNaxxxJGIlrcUQnaZRm494zpIOHAMpoCKpYe1yxF-0qKH5_sr4qYkpKuEy_d1mn74Oy0p2fqaXLqnmbsg1ALcQt5zgL-WyKpo8n_n4EHf7YuN6ZrJl23l-0VEo9AG-7kcK1l2icjfPFL5-_rTa04E_DeuCowBOBWgXqqpvhE5W3OASc8cy9pN2pMbOZYfD_r2vVw8OMHCmFMceIZgkprP4j_hDe1Ml3LoAdtFUtux8jSrOte6T4"; // Replace with your API key

  const widgetStyles = {
    customStyles: {
      widget: {
        width: '60%',
        backgroundColor: 'white',
        padding: '20px',
        border: '1px solid gray',
        borderRadius: '5px',
        display: "flex",
        justifyContent: 'center',
      },
      cardStyles: {
        textStyles: {
          head: {
            color: "red",
            fontSize: "15px",
            fontWidth: "bold",
          },
          body: {
            color: "black",
            fontSize: "15px",
            fontWidth: "normal",
          },
        },
        cardNumberInput: {
          width: '80%',
          backgroundColor: 'white',
          border: '1px solid gray',
          padding: '5px',
          margin: '2px',
          borderRadius: '5px',
          height: '23px',
        },
        expirationDateInput: {
          width: '90%',
          backgroundColor: 'white',
          border: '1px solid gray',
          padding: '5px',
          margin: '2px',
          borderRadius: '5px',
          height: '23px',
        },
        cvvInput: {
          width: '90%',
          backgroundColor: 'white',
          border: '1px solid gray',
          padding: '8px',
          margin: '2px',
          borderRadius: '5px',
        },
        feedback: {
          color: 'red',
          fontSize: '14px',
        },
        invalid: {
          borderColor: 'red',
        },
        success: {
          color: 'green',
          fontWeight: 'bold',
        },
      },
    }
  };

  /* const order = {
    amount: {
      currency: "GBP",
      value: 100
    },
    customerEmail: "shopper@gmail.com",
    order: {
      reference: "1255",
      orderPayloadReference: "8bb1558a-21ac-43c6-8c20-de6c5572023e"
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
      acceptHeader: "",
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
    returnUrl: "http://localhost:3001",
  } */

  configureSdk(key, "dev");

  const [token, setToken] = useState<string>(''); // State to store the token
  const [cardType, setCardType] = useState<string>('');
  const { Widget, get3DSResponse, getPaymentResponse, Modal3DS } = useSdk();

  // Callback function to handle the received token
  const handleTokenReceived = (receivedToken: string, type: string) => {
    setToken(receivedToken);
    setCardType(type);
    // You can perform further actions with the token here
  };
  
  const callGet3DSResponse = useCallback(async () => {
    try {
      const result = await get3DSResponse(recieptReference, reference);
      setPaymentResult(result);
      console.log("Payment Result:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [recieptReference, reference, get3DSResponse]);

  useEffect(() => {
    // Configure the SDK with your API key and environment (e.g., "dev")
    if (recieptReference && reference) {
      callGet3DSResponse();
    }
  }, [recieptReference, reference, callGet3DSResponse]);


  const getPaymentStatus = async () => {
    if (recieptReference) {
      const resp = await getPaymentResponse(recieptReference, key, "dev");
      console.log(resp);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalWithUrlFunc = () => {
    setIsModalOpen(true);

  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Widget
          type="card"
          widgetStyles={widgetStyles}
          onTokenReceived={handleTokenReceived} // Pass the callback function to the CardFormWidget
        />
        {/* Display the token */}
        {token && <div>Received Token: {token}</div>}
        {cardType && <div>cardType: {cardType}</div>}
        <div style={{ display: 'flex', margin: '12px' }}>
          <button
            style={{
              padding: '10px',
              borderRadius: '5px',
              margin: '12px',
            }} type="button"
            onClick={() => getPaymentStatus()}
          >
            getPayment status
          </button>
          <button
            style={{
              padding: '10px',
              borderRadius: '5px',
              margin: '12px',
            }}
            type="button"
            onClick={() => callGet3DSResponse()}
          >getPayment 3Ds</button>
          <button
            style={{
              padding: '10px',
              borderRadius: '5px',
              margin: '12px',
            }}
            type="button"
            onClick={openModalWithUrlFunc}
          >
            get Modal
          </button>

        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        // @ts-ignore
        <Modal3DS
          isOpen={isModalOpen}
          onClose={closeModal} 
          url="https://pop-merchant-portal-dev.finmont.com/login"
        />
      )}
    </>
  );
};

export default App;
