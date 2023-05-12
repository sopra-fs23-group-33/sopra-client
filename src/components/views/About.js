import * as React from "react";
import "styles/views/GameRound.scss";
import "styles/ui/Text.scss";
import Button from "../ui/Button";
import {useHistory} from "react-router-dom";


const About = () => {
    const history = useHistory();

    return (
        <div className="round base-container">
            <br/>
            <h1 align="center">About Us</h1>
            <br/>
            <div className="round wrapper" >
                

                <div align="center">
                    <Button
                        className="leave-button"
                        onClick={() => history.push("/dashboard")}
                    >
                        Back to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default About;
