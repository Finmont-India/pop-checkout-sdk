import React, { useEffect, useRef } from 'react';

const { v4: uuidv4 } = require('uuid');

const NethoneProfiling: React.FC<{ srcUrl: string; setRes: any }> = ({ srcUrl, setRes }) => {
  const attemptReference = useRef<string>(uuidv4());

  const sendForm = () => {
    console.log("Profiling");
    // @ts-ignore
    if (window.dftp) {
      // @ts-ignore
      window.dftp
        .profileCompleted()
        .then(() => { setRes(attemptReference.current) })
        // @ts-ignore
        .catch((err) => console.error("Profiling failed with err: " + err))

    } else {
      console.log("end")
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = srcUrl;
    script.async = true;
    script.id = 'SCRIPT_TAG_ID';
    script.crossOrigin = 'use-credentials';
    script.type = 'text/javascript';

    const options = {
      attemptReference: attemptReference.current,
      sensitiveFields: ['ccn', 'cvv']
    };
    script.onload = () => {

      // @ts-ignore
      if (window.dftp) {
        // @ts-ignore
        window.dftp.init(options);
      } else {
        console.error('dftp object not available');
      }
    };

    document.body.appendChild(script);

    return () => {
      // Clean up script when unmounting component
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <form id="payment-form">
        {/* Your form elements */}
      </form>
      <button id="send" onClick={sendForm}>Pay</button>
    </div>
  );
};

export default NethoneProfiling;
