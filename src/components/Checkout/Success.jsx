import { useContext, useEffect } from "react";
import { CartContext } from "../../Providers/GlobalProvider";

const Success = () => {
    const {setCart} = useContext(CartContext)

    useEffect(()=>{
        localStorage.removeItem("cart")
        setCart([])
    })
    return (
        <div>
            Order was successful
        </div>
    );
};

export default Success;