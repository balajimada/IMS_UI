import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme  
import axios from "axios";
import Button from 'react-bootstrap/Button';
import AddEditProduct from "./AddEditProduct";
import ImageRenderer from "./ImageRenderer";


function Products() {

    const navigate = useNavigate()
    const [productlist, setProductList] = useState([]);
    const [isOpenModel, setOpenModel] = useState(false);
    const [productData, setProductData] = useState({});
    const [header, setHeader] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const rowHeight = 100;

    function getApiRouteUrl() {
        return "http://localhost:5000/";
    }

    const buttonClickedHandler = () => {
        setHeader("Add New Product");
        setProductData(undefined)
        setOpenModel((isOpenModel) => isOpenModel = !isOpenModel)
    }

    const editProduct = (params) => {
        console.log(params);
        setOpenModel(true)
        setProductData(params.data);
        setHeader("Edit Product");
    }

    const deleteProduct = (params) => {
        if (window.confirm('Are you sure you want to delete this Product?')) {
            axios.post(getApiRouteUrl() + "api/Product/DeleteProduct", params.data).then(res => {
                if (res?.data) {
                    console.log(res.data);
                    setSearchInput('');
                    loadProducts();
                }
            });
        }
    }

    //page or component Load event
    useEffect(() => {
        setSearchInput('');
        loadProducts();
    }, []);



    function loadProducts() {
        var searchReq = {
            ProductName: searchInput
        };

        axios.post(getApiRouteUrl() + "api/Product/GetProductsBySearch",
            JSON.stringify(searchReq)
        ).then(res => {
            if (res?.data) {
                console.log(res.data);
                setProductList(res.data);
            }
        });
    }

    const onSearch = () => {
        loadProducts();
    }

    const onClear = () => {
        setSearchInput('');
        loadProducts();
    }
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setSearchInput(value);
    }

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        // { field: "productID", flex: 2 },       
        {
            headerName: "Image",
            field: "productImage",
            flex: 2,
            // Set ImageRenderer component as cell renderer
            cellRenderer: ImageRenderer,
        },
        { field: "categoryCode", headerName: "Code", flex: 2 },
        { field: "productName", flex: 3 },
        { field: "productDescr", headerName: "Desctiption", flex: 3 },
        // { field: "productTags", headerName: "Tags", flex: 3 },
        {
            headerName: "Price (Rs)",
            valueGetter: p => {
                return p.data.totalPrice.toFixed(2);
            }, flex: 2
        },
        {
            headerName: "Action",
            minWidth: 150,
            cellRenderer: function (params) {
                return <div>
                    <Button variant="primary" onClick={() => editProduct(params)}  >Edit</Button>
                    <Button variant="secondary" onClick={() => deleteProduct(params)} style={{ marginLeft: '10px' }} >Delete</Button>
                </div>
            },
            editable: false,
            colId: "action"
        }
    ]);

    return (
        <>
            <div>
                <b>Search Product:</b> <input style={{ width: '30%' }} value={searchInput} onChange={onInputChange}></input>
                <Button className="mr-3 ml-3" variant="primary" onKeyDown={e => e.key === 'Enter' && onSearch()}
                    onClick={() => onSearch()}>
                    Search
                </Button>
                <Button variant="secondary" onClick={() => onClear()}>
                    Clear
                </Button>
            </div>
            <div>
                <Button variant="primary" style={{ float: 'right' }} onClick={buttonClickedHandler}>Add New Product</Button>
            </div>
            <div className="ag-theme-quartz" style={{ height: '100%', marginTop: '44px' }}>
                <div style={{ height: '50%' }}>
                    <AgGridReact rowData={productlist} columnDefs={colDefs} rowHeight={rowHeight} />
                </div>
            </div>

            <AddEditProduct show={isOpenModel}
                buttonClicked={buttonClickedHandler}
                productData={productData}
                refreshProducts={loadProducts}
                setOpenModel={setOpenModel}
                header={header} />
        </>
    );
}

export default Products;