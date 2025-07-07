import axios from "axios";
import { Button } from "flowbite-react";
import { useEffect, useState } from "react";
import AddProduct from "./AddProduct";
import ProductTable from "./ProductTable";
const DashboardProducts = () => {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/category/get-all-categories")
      .then((res) => {
        if (res?.data?.success) {
          setCategories(res?.data?.data);
        }
      });
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center my-[30px]">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => setOpenModal(true)} color={"green"}>
          Add Product
        </Button>
      </div>
      <ProductTable
        categories={categories}
        refetch={refetch}
        setRefetch={setRefetch}
      />

      <AddProduct
        refetch={refetch}
        setRefetch={setRefetch}
        openModal={openModal}
        setOpenModal={setOpenModal}
        categories={categories}
      />
    </div>
  );
};

export default DashboardProducts;
