import TextField from "@mui/material/TextField";
import React from "react";
import PropTypes from "prop-types";
import 'styles/ui/FormField.scss';

// MUI text field documentation
// https://mui.com/material-ui/react-text-field/

const FormField = props => {
    return (
        <div className="formField container">
            <div className="formField form">
                <p>{props.header}</p>
                <TextField
                    id={props.id}
                    select={props.select}
                    label={props.label}
                    helperText={props.helperText}
                    type={props.type}
                    variant={props.variant}
                    value={props.value}
                    inputProps={props.inputProps}
                    onChange={e => props.onChange(e.target.value)}
                >
                    {props.list}
                </TextField>
            </div>
        </div>
    );
};

FormField.defaultProps = {
    id:"standard",
    label:"Default Label"
}

FormField.propTypes = {
    header: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default FormField;