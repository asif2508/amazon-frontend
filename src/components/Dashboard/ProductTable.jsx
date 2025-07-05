import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UpdateProduct from "./UpdateProduct";

const ProductTable = ({refetch, setRefetch, categories}) => {
    const [products, setProducts] = useState([]);
    const [selected, setSelected] = useState(null);
    const [updateModal, setUpdateModal] = useState(false);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/products/get-all-products').then(res=>{
            if(res?.data?.success){
                setProducts(res?.data?.data)
            }
        })
    },[refetch])
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/products/delete-product-by-id/${id}`).then(res => {
            if (res?.data?.success) {
                setRefetch(!refetch)
                toast.success(res?.data?.message)
            }
        }).catch(err => toast.error(err?.response?.data?.message))
    }

    // FOR THE UPDATE
    // 1. select the product which we want to update
    // 2. update the product with the data

    const handleUpdate = (product) =>{
      setSelected(product)
      setUpdateModal(true)
    }

    console.log(selected)
    return (
         <div className="overflow-x-auto mt-8">
      <Table>
        <TableHead>
          <TableRow>
                        <TableHeadCell>Product Image</TableHeadCell>
            <TableHeadCell>Product name</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>
              <span className="sr-only">Edit</span>
            </TableHeadCell>
          </TableRow>
        </TableHead>
        <TableBody className="divide-y">
       {
        products?.map(product =>    <TableRow key={product?._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
               <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <img src={`${product?.images[0]}`} alt="" className="h-[60px] w-[60px] object-contain rounded-xl" />
            </TableCell>
            <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {product?.name}
            </TableCell>
            <TableCell>{product?.category?.name}</TableCell>
            <TableCell>{product?.description}</TableCell>
            <TableCell>${product?.price}</TableCell>
            <TableCell>
              <button onClick={()=> handleUpdate(product)} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Edit
              </button>
            </TableCell>
            <TableCell>
              <button onClick={()=>handleDelete(product?._id)} className="font-medium text-red-600 hover:cursor-pointer  dark:text-red-500">
                Delete 
              </button>
            </TableCell>
          </TableRow>)
       }
    
        </TableBody>
      </Table>
      <UpdateProduct categories={categories} openModal={updateModal} setOpenModal={setUpdateModal} refetch={refetch} setRefetch={setRefetch} selected={selected} />
    </div>
    );
};

export default ProductTable;