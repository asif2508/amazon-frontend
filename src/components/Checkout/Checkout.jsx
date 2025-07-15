import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Providers/GlobalProvider";

const Checkout = () => {
    const [total, setTotal] = useState(0);
    const [data, setData] = useState({
        name: "",
        email: "",
        address: "",
        city: "",
        country: "",
    });
    const { cart } = useContext(CartContext);

    useEffect(() => {
        let totalPrice = 0;
        cart.forEach(c => {
            totalPrice = totalPrice + c?.price * c?.count;
        });
        setTotal(totalPrice);
    }, [cart]);

    console.log(data)
    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout</h1>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Shipping Address Section */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Shipping Address</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    value={data?.name}
                                    onChange={(e) => setData({ ...data, name: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email</label>
                                <input
                                    type="email"
                                    value={data?.email}
                                    onChange={(e) => setData({ ...data, email: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    value={data?.address}
                                    onChange={(e) => setData({ ...data, address: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="123 Main St"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input
                                    type="text"
                                    value={data?.city}
                                    onChange={(e) => setData({ ...data, city: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="New York"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Country</label>
                                <input
                                    type="text"
                                    value={data?.country}
                                    onChange={(e) => setData({ ...data, country: e.target.value })}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    placeholder="United States"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Order Summary Section */}
                    <div className="bg-white shadow-md rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h3>
                        <div className="space-y-4">
                            {cart?.map((product, index) => (
                                <div key={index} className="flex justify-between items-center border-b pb-4">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">{product?.name}</h3>
                                        <p className="text-sm text-gray-600">Quantity: {product?.count}</p>
                                    </div>
                                    <p className="text-lg font-semibold text-gray-900">
                                        ${(product?.price * product?.count).toFixed(2)}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex justify-between items-center">
                            <h4 className="text-lg font-semibold text-gray-800">Total Price:</h4>
                            <p className="text-xl font-bold text-indigo-600">${total.toFixed(2)}</p>
                        </div>
                        <button className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;