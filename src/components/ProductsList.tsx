import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { addToCart } from "./cartSlice";
// const API = import.meta.env.VITE_API_BASE_URL;
type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  stock: number;
};

function ProductsList() {
    const dispatch = useDispatch<AppDispatch>();
    const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState(0);
  const limit = 10;
  const skip = page * limit;

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`)
      .then((res) => setProducts(res.data.products))
      .catch((err) => console.log(err));
  }, [page]);

  const nextPage = () => setPage(page + 1);

  const prevPage = () => {
    if (page > 0) setPage(page - 1);
  };
  const handleAdd = (item: Product) => {
  dispatch(
    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      thumbnail: item.thumbnail,
      quantity: 1,
    })
  );
};

  return (
    <div className="container mx-auto py-6">
  <h2 className="text-2xl font-bold mb-6">Products List</h2>

  <div className="flex flex-wrap -m-3">
    {products.map((item) => (
      <div key={item.id} className="w-full lg:w-1/3 p-3">
        <div className="bg-white rounded-lg shadow hover:shadow-lg transition h-full flex flex-col">
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-48 w-full object-cover rounded-t-lg"
          />

          <div className="p-4 flex flex-col flex-grow">
            <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
            <p className="text-gray-500 mt-1">${item.price}</p>

            <div className="mt-2">
              {item.stock === 0 ? (
                <span className="inline-block bg-red-600 text-white text-xs px-3 py-1  rounded-full">
                  Out of stock
                </span>
              ) : (
                <span className="inline-block bg-green-600 text-white text-xs px-3 py-1 mb-1.5 rounded-full">
                  In stock
                </span>
              )}
            </div>

             <Link
              to={`/products/${item.id}`}
              className=" inline-block bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-md text-center transition"
              >
              View Details
              </Link>

              <button
              onClick={() => handleAdd(item)}
              className="mt-2 bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded-md transition"
              >
              Add to Cart
              </button>

          </div>
        </div>
      </div>
    ))}
  </div>

  <div className="flex justify-center gap-4 mt-6 ">
    <button
      onClick={prevPage}
      className="bg-gray-700 text-white px-4 py-2 j rounded hover:bg-gray-800 transition"
    >
      Previous
    </button>

    <button
      onClick={nextPage}
      className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
    >
      Next
    </button>
  </div>
</div>
  );
}

export default ProductsList;
