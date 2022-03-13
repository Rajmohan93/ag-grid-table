import React from "react";
import {AgGridReact} from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

import cardata from "./MOCK_DATA.json";

import TeachersData from "./components/TeachersData";
import BatchesData from "./components/ViewAllBatches";

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
        }
    ];

    const rowSelectionType = "multiple";

    const onSelectionChanged = (event) => {
        // console.log(event.columnApi.columnModel.columnDefs);
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
                <TeachersData/>
            </div>
            <div>
                <BatchesData/>
            </div>
        </div>
    );
};

export default App;