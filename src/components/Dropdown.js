import React from "react";
import {Dropdown} from "react-bootstrap";

function DropdownButton() {
    return (
        <div container="body">
            <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Dropdown
                </Dropdown.Toggle>

                <Dropdown.Menu style={{drop : "up"}}>
                    <Dropdown.Item href="#">Action</Dropdown.Item>
                    <Dropdown.Item href="#">Another action</Dropdown.Item>
                    <Dropdown.Item href="#">Something else</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}

export default DropdownButton;