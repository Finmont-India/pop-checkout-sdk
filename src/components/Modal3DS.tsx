import React from 'react';

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
    zIndex: 999,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: '0',
    borderRadius: '5px',
    width: '80%',
    height: '80vh',
    position: 'relative' as 'relative',
  },
  iframeContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  close: {
    position: 'absolute' as 'absolute',
    top: '10px',
    right: '10px',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#333',
    zIndex: 1000,
  },
  iframe: {
    border: 'none',
    width: '100%',
    height: '100%',
  },
};

const Modal3DS: React.FC<{ isOpen: boolean; onClose: () => void; url: string }> = ({ isOpen, onClose, url }) => (
  isOpen ? (
    <div style={modalStyles.modalBackground}>
      <div style={modalStyles.modalContent}>
        <span style={modalStyles.close} onClick={onClose}>&times;</span>
        <div style={modalStyles.iframeContainer}>
          <iframe src={url} title="3DS Modal Content" style={modalStyles.iframe}></iframe>
        </div>
      </div>
    </div>
  ) : null
);

export default Modal3DS;
