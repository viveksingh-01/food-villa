import { useEffect, useState } from 'react';
import { RESTAURANTS_API_URL } from '../constants';
import RestaurantCard from './RestaurantCard';
import RestaurantsListShimmer from './RestaurantsListShimmer';

const Body = () => {
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    try {
      const res = await fetch(RESTAURANTS_API_URL);
      const json = await res.json();
      if (json) {
        const restaurants = json.data?.cards?.find(item => item.cardType === 'seeAllRestaurants');
        setAllRestaurants(restaurants?.data?.data?.cards);
        setFilteredRestaurants(restaurants?.data?.data?.cards);
      }
    } catch (e) {
      console.log('error', e);
    }
  }

  const handleSearch = () => {
    const searchResult = allRestaurants.filter(item =>
      item.data.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredRestaurants(searchResult);
  };

  return (
    <>
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {filteredRestaurants?.length == 0 ? (
        <RestaurantsListShimmer />
      ) : (
        <div className="restaurant-list">
          {filteredRestaurants.map(restaurant => {
            return <RestaurantCard {...restaurant.data} key={restaurant.data.id} />;
          })}
        </div>
      )}
    </>
  );
};

export default Body;
