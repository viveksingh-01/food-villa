import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MENU_URL } from '../constants';

export default function Restaurant() {
  const { id } = useParams();
  const [restaurantInfo, setRestaurantInfo] = useState(null);

  useEffect(() => {
    getRestaurantInfo();
  }, []);

  async function getRestaurantInfo() {
    const res = await fetch(MENU_URL + id);
    const json = await res.json();
    setRestaurantInfo(json);
  }

  if (!restaurantInfo) return null;

  const { name, cuisines, costForTwoMessage } = restaurantInfo?.data?.cards[0]?.card?.card?.info;
  const { itemCards } = restaurantInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(', ')} - {costForTwoMessage}
      </p>
      <h2>Menu</h2>
      <ul>
        {itemCards.length > 0 &&
          itemCards.map(item => (
            <li key={item.card.info.id}>
              {item.card.info.name} -{' Rs.'}
              {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </li>
          ))}
      </ul>
    </div>
  );
}
