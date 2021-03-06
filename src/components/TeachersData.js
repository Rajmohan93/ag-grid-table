import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function TeachersData() {

    const [ selectedValue, setSelectedValue ] = useState([]);
    const [ filterData, setFilterData ] = useState([]);

    // const columnHeader = [
    //     { headerName: "Teacher Id", field: "teacher_id", filter: true, sortable: true, checkboxSelection: true, headerCheckboxSelection: true, },
    //     { headerName: "Teacher Name", field: "teacher_name", filter: true, sortable: true, },
    //     { headerName: "Phone Number", field: "contactno", filter: true, sortable: true },
    //     { headerName: "Email", field: "email", filter: true, sortable: true },
    //     { headerName: "Languages", field: "spoken_languages", filter: true, sortable: true },
    //     { headerName: "Audio Status", field: "audio_status", filter: true, sortable: true },
    //     { headerName: "APR Reference Name", field: "apr_reference_name", filter: true, sortable: true },
    //     { headerName: "APR Phone Number", field: "apr_reference_contact", filter: true, sortable: true },
    //     { headerName: "Teacher Status", field: "teacher_status", filter: true, sortable: true,
    //         cellStyle: (params) => (params.value === "mapped" ? {color : "green", fontWeight : "bold"} : {color: "red", fontWeight : "bold"})
    //     },
    //     { headerName: "Group Id", field: "group_id", filter: true, sortable: true },
    //     { headerName: "Group Status", field: "group_status", filter: true, sortable: true,
    //         cellStyle: (params) => (params.value === "grouped" ? {color : "green", fontWeight : "bold"} : {color: "red", fontWeight : "bold"})
    //     },
    // ]

    const onGridReady = (params) => {
        setFilterData(params.api);
        // console.log(params);
        fetch("http://localhost:8080/api/teacher/view/teacherview")
        .then(resp => resp.json())
        .then(resp => {
            const columns = Object.keys(resp[0]).map(key => ({
                field : key, filter : true, sortable : true, editable : true, headerCheckboxSelection: true
            }));
            params.api.setColumnDefs(columns);
            params.api.applyTransaction({ add : resp });
        });
    }

    const rowSelectionType = "multiple";

    const onSelectionChanged = (event) => {
        console.log(event.api.getSelectedRows());
        setSelectedValue(event.api.getSelectedRows());
    }

    const onFilterTextChange = (e) => {
        filterData.setQuickFilter(e.target.value);
    }

    // console.log(selectedValue);

    return (
        <div>
            <h1 className="mt-5">Teachers Value using API Call</h1>
            <div>
                <input type="search" placeholder="Search"
                    onChange={onFilterTextChange}
                />
            </div>
            <div className="ag-theme-alpine my-5" style={{ width: "100%", height: "500px" }}>
                <AgGridReact
                    onGridReady = {onGridReady}
                    // columnDefs = {columnHeader}
                    rowSelection = {rowSelectionType}
                    onSelectionChanged = {onSelectionChanged}
                    rowMultiSelectWithClick = {true}
                    pagination = {true}
                    paginationPageSize = {10}
                    paginationAutoPageSize = {true}
                    sideBar = {true}
                />
            </div>
            {/* <p>
                {selectedValue.map((items) => (
                    items.teacher_name
                ))}
            </p>
            <ul>
                {selectedValue.map((value, index) => {
                return <li key={index}>{value.teacher_name}</li>
                })}
            </ul> */}
        </div>
    )
}

export default TeachersData;