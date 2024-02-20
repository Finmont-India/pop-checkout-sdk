// @ts-ignore 
import sdkclaro from '@claro/sdkclaro'
const { v4: uuidv4 } = require('uuid');

let inst: any
export const getClaro = async () => {
  try {
      // Initialize Claro instance
      const instance = await
          sdkclaro.getInstance(
              // Instance initialization parameters...
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
      const top = inst.setState(key, data,
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
      const resp = inst.transactionPayment(
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
