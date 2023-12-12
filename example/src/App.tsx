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
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJzY29wZSI6InNkayIsIm1lcmNoYW50UmVmZXJlbmNlIjoiOTMzZjA4NDctMTlhYy00NmYyLTkyMzktMGRiZTFhMDY1NDQ5IiwiZXhwIjoyMDU5NDQxNzQyLCJpc3MiOiJhcGktdG9rZW4tc2VydmljZSJ9.p9txS4MeDFfV2sL6WLDxIh39cdyRC9czp0MeOCdFSGyvRjDBFhF1L-Rj4WsCS5MTYumuWJwwZfOg2zTyfsL8AILldC1KiZwIr6ac1TAot3bpyIozLQ87LuozUENbhJvWZLyTnQvthXlIdCtQsyZxXz7CXgL-EjAwcRvXqmgvS0T9pabQLW2s4AmNsJ8Yl2HyQteJY4lV0qnm3n9iexSrWmz2TyLboIaFgMR2BAosmhAprtlgIwPp0jHnF2uTKqpvnzQTGaYpfnzNhYceg4zbpeX9vs8dhg4GoYRfroQrL0THTV95qcnltackdJT09LV2_fM2NKvdBrf5_DDQDY0HIDkNHFgqQ6bKwMK-fay6CFoAP0Wh75TR81qN3o2E9o57tJi_Mh0BHSMkbPgP09FQhLDjkIMncb3kFK_8hqY_jhdSo93OR1U-G5uUXzPixwVny58Xy_D1LUQT404d9ghEQrYEsBjCvT9jbVG19B8gfGxpK2vBeqV8zla7uUBeNriSxpF1H5Km46uNN8yQb1NmW0QPopN4dm8u3npcV9ZFcmuCyJoIfgC9EslHBGMeQf2YE6IQBD26N1L6XNoKYclFFtAJmpK6SNYxS7taB-_tDPTdo5c8MRtpjK1jkAI_im03QZ41S1pWCwpjR1hyp2LurF7ogpkfibDMQ3Zf4UVgiGI";
  configureSdk(key, "stg");

  const { getInfo, Widget } = useSdk();
  const [, setRecievedObj] = useState<any>()
  const [, setFlag] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onTokenReceived = (data: any) => {
    setRecievedObj(data)
  }

  const openModalWithUrlFunc = () => {
    setIsModalOpen(true);
  }
  const setValues = () =>{
    setIsHidden(true);
    setUrl3ds("https://pci-api-demo.airwallex.com/pa/card3ds/hk/three-ds-method/redirect/start?key=53e923d6-d819-48eb-a9f3-5feba0cc9d14"
    )
  }

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
  
  if(res){
    console.log(res);
  }

  useEffect(() => {
    console.log(isModalOpen); // Log isModalOpen only after the initial render
  }, [isModalOpen]);

 return (
    <div style={{ zIndex: 9999999999 }}>
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
        </div>
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div>
        {console.log("Modal calling twice")}
        <ChildApp
          isModalOpen={isModalOpen}
          isOpen={true}
          onClose={() => {
            setIsModalOpen(false);
            setIsHidden(null);
            setUrl3ds(null);
            console.log("Modal closed");
          }}
          url={url3ds}
          setRes={()=>setRes}
          onAuthClose={() => setFlag(false)}
          isAuth={isHidden}
        />
        </div>
      )}
    </div>
  );
};

export default App;
