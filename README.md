# finmont-checkout-sdk

>finmont-checkout-SDK is a tool for simplifying complex tasks in your applications that provides the widgets along with the functions useful in processing the payments.

## Installation

You can install the SDK using npm:

```bash
npm install finmont-checkout-sdk

or

yarn add finmont-checkout-sdk
```




## Requirements

The minimum supported version of React is v16.0. If you use an older version,
upgrade React to use this library. 


## Getting Started

To get started with finmont-checkout-sdk, import it and configure it:

```javascript
import configureSdk from 'finmont-checkout-sdk';

The SDK offers various components and functionalities. Here's an example of its usage:

  import { useSdk } from 'pop-checkout-sdk';

  const App = () => {
    // State declarations
    // ...

    const { getInfo, Widget, Modal3DS } = useSdk();
    // Other logic and functionalities using SDK

    return (
      // Your React components and logic utilizing the SDK
      // ...
    );
  };

  export default App;

#### Usage

For creating an element import the widget from finmont-checkot-sdk


  const { Widget } = useSdk();

  return (
    <Widget
        type="card"
        customStyles={customStyles}
        onTokenReceived={handleTokenReceived} // Pass the callback function to the CardFormWidget
      />
  )

This widget component provides an element of the type (present only card type is supported) and it validates the the card data and tokenizes it.

params:
      type: <string>: 'card'|'wallet'|'bank'
        Description: specifying the type of element we want to create.
      customStyles:<WidgetProps> : {}
        Description: object to add the custom css to the elements.
      onTokenReceived: (token: string) => void;
        Description: eventHandler that returns the tokenizes the card data.
           

For getting the browser and device information

   useEffect(() => {
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

  

For getting the payment status of a particular payment

  const { getPaymentResponse } = useSdk()

  const getPaymentStatus = async() => {
    if(recieptReference) {
      const resp = await getPaymentResponse(recieptReference, key, "dev");
      console.log(resp);
    }
  }



params:
    For the getPaymentResponse to work , should pass the the recieptReference, key, env as the parameters to the function.

      recieptReference:<string>=''
      key:<string>=''
      env:<string>='prod'|'test'|'dev'|'stg'



For 3DS authentication instead of redirecting to a new page, the Modal3DS  facilitates the functionality in the same page 

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
      const [, setFlag] = useState<boolean>(false);
      const [isModalOpen, setIsModalOpen] = useState(false);

      const onTokenReceived = (data: any) => {
        setRecievedObj(data)
      }

      const setValues = () =>{
        setIsHidden(true); // the isHidden value should be the value from the response object of card api response.data.response3Ds.isHidden 
        setUrl3ds("https:/.............")// the url from the card api i.e response.body.response3Ds.url
      }

      const closeModal = () => {
        setIsModalOpen(false);
      };

      useEffect(() => {
        if (res) {                                                                              
          setIsHidden(null);
          setUrl3ds(null);
        }
      }, [isModalOpen,res]);


    return (
        <div>
          <div>
            {/* statements */}
          </div>
          {/* Modal */}
          {isModalOpen && !res && isHidden!=null && url3ds!==null && (
            <Modal3DS
              isOpen={isModalOpen}
              onClose={()=>closeModal()}
              url={url3ds}
              setRes={data=>setRes(data)} // Pass the setRes function directly
              onAuthClose={() => setFlag(false)}
              isAuth={isHidden}
            />
          )}
        </div>
      );
    };

    export default App;




                NOTE: HAVE TO ENSURE THAT ALL THE STATE VARIABLES ARE SET APPRORIATELY, BEFORE TRIGGERING THE MODAL3DS AND WHILE CLOSING THE MODAL3DS BECAUSE IT WILL LEAD TO UNUSUAL RE-RENDERS.



  params:
      isModalOpen:boolean =  Flag to control modal visibility.
      onClose:  () => void; = eventHandler Callback for closing the modal.
      url: string | null = URL for 3DS authentication.
      setRes: (data: any) => void; = Function to set the response data.
      onAuthClose:  () => void; = Callback for authentication closure.
      isAuth: boolean|null = Flag for authentication status.









