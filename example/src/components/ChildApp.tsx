import React, { useEffect } from 'react';
import { useSdk } from 'pop-checkout-sdk';

const ChildApp: React.FC<{
  isOpen: boolean;
  isModalOpen: boolean;
  onClose: () => void;
  url: string|null;
  setRes: React.Dispatch<React.SetStateAction<any>>;
  onAuthClose: () => void;
  isAuth: boolean|null;
}> = ({ isOpen, isModalOpen, onClose, url, setRes, onAuthClose, isAuth }) => {
    const { Modal3DS } = useSdk();

    useEffect(() => {
      console.log("ChildApp rendered");
    });

    return (
      <div style={{ width: '300px', height: '500px' }}>
        {/* Other components or logic you may have */}
        {isModalOpen && url !== null && isAuth !== null && (
    
          <Modal3DS
            isOpen={isOpen}
            onClose={onClose}
            url={url}
            setRes={setRes}
            onAuthClose={onAuthClose}
            isAuth={isAuth}
          />
        
        )}
      </div>
    );
};

export default ChildApp;
