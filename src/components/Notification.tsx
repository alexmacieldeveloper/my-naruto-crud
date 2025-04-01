import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  onClose: () => void;
  type: 'add' | 'remove';
}

const Notification: React.FC<NotificationProps> = ({ message, onClose, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false); 
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  const handleAnimationEnd = () => {
    if (!isVisible) {
      onClose(); 
    }
  };

  const bgColor = type === 'add' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
      className={`${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } fixed top-0 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500 ease-out mt-1`}
      onTransitionEnd={handleAnimationEnd}
    >
      <div className={`${bgColor} text-white p-4 rounded-lg shadow-lg`}>
        {message}
      </div>
    </div>
  );
};

export default Notification;
