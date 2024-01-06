import { useSelector } from 'react-redux';

function Cart() {
  const items = useSelector(store => store.cart.items);
  if (items.length === 0) return null;
  return (
    <main className="w-[560px] m-4 mx-auto p-2">
      <h1 className="text-3xl">Cart</h1>
      <section className="my-5">
        {items.map(item => {
          const { id, name, price, defaultPrice } = item?.card?.info;
          return (
            <article
              key={id}
              className="w-100 p-2 px-3 mb-1 mr-8 bg-gray-100 rounded-md flex justify-between items-center">
              <div className="flex flex-col">
                <span className="text-gray">{name}</span>{' '}
                <span className="font-semibold">Rs. {price / 100 || defaultPrice / 100}</span>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default Cart;
