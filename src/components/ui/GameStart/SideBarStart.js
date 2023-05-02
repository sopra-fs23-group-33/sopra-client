import 'styles/ui/SideBar.scss';
import Button from "../Button";
import React from "react";
import {useHistory} from "react-router-dom";


const SideBarStart = (props) => {
    const history = useHistory();

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
                    <Button
                        className="SideBarButton"
                        onClick={() => history.push("/rulebook")}
                    >
                        Rulebook
                    </Button>
                </li>
                <li className="SideBarList row">
                    <Button className="SideBarButton">
                        About
                    </Button>
                </li>
                <li className="SideBarList row">
                    <Button
                        className="SideBarButton"
                        onClick={() => props.history.push("/dashboard")}
                    >
                        Back to Dashboard
                    </Button>
                </li>
            </ul>
        </div>
    );
}

export default SideBarStart;