import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  const items = useSelector(store => store.cart.items);

  useEffect(() => {
    populateCartItemsList();
  }, []);
  useEffect(() => {
    calculateCartTotal();
  }, [cartItems]);

  function populateCartItemsList() {
    const itemsList = [];
    for (const item of items) {
      const { id, name, price } = item?.card?.info;
      itemsList.push({
        id,
        name,
        price: price / 100
      });
    }
    setCartItems(itemsList);
  }

  const calculateCartTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.price;
    }
    setCartTotal(total);
  };

  if (items.length === 0) return null;
  return (
    <main className="w-[560px] m-4 mx-auto p-2">
      <h1 className="text-3xl">Cart</h1>
      <section className="my-5">
        {cartItems.map(item => {
          const { id, name, price } = item;
          return (
            <article key={id} className="w-100 p-2 px-3 mb-3 bg-gray-100 rounded-md flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-gray">{name}</span> <span className="text-lg font-semibold">&#8377; {price}</span>
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
