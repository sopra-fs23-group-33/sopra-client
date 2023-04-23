import React from "react";
import bullImage from "../../BullPicture.png";
import bearImage from "../../BearPicture.png";


const BullBearBackground = () => {
    return (
        <div className="bull-bear">
            <img src={bullImage} alt={"Bear"}/>
            <div className="filler"/>
            <img src={bearImage} alt={"Bull"}/>
        </div>
    )
}

export default BullBearBackground;