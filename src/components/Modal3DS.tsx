import React, { useRef, useEffect, useCallback, useState } from "react";
import { Modal } from "react-responsive-modal";
import { get3DSResponse } from "../services/response3Ds";
import 'react-responsive-modal/styles.css';
import { SpinnerCircular } from "spinners-react";
import styles from './Modal3DS.css'

const Modal3DS: React.FC<{ isOpen: boolean; onClose: () => void; url: string; setRes: any }> = ({ isOpen, onClose, url, setRes }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeUrl, setIframeUrl] = useState(url);


  const callGet3DSResponse = useCallback(async (receiptRef: string, ref: string) => {
    try {
      const result = await get3DSResponse(receiptRef, ref);
      setRes(result);
      onClose();
    } catch (error) {
      console.error("Error:", error);
      setRes(error)
    }
  }, [get3DSResponse]);

  const checkIframeUrl = useCallback((currentIframe) => {
    if (currentIframe) {
      if (currentIframe && currentIframe !== url) {
        const query = currentIframe.split('?')[1] || '';
        const paramPairs = query.split('&');
        const params = {};

        for (const pair of paramPairs) {
          const [key, value] = pair.split('=');
          params[key] = value;
        }

        const reference = params['reference'];
        const receiptReference = params['receiptReference'];
        if (receiptReference && reference) {
          callGet3DSResponse(receiptReference, reference);
        }
      }
    }
  }, [url, setRes]);


  useEffect(() => {
    const handleMessage = (event: any) => {
      // Check if the message is from the iframe and if data is a URL
      if (event.source === iframeRef.current?.contentWindow && typeof event.data === 'string') {
        // Handle the URL received from the iframe
        setIframeUrl('');
        checkIframeUrl(event.data);
      }
    };

    // Add an event listener to listen for messages
    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [iframeRef]);

  return (
    <Modal
        open={isOpen}
        onClose={onClose}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        center
        classNames={{
          overlay: styles.customOverlay,
          modal: styles.customModal,
        }}
      >
        <div style={{width:"100%", height:"100%", display:"flex", justifyContent:"center", alignItems:"center"}}>
      {iframeUrl !== url ? ( // Display loading spinner while isLoading is true
        <SpinnerCircular
          size={40} // Adjust the size as needed
          thickness={70} // Adjust the thickness as needed
          speed={50} // Adjust the speed as needed
        />
      ) : (
        <iframe
          title="Form"
          ref={iframeRef}
          src={iframeUrl}
          id="myIframe"
          style={{
            pointerEvents: "auto",
            border: "none",
            width: "90%",
            height: "100%",
            outline: "none",
          }}
        />
      )}
      </div>
    </Modal>
  );
};

export default Modal3DS;
