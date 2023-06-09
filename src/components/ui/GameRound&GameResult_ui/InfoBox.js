import PropTypes from "prop-types";
import {Spinner} from "../Spinner";
import * as React from "react";

const InfoBox = props => {

    let unit
    if (props.unit) {
        unit = <h2 className="result h2">{props.unit}</h2>
    }

    return (
        <div {...props} style={{height: props.height, ...props.style}}
             className={`infoBox ${props.className ?? 'round wrapper'}`}>
            <p className="result p">{props.header}</p>
            <h1 className="result h1">{props.number}</h1>
            {unit}
            {props.event}
        </div>
    );
};

InfoBox.propTypes = {
    header: PropTypes.string,
    event: PropTypes.any,
    number: PropTypes.any,
    unit: PropTypes.any
};

InfoBox.defaultProps = {
    header: "Header",
    number: <Spinner/>,
    unit: "unit"
};

export default InfoBox;
