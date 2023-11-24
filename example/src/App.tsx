// App.tsx

import React, { useState } from 'react';
import { configureSdk, useSdk } from 'pop-checkout-sdk';
import './App.css'
import 'pop-checkout-sdk/dist/index.css';

const App = () => {

  const [res, setRes] = useState<any>();

  const [url3ds,] = useState<any>("https://pci-api-demo.airwallex.com/pa/card3ds/hk/three-ds-method/redirect/start?key=e6fb1096-8eb7-431d-842b-444376cc5ae8");
  const key =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNkayIsIm1lcmNoYW50UmVmZXJlbmNlIjoiY2FhZjljMDAtMmJlMC00OGExLWJjZWItMGY4YzkyMTdkZjdjIiwiZXhwIjoyMDYwMTE2ODY0LCJpc3MiOiJhcGktdG9rZW4tc2VydmljZSJ9.nONIY-nWnEnOx9DLtSctEK0ZBYAG6U2xFIyWBuZ3B8hXco8M-fcQTjog2vXmi2YDRR_8TgwzlsfO5QB_ouDCNq3yU6hVRAbzBfQT1Jm0tMD0Qvd2Ntx0yQ5JfhOzxaVPGuA-05CJy_Jt-fI58dMZ90WtTQV9VNJI2IXCtL9WVYyai0SSStzvvtJpT4bbN8etIO2aQzAkethmoT_gDwyhnW8qmtMZifl1sS1y8JhwGIWvRPvqtsp-Bupw--lOuCSt2dRMbk193PE0MN9pGaongCfspNf_IEQmkECXJgjAg3j5ft3EUoGJCNmLMDfAYdOcwMBbk5K_bALBwiUIeDMiVNtU2djm774C_Mv8z392BVqn9MPkAcLEGdlNFMlXgLe3DSFu2mjSuUCK3GL102UrdAEzxEbEk6dfTXLbfHhPlebOz8-s4uJyMzEJXG-wW8g18Uly5fha7o74V87eepwtIK8CseMFXuDIIq50WBM6ljaCUxra8dPNueL8Wg0PA6qEJ5MMCxRL8Zj2g8ZcaNAzk8T1VZc-5J8NowtZii5KXv6ZnyqWfoW1QIAHhNcZPyOB_-dU6s7o_7aCtNoD_f0mNjLi6ww-Vvk7vkd5305vmS4d8nciXzNtk6W2DtHhSzVHIxWM3GcwOIHLI4iUbNgwQb0_nA33IUcDLty_K9n1lgU";
  configureSdk(key, "dev");

  const { Widget, Modal3DS } = useSdk();
  const [recievedObj, setRecievedObj] = useState<any>()
  const [flag, setFlag] = useState<boolean>(false);

  const onTokenReceived = (data: any) => {
    console.log(data);
    setRecievedObj(data)
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalWithUrlFunc = () => {
    setIsModalOpen(true);

  }
  console.log(recievedObj);
  /*useEffect(() => {
    // Configure the SDK with your API key and environment (e.g., "dev")
    if (res.receiptReference && res.reference) {
      callGet3DSResponse();
    }
  }, [key, callGet3DSResponse, res.reference, res.receiptReference]);
*/
  console.log(flag);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <Widget
          type="card"
          onTokenReceived={onTokenReceived}
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
        {/* Display the token */}
        {console.log(res)}
        <div style={{ display: 'flex', margin: '12px' }}>

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
          isOpen={true}
          onClose={closeModal}
          url={url3ds}
          setRes={setRes}
          onAuthClose={setFlag}
        />
      )}
    </>
  );
};

export default App;
