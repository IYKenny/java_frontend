import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormLabel,
  FormControl,
  Button,
  Input,
  useToast,
  Spinner,
  Text,
  Center,
  Flex,
} from "@chakra-ui/react";
import React, { useState } from "react";
import useProducts from "../../apis/useProducts";

export default function CreateProductModal({
  isOpen,
  onOpen,
  onClose,
  onSuccess,
}: any) {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const toast = useToast();

  const { registerProduct, registerLoading } = useProducts();

  const [productData, setProductData] = useState<any>({
    name: "",
    code: "",
    price: "",
    productType: "",
    inDate: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProductData((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res: any = await registerProduct(productData);
    //reset form data after registering product
    if (res == "success") {
      onSuccess();
      setProductData({
        name: "",
        code: "",
        price: "",
        productType: "",
        inDate: ""
      });
    }
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        isCentered
        onClose={onClose}
        size={"xl"}
      >
        <ModalOverlay />
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="modal-header">Add Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={3}>
             
              <Flex columnGap={'20px'}>
              <FormControl isRequired mt={3}>
                <FormLabel className="input-labels">Code</FormLabel>
                <Input
                  onChange={handleInputChange}
                  value={productData.code}
                  name="code"
                  maxLength={16}
                  type={"number"}
                  className={`form-inputs`}
                  placeholder="Code"
                />
                
              
              </FormControl>
              </Flex>
              <Flex>
              <FormControl isRequired>
                <FormLabel className="input-labels">Name</FormLabel>
                <Input
                  className={`form-inputs`}
                  onChange={handleInputChange}
                  value={productData.name}
                  name="name"
                  placeholder="Name"
                />
              </FormControl>
              </Flex>

              <Flex columnGap={'20px'}>
              <FormControl isRequired mt={3}>
                <FormLabel className="input-labels">Product type</FormLabel>
                <Input
                  onChange={handleInputChange}
                  value={productData.productType}
                  name="email"
                  type={"text"}
                  className={`form-inputs `}
                  placeholder="Product type"
                />
                </FormControl>

              <FormControl mt={3} isRequired mb={"10px"}>
                <FormLabel fontWeight="medium" fontSize="14px" mb={"2px"}>
                 Price
                </FormLabel>
                <Flex>
                  <Center
                    borderTopLeftRadius={"5px"}
                    borderBottomLeftRadius={"5px"}
                    px={"7px"}
                    bg={"gray.100"}
                  >
                  </Center>
                  <Input
                    onChange={handleInputChange}
                    value={productData.price}
                    name="price"
                    borderTopLeftRadius={"0px"}
                    borderBottomLeftRadius={"0px"}
                    type={"number"}
                    className={`form-inputs `}
                    placeholder="Price"
                    maxLength={8}
                  />
                </Flex>
              </FormControl>
              
              <FormControl mt={3} isRequired mb={"10px"}>
                <FormLabel fontWeight="medium" fontSize="14px" mb={"2px"}>
                Date
                </FormLabel>
                <Center
                    borderTopLeftRadius={"5px"}
                    borderBottomLeftRadius={"5px"}
                    px={"7px"}
                    bg={"gray.100"}
                  >
                  </Center>
                  <Input
                    onChange={handleInputChange}
                    value={productData.inDate}
                    name="inDate"
                    borderTopLeftRadius={"0px"}
                    borderBottomLeftRadius={"0px"}
                    type={"date"}
                    className={`form-inputs `}
                    placeholder="In Date"
                  />
              </FormControl>
             </Flex>

            </ModalBody>

            <ModalFooter className="modal-pad">
              <Button
                fontWeight={500}
                fontSize={"14px"}
                type="button"
                mr={3}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                fontWeight={500}
                type="submit"
                isLoading={registerLoading ? true : false}
                loadingText={"Saving..."}
                fontSize={"14px"}
                colorScheme="primary"
              >
                Save
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
