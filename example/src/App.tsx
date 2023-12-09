// App.tsx

import React, { useState } from 'react';
import { configureSdk, useSdk } from 'pop-checkout-sdk';
import './App.css'
import 'pop-checkout-sdk/dist/index.css';

const App = () => {

  const [res, setRes] = useState<any>();

  const [url3ds,] = useState<any>("https://pci-api-demo.airwallex.com/pa/card3ds/hk/three-ds-method/redirect/start?key=c6408fe6-2ccf-47fd-9e15-10b540817c5c");
  const isHidden:boolean= true;
  const key =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNkayIsIm1lcmNoYW50UmVmZXJlbmNlIjoiOTMzZjA4NDctMTlhYy00NmYyLTkyMzktMGRiZTFhMDY1NDQ5IiwiZXhwIjoyMDU5NDQxNzQyLCJpc3MiOiJhcGktdG9rZW4tc2VydmljZSJ9.p9txS4MeDFfV2sL6WLDxIh39cdyRC9czp0MeOCdFSGyvRjDBFhF1L-Rj4WsCS5MTYumuWJwwZfOg2zTyfsL8AILldC1KiZwIr6ac1TAot3bpyIozLQ87LuozUENbhJvWZLyTnQvthXlIdCtQsyZxXz7CXgL-EjAwcRvXqmgvS0T9pabQLW2s4AmNsJ8Yl2HyQteJY4lV0qnm3n9iexSrWmz2TyLboIaFgMR2BAosmhAprtlgIwPp0jHnF2uTKqpvnzQTGaYpfnzNhYceg4zbpeX9vs8dhg4GoYRfroQrL0THTV95qcnltackdJT09LV2_fM2NKvdBrf5_DDQDY0HIDkNHFgqQ6bKwMK-fay6CFoAP0Wh75TR81qN3o2E9o57tJi_Mh0BHSMkbPgP09FQhLDjkIMncb3kFK_8hqY_jhdSo93OR1U-G5uUXzPixwVny58Xy_D1LUQT404d9ghEQrYEsBjCvT9jbVG19B8gfGxpK2vBeqV8zla7uUBeNriSxpF1H5Km46uNN8yQb1NmW0QPopN4dm8u3npcV9ZFcmuCyJoIfgC9EslHBGMeQf2YE6IQBD26N1L6XNoKYclFFtAJmpK6SNYxS7taB-_tDPTdo5c8MRtpjK1jkAI_im03QZ41S1pWCwpjR1hyp2LurF7ogpkfibDMQ3Zf4UVgiGI";
  configureSdk(key, "stg");

  const { Widget, Modal3DS, getInfo } = useSdk();
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
  
  async function fetchData() {
    try {
      const data = await getInfo();
      console.log('Data:', data);
      // Process the data as needed
    } catch (error) {
      console.error('Error:', error);
      // Handle errors
    }
  }
  
  // Call the fetchData function
  console.log(fetchData());
  console.log(getInfo())
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
    <div>
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
          isAuth={isHidden}
        />
      )}
    </div>
  );
};

export default App;
