import React, {useState} from "react";
import bullImage from "../../../BullPicture.png";
import bullImageGreen from "../../../BullPictureGreen.png";
import bearImage from "../../../BearPicture.png";
import bearImageRed from "../../../BearPictureRed.png";

// https://svgsilh.com/ms/4caf50/image/45977.html
// https://svgsilh.com/ms/f44336/image/160226.html

const BullBearBackground = () => {
    const [bullIsHovered, bullSetIsHovered] = useState(false);
    const [bearIsHovered, bearSetIsHovered] = useState(false);

    return (
        <div className="bull-bear">
            <img
                className="bull"
                src={bullIsHovered ? bullImageGreen : bullImage}
                alt={"Bull"}
                onMouseEnter={() => bullSetIsHovered(true)}
                onMouseLeave={() => bullSetIsHovered(false)}
            />
            <div className="filler"/>
            <img
                className="bear"
                src={bearIsHovered ? bearImageRed : bearImage}
                alt={"Bear"}
                onMouseEnter={() => bearSetIsHovered(true)}
                onMouseLeave={() => bearSetIsHovered(false)}
            />
        </div>
    )
}

export default BullBearBackground;