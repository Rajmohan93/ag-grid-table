import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function ViewAllBatches() {

    const [ batchValue, setBatchValue ] = useState([]);
    const [ filterData, setFilterData ] = useState([]);

    const columnHeader = [
        {
            headerName: "Batch Id",
            field: "batch_id",
            sortable: true,
            filter: true,
            editable: true,
            checkboxSelection: true,
            headerCheckboxSelection: true
        }, {
            headerName: "Batch Name",
            field: "batch_name",
            sortable: true,
            filter: true,
            editable: true,
            floatingFilter: true
        }, {
            headerName: "Teacher Profile Names",
            field: "teacherprofilenames",
            sortable: true,
            filter: true,
            editable: true,
        }, {
            headerName: "Batch Count Teacher",
            field: "batch_count_teacher",
            sortable: true,
            filter: true,
            editable: true,
        }, {
            headerName: "Student Profile Names",
            field: "studentprofilenames",
            sortable: true,
            filter: true,
            editable: true,
        }, {
            headerName: "Batch Count Student",
            field: "batch_count_student",
            sortable: true,
            filter: true,
            editable: true,
        }, {
            headerName: "Add Teacher",
            cellRendererFramework: (params) => <div>
                    <Button type="button" variant="primary">Add Teacher</Button>
                </div>
        }, {
            headerName: "Add Student",
            cellRendererFramework: (params) => <div>
                    <Button type="button" variant="primary">Add Student</Button>
                </div>
        }, {
            headerName: "Action",
            cellRendererFramework: (params) => <div>
                    <Button type="button" variant="primary" className="mr-1">Edit</Button>
                    <Button type="button" variant="danger">Delete</Button>
                </div>
        }
    ]

    const onGridReady = (params) => {
        setFilterData(params.api);
        fetch("http://localhost:8080/api/batchview/batchtable")
            .then(resp => resp.json())
            .then(resp => {
                // console.log(resp);
                params
                    .api
                    .applyTransaction({add: resp});
            });
    }

    // const rowSelectionType = "multiple";

    const onSelectionChanged = (event) => {
        // console.log(event.api.getSelectedRows());
        setBatchValue(event.api.getSelectedRows());
    }

    const onFilterTextChange = (e) => {
        filterData.setQuickFilter(e.target.value);
    }

    // console.log(batchValue);

    return (
        <div>
            <h1 className="mt-5">View All Batches Data using API Call</h1>
            <div>
                <input type="search" placeholder="Search"
                    onChange={onFilterTextChange}
                />
            </div>
            <div
                className="ag-theme-alpine my-5"
                style={{
                width: "100%",
                height: "300px"
            }}>
                <AgGridReact
                    // defaultColDef={{flex: 1}}
                    onGridReady={onGridReady}
                    columnDefs={columnHeader}
                    // rowSelection = {rowSelectionType}
                    onSelectionChanged={onSelectionChanged}
                    rowMultiSelectWithClick={true}
                    pagination={true}
                    paginationPageSize={10}
                    paginationAutoPageSize={true}
                />
            </div>
        </div>
    )
}

export default ViewAllBatches;