import Button from "../Button";
import * as React from "react";

const TablePowerups = () => (
        <div className="round wrapper">
            My Powerups
            <div className="table">
                <thead>
                <tr>
                    <th>Powerup</th>
                    <th>num left</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td>x10</td> <td>2</td> <td> <Button>Activate</Button> </td>
                </tr>
                <tr>
                    <td>x10</td> <td>2</td> <td> <Button>Activate</Button> </td>
                </tr>
                <tr>
                    <td>x10</td> <td>2</td> <td> <Button>Activate</Button> </td>
                </tr>
                <tr>
                    <td>x10</td> <td>2</td> <td> <Button>Activate</Button> </td>
                </tr>
                </tbody>
            </div>
        </div>
    )

export default TablePowerups;
