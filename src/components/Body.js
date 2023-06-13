import { useEffect, useState } from 'react';
import RestaurantCard from './RestaurantCard';

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const res = await fetch(
      'https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING'
    );
    const json = await res.json();
    setRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  }

  return (
    <>
      <div className="restaurant-list">
        {restaurants.map(restaurant => {
          return <RestaurantCard {...restaurant.data} key={restaurant.data.id} />;
        })}
      </div>
    </>
  );
};

export default Body;
