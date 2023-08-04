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
    <div className="m-4 mx-12 p-2">
      <h1 className="font-bold text-xl">{name}</h1>
      <p>
        {cuisines.join(', ')} - {costForTwoMessage}
      </p>
      <div className="my-6 w-100">
        <h2 className="font-semibold text-lg mb-3">Menu</h2>
        <ul className="flex flex-wrap">
          {!itemCards || itemCards.length === 0 ? (
            <p>Sorry, the menu is not available at the moment.</p>
          ) : (
            itemCards.map(item => (
              <li
                key={item.card.info.id}
                className="w-[500px] p-2 px-3 mb-1 mr-8 bg-gray-100 rounded-md flex justify-between">
                <span>{item.card.info.name}</span>{' '}
                <span>Rs. {item.card.info.price / 100 || item.card.info.defaultPrice / 100}</span>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
