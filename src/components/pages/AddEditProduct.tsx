import React, { useEffect, useState, FC } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loading from "./Loading";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useNavigate } from "react-router";

interface Category {
  categoryCode: string;
  categoryName: string;
}

interface ProductData {
  categoryCode: string;
  productName: string;
  productImage: string;
  productDescr: string;
  productTags: string;
  receviedCost: number;
  profitMargin: number;
  totalPrice: number;
  productID: number;
}

interface AddEditProductProps {
  show: boolean;
  header?: string;
  productData?: ProductData | null;
  refreshProducts: () => void;
  buttonClicked: () => void;
}

const AddEditProduct: FC<AddEditProductProps|null> = (props) => {
  const navigate = useNavigate();
  
  const [validated, setValidated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [productID, setProductID] = useState<number>(0);
  const [categoryCode, setCategoryCode] = useState<string>('');
  const [productName, setProductName] = useState<string>('');
  const [productDscr, setProdcutDescr] = useState<string>('');
  const [productTags, setProdcutTags] = useState<string>('');
  const [receviedCost, setReceivedCost] = useState<number>(0);
  const [profitMargin, setProfitMargin] = useState<number>(0);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [productImage, setProductImage] = useState<string>('');

  
   function getApiRouteUrl(): string {
    return "http://localhost:5000/";
   }

   //page load or component load
   useEffect(() => {
     loadCategories();
     return () => {};
   }, []);

   function loadCategories() {
     axios.post(getApiRouteUrl() + "api/Product/GetProductCategories").then(res => {
       if (res?.data) {
         console.log(res.data);
         setCategoryList(res.data);
       }
     });
   }

   //page or component Load event based on condition
   useEffect(() => {
     var data = props?.productData;

     if (data != null && data != undefined) {
       setCategoryCode(data.categoryCode);
       setProductName(data.productName);
       setProductImage(data.productImage);
       setProdcutDescr(data.productDescr);
       setProdcutTags(data.productTags);
       setReceivedCost(data.receviedCost);
       setProfitMargin(data.profitMargin);
       setTotalPrice(data.totalPrice);
       setProductID(data.productID);
     } else {
       resetForm();
     }
   }, [props.show === true]);

   function resetForm() {
      setCategoryCode("");
      setProductName("");
      setProductImage("");
      setProdcutDescr("");
      setProdcutTags("");
      setReceivedCost(0);
      setProfitMargin(0);
      setProductID(0);
      setTotalPrice(0); 
    }

    const onControlChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        switch(name) {
          case "categoryCode":
            setCategoryCode(value); break; 
          case "productName":
            setProductName(value); break; 
          case "productImage":
            setProductImage(value); break; 
          case "productDscr":
            setProdcutDescr(value); break; 
          case "productTags":
            setProdcutTags(value); break; 
          case "receviedCost":
            handleReceivedCostChange(value); break; 
          case "profitMargin":
            handleProfitMarginChange(value); break; 
        }
    };

    function handleReceivedCostChange(value:string) {
        let costValue:number= parseFloat(value)
        if(!isNaN(costValue)){
          	setReceivedCost(costValue)
          	setTotalPrice(getTotalPrice(costValue, profitMargin));
        }
    }

    function handleProfitMarginChange(value:string) {	
        let marginValue:number= parseFloat(value)
        if(!isNaN(marginValue)) {	
          	setProfitMargin(marginValue)	
          	setTotalPrice(getTotalPrice(receviedCost, marginValue));	
        }
    }

    function getTotalPrice(rc:number , pm:number): number{
        const percentAmount:number= rc * pm /100 ;
		return parseFloat((rc + percentAmount).toFixed(2));
	} 

	const onSubmit= (e : React.FormEvent<HTMLFormElement>)=> {

	    e.preventDefault();

	    if(document.getElementById("frmProdcut")?.checkValidity() === true){
	        // Set validated state to false
	        // Create form data object
	        // Make API call here

	        props.refreshProducts();
	        props.buttonClicked();
	    }else{
	        // Mark the form as validated
	        // Show validation errors
	    }
	};

	return (
	  <>
	    <Modal show={props?.show} onHide={props?.buttonClicked}>
	      <Modal.Header closeButton>
	        <Modal.Title>{props?.header}</Modal.Title>
	      </Modal.Header>
	      <Modal.Body>
	        <Form className="frm-main" noValidate validated={validated} id="frmProdcut" onSubmit={onSubmit}>
	          <Form.Group className="mb-3" controlId="CategoryCode">
	            <Form.Label>Category</Form.Label>
	            <Form.Select aria-label="Select Category" name="categoryCode" value={categoryCode} required onChange={onControlChange}>
	              <option value="0">Select Category</option>
	              {categoryList.map(({ categoryCode , categoryName }, index) => (
	                <option key={index} value={categoryCode}>{categoryName}</option>
	              ))}
	            </Form.Select>
	            <Form.Control.Feedback type="invalid">
	              Please select Category.
	            </Form.Control.Feedback>
	          </Form.Group>
            </Form>
	          {/* Other form groups go here */}

	          <Modal.Footer>
	            <Button variant="primary" type="submit">Submit</Button>
	            <Button variant="secondary" onClick={() => props?.setOpenModel(false)}>Cancel</Button>
	          </Modal.Footer>

	          {loading && <Loading />}
	      	</Modal.Body>
	    	</Modal>
	   </>
	 );
};

export default AddEditProduct;