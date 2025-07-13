import { useContext } from "react";
import toast from "react-hot-toast";
import { CartContext } from "../../Providers/GlobalProvider";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
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
    <div className="flex justify-center items-center">
      <div className="w-[500px] border border-blue-400 p-3 rounded-6 mt-[100px]">
        {cart.map((item, index) => {
          return (
            <div key={index} className="flex justify-between items-center mb-2">
              <h1>{item?.name}</h1>
              <h1>{item?.price * item?.count}</h1>
              <div className="flex justify-center items-center gap-2">
                <button onClick={() => handleDecrease(item)}>-</button>
                <p>{item?.count}</p>
                <button onClick={() => handleIncrease(item)}>+</button>
              </div>
              <button
                className="bg-red-500 text-white p-2 rounded-6"
                onClick={() =>
                  setCart(cart.filter((p) => p?._id !== item?._id))
                }
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cart;
