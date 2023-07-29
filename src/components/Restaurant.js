import { useParams } from 'react-router-dom';
import useRestaurantInfo from '../utils/hooks/useRestaurantInfo';

export default function Restaurant() {
  const { id } = useParams();
  const restaurantInfo = useRestaurantInfo(id);

  if (!restaurantInfo) return null;

  const { name, cuisines, costForTwoMessage } = restaurantInfo?.data?.cards[0]?.card?.card?.info;
  const itemWithGroupedCard = restaurantInfo?.data?.cards.find(item => item.hasOwnProperty('groupedCard'));
  const cardWithMenu = itemWithGroupedCard?.groupedCard?.cardGroupMap?.REGULAR?.cards.find(item =>
    item?.card?.card?.hasOwnProperty('itemCards')
  );
  const { itemCards } = cardWithMenu?.card?.card;

  return (
    <div className="menu">
      <h1>{name}</h1>
      <p>
        {cuisines.join(', ')} - {costForTwoMessage}
      </p>
      <h2>Menu</h2>
      <ul>
        {!itemCards || itemCards.length === 0 ? (
          <p>Sorry, the menu is not available at the moment.</p>
        ) : (
          itemCards.map(item => (
            <li key={item.card.info.id}>
              {item.card.info.name} -{' Rs.'}
              {item.card.info.price / 100 || item.card.info.defaultPrice / 100}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
