import React, { useRef, useEffect, useCallback, useState } from "react";
import { Modal } from "react-responsive-modal";
import { get3DSResponse } from "../services/response3Ds";
import 'react-responsive-modal/styles.css';
import { SpinnerCircular } from "spinners-react";
import styles from './Modal3DS.css'

const Modal3DS: React.FC<{ isOpen: boolean; isAuth: boolean; onClose: () => void; onAuthClose: any; url: string; setRes: any; }> = ({ isOpen, isAuth, onClose, url, setRes, onAuthClose }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [flag, setFlag] = useState<boolean>(isAuth);
  const [iframeUrl, setIframeUrl] = useState(url);



  const callGet3DSResponse = useCallback(async (receiptRef: string, ref: string) => {
    try {
      const result = await get3DSResponse(receiptRef, ref);
      setFlag(result.data.response3Ds?.isHidden)
      if (result.data.response3Ds && result.data.response3Ds.url) {
        setIframeUrl(result.data.response3Ds.url);
      }
      else {
        setRes(result);
        onClose();
      }
    } catch (error) {
      setRes(error)
    }
  }, [get3DSResponse])


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
          callGet3DSResponse(receiptReference, reference);
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
  }, [iframeRef]);

  return (
    <div>
      {flag ?
        (
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex:1000
            }}>
            <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", zIndex:999  }}>
              <SpinnerCircular
                size={40}
                thickness={80}
                speed={50}
              />
            </div>
            <iframe
              title="Form"
              ref={iframeRef}
              src={iframeUrl}
              id="myIframe"
              style={{
                display: "none",
                pointerEvents: "none",
                border: "none",
                width: "100%",
                height: "100%",
                outline: "none",
              }}
            />
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
