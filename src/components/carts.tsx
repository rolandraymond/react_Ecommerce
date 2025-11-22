function Cart() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Your Cart
      </h2>

      <div className="bg-gray-100 text-gray-700 p-6 rounded-lg shadow">
        <p className="text-lg">Cart is empty.</p>
      </div>
    </div>
  );
}

export default Cart;
