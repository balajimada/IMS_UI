import React, { useEffect, useState } from "react";
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme  
import axios from "axios";
import Button from 'react-bootstrap/Button';
import AddEditCategory from "./AddEditCategory";

function Categories() {
    const [categoryList, setCategoryList] = useState([]);
    const [isOpenModel, setOpenModel] = useState(false);
    const [categoryData, setCategoryData] = useState({});
    const [header, setHeader] = useState('');

    function getApiRouteUrl() {
        return "http://localhost:5000/";
    }

    const buttonClickedHandler = () => {

        setHeader("Add New Category");
        setCategoryData(undefined)
        setOpenModel((isOpenModel) => isOpenModel = !isOpenModel)
    }

    function loadCategories() {
        axios.post(getApiRouteUrl() + "api/Product/GetProductCategories").then(res => {
            if (res?.data) {
                console.log(res.data);
                setCategoryList(res.data);
            }
        });
    }

    const editCategory = (params) => {
        console.log(params);
        setOpenModel(true)
        setCategoryData(params.data);
        setHeader("Edit Category");
    }


    const deleteCategory = (params) => {
        if (window.confirm('Are you sure you want to delete this Category?')) {
            axios.post(getApiRouteUrl()+ "api/Product/DeleteCategory", params.data).then(res => {
                if (res?.data) {
                    console.log(res.data);
                    loadCategories();
                }
            });
        }
    }

    //page or component Load event
    useEffect(() => {
        loadCategories();
    }, []);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        { field: "categoryID", flex: 1 },
        { field: "categoryCode", flex: 1 },
        { field: "categoryName", flex: 2 },
        {
            headerName: "GST (%)",
            valueGetter: p => {
                return p.data.gst.toFixed(2);
            }, flex: 1
        },
        {
            headerName: "Action",
            minWidth: 150,
            cellRenderer: function (params) {
                return <div>
                    <Button variant="primary" onClick={(event) => editCategory(params)}  >Edit</Button>
                    <Button variant="secondary" onClick={(event) => deleteCategory(params)} style={{ marginLeft: '10px' }}  >Delete</Button>
                </div>
            },
            editable: false,
            colId: "action"
        }
    ]);

    return (
        <>
            <div>
                <Button variant="primary" style={{ float: 'right' }} onClick={buttonClickedHandler}>Add New Category</Button>
                <AddEditCategory show={isOpenModel}
                    buttonClicked={buttonClickedHandler}
                    categoryData={categoryData}
                    refreshCategories={loadCategories}
                    setOpenModel={setOpenModel}
                    header={header} />
            </div>
            <div className="ag-theme-quartz" style={{ height: '100%', marginTop: '82px' }}>
                <div style={{ height: '50%' }}>
                    <AgGridReact
                        rowData={categoryList}
                        columnDefs={colDefs}
                    />
                </div>
            </div>
        </>
    );
}

export default Categories;