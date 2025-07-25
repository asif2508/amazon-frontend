"use client";

import axios from "axios";
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from "flowbite-react";
import { useState } from "react";
import { baseURL } from "../../service/api";

function OrderDetails({ openModal, setOpenModal, order, setRefetch, refetch }) {
    const [isProcessing, setIsProcessing] = useState(false);

    const handleMarkShipped = () => {
        setIsProcessing(true);
        axios.patch(`${baseURL}/order/update-order-status/${order?._id}`,{
            status: "shipped"
        },{
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        }).then(res =>{
            if(res?.data?.success){
                setIsProcessing(false);
                setOpenModal(false);
                setRefetch(!refetch)
            }
        })
    };

    const handleMarkCancelled = () => {
        setIsProcessing(true);
        axios.patch(`${baseURL}/order/update-order-status/${order?._id}`,{
            status: "cancelled"
        },{
            headers: {
                Authorization: `${localStorage.getItem("token")}`,
            },
        }).then(res =>{
            if(res?.data?.success){
                setIsProcessing(false);
                setOpenModal(false);
                setRefetch(!refetch)
            }
        })
    };

    return (
        <Modal show={openModal} onClose={() => setOpenModal(false)} size="4xl">
            <ModalHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                Order Details #{order?._id}
            </ModalHeader>
            <ModalBody className="bg-gray-50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Order Information */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Order Information</h2>
                        <div className="space-y-3">
                            <p className="text-gray-600">
                                <span className="font-medium">Order ID:</span> {order?._id}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Order Date:</span>{" "}
                                {new Date(order?.createdAt)?.toLocaleDateString()}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Total Amount:</span> ${order?.price?.toFixed(2)}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Status:</span>{" "}
                                <span className={`inline-block px-2 py-1 rounded-full text-sm ${
                                    order?.status === 'paid' ? 'bg-green-100 text-green-800' : 
                                    order?.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                    {order?.status?.charAt(0).toUpperCase() + order?.status?.slice(1)}
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Shipping Information */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Shipping Information</h2>
                        <div className="space-y-3">
                            <p className="text-gray-600">
                                <span className="font-medium">Name:</span> {order?.shipping?.name}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Email:</span> {order?.shipping?.email}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Address:</span> {order?.shipping?.address}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">City:</span> {order?.shipping?.city}
                            </p>
                            <p className="text-gray-600">
                                <span className="font-medium">Country:</span> {order?.shipping?.country}
                            </p>
                        </div>
                    </div>

                    {/* Ordered Products */}
                    <div className="bg-white p-6 rounded-lg shadow-md md:col-span-2">
                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Ordered Products</h2>
                        <div className="space-y-4">
                            {order?.products?.map((item) => (
                                <div key={item._id} className="flex items-center gap-4 border-b pb-4">
                                    <img
                                        src={item.productId.images[0]}
                                        alt={item.productId.name}
                                        className="w-24 h-24 object-cover rounded-md"
                                    />
                                    <div className="flex-1">
                                        <h3 className="text-lg font-medium text-gray-800">{item.productId.name}</h3>
                                        <p className="text-gray-600">{item.productId.description}</p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Price:</span> ${item.productId.price.toFixed(2)}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Quantity:</span> {item.quantity}
                                        </p>
                                        <p className="text-gray-600">
                                            <span className="font-medium">Category ID:</span> {item.productId.category}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </ModalBody>
            <ModalFooter className="bg-gray-50">
                <Button
                    onClick={handleMarkShipped}
                    disabled={isProcessing || order?.status !== 'paid'}
                    className="bg-green-600 hover:bg-green-700 text-white"
                >
                    {isProcessing ? 'Processing...' : 'Mark as Shipped'}
                </Button>
                <Button
                    onClick={handleMarkCancelled}
                    disabled={isProcessing || order?.status !== 'paid'}
                    color="failure"
                >
                    {isProcessing ? 'Processing...' : 'Mark as Cancelled'}
                </Button>
                <Button
                    color="gray"
                    onClick={() => setOpenModal(false)}
                    disabled={isProcessing}
                >
                    Close
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default OrderDetails;