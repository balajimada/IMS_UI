import React, { FC, useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loading from "./Loading";
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import { useNavigate } from "react-router";

interface CategoryData {
    categoryID: number;
    categoryCode: string;
    categoryName: string;
    gst: string;
}

interface AddEditCategoryProps {
    show: boolean;
    header: string;
    categoryData?: CategoryData | null;
    refreshCategories: () => void;
    buttonClicked: () => void;
    setOpenModel: (open: boolean) => void;
}

const AddEditCategory: FC<AddEditCategoryProps> = (props) => {
    const navigate = useNavigate();
    
    const [validated, setValidated] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    const [categoryID, setCategoryID] = useState<number>(0);
    const [categoryCode, setCategoryCode] = useState<string>('');
    const [categoryName, setCategoryName] = useState<string>('');
    const [gst, setGST] = useState<string>('');

    console.log(props.show);

    useEffect(() => {
        setCategoryID(0);
        return () => {};
    }, []);

    function getApiRouteUrl(): string {
        return "http://localhost:5000/";
    }

    useEffect(() => {
        const data = props.categoryData;
        if (data != null && data !== undefined) {
            setCategoryCode(data.categoryCode);
            setCategoryName(data.categoryName);
            setGST(data.gst);
            setCategoryID(data.categoryID);
        } else {
            setCategoryCode("");
            setCategoryName("");
            setGST("");
            setCategoryID(0);
        }
    }, [props.show]);

    
   const onControlChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        if (name === "categoryCode") {
            setCategoryCode(value);
        } else if (name === "categoryName") {
            setCategoryName(value);
        } else if (name === "gst") {
            setGST(value);
        }
   };

   const onSubmit = (e?: React.MouseEvent<HTMLButtonElement>): void => {
       if ((document.getElementById("frmCategory") as HTMLFormElement).checkValidity() === true) {
           setValidated(false);

           const formData = {
               CategoryId: categoryID,
               CategoryCode: categoryCode,
               CategoryName: categoryName,
               GST: gst,
               CreatedBy: 1,
               ModifiedBy: 1,
           };

           console.log("formData", formData);

           axios.post(getApiRouteUrl() + "api/Product/SaveCategory",
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
           .catch((error) => {
               console.log("API Calling Error:", error);
           });
       } else {
           setValidated(true);
       }
       props.refreshCategories();
       props.buttonClicked();        
   };

   return (
       <>
           <Modal show={props.show} onHide={props.buttonClicked}>
               <Modal.Header closeButton>
                   <Modal.Title>{props.header}</Modal.Title>
               </Modal.Header>
               <Modal.Body>
                   <Form className="frm-main" noValidate validated={validated} id="frmCategory">
                       <Form.Group className="mb-3" controlId="CategoryCode">
                           <Form.Label>Category Code</Form.Label>
                           <Form.Control type="text" placeholder="Category Code" name="categoryCode" value={categoryCode}
                               required onChange={onControlChange} />
                           <Form.Control.Feedback type="invalid">
                               Please enter Category Code.
                           </Form.Control.Feedback>
                       </Form.Group>

                       <Form.Group className="mb-3" controlId="CategoryName">
                           <Form.Label>Category Name</Form.Label>
                           <Form.Control type="text" placeholder="Category Name" name="categoryName" value={categoryName}
                               required onChange={onControlChange} />
                           <Form.Control.Feedback type="invalid">
                               Please enter Category Name.
                           </Form.Control.Feedback>
                       </Form.Group>
                       <Form.Group className="mb-3" controlId="GST">
                           <Form.Label>GST (%)</Form.Label>
                           <Form.Control type="text" placeholder="GST (%)" name="gst" value={gst}
                               required onChange={onControlChange} />
                           <Form.Control.Feedback type="invalid">
                               Please enter GST (%).
                           </Form.Control.Feedback>
                       </Form.Group>
                   </Form>
               </Modal.Body>
               <Modal.Footer>
                   <Button className="mr-3" variant="primary"
                       onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
                       onClick={() => onSubmit()}>
                       Submit
                   </Button>
                   <Button variant="secondary" onClick={() => props.setOpenModel(false)}>
                       Cancel
                   </Button>
                </Modal.Footer>
                {loading && <Loading />}
           </Modal>
       </>
   );
};

export default AddEditCategory;