import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Providers/GlobalProvider";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const nav = useNavigate();

  const handleIncrease = (product) => {
    const tempCart = [];
    cart.forEach((item) => {
      if (item._id === product._id) {
        item.count += 1;
      }
      tempCart.push(item);
    });

    setCart(tempCart);
    localStorage.setItem("cart", JSON.stringify(tempCart));
  };

  const handleDecrease = (product) => {
    const tempCart = [];
    cart.forEach((item) => {
      if (item._id === product._id) {
        if (item.count === 1) {
          toast.error("Product quantity can't be less than 1");
        } else {
          item.count -= 1;
        }
      }
      tempCart.push(item);
    });

    setCart(tempCart);
    localStorage.setItem("cart", JSON.stringify(tempCart));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6 mt-10">
        {cart.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-4"
              >
                <h1 className="text-lg font-medium text-gray-900">{item?.name}</h1>
                <p className="text-lg font-semibold text-gray-900">
                  ${(item?.price * item?.count).toFixed(2)}
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleDecrease(item)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                    >
                      -
                    </button>
                    <p className="text-sm font-medium text-gray-700">{item?.count}</p>
                    <button
                      onClick={() => handleIncrease(item)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() =>
                      setCart(cart.filter((p) => p?._id !== item?._id))
                    }
                    className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-150"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {cart.length > 0 && (
          <div className="flex justify-end items-center mt-6">
            <button
              onClick={() => nav("/checkout")}
              className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;