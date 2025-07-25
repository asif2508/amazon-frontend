import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useEffect, useState } from "react";
import { baseURL } from "../../service/api";
import OrderDetails from "./OrderDetails";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setCategories] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({})
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    axios
      .get(`${baseURL}/order/get-all-orders?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res?.data?.success) {
          setOrders(res?.data?.data?.data);
          setCategories(res?.data?.data?.totalPages);
          setTotalOrders(res?.data?.data?.totalOrders);
        }
      });
  }, [page, limit, refetch]);
  return (
    <div>
      <div className="flex justify-between items-center my-[30px]">
        <h1 className="text-2xl font-bold">Orders</h1>
      </div>

      <div className="overflow-x-auto mt-8">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Order ID</TableHeadCell>
              <TableHeadCell>Products</TableHeadCell>
              <TableHeadCell>Total Price</TableHeadCell>
              <TableHeadCell>Ordered on</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>View Details</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {orders?.map((order) => (
              <TableRow
                key={order?._id}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {order?._id}
                </TableCell>
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {order?.products?.map((p) => (
                    <p>
                      {p?.productId?.name} x {p?.quantity}
                    </p>
                  ))}
                </TableCell>
                <TableCell>${order?.price}</TableCell>
                <TableCell>{order?.createdAt}</TableCell>
                <TableCell>{order?.status}</TableCell>
                <TableCell>
                  <button
                    onClick={() => {
                      setSelectedOrder(order)
                      setOpen(true);
                    }}
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    View Details
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-center items-center gap-4 mt-12">
          <button
            className="bg-green-700 px-3 py-1 rounded-xl text-white"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            Previous
          </button>
          <span>
            {page} of {totalPages}
          </span>
          <button
            className="bg-green-700 px-3 py-1 rounded-xl text-white"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <OrderDetails order={selectedOrder} openModal={open} setOpenModal={setOpen} refetch={refetch} setRefetch={setRefetch} />
    </div>
  );
};

export default ManageOrders;
