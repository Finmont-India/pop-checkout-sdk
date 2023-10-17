// App.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { configureSdk, useSdk } from 'pop-checkout-sdk';
import './App.css'
import 'pop-checkout-sdk/dist/index.css';

const App = () => {

  const [paymentResult, setPaymentResult] = useState<any>();
  const [res, setRes] = useState<{ reference: string, receiptReference: string }>({ reference: '', receiptReference: '' });
  console.log(paymentResult);

  const [url3ds, seturl3ds] = useState<any>('');
  const key =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6ImFsbCB0b2tlbmlzYXRpb24gYXV0aG9yaXNhdGlvbiIsIm1lcmNoYW50UmVmZXJlbmNlIjoiZTY2MDRiY2YtYTFiNS00ZTJlLWIzZDAtYTFhNmE4OWIzZjA5IiwiZXhwIjoyMDUxMDU4MjM4LCJpc3MiOiJhcGktdG9rZW4tc2VydmljZSJ9.CxeveIRYjl_p8pJ5z7alqj20IhYBr_sq9IWOmzSY1EuTEDhT3rR5cfbmfaZtnL-vyhPUI46hZMNzz2bXNGmtrdrcXyank1OZIChTa-tsR4ZT08u3aN56KzzDSB9j-l08NdNgTWIctWp5pUfCm0to_MjlagrznoYghyu-RbP51Kf85kaH2SlKTFInwWIaT5L_5eDEGERItSFsh67L5Oev44VpAlxKSUpRqpgf9Ej6jTXzqUGhn_a0qwPwLBd7zTC7qsnKNt_VVDe2O3ddgs9FGJMkvWNiLwEqz47ffP4nsm-9q52cSH3gylfx8z8wEs0ZL9ZcGTUb0BEwnFpadO3hZbTMVEUjoHzQZloRXVJg3vTzl1z23wF0ra7N18KY69VT4cc_m76eYYU-QyqaGfi-dxUrJlZzdx1bVkDMnsZyK3MC4TGnhV9TGWbkPNaxxxJGIlrcUQnaZRm494zpIOHAMpoCKpYe1yxF-0qKH5_sr4qYkpKuEy_d1mn74Oy0p2fqaXLqnmbsg1ALcQt5zgL-WyKpo8n_n4EHf7YuN6ZrJl23l-0VEo9AG-7kcK1l2icjfPFL5-_rTa04E_DeuCowBOBWgXqqpvhE5W3OASc8cy9pN2pMbOZYfD_r2vVw8OMHCmFMceIZgkprP4j_hDe1Ml3LoAdtFUtux8jSrOte6T4"; // Replace with your API key

  /* const widgetStyles = {
    customStyles: {
      widget: {
        width: '100%',
        backgroundColor: 'red',
        padding: '20px',
        border: '1px solid gray',
        borderRadius: '5px',
        display: "flex",
        justifyContent: 'center',
      },
      cardStyles: {
        cardFormWidget:{
          backgroundColor: "white",
          padding: '10px',
          borderRadius: '5px',
        },
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
          backgroundColor: 'white',
          border: '1px solid gray',
          padding: '5px',
          margin: '2px',
          borderRadius: '5px',
          height: '23px',
          outline:'none',
        },
        expirationDateInput: {
          backgroundColor: 'white',
          border: '1px solid gray',
          padding: '5px',
          margin: '2px',
          borderRadius: '5px',
          height: '23px',
        },
        cvvInput: {
          backgroundColor: 'white',
          border: '1px solid gray',
          padding: '5px',
          margin: '2px',
          borderRadius: '5px',
          height: '23px',
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
        cardImg: {
          display: 'flex',
          justifyContent: 'center',
        },
      },
    }
  }; */

  const order = {
    amount: {
      currency: "GBP",
      value: 100
    },
    customerEmail: "shopper@gmail.com",
    order: {
      reference: "1255",
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

    orderPayloadReference: "8bb1558a-21ac-43c6-8c20-de6c5572023e",
    browserInfo: {
      acceptHeader: "EN",
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
    returnUrl: "http://localhost:3000",
  }

  configureSdk(key, "dev");

  const [token, setToken] = useState<string>(''); // State to store the token
  const [cardType, setCardType] = useState<string>('');
  const { Widget, get3DSResponse, getPaymentResponse, Modal3DS, authorizeCard } = useSdk();

  // Callback function to handle the received token
  const handleTokenReceived = (receivedToken: string, type: string) => {
    setToken(receivedToken);
    setCardType(type);
    // You can perform further actions with the token here
  };

  const callGet3DSResponse = useCallback(async () => {
    try {
      const result = await get3DSResponse(res.receiptReference, res.reference);
      setPaymentResult(result);
      console.log("Payment Result:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  }, [res.receiptReference, res.reference, get3DSResponse]);


  const getPaymentStatus = async () => {
    if (res.receiptReference) {
      console.log("get resp")
      const resp = await getPaymentResponse(res.receiptReference, key, "dev");
      console.log(resp);
    }
  }

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    console.log("modalClosed");
    setIsModalOpen(false);
  };

  const openModalWithUrlFunc = () => {
    setIsModalOpen(true);

  }
  useEffect(() => {
    // Configure the SDK with your API key and environment (e.g., "dev")
    if (res.receiptReference && res.reference) {
      callGet3DSResponse();
    }
  }, [key, callGet3DSResponse, res.reference, res.receiptReference]);

  const orderReq = {
    ...order,
    card: {
      token: token,
      type: 'visa'
    }
  }; console.log(res);
  // Define a function to handle the authorization
  const handleAuthorizeCard = async () => {
    if (token) {
      console.log("calling");
      const res = await authorizeCard(orderReq);
      console.log(res);
      seturl3ds(res.response3Ds.url)
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Widget
          type="card"
          onTokenReceived={handleTokenReceived}
          widgetStyles={{
            customStyles: {
              widget: 'widget', // Apply the 'widget' class to the entire widget container
              cardStyles: {
                cardFormWidget: 'card-form-widget',
                textStyles: {
                  head: 'head',
                  body: 'body',
                },
                cardNumberInput: 'card-number-input',
                cardImg: 'card-img',
                expirationDateInput: 'expiration-date-input',
                cvvInput: 'cvv-input',
                inputContainer: 'input-container',
                dateContainer: 'date-container',
                // Add more classes here...
              },
            },
          }}
        />
        <button onClick={handleAuthorizeCard} type="button">
          Pay Securely
        </button>
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
            onClick={getPaymentStatus}
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
            onClick={callGet3DSResponse}
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
          url={url3ds}
          setRes={setRes}
        />
      )}
    </>
  );
};

export default App;
