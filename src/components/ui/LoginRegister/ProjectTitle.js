import React from "react";
import 'styles/views/LoginRegister.scss';
import "styles/ui/Text.scss";


const ProjectTitle = () => {
    return (
        <div className="title-container">
            <div className="title">
                <span className="bull-text">BULL</span> V<span className="dollar">$</span>. <span className="bear-text">BEAR</span>
            </div>
            <div className="subtitle">
                The Battle
            </div>
        </div>
    )
}
export default ProjectTitle;