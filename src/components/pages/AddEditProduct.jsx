import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loading from "./Loading";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useNavigate } from "react-router";


function AddEditProduct(props) {
  //Model related
  const navigate = useNavigate();

  //Business related
  const [validated, setValidated] = useState(false);
  const [loading, setLoading] = useState(false)

  const [productID, setProductID] = useState('');
  const [categoryCode, setCategoryCode] = useState('');
  const [productName, setProductName] = useState('');
  const [productDscr, setProdcutDescr] = useState('');
  const [productTags, setProdcutTags] = useState('');
  const [receviedCost, setReceivedCost] = useState(0);
  const [profitMargin, setProfitMargin] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productImage, setProductImage] = useState('');

  console.log(props.show)

  function getApiRouteUrl() {
    return "http://localhost:5000/";
  }

  //page load or component load
  useEffect(() => {
    setProductID(0);
    loadCategories();
    return () => {

    }
  }, [])

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
    loadCategories();
    var data = props?.productData;
    console.log("Product data", data);
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
    }
    else {
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
  }, [props.show === true]);


  const onControlChange = (e) => {
    const { name, value } = e.target;
    if (name == "categoryCode") {
      setCategoryCode(value);
    }
    else if (name == "productName") {
      setProductName(value);
    }
    else if (name == "productImage") {
      setProductImage(value);
    }
    else if (name == "productDscr") {
      setProdcutDescr(value);
    }
    else if (name == "productTags") {
      setProdcutTags(value);
    }
    else if (name == "receviedCost") {
      setReceivedCost(value);
      setTotalPrice(getTotalPrice(value, profitMargin));
    }
    else if (name == "profitMargin") {
      setProfitMargin(value);
      setTotalPrice(getTotalPrice(receviedCost, value));
    }
  };

  function getTotalPrice(rc, pm) {
    const percentAmount = parseFloat(rc) * parseFloat(pm) / 100;
    return (parseFloat(rc) + percentAmount)?.toFixed(2);
  }

  const onSubmit = (e) => {
    if (document.getElementById("frmProdcut").checkValidity() === true) {
      setValidated(false);

      const formData = {
        ProductID: productID,
        CategoryCode: categoryCode,
        ProductName: productName,
        ProductImage: productImage,
        ProductDescr: productDscr,
        ProductTags: productTags,
        ReceviedCost: receviedCost,
        ProfitMargin: profitMargin,
        TotalPrice: totalPrice,
        CreatedBy: 1,
        ModifiedBy: 1,
      };

      console.log("formData", formData);

      axios.post(getApiRouteUrl() + "api/Product/SaveProduct",
        formData,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      ).then(res => {
        if (res?.data) {
          console.log(res.data);
        }
      })
        .catch(function (error) {
          console.log("API Calling Error:", error);
        });
    }
    else {
      setValidated(true);
    }
    props.refreshProducts();
    props.buttonClicked();
  }

  return (
    <>
      <Modal show={props?.show} onHide={props?.buttonClicked}>
        <Modal.Header closeButton>
          <Modal.Title>{props?.header}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="frm-main" noValidate validated={validated} id="frmProdcut">
            <Form.Group className="mb-3" controlId="CategoryCode">
              <Form.Label>Category</Form.Label>
              {/* <Form.Control type="text" placeholder="Category Code" name="categoryCode" value={categoryCode}
                required onChange={onControlChange} /> */}
              <Form.Select aria-label="Select Category" name="categoryCode" value={categoryCode} className="form-control"
                required onChange={onControlChange}>
                <option value="0">Select Category</option>
                {categoryList.map(({ categoryCode, categoryName }, index) => <option value={categoryCode} >{categoryName}</option>)}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                Please select Category.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="ProductName">
              <Form.Label>Product Name</Form.Label>
              <Form.Control type="text" placeholder="Product Name" name="productName" value={productName}
                required onChange={onControlChange} />
              <Form.Control.Feedback type="invalid">
                Please enter Prodcut Name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="ProductImage">
              <Form.Label>Product Image Name</Form.Label>
              <Form.Control type="text" placeholder="Product Image" name="productImage" value={productImage}
                required onChange={onControlChange} />
              <Form.Control.Feedback type="invalid">
                Please enter Prodcut Image Name.
              </Form.Control.Feedback>
            </Form.Group>



            <Form.Group className="mb-3" controlId="ProductDescr">
              <Form.Label>Product Descr</Form.Label>
              <Form.Control type="text" placeholder="Product Descr" name="productDscr" value={productDscr}
                required onChange={onControlChange} />
              <Form.Control.Feedback type="invalid">
                Please enter Prodcut Descr.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="ProductTags">
              <Form.Label>Product Tags</Form.Label>
              <Form.Control type="text" placeholder="Product Tags" name="productTags" value={productTags}
                required onChange={onControlChange} />
              <Form.Control.Feedback type="invalid">
                Please enter Prodcut Tags.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="ReceviedCost">
              <Form.Label>Received Cost</Form.Label>
              <Form.Control type="text" placeholder="Received Cost" name="receviedCost" value={receviedCost}
                required onChange={onControlChange} />
              <Form.Control.Feedback type="invalid">
                Please enter Received Cost.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="ProfitMargin">
              <Form.Label>Profit Margin</Form.Label>
              <Form.Control type="text" placeholder="Profit Margin" name="profitMargin" value={profitMargin}
                required onChange={onControlChange} />
              <Form.Control.Feedback type="invalid">
                Please enter Profit Margin.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="TotalPrice">
              <Form.Label>Total Price</Form.Label>
              <span style={{ fontWeight: 'bold', marginLeft: '20px' }}>Rs: {totalPrice}</span>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="mr-3" variant="primary" onKeyDown={e => e.key === 'Enter' && onSubmit()}
            onClick={() => onSubmit()}>
            Submit
          </Button>
          <Button variant="secondary" onClick={() => props?.setOpenModel(false)}>
            Cancel
          </Button>
        </Modal.Footer>
        {loading == true && <Loading></Loading>}
      </Modal>
    </>
  );
}

export default AddEditProduct;