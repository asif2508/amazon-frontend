import axios from "axios";
import {
    Button,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Select,
    TextInput,
    Textarea,
} from "flowbite-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UpdateProduct = ({
  openModal,
  setOpenModal,
  refetch,
  setRefetch,
  selected,
  categories,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    quantity: "",
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (selected) {
      setFormData({
        name: selected?.name,
        price: selected?.price,
        description: selected?.description,
        category: selected?.category?._id,
        quantity: selected?.quantity,
      });
    }
  }, [selected]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const data = new FormData();
    data.append("data", JSON.stringify(formData));
    // if (image) {
    //   data.append("file", image);
    // }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/products/update-product-by-id/${selected?._id}`,
        data
      );

      if (response.data?.success) {
        toast.success("Product updated successfully!");
        setFormData({
          name: "",
          price: "",
          description: "",
          category: "",
          quantity: "",
        });
        setImage(null);
        setOpenModal(false);
        setRefetch(!refetch);
      } else {
        const errorData = response.data?.data;
        toast.error(errorData.message || "Failed to add product");
      }
    } catch (error) {
      toast.error("An error occurred while adding the product");
    }
  };

  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <ModalHeader>Update Product</ModalHeader>
      <ModalBody>
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" value="Product Name" />
            <TextInput
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter product name"
              required
            />
          </div>
          <div>
            <Label htmlFor="price" value="Price" />
            <TextInput
              id="price"
              name="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter price"
              required
            />
          </div>
          <div>
            <Label htmlFor="description" value="Description" />
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter product description"
              rows={4}
              required
            />
          </div>
          <div>
            <Label htmlFor="category" value="Category ID" />
            <Select
              value={formData.category}
              onChange={handleInputChange}
              id="category"
              name="category"
              required
            >
              <option value="">Select a category</option>
              {categories?.map((category) => (
                <option value={category?._id}>{category?.name}</option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="quantity" value="Quantity" />
            <TextInput
              id="quantity"
              name="quantity"
              type="number"
              value={formData.quantity}
              onChange={handleInputChange}
              placeholder="Enter quantity"
              required
            />
          </div>
          {/* <div>
            <Label htmlFor="image" value="Product Image" />
            <FileInput
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div> */}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button onClick={handleSubmit}>Update Product</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UpdateProduct;
