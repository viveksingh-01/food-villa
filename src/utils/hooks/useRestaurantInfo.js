import { useEffect, useState } from 'react';
import { MENU_URL } from '../../constants';

function useRestaurantInfo(restaurantId) {
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const res = await fetch(MENU_URL + restaurantId);
    const json = await res.json();
    setRestaurantInfo(json);
  }

  return restaurantInfo;
}

export default useRestaurantInfo;
