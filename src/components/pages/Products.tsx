import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { AgGridReact } from 'ag-grid-react'; 
import "ag-grid-community/styles/ag-grid.css"; 
import "ag-grid-community/styles/ag-theme-quartz.css"; 
import axios from "axios";
import Button from 'react-bootstrap/Button';
import AddEditProduct from "./AddEditProduct";
import ImageRenderer from "./ImageRenderer";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

const Products: React.FC = () => {
    const navigate = useNavigate();
    const [productlist, setProductList] = useState<Product[]>([]);
    const [isOpenModel, setOpenModel] = useState<boolean>(false);
    const [productData, setProductData] = useState<Product | undefined>(undefined);
    const [header, setHeader] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');
    const rowHeight: number = 100;

    function getApiRouteUrl(): string {
        return "https://localhost:44354/";
    }

    const buttonClickedHandler = (): void => {
        setHeader("Add New Product");
        setProductData(undefined);
        setOpenModel((prev) => !prev);
    }

    const editProduct = (params: any): void => {
        console.log(params);
        setOpenModel(true);
        setProductData(params.data);
        setHeader("Edit Product");
    }

    const deleteProduct = (params: any): void => {
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

    useEffect(() => {
        setSearchInput('');
        loadProducts();
    }, []);

    
    function loadProducts(): void {
        const searchReq = { ProductName: searchInput };

        axios.get(getApiRouteUrl() + "api/Products").then(res => {
            if (res?.data) {
                console.log(res.data);
                setProductList(res.data);
            }
        });
    }

    const onSearch = (): void => {
        loadProducts();
    }

    const onClear = (): void => {
        setSearchInput('');
        loadProducts();
    }
    
    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        const { value } = e.target;
        setSearchInput(value);
    }

    
   interface ColDef {
       field?: string;
       headerName?: string;
       flex?: number;
       minWidth?: number;
       editable?: boolean;
       colId?: string;
       valueGetter?: (params: any) => any;
       cellRenderer?: (params: any) => JSX.Element | null; 
   }

   const [colDefs, setColDefs] = useState<ColDef[]>([
       { field: "name", flex: 3 },
       { field: "description", headerName: "Description", flex: 3 },
       {
           headerName: "Price (Rs)",
           valueGetter: p => p.data.price.toFixed(2),
           flex: 2
       },
       {
           headerName: "Action",
           minWidth: 150,
           cellRenderer: function (params) {
               return <div>
                   <Button variant="primary" onClick={() => editProduct(params)}>Edit</Button>
                   <Button variant="secondary" onClick={() => deleteProduct(params)} style={{ marginLeft: '10px' }}>Delete</Button>
               </div>
           },
           editable: false,
           colId: "action"
       }
   ]);

   return (
       <>
           <div>
               <b>Search Product:</b> <input style={{ width:'30%' }} value={searchInput} onChange={onInputChange}></input>
               <Button className="mr-3 ml-3" variant="primary" onKeyDown={e => e.key === 'Enter' && onSearch()}
                   onClick={() => onSearch()}>
                   Search
               </Button>
               <Button variant="secondary" onClick={() => onClear()}>
                   Clear
               </Button>
           </div>
           <div>
               <Button variant="primary" style={{ float:'right' }} onClick={buttonClickedHandler}>Add New Product</Button>
           </div>
           <div className="ag-theme-quartz" style={{ height:'100%', marginTop:'44px' }}>
               <div style={{ height:'50%' }}>
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