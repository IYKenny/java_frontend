import ProductsTable from "./ProductsTable";
import { useEffect, useState } from "react";
import { CiCircleQuestion, CiSearch } from "react-icons/ci";
import {
  Flex,
  Text,
  Input,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  useToast,
  Spinner,
  Box,
  Center,
  Heading,
  Button,
} from "@chakra-ui/react";
import "../../dashboard.css";
import { AiFillCalendar, AiFillPlusCircle } from "react-icons/ai";
import CreateProductModal from "./CreateProductModal";
import { useLocation, useNavigate } from "react-router-dom";
import UseProducts from "../../apis/useProducts";

const Products = () => {
  const [isOpen, setIsOpen] = useState<Boolean>(true);
  const {
    getAllLoading,
    getAllProducts,
    products,
    getTotalProducts,
    totalProducts,
  } = UseProducts();
  const itemsPerPage = 5;
  const location = useLocation();
  const [pageNum, setPageNum] = useState<number>(1);
  const searchParams = new URLSearchParams(location.search);
  const navigate = useNavigate();

  useEffect(() => {
    const page: any = searchParams.get("page");
    if (parseInt(page) > 0) {
      return setPageNum(page);
    }
    return navigate("/?page=1");
  }, [searchParams]);

  const headers: any = [
    {
      name: "Code",
      sortable: true,
    },
    {
      name: "Name",
    },
    {
      name: "Product type",
    },
    {
      name: "Price",
    },
    {
      name: "In Date",
    }
   
  ];

  const getProductsByPageNum = (pageNum: any) => {
    getAllProducts(itemsPerPage, pageNum);
  };

  useEffect(() => {
    getProductsByPageNum(pageNum);
  }, [pageNum]);

  //get total products to set pagination total
  useEffect(() => {
    gettotalProducts();
  }, []);

  const gettotalProducts= async () => {
    getTotalProducts(0, 0);
  };

  return (
    <>
      <Box pl="25px" pr="25px" mx="0px" pt={"30px"}>
        <Box className="table-nav">
          <Box className="tb-title">
            <Text>Products</Text>
          </Box>

          <Box className="flex">
            <Center className="flex">
              <Input
                bg="#ffff"
                borderColor="#ffff"
                placeholder="Search..."
                colorScheme="primary"
                type={"text"}
                boxShadow="xs"
                className="search-field"
              />
              <Text className={"search-icon"}>
                <CiSearch size={20} />
              </Text>
            </Center>

            <Button
              colorScheme="primary"
              fontSize={"15px"}
              fontWeight={400}
              borderRadius={"10px"}
              onClick={() => setIsOpen(true)}
            >
              <AiFillPlusCircle size={18} color={"white"}></AiFillPlusCircle>
              &nbsp;Add Product
            </Button>
          </Box>
        </Box>

        <Box className="customers-table-container w-full" marginBottom={"40px"}>
          <ProductsTable
            headers={headers}
            data={products}
            loading={getAllLoading}
            totalNum={totalProducts}
            itemsPerPage={itemsPerPage}
            pageNum={pageNum}
            setSortBy={"created_at"}
            searching={false}
          />
        </Box>
      </Box>

      <CreateProductModal
        onSuccess={() => {
          getProductsByPageNum(pageNum);
          setIsOpen(false);
          getTotalProducts(0, 0);
        }}
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => {
          setIsOpen(false);
        }}
      ></CreateProductModal>
    </>
  );
};

export default Products;
