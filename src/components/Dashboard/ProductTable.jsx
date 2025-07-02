import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { useEffect, useState } from "react";

const ProductTable = ({refetch}) => {
    const [products, setProducts] = useState([]);

    useEffect(()=>{
        axios.get('http://localhost:5000/api/products/get-all-products').then(res=>{
            if(res?.data?.success){
                setProducts(res?.data?.data)
            }
        })
    },[refetch])
    console.log(products)
    return (
         <div className="overflow-x-auto mt-8">
      <Table>
        <TableHead>
          <TableRow>
                        <TableHeadCell>Product Image</TableHeadCell>
            <TableHeadCell>Product name</TableHeadCell>
            <TableHeadCell>Color</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
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
              <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                Edit
              </a>
            </TableCell>
          </TableRow>)
       }
    
        </TableBody>
      </Table>
    </div>
    );
};

export default ProductTable;