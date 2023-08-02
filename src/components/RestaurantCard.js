import { IMG_CDN_URL } from '../constants';

const RestaurantCard = ({ name, cuisines, cloudinaryImageId, avgRating }) => {
  return (
    <div className="w-80 h-96 card">
      <img src={IMG_CDN_URL + cloudinaryImageId} className="rounded-t-md" />
      <div className="p-5">
        <div className="my-2 flex justify-between items-center">
          <h3 className="font-bold mr-3">{name}</h3>
          <div className="p-0.5 px-2 font-semibold text-gray-500 border-2 border-gray-500 rounded-md">{avgRating}</div>
        </div>
        <h5>{} </h5>
        <h4 className="text-gray-500 text-sm">{cuisines.join(', ')}</h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
