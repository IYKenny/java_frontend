import { useState } from "react";
import axiosInstance from "../util/axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const useProducts = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [registerLoading, setRegisterLoading] = useState(false);
  const [products, setProducts] = useState<any>([
    {
      first_name: "John",
      last_name: "Doe",
      national_identity: "1234567890123456",
      telephone: BigInt("9876543210987654"),
      email: "johndoe@example.com",
      department: "IT",
      position: "Software Engineer",
      laptop_manufacturer: "Apple",
      model: "MacBook Pro",
      serial_number: "82342"
    },
    {
      first_name: "John",
      last_name: "Doe",
      national_identity: "1234567890123456",
      telephone: BigInt("9876543210987654"),
      email: "johndoe@example.com",
      department: "IT",
      position: "Software Engineer",
      laptop_manufacturer: "Apple",
      model: "MacBook Pro",
      serial_number: "82342"
    },
    {
      first_name: "John",
      last_name: "Doe",
      national_identity: "1234567890123456",
      telephone: BigInt("9876543210987654"),
      email: "johndoe@example.com",
      department: "IT",
      position: "Software Engineer",
      laptop_manufacturer: "Apple",
      model: "MacBook Pro",
      serial_number: "82342"
    },
    {
      first_name: "John",
      last_name: "Doe",
      national_identity: "1234567890123456",
      telephone: BigInt("9876543210987654"),
      email: "johndoe@example.com",
      department: "IT",
      position: "Software Engineer",
      laptop_manufacturer: "Apple",
      model: "MacBook Pro",
      serial_number: "82342"
    },
    {
      first_name: "John",
      last_name: "Doe",
      national_identity: "1234567890123456",
      telephone: BigInt("9876543210987654"),
      email: "johndoe@example.com",
      department: "IT",
      position: "Software Engineer",
      laptop_manufacturer: "Apple",
      model: "MacBook Pro",
      serial_number: "82342"
    },
    {
      first_name: "John",
      last_name: "Doe",
      national_identity: "1234567890123456",
      telephone: BigInt("9876543210987654"),
      email: "johndoe@example.com",
      department: "IT",
      position: "Software Engineer",
      laptop_manufacturer: "Apple",
      model: "MacBook Pro",
      serial_number: "82342"
    },
    {
      first_name: "John",
      last_name: "Doe",
      national_identity: "1234567890123456",
      telephone: BigInt("9876543210987654"),
      email: "johndoe@example.com",
      department: "IT",
      position: "Software Engineer",
      laptop_manufacturer: "Apple",
      model: "MacBook Pro",
      serial_number: "82342"
    },
  ]);
  const [totalProducts, setTotalProducts] = useState<number>(30);

  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [getAllLoading, setGetAllLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);

  const registerProduct = async (data: any) => {
    try {
      setRegisterLoading(true);
      await axiosInstance.post("/products/", data);
      setRegisterLoading(false);

      toast({
        title: "Success",
        description: "Product registered successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });

      return "success"; 
    } catch (error:any) {
      setRegisterLoading(false);
      toast({
        title: "Failed",
        description: error?.response?.data?.error || "Failed to register product",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const updateProduct = async (productId: string, data: any) => {
    try {
      setUpdateLoading(true);
      await axiosInstance.put(`/products/${productId}`, data);
      setUpdateLoading(false);

      toast({
        title: "Success",
        description: "product updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error:any) {
      setUpdateLoading(false);
      toast({
        title: "Failed",
        description: error?.response?.data?.error ||  "Failed to update product",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const deleteProduct = async (productId: string) => {
    try {
      setDeleteLoading(true);
      await axiosInstance.delete(`/products/${productId}`);
      setDeleteLoading(false);

      toast({
        title: "Success",
        description: "product deleted successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    } catch (error:any) {
      setDeleteLoading(false);
      toast({
        title: "Failed",
        description: error?.response?.data?.error ||  "Failed to delete product",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const getAllProducts = async (limit: number, skip: number) => {
    try {
      setGetAllLoading(true);
      const res: any = await axiosInstance.get(`/products/${limit}/${skip}`);
      setProducts(res.data);
      setGetAllLoading(false);
    } catch (error:any) {
      setGetAllLoading(false);
      toast({
        title: "Failed",
        description: error?.response?.data?.error || "Failed to retrieve products",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const getTotalProducts = async (limit: number, skip: number) => {
    try {
      const res: any = await axiosInstance.get(`/products/${limit}/${skip}`);
      setTotalProducts(res.data?.length);
    } catch (error:any) {
      toast({
        title: "Failed",
        description: error?.response?.data?.error || "Failed to retrieve total products",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  const searchProducts = async (productName: string) => {
    try {
      setSearchLoading(true);
      await axiosInstance.get(`/products/search?productName=${productName}`);
      setSearchLoading(false);
    } catch (error) {
      setSearchLoading(false);
      toast({
        title: "Failed",
        description: "Failed to search products",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return {
    registerProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    searchProducts,
    registerLoading,
    updateLoading,
    deleteLoading,
    getAllLoading,
    searchLoading,
    products,
    totalProducts,
    getTotalProducts
  };
};

export default useProducts;