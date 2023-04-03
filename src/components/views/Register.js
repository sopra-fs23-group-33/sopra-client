import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {Link, useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Register.scss';
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const FormField = props => {
    return (
        <div className="register field">
            <TextField id="standard-basic"
                       label={props.label}
                       variant="standard"
                       value={props.value}
                       onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

FormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const Register = () => {
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const doRegister = async () => {
        try {
            const requestBody = JSON.stringify({username, password});
            const response = await api.post('/users/register', requestBody);

            localStorage.setItem('token', "test123");
            //localStorage.setItem('token', response.headers['token']);

            const user = new User(response.data);

            localStorage.setItem('userID', user.userID);
            localStorage.setItem('username', user.username);
            localStorage.setItem('creationDate', user.creationDate);
            localStorage.setItem('status', user.status);

            history.push(`/dashboard`);
        } catch (error) {
            alert(`Something went wrong during the registration. Username is probably already taken. \n${handleError(error)}`);
            history.push(`/register`);
        }
    }

    return (
        <BaseContainer>
            <div className="register container">
                <div className="register form">
                <h2>Register</h2>
                    <FormField
                        label="Username"
                        value={username}
                        onChange={n => setUsername(n)}
                    />
                    <FormField
                        label="Password"
                        value={password}
                        onChange={n => setPassword(n)}
                    />
                    <div className="register button-container">
                        <Button
                            disabled={!username || !password}
                            width="100%"
                            onClick={() => doRegister()}
                        >
                            Register
                        </Button>
                    </div>
                    <div className="switch button-container">
                        <Link to="/login">
                            <Button
                                width="100%"
                            >
                                Go To Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </BaseContainer>




    );
};

export default Register;