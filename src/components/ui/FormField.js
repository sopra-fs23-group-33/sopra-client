import TextField from "@mui/material/TextField";
import React from "react";
import PropTypes from "prop-types";

// MUI text field documentation
// https://mui.com/material-ui/react-text-field/

const FormField = props => {
    return (
        <TextField
            id={props.id}
            label={props.label}
            type={props.type}
            variant={props.variant}
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
        />
    );
};

FormField.defaultProps = {
    id:"standard",
    label:"Default Label"
}

FormField.propTypes = {
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default FormField;