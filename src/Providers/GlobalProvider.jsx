import React, { useEffect } from "react";


export const CartContext = React.createContext();
const GlobalProvider = ({children}) => {
    const [cart, setCart] = React.useState([]);
    const savedCart = localStorage.getItem("cart");
    useEffect(()=>{
        if(savedCart){
            setCart(JSON.parse(savedCart))
        }
    },[savedCart])

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    );
};

export default GlobalProvider;