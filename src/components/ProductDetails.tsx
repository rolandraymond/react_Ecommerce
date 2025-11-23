import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "./store";
import { addToCart } from "./cartSlice";
const API = import.meta.env.VITE_API_BASE_URL;
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  stock: number;
};

type RouteParams = {
  id: string;
};
function ProductDetails() {
   const { id } = useParams<RouteParams>();
  const [product, setProduct] = useState<Product | null>(null);
    const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    if (!id) return;
    axios
      .get(`${API}/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  const handleAdd = () => {
    if (!product) return;

    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        quantity: 1,
      })
    );
  };

  return (
   <div className="max-w-5xl mx-auto py-10 px-4">
  <h2 className="text-3xl font-bold text-gray-900 mb-6">
    {product.title}
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
  
    <div>
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-96 object-cover rounded-lg shadow-md"
      />
    </div>

  
    <div className="flex flex-col">
      <h4 className="text-2xl font-semibold text-gray-800">
        ${product.price}
      </h4>

      <p className="text-gray-600 mt-4 leading-relaxed">
        {product.description}
      </p>

     
      <div className="mt-4">
        {product.stock === 0 ? (
          <span className="bg-red-600 text-white px-4 py-1 rounded-full text-sm">
            Out of stock
          </span>
        ) : (
          <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm">
            In stock
          </span>
        )}
      </div>

     
      <button
        onClick={handleAdd}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition shadow-md"
      >
        Add to Cart
      </button>
    </div>
  </div>
</div>

  );
}

export default ProductDetails;
