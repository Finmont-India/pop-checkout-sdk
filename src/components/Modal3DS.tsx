import React, { useEffect, useRef} from 'react';
import { SpinnerCircular } from 'spinners-react';

const modalStyles = {
  modalBackground: {
    position: 'fixed' as 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '0',
    borderRadius: '5px',
    width: '60%',
    height: '80vh',
    position: 'relative' as 'relative',
  },
  iframeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    marginTop: '50px',
    marginLeft: '20px',
    marginRight: '20px',
  },
  close: {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#333',
    zIndex: 10000,
  },
  iframe: {
    border: 'none',
    width: '100%',
    height: '100%',
    zIndex: 100,
  },
};

const Modal3DS: React.FC<{ open: boolean; onClose: () => void; url: string; setRes: any }> = ({ open, onClose, url, setRes }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    const checkIframeUrl = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        const currentIframeUrl: any = iframeRef.current.contentWindow.location.href;
        const query = currentIframeUrl.split('?')[1];
        const paramPairs = query.split('&');
        const params = {};

        for (const pair of paramPairs) {
          const [key, value] = pair.split('=');
          params[key] = value;
        }

        const reference = params['reference'];
        const receiptReference = params['receiptReference'];
        setRes({ reference, receiptReference });
        onClose();
      }
    };

    const intervalId = setInterval(checkIframeUrl, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [setRes]);

  return (
    (open) ? (
      <div style={modalStyles.modalBackground}>
        <div style={modalStyles.modalContent}>
          <span style={modalStyles.close} onClick={()=>onClose()}>&times;</span>
          <div style={modalStyles.iframeContainer}>
            <iframe
              ref={(iframe) => { iframeRef.current = iframe; }}
              src={url}
              title="3DS Modal Content"
              style={modalStyles.iframe}
            ></iframe>
          </div>
        </div>
      </div>
    ) : <SpinnerCircular />
  );
};

export default Modal3DS;
