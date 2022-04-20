import React from "react";
import { AgGridReact } from "ag-grid-react";
import { Dropdown } from "react-bootstrap";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import cardata from "./MOCK_DATA.json";

import TeachersData from "./components/TeachersData";
// import BatchesData from "./components/ViewAllBatches";

import "./App.css";

const App = () => {

    const columnTable = [
        {
            headerName: "Make",
            field: "make",
            filter: true,
            sortable: true,
            editable: true,
            checkboxSelection: true,
            headerCheckboxSelection: true
            // floatingFilter: true
        }, {
            headerName: "Model",
            field: "model",
            filter: true,
            sortable: true,
            editable: true
        }, {
            headerName: "Color",
            field: "color",
            filter: true,
            sortable: true,
            editable: true
        }, {
            headerName: "Price",
            field: "price",
            filter: true,
            sortable: true,
            editable: true
        }, {
            headerName: "Car Model Year",
            field: "carmodelyear",
            filter: true,
            sortable: true,
            editable: true
        }, {
            headerName: "Action",
            cellRendererFramework: (params) => 
                <div>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
                            <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
        }
    ];

    const rowSelectionType = "multiple";

    const onSelectionChanged = (event) => {
        console.log(event.columnApi.columnModel.columnDefs);
        console.log(event.api.getSelectedRows());
    }

    return (
        <div>
            <h1>AG Grid React Table Data using Mockaroo</h1>
            <div className="ag-theme-alpine" style={{ width: "100%", height: "500px" }}>
                <AgGridReact
                    columnDefs={columnTable}
                    rowData={cardata}
                    rowSelection={rowSelectionType}
                    onSelectionChanged={onSelectionChanged}
                    rowMultiSelectWithClick={true}
                    defaultColDef={{flex:1}}
                />
            </div>
            <div>
                <TeachersData />
            </div>
            {/* <div>
                <BatchesData />
            </div> */}
        </div>
    );
};

export default App;