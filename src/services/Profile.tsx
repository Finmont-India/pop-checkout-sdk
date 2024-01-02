import { useEffect } from 'react';
import loadjs from 'loadjs';

// ... rest of your code remains the same ...

// Importing the UUID library
const { v4: uuidv4 } = require('uuid');
interface Idftp {
  init: (options: any) => any;
  profileCompleted: () => any;
}

// Declare dftp property on the Window interface

const dftp: Idftp = {
  init: () => {},
  profileCompleted: () => {},
};

  export interface ProfileComponentProps {
    merchantId: number;
    setRef: (ref: string) =>any;
  }
  
  const Profile = ({ merchantId, setRef }:ProfileComponentProps) => {
    const attemptRef = uuidv4();
        console.log("load initiated");
        const options = {
          attemptReference: attemptRef,
          sensitiveFields: ['ccn', 'cvv'],
        };
        console.log(options);
        const getdftp = async () => {
          try {
            const dftpPromise = await loadjs(
              `https://d2f3o27zxe1hmb.cloudfront.net/s/${merchantId}/dNfsXe.js`,
              {
                returnPromise: true,
                // @ts-ignore
                before: (path: any, scriptEl: any) => {
                  scriptEl.crossOrigin = 'use-credentials';
                },
              },
            );
            dftp.init(options);
            return dftpPromise;
          } catch (error) {
            return error;
          }
        };
      
        const getProfiling = () => {
          const dftpPromise = getdftp();
          console.log(dftpPromise);
          dftpPromise
            .then((res: any) => {
              const result = dftp.profileCompleted();
              console.log(result,res);
              setRef(attemptRef);
              return res;
            })
            .catch((error: any) => error);
        };
      
        useEffect(() => {
          getProfiling();
        }, []);
  
    return;
  };
  
  
  export default Profile;