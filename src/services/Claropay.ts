// @ts-ignore 
import sdkclaro from '@claro/sdkclaro'
const { v4: uuidv4 } = require('uuid');

let instance: any;

export const getClaro = async () => {
    console.log(sdkclaro)
    // Initialize Claro instance
    // @ts-ignore
    instance = sdkclaro.getInstance(
      "Xeni",
      () => {
        console.log("onLaunch");
      },
      () => {
        console.log("onShow");
      },
      () => {
        console.log("onHide");
      },
      () => {
        console.log("onError");
      },
      (eventName: any, eventInformation: any) => {
        console.log(eventInformation, eventName);
        if (eventName === "ONBACK") {
          window.history.back();
        }
        if (eventName === "otp_response") {
          console.log("otp response");
        }
        if (eventName === 'responseRecharge') {
          console.log(eventInformation, "Log responseRecharge");
        }
      },
      {}
    );
    console.log(instance)
}

// Function to initialize payment transaction
export const initializePayment = async (cardNumber: string, idCom: string, idGrp: string, checkDigit: number, amount: string, appId: string, setRes: any
    , category: string, claroUserId: string, description: string, logo: string, merchantId: string, reference: string,
)=>{
      console.log("inst.transactionPayment")
      const data = {
        cardNumber: cardNumber,
        idCom: idCom,
        idGrp: idGrp,
        checkDigit: checkDigit,
        amount: amount,
        appId: appId
      };
  
      const key = uuidv4();
      // @ts-ignore
      const top = inst.setState(key, JSON.stringify(data),
        (result: any) => {
          console.log(result);
        },
        (error: any) => {
          console.log(error);
        }
      );
  
      const payload = {
        amount: amount,
        category: category,
        claroUserId: claroUserId,
        concept: "",
        description: description,
        feeAmount: 0,
        logo: logo,
        merchantId: merchantId,
        operationId: "a1",
        payProcessor: { id: 1, name: 'N2', showCVV: false },
        refNumber: "",
        reference: reference,
        totalCommission: 0
      };
      if (top) {
      const resp = instance.transactionPayment(
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
}
