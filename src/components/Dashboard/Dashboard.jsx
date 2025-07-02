import { Button } from "flowbite-react";
import { useState } from "react";
import AddProduct from "./AddProduct";
import ProductTable from "./ProductTable";

const Dashboard = () => {
  const [openModal, setOpenModal] = useState(false);

  const [refetch, setRefetch] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center my-[30px]">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => setOpenModal(true)} color={"green"}>
          Add Product
        </Button>
      </div>
      <ProductTable refetch={refetch}/>

    <AddProduct refetch={refetch} setRefetch={setRefetch} openModal={openModal} setOpenModal={setOpenModal} />
     
    </div>
  );
};

export default Dashboard;
