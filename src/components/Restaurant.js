import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { IMG_CDN_URL } from '../constants';
import { addItem, removeItem } from '../utils/cartSlice';
import useRestaurantInfo from '../utils/hooks/useRestaurantInfo';

export default function Restaurant() {
  const [menuItems, setMenuItems] = useState([]);
  const dispatch = useDispatch();
  const cartItems = useSelector(store => store.cart.items);

  const { id } = useParams();
  const restaurantInfo = useRestaurantInfo(id);

  useEffect(() => {
    if (restaurantInfo) {
      populateMenuItemsList();
    }
  }, [restaurantInfo]);

  if (!restaurantInfo) return null;

  function populateMenuItemsList() {
    const itemsList = [];
    for (const item of restaurantInfo.menu) {
      const { id, imageId, name, price, defaultPrice } = item?.card?.info;
      itemsList.push({
        id,
        imageId,
        name,
        price: (price || defaultPrice) / 100,
        count: getItemCount(id)
      });
    }
    setMenuItems(itemsList);
  }

  function getItemCount(id) {
    return cartItems.filter(item => item.id == id).length;
  }

  function addItemToCart(item) {
    dispatch(addItem(item));
  }

  function removeItemFromCart(id) {
    dispatch(removeItem(id));
  }

  return (
    <div className="m-4 mx-12 p-2">
      <h1 className="font-bold text-xl">{restaurantInfo.name}</h1>
      <p>
        {restaurantInfo.cuisines.join(', ')} - {restaurantInfo.costForTwoMessage}
      </p>
      <div className="my-6 w-100">
        <h2 className="font-semibold text-lg mb-3">Menu</h2>
        <ul className="flex flex-wrap">
          {!menuItems || menuItems.length === 0 ? (
            <p>Sorry, the menu is not available at the moment.</p>
          ) : (
            menuItems.map(item => (
              <li key={item.id} className="w-[560px] mb-8 mr-8 bg-gray-100 rounded-md flex items-center">
                <img src={IMG_CDN_URL + item.imageId} className="w-[240px] h-100 rounded-l-md" />
                <div className="m-3 ml-5">
                  <div className="flex flex-col mb-3">
                    <span className="text-lg text-gray">{item.name}</span>{' '}
                    <span className="font-semibold">Rs. {item.price}</span>
                  </div>
                  {item.count == 0 && (
                    <div>
                      <button
                        className="p-2 px-4 text-sm font-semibold border-2 rounded-md bg-white text-green-500 hover:shadow-md hover:shadow-neutral-200"
                        onClick={() => addItemToCart(item)}>
                        ADD
                      </button>
                    </div>
                  )}
                  {item.count > 0 && (
                    <div className="w-[96px] px-2 flex justify-between items-center rounded-md bg-green-500 text-white shadow-md text-lg font-semibold">
                      <span
                        className="p-1 -mt-1 text-xl hover:cursor-pointer hover:text-2xl"
                        onClick={() => removeItemFromCart(item.id)}>
                        -
                      </span>
                      <span className="p-1">{item.count}</span>
                      <span
                        className="p-1 -mt-1 text-xl hover:cursor-pointer hover:text-2xl"
                        onClick={() => addItemToCart(item)}>
                        +
                      </span>
                    </div>
                  )}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
