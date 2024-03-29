import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem } from '../utils/cartSlice';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const items = useSelector(store => store.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    populateCartItemsList();
  }, [items]);

  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  function populateCartItemsList() {
    const itemsList = [];
    for (const { id, name, price } of items) {
      itemsList.push({
        id,
        name,
        price,
        totalPrice: price
      });
    }
    const uniqueItems = getUniqueItems(itemsList);
    for (const item of uniqueItems) {
      item.count = getItemsCount(itemsList, item.id);
      item.totalPrice = item.price * item.count;
    }
    setCartItems(uniqueItems);
  }

  function getUniqueItems(itemsList) {
    return Array.from(new Map(itemsList.map(item => [item.id, item])).values());
  }

  function getItemsCount(itemsList, id) {
    let count = 0;
    for (const item of itemsList) {
      if (item.id == id) {
        count++;
      }
    }
    return count;
  }

  const calculateCartTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.totalPrice;
    }
    setCartTotal(total);
  };

  function incrementItemCount(item) {
    dispatch(addItem(item));
  }

  function decrementItemCount(item) {
    dispatch(removeItem(item.id));
  }

  if (items.length === 0) return null;
  return (
    <main className="w-[560px] m-4 mx-auto p-2">
      <h1 className="text-3xl">Cart</h1>
      <section className="my-5">
        {cartItems.map(item => {
          const { id, name, totalPrice, count } = item;
          return (
            <article
              key={id}
              className="w-100 p-2 px-3 mb-3 bg-gray-100 rounded-md flex justify-between items-center shadow-sm">
              <div className="flex flex-col">
                <span className="text-gray">{name}</span>
                <span className="text-lg font-semibold">&#8377; {totalPrice}</span>
              </div>
              <div className="w-[96px] px-2 flex justify-between items-center rounded-md bg-green-500 text-white shadow-md text-lg font-semibold">
                <span
                  className="p-1 -mt-1 text-xl hover:cursor-pointer hover:text-2xl"
                  onClick={() => decrementItemCount(item)}>
                  -
                </span>
                <span className="p-1">{count}</span>
                <span
                  className="p-1 -mt-1 text-xl hover:cursor-pointer hover:text-2xl"
                  onClick={() => incrementItemCount(item)}>
                  +
                </span>
              </div>
            </article>
          );
        })}
      </section>
      <section className="flex justify-end">
        <h3 className="text-md">
          Total: <span className="font-semibold text-2xl">&#8377;{cartTotal}</span>
        </h3>
      </section>
    </main>
  );
}

export default Cart;
