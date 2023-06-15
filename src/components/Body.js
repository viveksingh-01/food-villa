import { useEffect, useState } from 'react';
import { RESTAURANTS_API_URL } from '../constants';
import RestaurantCard from './RestaurantCard';
import RestaurantsListShimmer from './RestaurantsListShimmer';

const Body = () => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const res = await fetch(RESTAURANTS_API_URL);
      const json = await res.json();
      if (json) {
        setRestaurants(json?.data?.cards[2]?.data?.data?.cards);
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  return (
    <>
      {restaurants?.length == 0 ? (
        <RestaurantsListShimmer />
      ) : (
        <div className="restaurant-list">
          {restaurants.map(restaurant => {
            return <RestaurantCard {...restaurant.data} key={restaurant.data.id} />;
          })}
        </div>
      )}
    </>
  );
};

export default Body;
