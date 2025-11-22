import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  thumbnail: string;
  stock: number;
};

type RouteParams = {
  id: string; // always string in URL
};
function ProductDetails() {
   const { id } = useParams<RouteParams>();
  const [product, setProduct] = useState<Product | null>(null);


  useEffect(() => {
    if (!id) return;
    axios
      .get(`https://dummyjson.com/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!product) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container py-4">
      <h2>{product.title}</h2>

      <div className="row mt-4">
        <div className="col-md-6">
          <img
            src={product.thumbnail}
            className="img-fluid rounded"
            alt={product.title}
          />
        </div>

        <div className="col-md-6">
          <h4>${product.price}</h4>
          <p>{product.description}</p>

          {product.stock === 0 ? (
            <span className="badge bg-danger">Out of stock</span>
          ) : (
            <span className="badge bg-success">In stock</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
