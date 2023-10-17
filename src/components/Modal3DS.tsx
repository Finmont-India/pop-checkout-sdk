import React, { useRef, useEffect, useCallback, useState } from "react";
import Modal from "react-modal";


const Modal3D: React.FC<{ isOpen: boolean; onClose: () => void; url: string; setRes: any }> = ({ isOpen, onClose, url, setRes }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeUrl, setIframeUrl] = useState(url);
  const [modalIsOpen, setModalIsOpen] = useState(isOpen);

  const checkIframeUrl = useCallback(() => {
    if (iframeRef.current) {
      const iframe = iframeRef.current.contentDocument;
      if (iframe && iframe.readyState === "complete") {
        const currentIframeUrl = iframeRef.current.contentWindow?.location.href;

        if (currentIframeUrl && currentIframeUrl !== iframeUrl) {
          setIframeUrl(currentIframeUrl);
          const query = currentIframeUrl.split('?')[1] || '';
          const paramPairs = query.split('&');
          const params = {};

          for (const pair of paramPairs) {
            const [key, value] = pair.split('=');
            params[key] = value;
          }

          const reference = params['reference'];
          const receiptReference = params['receiptReference'];
          setRes({ reference, receiptReference });

          // Close the modal when URL changes
          setModalIsOpen(false);
        }
      }
    }
  }, [iframeUrl, setRes]);

  useEffect(() => {
    if (isOpen) {
      setModalIsOpen(true);
    }

    const intervalId = setInterval(checkIframeUrl, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [checkIframeUrl, isOpen]);

  return (
    <div>
   
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={onClose}
      // @ts-ignore
       style={{
          overlay: {
            pointerEvents: 'auto',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Overlay background color
          },
          content: {
            pointerEvents: 'auto',
            backgroundColor: 'transparent', // Set the background color of the modal to transparent
            border: 'none', // Remove the border
            padding: '0', // Remove padding
            display: 'flex', // Use flexbox for centering
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            width: 'auto', // Set width to auto
            height: 'auto', // Set height to auto
          },
        }}
      contentLabel="Example Modal"
      ariaHideApp={false}
    >
       <button onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px', border: 'none', fontSize: '20px' }}>
          &times;
        </button>
      
      {modalIsOpen ? (
        <iframe
          title="Form"
          ref={iframeRef}
          src={url}
          width="100%"
          height="400px"
          style={{
            display:'flex',
            justifyContent:'center',
            pointerEvents: 'auto',
            border: 'none',
            width: '90%',
            height: '100%',
          }}
        />
      ) : null}
    </Modal>
    </div>
  );
};

export default Modal3D;
