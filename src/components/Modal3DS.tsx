import React, { useRef, useEffect, useCallback, useState } from "react";
import { Modal } from "react-responsive-modal";
import { get3DSResponse } from "../services/response3Ds";
import 'react-responsive-modal/styles.css';
import { SpinnerCircular } from "spinners-react";
import styles from './Modal3DS.css'

const Modal3DS: React.FC<{
  isOpen: boolean;
  isAuth: boolean;
  onClose: any;
  onAuthClose: any;
  url: string;
  setRes: any;
}> = ({ isOpen, isAuth, onClose, url, setRes, onAuthClose }) => {
  console.log(onAuthClose)
  const isMounted = useRef<boolean>(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [flag, setFlag] = useState<boolean>(isAuth);
  const [iframeUrl, setIframeUrl] = useState(url);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [ref, setRef] = useState<string>('');
  const [recRef, setRecRef] = useState<string>('');

 useEffect(() => {
    return () => {
      isMounted.current = false; // Set isMounted to false on unmount
    };
  }, []);


  const callGet3DSResponse = useCallback(async (
    receiptRef: string,
    ref: string,
  ) => {
    try {
      const result = await get3DSResponse(receiptRef, ref);
      setRecRef('');
      setRef('');
      if (isMounted.current) { 

        setIsLoading(false);
      if (
        result.data?.response3Ds && result.data.response3Ds?.url
      ) {
        setIframeUrl(result.data.response3Ds.url);
        setFlag(result.data.response3Ds?.isHidden);
      } else {
        setRes(result);
         onClose();
      }
    }
    } catch (error) {
     console.log(error);
     setIsLoading(false);
      onClose();
    }
  }, [get3DSResponse, setIframeUrl, setFlag, setRes, onClose]);

  useEffect(() => {
    if (ref !== '' && recRef !== '') {
      callGet3DSResponse(recRef, ref);
    }
  }, [callGet3DSResponse, ref, recRef]);


  const checkIframeUrl = useCallback((currentIframe) => {
    if (currentIframe) {
      if (currentIframe && currentIframe !== url) {
        const query = currentIframe.split('?')[1] || '';
        const paramPairs = query.split('&');
        const params = {};
        setIframeUrl(currentIframe);
        for (const pair of paramPairs) {
          const [key, value] = pair.split('=');
          params[key] = value;
        }

        const reference = params['reference'];
        const receiptReference = params['receiptReference'];
        if (receiptReference && reference) {
          setRef(reference);
          setRecRef(receiptReference);
        }
      }
    }
  }, [url, setRes]);

  const onModalClose = () => {
    onAuthClose(true);
    onClose();
  }

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
  }, [iframeRef, ref, recRef]);

  useEffect(() => {
    setIsLoading(true); // Set loading to true when the iframe URL changes
  }, [iframeUrl]);

  return (
    <div>
      {flag ?
        (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999999999999,
            opacity: 1,
            transform: "none",
          }}>
            <iframe
              title="Form"
              ref={iframeRef}
              src={iframeUrl}
              id="myIframe"
              style={{
                display: "none",
                pointerEvents: "none",
              }}
            />
            {isLoading && ( // Show spinner while iframe is loading
              <SpinnerCircular size={40} thickness={150} speed={50} color="#36a9e0" secondaryColor="lightgray" />
            )}
          </div>
        ) :
        (
          <Modal
            open={isOpen}
            onClose={onModalClose}
            closeOnEsc={false}
            closeOnOverlayClick={false}
            center
            classNames={{
              overlay: styles.customOverlay,
              modal: styles.customModal,
            }}
          >
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div style={{ width: "100%", height: "100%" }}>
                {iframeUrl.includes('/sdkresult') && iframeUrl !== url ? (
                  <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <SpinnerCircular
                      size={40}
                      thickness={70}
                      speed={50}
                    />
                  </div>
                ) : (
                  <iframe
                    title="Form"
                    ref={iframeRef}
                    src={iframeUrl}
                    id="myIframe"
                    style={{
                      pointerEvents: "auto",
                      border: "none",
                      width: "100%",
                      height: "100%",
                      outline: "none",
                    }}
                  />
                )}
              </div>
            </div>
          </Modal>
        )}

    </div>
  );
};

export default Modal3DS;
