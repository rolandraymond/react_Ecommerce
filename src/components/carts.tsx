import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { increase, decrease, removeItem } from "./cartSlice";

function Cart() {
  const items = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();

  if (items.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600 text-2xl">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Cart</h2>

      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-white shadow p-4 rounded mb-4"
        >
          <div className="flex items-center gap-4">
            <img src={item.thumbnail} className="w-20 h-20 rounded" />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-600">${item.price}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => dispatch(decrease(item.id))}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              -
            </button>

            <span className="font-semibold">{item.quantity}</span>

            <button
              onClick={() => dispatch(increase(item.id))}
              className="bg-gray-300 px-3 py-1 rounded"
            >
              +
            </button>
          </div>

          <button
            onClick={() => dispatch(removeItem(item.id))}
            className="text-red-600 text-xl"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
}

export default Cart;
