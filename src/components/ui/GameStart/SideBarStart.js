import 'styles/ui/SideBar.scss';
import Button from "../Button";
import React from "react";


const SideBarStart = (props) => {

    return (
        <div className="SideBar">
            <h2>Game Start</h2>
            <ul className="SideBarList">
                <li className="SideBarList row">
                    <Button
                        className="SideBarButton"
                        onClick={props.click}
                    >
                        Create Game Room
                    </Button>
                </li>
                <li className="SideBarList row">
                    <Button className="SideBarButton">
                        Back to Dashboard
                    </Button>
                </li>
                <li className="SideBarList row">
                    <Button className="SideBarButton">
                        Rulebook
                    </Button>
                </li>
                <li className="SideBarList row">
                    <Button className="SideBarButton">
                        About
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default SideBarStart;