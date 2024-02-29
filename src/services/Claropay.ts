// @ts-ignore 
import sdkclaro from '@claro/sdkclaro'
const { v4: uuidv4 } = require('uuid');

let inst: any
let bootInfo: any;
export const getClaro = async () => {
  try {
    // Initialize Claro instance
    const instance = await
      sdkclaro.getInstance(
        "Xeni",
        () => console.log("onLaunch"),
        () => console.log("onShow"),
        () => console.log("onHide"),
        () => console.log("onError"),
        (eventName: any, eventInformation: any) => {
          console.log(eventInformation, eventName);
          /* if (eventName === "ONBACK") {
            window.history.back();
          } 
          if (eventName === "otp_response") {
            console.log("otp response");
          } */
          if (eventName === 'responseRecharge') {
            console.log(eventInformation, "Log responseRecharge");
          }
          if (eventName === 'sendBootInformation') {
            bootInfo=eventInformation
            console.log(eventInformation, "Send Boot Information");
          }
        },
        {}
      );
    console.log(instance); // This line is within the try block
    inst = instance;
    return instance;
  } catch (error) {
    console.error("Error initializing Claro instance:", error);
    throw error;
  }
}

// This is where you're likely getting the error
console.log(inst);


console.log(bootInfo)

// Function to initialize payment transaction
export const initializePayment = async (dataPayload: any, setRes: any) => {
  const key = uuidv4();
  const data = {
    cardNumber: dataPayload.cardNumber,
    idCom: dataPayload.idCom,
    idGrp: dataPayload.idGrp,
    checkDigit: dataPayload.checkDigit,
    amount: dataPayload.amount,
    appId: bootInfo.profileInformation.isOpen
  };
  const dat = JSON.stringify(data);
  console.log(dat);

  const top = await inst.setState(
    key,
    dat,
    (result: any) => {
      console.log(result);
    },
    (error: any) => {
      console.log(error);
    }
  );
  console.log(top)
  // Define payload for transaction
  const payload = {
    amount: dataPayload.amount,
    category: dataPayload.category,
    claroUserId: dataPayload.claroUserId,
    concept: "",
    description: dataPayload.description,
    feeAmount: 0,
    logo: dataPayload.logo,
    merchantId: dataPayload.merchantId,
    operationId: key,
    payProcessor: { id: 1, name: 'N2', showCVV: false },
    refNumber: "",
    reference: dataPayload.reference,
    totalCommission: 0
  };

  // Execute the transaction
  const resp: any = await inst.transactionPayment(
    payload,
    (result: any) => {
      console.log(result);
    },
    (error: any) => {
      console.log(error);
    }
  );
  setRes(resp);
}
