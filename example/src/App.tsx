// App.tsx

import React, { useState } from 'react';
import { configureSdk, useSdk } from 'pop-checkout-sdk';
import './App.css'
import 'pop-checkout-sdk/dist/index.css';

const App = () => {

  const [res, setRes] = useState<any>();

  const [url3ds,] = useState<any>("https://pci-api-demo.airwallex.com/pa/card3ds/hk/three-ds-method/redirect/start?key=9fa6a254-be66-4cd9-b465-12ee8dd80c85");
  const isHidden:boolean= false;
  const key =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNkayIsIm1lcmNoYW50UmVmZXJlbmNlIjoiNGI3MDQ0NzUtNGM5Zi00ODI0LWE0OTAtNDM1ZDgyZTFmNzk2IiwiZXhwIjoyMDYxODU3MzY3LCJpc3MiOiJhcGktdG9rZW4tc2VydmljZSJ9.eyVDm6YMtq5ytvf3nTqc_qRxdFTY2AphU1KuD_ymZkAMNCWBSMPeBILPmoztpFsARpZyXJ61F-eoFVREs682LwkwEopzuGsQ-9KuPvJDxa-iPwsCaoB35mHt9UOGf0nd63z8_Ubg5a4Y9jqoyeqZn_tBCIaZAoEENe8jVGEaWFsZl2JaCpuJIGA-SRVGAabTNR_vo5F-QqsQRn7v-AxxAtCKHYC0LC-L8vVrVB1whHKQXagKonBSIQZuK1Gfm7hRaU_hrTBKblIZY82LUy3n3jA2WZtiB3hWZl_AUpKGxL8bJbi-KcdhxW4BwXscKsnhwqEF6k-McuoeOeC0mnAMmODxYYzP3t4xSHHEsD7soFXCmJNYWVSCDEYGUEFgLS-y9_Z5I6o2loUxaH4rikDyEub7sh-vP7hTyIE0UupeJNgBq2vqPeRvy2znbMjplCZ86gYtTwVWnU1PqaWRFfvSz4SZQ9B6kd2fXJjUTOXHHUV94YO2lRj7gkg9T0-Wpe_4HNI84tnheoqbtyxVkJ7-lC2O3NhBR4IFIvLscZtsCqq_i9qwMiaP3yHj_fBMMP5YMVd1g3FaXnkKSOEVNdgIaM4GSqAzGEhLAHMc0pHgAQm4kTqt0Gquzh4bfafg6tvMjJX6BbS0LSX_NH_oqA_Du1DdXfKyNF1hppUe-iDteus";
  configureSdk(key, "dev");

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
