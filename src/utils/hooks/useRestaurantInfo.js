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
    const { name, cuisines, costForTwoMessage } = json?.data?.cards[0]?.card?.card?.info;
    const itemWithGroupedCard = json?.data?.cards.find(item => item.hasOwnProperty('groupedCard'));
    const cardWithMenu = itemWithGroupedCard?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(item =>
      item?.card?.card?.hasOwnProperty('itemCards')
    );
    const menu = cardWithMenu?.card?.card.itemCards;
    setRestaurantInfo({ name, cuisines, costForTwoMessage, menu });
  }

  return restaurantInfo;
}

export default useRestaurantInfo;
