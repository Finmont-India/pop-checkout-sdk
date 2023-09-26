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
import configureSdk from 'pop-checkout-sdk';

configureSdk(apiKey, envValue);;

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
           
  
For getting the 3ds respose of the present transaction working on 

  First extract the recieptReference and the reference from the url params in the window object

    const params = new URLSearchParams(window.location.search);
    const recieptRef = params.get("receiptReference");
    const ref = params.get("reference");
    const recieptReference = recieptRef ? recieptRef : '';
    const reference = ref ? ref : '';

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
  }, [key]); // here key is the apiKey that is used while configuring the sdk in your application in frontend

  params:
    For the get3DSResponse to work , should pass the the recieptReference and the reference as the parameters to the function.

      recieptReference:<string>=''
      reference:<string>=''


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





