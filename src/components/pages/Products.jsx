import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme  

function Products() {

    const navigate = useNavigate()

    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
        { ProductId: 1, ProductName: "Tesla", },
        { ProductId: 2, ProductName: "Ford", },
        { ProductId: 3, ProductName: "Toyota", },
    ]);

    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
        { field: "ProductId" },
        { field: "ProductName" }, 
    ]);


    return (
        <>
         <AgGridReact rowData={rowData} columnDefs={colDefs}    />
        </>
    );
}

export default Products;