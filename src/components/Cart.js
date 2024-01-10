import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function Cart() {
  const items = useSelector(store => store.cart.items);
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    calculateCartTotal();
  }, [items]);

  const calculateCartTotal = () => {
    let total = 0;
    for (const item of items) {
      total += item?.card?.info.price / 100;
    }
    setCartTotal(total);
  };

  if (items.length === 0) return null;
  return (
    <main className="w-[560px] m-4 mx-auto p-2">
      <h1 className="text-3xl">Cart</h1>
      <section className="my-5">
        {items.map(item => {
          const { id, name, price, defaultPrice } = item?.card?.info;
          return (
            <article key={id} className="w-100 p-2 px-3 mb-3 bg-gray-100 rounded-md flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-gray">{name}</span>{' '}
                <span className="font-semibold">Rs. {price / 100 || defaultPrice / 100}</span>
              </div>
            </article>
          );
        })}
      </section>
      <section className="flex justify-end">
        <h3 className="text-lg">
          Total: <span className="font-semibold text-2xl">Rs.{cartTotal}</span>
        </h3>
      </section>
    </main>
  );
}

export default Cart;
