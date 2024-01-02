// App.tsx

import React, { useEffect, useState } from 'react';
import { configureSdk, useSdk } from 'pop-checkout-sdk';
import './App.css'
import 'pop-checkout-sdk/dist/index.css';
import ChildApp from './components/ChildApp';

const App = () => {

  const [res, setRes] = useState<any>();
  const [url3ds, setUrl3ds] = useState<string | null>(null);
  const [isHidden, setIsHidden] = useState<boolean | null>(null);
  const key =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6ImF1dGhvcmlzYXRpb24gc2RrIiwibWVyY2hhbnRSZWZlcmVuY2UiOiI5MzNmMDg0Ny0xOWFjLTQ2ZjItOTIzOS0wZGJlMWEwNjU0NDkiLCJleHAiOjE3MzUxMDMyNTYsImlzcyI6ImFwaS10b2tlbi1zZXJ2aWNlIn0.NfDUdvhYlJeu4_yxCtudk-bg3kwEdVwvjZ_e2_aYk3E11orVGd8bl6RC5K-dxhKIRss4M6RwYGBlSDuL-_sFbPXOePOvwSDZmQs6KExv-XjK2-OkYDeEuLpQZSwIwQ3a6wXezG0Wat4Y7XQAmPXjdpnmSL-EV2yG_f2V8keqYaJI_bnvIxu3bBUyDfIcIWyYCX03kZGb8151giVbAEdKc5zN3lyAGlMRl8OyBXd1efoDLEA30JlSIf67YG9iUnKLYvW8DaYNV3za9X-egJ2M7fjCqNmUDdy7UT7_29Wdwa3Dc1Wqzlu6k422FRc6FwgydL7vlL9pkN3skfVhtAupERErliu2l8uJd_8qCMv349gy9XSoRj7hBpkCkMgZnmYvlgkV__aZsTdVE64yQiPM9Fd_O0enKvo1OA7HNKuZlpa2Qe5p7olmlQs3gH-4nPDIbRFH1PrVEqda915tfPJAsL05rCPvuA76xW-0YzpcDCI6PVnKwd1w1tPYeJ-zjpIlBFtTqX3nmdPr7uIrWqCbRL-EyhRbchgxjU00o1uRMg2I-0rNmH_KpPf5poZX10JxC6VkjqDb5sjtM6BNub1mmSX5YFr4yzedNiuLMJOO8QI2VKu0z_FCoFdyXXqeNe6zA_wvrbP12zOATShfgnLC8LRYUebmTjCdde0RkX4Q2GA"
  configureSdk(key, "stg");

  const { getInfo, Widget, authorizeCard, Profile } = useSdk();
  const [, setRecievedObj] = useState<any>()
  const [, setFlag] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>();
  const [ attemptRef, setAttemptRef] = useState<any>(null);
  console.log(paymentResult);
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
    integrationType:"sdk",
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
        version: "15",
        latitude: "12.34",
        longitude: "17.3684567"
    },
    machineIdentifier: {
      manufacturerNumber: "9239823JW",
      osName: "OSX",
      osPlatform: "x64",
      osVersion: "13.0"
  },
    card: {
        token: "67ae538a-1559-4e63-b416-08b91c02368c",
        type: "visa"
    },
    returnUrl:"http://localhost:3001",
}

  const [token, setToken] = useState(''); // State to store the token

  const orderReq = {
    ...order,
    card:{
      token: token,
      type: 'visa'
    }
  };

   // Define a function to handle the authorization
   const handleAuthorizeCard = () => {
    console.log("Finction working/triggerd");
    if(token){
      console.log("calling");
    const res= authorizeCard(orderReq);
    console.log(res);
    setPaymentResult(res);
    }
  };

  const onTokenReceived = (data: any) => {
    setRecievedObj(data)
    console.log(data);
    setToken(data.token)
  }

  const openModalWithUrlFunc = () => {
    setIsModalOpen(true);
  }
  const setValues = () => {
    setIsHidden(true);
    setUrl3ds("https://pci-api-demo.airwallex.com/pa/card3ds/hk/three-ds-method/redirect/start?key=67fc6d82-191d-4042-8a5a-e9330495a6eb"
    )
  }


  console.log(attemptRef);
  
  useEffect(() => {

    setValues();
    async function fetchData() {
      try {
        const data = await getInfo();
        // Process the data as needed
        console.log("Fetch Geolocation:", data)
      } catch (error) {
        console.error('Error:', error);
        // Handle errors
      }
    }
    fetchData();
  }, [getInfo]);
  const merchantId = 519149

  const closeModal = () => {
    setIsModalOpen(false);
    console.log("Modal closed");
  };

  useEffect(() => {
    console.log(isModalOpen);
    if (res) {
      setIsHidden(null);
      setUrl3ds(null);
      console.log("data:", res);
    }
  }, [isModalOpen, res]);
  console.log(token);

  return (
    <div className='h-vh w-vw'>
      <div style={{ zIndex: 9999999999, margin: '30px' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Widget
            type="card"
            onTokenReceived={onTokenReceived}
            widgetStyles={{
              customStyles: {
                // Add your custom widget styles here if needed
              },
            }}
          />
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
              Get Modal
            </button>
            <button type="button" style={{
                padding: '10px',
                borderRadius: '5px',
                margin: '12px',
              }}
              onClick={handleAuthorizeCard}>
        Pay Securely
      </button>
          </div>
        </div>
        {/* Modal */}
        {isModalOpen && !res && isHidden != null && url3ds !== null && (
          <ChildApp
            isModalOpen={isModalOpen}
            isOpen={true}
            onClose={() => closeModal()}
            url={url3ds}
            setRes={data => setRes(data)} // Pass the setRes function directly
            onAuthClose={() => setFlag(false)}
            isAuth={isHidden}
          />
        )}
      </div>
      <div>
      {/* Render the Profile component with the required merchantId */}
      {attemptRef === null?<Profile merchantId={merchantId} setRef={setAttemptRef}/>:null}
    </div>
    </div>
  );
};

export default App;
