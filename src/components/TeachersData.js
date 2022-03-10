import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

function TeachersData() {

    const [ selectedValue, setSelectedValue ] = useState([]);

    const columnHeader = [
        { headerName: "Teacher Id", field: "teacher_id", sortable: true, checkboxSelection: true, headerCheckboxSelection: true },
        { headerName: "Teacher Name", field: "teacher_name", sortable: true },
        { headerName: "Phone Number", field: "contactno", sortable: true },
        { headerName: "Email", field: "email", sortable: true },
        { headerName: "Languages", field: "spoken_languages", sortable: true },
        { headerName: "Audio Status", field: "audio_status", sortable: true },
        { headerName: "Student Mapped To", field: "", sortable: true },
        { headerName: "APR Reference Name", field: "apr_reference_name", sortable: true },
        { headerName: "APR Phone Number", field: "apr_reference_contact", sortable: true },
        { headerName: "Teacher Status", field: "teacher_status", sortable: true,
            cellStyle: (params) => (params.value === "mapped" ? {backgroundColor : "green", color : "white", fontWeight : "bold"} : {backgroundColor: "red", color : "white", fontWeight : "bold"})
        },
        { headerName: "Group Id", field: "group_id", sortable: true },
        { headerName: "Group Status", field: "group_status", sortable: true,
            cellStyle: (params) => (params.value === "grouped" ? {backgroundColor : "green", color : "white", fontWeight : "bold"} : {backgroundColor: "red", color : "white", fontWeight : "bold"})
        },
        { headerName: "Comments", field: "", sortable: true },
        { headerName: "Action", cellRendererFramework: (params) => 
            <div>
                <Button type="button" variant="success">Click Here</Button>
            </div>
        }
    ]

    const onGridReady = (params) => {
        fetch("http://localhost:8080/api/teacher/view/teacherview")
        .then(resp => resp.json())
        .then(resp => {
            // console.log(resp);
            params.api.applyTransaction({ add : resp });
        });
    }

    const rowSelectionType = "multiple";

    const onSelectionChanged = (event) => {
        console.log(event.api.getSelectedRows());
        setSelectedValue(event.api.getSelectedRows());
    }

    console.log(selectedValue);

    return (
        <div>
            <h1 className="mt-5">Teachers Value using API Call</h1>
            <div className="ag-theme-alpine my-5" style={{ width: "100%", height: "500px" }}>
                <AgGridReact
                    onGridReady = {onGridReady}
                    columnDefs = {columnHeader}
                    rowSelection = {rowSelectionType}
                    onSelectionChanged = {onSelectionChanged}
                    rowMultiSelectWithClick = {true}
                    pagination = {true}
                    paginationPageSize = {2}
                    paginationAutoPageSize = {true}
                />
            </div>
            <p>
                {selectedValue.map((items) => (
                    items.teacher_name
                ))}
            </p>
            
                <ul>
                    {selectedValue.map((value, index) => {
                    return <li key={index}>{value.teacher_name}</li>
                    })}
                </ul>
            
        </div>
    )
}

export default TeachersData;