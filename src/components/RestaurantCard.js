import { IMG_CDN_URL } from '../constants';

const RestaurantCard = ({ name, cuisines, cloudinaryImageId, lastMileTravelString }) => {
  return (
    <div className="card">
      <img src={IMG_CDN_URL + cloudinaryImageId} />
      <h3>{name}</h3>
      <h4>{cuisines.join(', ')}</h4>
      <h5>{lastMileTravelString} minutes</h5>
    </div>
  );
};

export default RestaurantCard;
