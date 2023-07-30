import { useEffect, useState } from 'react';

function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);
    };
  }, []);
  return isOnline;
}

export default useOnlineStatus;
