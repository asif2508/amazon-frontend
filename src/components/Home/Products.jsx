import axios from "axios";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/get-all-products")
      .then((res) => {
        if (res?.status === 200) {
          setProducts(res?.data?.data);
        }
      });
  }, []);
  return (
    <div className="max-w-[1240px] mx-auto my-[100px]">
      <h1 className="text-3xl font-bold text-center mb-[30px]">Products</h1>
      <div className=" grid grid-cols-1 lg:grid-cols-4 gap-4">
        {products.map((product, index) => {
        return (
          <Card
            className="max-w-sm"
            imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
            imgSrc={`${product?.images[0]}`}
            key={index}
          >
            <a href="#">
              <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                {product?.name}
              </h5>
              <p className="text-white">{product?.description}</p>
            </a>

            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ${product?.price}
              </span>
              <a
                href="#"
                className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
                Add to cart
              </a>
            </div>
          </Card>
        );
      })}
      </div>
    </div>
  );
};

export default Products;
