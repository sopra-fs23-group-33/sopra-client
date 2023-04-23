import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {Link, useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/LoginRegister.scss';
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import ProjectTitle from "../ui/ProjectTitle";
import LocalStorageManager from "../../helpers/LocalStorageManager";
import AppRouter from "../routing/routers/AppRouter";
import BullBearBackground from "../ui/BullBearBackground";


const LoginFormField = props => {
    return (
        <div className="welcome field">
            <TextField id="standard-basic"
                       label={props.label}
                       variant="standard"
                       value={props.value}
                       onChange={e => props.onChange(e.target.value)}
            />
        </div>
    );
};

LoginFormField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

const Login = () => {
    const history = useHistory();
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);

    const doLogin = async () => {
        try {
            const requestBody = JSON.stringify({username, password});
            const response = await api.post('/users/login', requestBody);

            const user = new User(response.data);
            LocalStorageManager.LoginRegister(user);

            history.push(`/dashboard`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
            history.push(`/login`);
        }
    };

    return (
        <div className="welcome container">
            <ProjectTitle/>
            <div className="welcome form">
                <h2>Login</h2>
                <LoginFormField
                    label="Username"
                    value={username}
                    onChange={un => setUsername(un)}
                />
                <LoginFormField
                    label="Password"
                    value={password}
                    onChange={n => setPassword(n)}
                />
                <div className="welcome button-container">
                    <Button
                        className="login-button"
                        disabled={!username || !password}
                        width="100%"
                        onClick={() => doLogin()}
                    >
                        Login
                    </Button>
                </div>
                <div className="button-container">
                    <Link to="/register">
                        <Button
                            className="login-button"
                            width="100%"
                        >
                            Go To Registration
                        </Button>
                    </Link>
                </div>
            </div>

            <BullBearBackground/>

        </div>
    );
};

export default Login;
