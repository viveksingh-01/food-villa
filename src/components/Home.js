import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RESTAURANTS_API_URL } from '../constants';
import useOnlineStatus from '../utils/hooks/useOnlineStatus';
import RestaurantCard from './RestaurantCard';
import RestaurantsListShimmer from './RestaurantsListShimmer';

const Home = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isOnline = useOnlineStatus();

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    setIsLoading(true);
    try {
      const res = await fetch(RESTAURANTS_API_URL);
      const json = await res.json();
      if (json) {
        const restaurantsListing = json.data?.cards?.find(item => item.card?.card?.id === 'restaurant_grid_listing');
        const restaurants = restaurantsListing?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setAllRestaurants(restaurants);
        setFilteredRestaurants(restaurants);
        setIsLoading(false);
      }
    } catch (e) {
      console.log('error', e);
      setIsLoading(false);
    }
  }

  const handleSearch = () => {
    const searchResult = allRestaurants.filter(item =>
      item.info?.name?.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredRestaurants(searchResult);
  };

  if (!isOnline) {
    return <h4>You're offline, please check your internet connection.</h4>;
  }

  return (
    <section className="mx-12">
      <div className="my-8 flex justify-center">
        <div className="flex">
          <input
            type="text"
            className="p-2 mx-auto border-2 border-r-0 border-gray-300 rounded-l-md w-80"
            placeholder="Type restaurant's name"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          />
          <button
            className="p-2 px-3 border-2 border-gray-300 rounded-r-md hover:bg-gray-700 hover:text-gray-300 hover:border-gray-700"
            onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
      {isLoading ? (
        <RestaurantsListShimmer />
      ) : allRestaurants?.length == 0 ? null : filteredRestaurants?.length == 0 ? (
        <h4>No restaurants found.</h4>
      ) : (
        <div className="flex flex-wrap justify-evenly">
          {filteredRestaurants.map(restaurant => {
            return (
              <Link to={`/restaurant/${restaurant.info.id}`} key={restaurant.info.id} className="m-4 mb-12">
                <RestaurantCard {...restaurant.info} />
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default Home;
