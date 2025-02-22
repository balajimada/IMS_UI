import React, { useEffect, useState, FC } from "react";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import AddEditCategory from "./AddEditCategory";

interface Category {
    categoryID: number;
    categoryCode: string;
    categoryName: string;
    gst: string;
}

const Categories: FC = () => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [isOpenModel, setOpenModel] = useState<boolean>(false);
    const [categoryData, setCategoryData] = useState<Category | undefined>(undefined);
    const [header, setHeader] = useState<string>('');

    function getApiRouteUrl(): string {
        return "http://localhost:5000/";
    }

    const buttonClickedHandler = (): void => {
        setHeader("Add New Category");
        setCategoryData(undefined);
        setOpenModel((prevIsOpenModel) => !prevIsOpenModel);
    }

    function loadCategories(): void {
        axios.post(getApiRouteUrl() + "api/Product/GetProductCategories").then(res => {
            if (res?.data) {
                console.log(res.data);
                setCategoryList(res.data);
            }
        });
    }

    const editCategory = (params: any): void => {
        console.log(params);
        setOpenModel(true);
        setCategoryData(params.data);
        setHeader("Edit Category");
    }

    const deleteCategory = (params: any): void => {
        if (window.confirm('Are you sure you want to delete this Category?')) {
            axios.post(getApiRouteUrl() + "api/Product/DeleteCategory", params.data).then(res => {
                if (res?.data) {
                    console.log(res.data);
                    loadCategories();
                }
            });
        }
    }

    useEffect(() => {
        loadCategories();
    }, []);

    const [colDefs, setColDefs] = useState<any[]>([
        { field: "categoryID", flex: 1 },
        { field: "categoryCode", flex: 1 },
        { field: "categoryName", flex: 2 },
        {
            headerName: "GST (%)",
            valueGetter: (p: any) => p.data.gst.toFixed(2),
            flex: 1
        },
        {
            headerName: "Action",
            minWidth: 150,
            cellRenderer: (params: any) => (
                <div>
                    <Button variant="primary" onClick={() => editCategory(params)}>Edit</Button>
                    <Button variant="secondary" onClick={() => deleteCategory(params)} style={{ marginLeft: '10px' }}>Delete</Button>
                </div>
            ),
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