// App.tsx

import React, { useState } from 'react';
import { configureSdk, useSdk } from 'pop-checkout-sdk';
import './App.css'
import 'pop-checkout-sdk/dist/index.css';

const App = () => {

  const [res, setRes] = useState<any>();

  const [url3ds,] = useState<any>("https://pci-api-demo.airwallex.com/pa/card3ds/hk/three-ds-method/redirect/start?key=3e6a0963-ce81-4d75-bbea-105d8a725f4d");
  const key =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNkayIsIm1lcmNoYW50UmVmZXJlbmNlIjoiZTY2MDRiY2YtYTFiNS00ZTJlLWIzZDAtYTFhNmE4OWIzZjA5IiwiZXhwIjoyMDU3NjA0NzY4LCJpc3MiOiJhcGktdG9rZW4tc2VydmljZSJ9.QrOvIY6GLUF1cmrDX0QJbrcANcAwDkQm8xQ2TYO3EL5zsHH5KjFEGgjdamHz3lbvSddw2G9ZXBiSBnN-IFC-5FFNprcdCx6YiHDESLuLBVnjudLCAOCH6yDC0gqYDQmjUGlb1VpNmVt-9U7e-FGF3N2mxHcrkHWWhlXgJeFT28Na3PXImTXtfi2mtD5iWzb9AW_pu-MeXzWa_TuVgui3RBTQZOYU2XieK8SP91mhM_YOGIvL74GQ1WdySWgx_3Ji-5uaN-qPWi-kFjxPoZfGIs90MRPZ4Q6zmVWt-tM-OlD1e4Oal7WBBhLJlNarxZBgiOQLJRRjdXNHfvK3tCwMPjnSv4T55N40UdZeJDnFEetHGFnYRYYeseTkVykYzPUEQLlYy08vtz7ljhJ9d3VFwOUBij0pEB4S3q2wsON8_Y1DpktSc0e5ic_fzlIFLKLXoIeQ--zNvANQbUvloaZHVaeQZC6wFs9hm8eVLIX0c5SMxe8ONaWKCWPv6IEq2eJOaIzbjNK9C_l72NMVC9Eu4GDhlfo9sHMoA3lNMrLP6K6nXRWFR8xzjVbn5DPOE-wJCSxrGa3ZKhlUGP5Skccyfn-Z-KEUzlB22q1UTJj3byItwLJIw-yfglCZ2a3ypaN7nKCxZF-ATwPw_JySgyBPIu5CQvYe5E7cKerNh6yNUz8";
  configureSdk(key, "dev");

  const [token, setToken] = useState<string>(''); // State to store the token
  const [cardType, setCardType] = useState<string>('');
  const { Widget, Modal3DS } = useSdk();

  // Callback function to handle the received token
  const handleTokenReceived = (receivedToken: string, type: string) => {
    setToken(receivedToken);
    setCardType(type);
    // You can perform further actions with the token here
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModalWithUrlFunc = () => {
    setIsModalOpen(true);

  }
  
  /*useEffect(() => {
    // Configure the SDK with your API key and environment (e.g., "dev")
    if (res.receiptReference && res.reference) {
      callGet3DSResponse();
    }
  }, [key, callGet3DSResponse, res.reference, res.receiptReference]);
*/
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
        {/* Display the token */}
        {token && <div>Received Token: {token}</div>}
        {cardType && <div>cardType: {cardType}</div>}
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
        />
      )}
    </>
  );
};

export default App;
