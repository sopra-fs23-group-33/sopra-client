import React, {useEffect, useState} from 'react';
import {api} from 'helpers/api';
import User from 'models/User';
import {Link, useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/LoginRegister.scss';
import ProjectTitle from "../ui/LoginRegister/ProjectTitle";
import LocalStorageManager from "../../helpers/LocalStorageManager";
import BullBearBackground from "../ui/LoginRegister/BullBearBackground";
import {Alert, AlertTitle} from "@mui/material";
import RegisterFormField from "../ui/RegisterFormField";


const Register = () => {
    const history = useHistory();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [alertStatus, setAlertStatus] = useState(false);

    const handleUsernameValidation = (isValid) => {
        setIsUsernameValid(isValid);
    };
    const handlePasswordValidation = (isValid) => {
        setIsPasswordValid(isValid);
    }

    const doRegister = async () => {
        try {
            const requestBody = JSON.stringify({username, password});
            const response = await api.post("/users/register", requestBody);

            const user = new User(response.data);
            LocalStorageManager.UpdateUser(user);

            history.push(`/dashboard`);
        } catch (error) {
            setAlertStatus(true);
        }
    }

    const handleClose = () => {
        setAlertStatus(false);
    }

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.keyCode === 13 && (isUsernameValid && isPasswordValid)) {
                doRegister();
            }
        };
        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [username, password]);


    return (
        <div className="welcome container">
            <ProjectTitle/>
            <div className="welcome form register">
                <h2>Register</h2>
                <RegisterFormField
                    label="Username"
                    value={username}
                    onChange={n => setUsername(n)}
                    helperText="1-13 characters; no white spaces & exotic characters"
                    handleValidation={handleUsernameValidation}
                />
                <RegisterFormField
                    label="Password"
                    value={password}
                    onChange={n => setPassword(n)}
                    helperText="8-30 characters; at least one letter, number & special character"
                    handleValidation={handlePasswordValidation}
                />
                <div className="welcome button-container">
                    <Button
                        className="login-button"
                        disabled={!isUsernameValid || !isPasswordValid}
                        width="100%"
                        onClick={() => doRegister()}
                    >
                        Register
                    </Button>
                </div>
                <div className="button-container">
                    <Link to="/login">
                        <Button
                            className="login-button"
                            width="100%"
                        >
                            Go To Login
                        </Button>
                    </Link>
                </div>
            </div>
            <br/>
            <div className="popup-message">
                {alertStatus && (
                    <Alert variant="filled"
                           severity="error"
                           onClose={handleClose}>
                        <AlertTitle>Registration Failed</AlertTitle>
                        This username is taken - <strong>Try again with a different one!</strong>
                    </Alert>
                )}
            </div>

            <BullBearBackground/>

        </div>

    );
};

export default Register;