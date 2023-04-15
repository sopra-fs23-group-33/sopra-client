import React, {useState} from 'react';
import {api, handleError} from 'helpers/api';
import User from 'models/User';
import {Link, useHistory} from 'react-router-dom';
import {Button} from 'components/ui/Button';
import 'styles/views/Login.scss';
import PropTypes from "prop-types";
import TextField from '@mui/material/TextField';
import AppRouter from "../routing/routers/AppRouter";

const FormField = props => {
    return (
        <div className="login field">
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

const Login = () => {
    const history = useHistory();
    const [password, setPassword] = useState(null);
    const [username, setUsername] = useState(null);

    const doLogin = async () => {
        try {
            const requestBody = JSON.stringify({username, password});
            const response = await api.post('/users/login', requestBody);

            const user = new User(response.data);

            localStorage.setItem('token', user.token);
            localStorage.setItem('userID', user.userID);
            localStorage.setItem('username', user.username);
            localStorage.setItem('creationDate', user.creationDate);
            localStorage.setItem('status', user.status);
            localStorage.setItem('numberOfBetsWon', user.numberOfBetsWon);
            localStorage.setItem('numberOfBetsLost', user.numberOfBetsLost);
            localStorage.setItem('rank', user.rank);

            // Login successfully worked --> navigate to the route /game in the GameRouter
            history.push(`/dashboard`);
        } catch (error) {
            alert(`Something went wrong during the login: \n${handleError(error)}`);
        }
    };

    return (
        <div className="login container">
            <div className="title-container">
                <div className="title">
                    Bull V$. Bear
                </div>
                <div className="subtitle">
                    The Battle
                </div>
            </div>

            <div className="login form">
                <h2>Login</h2>
                <FormField
                    label="Username"
                    value={username}
                    onChange={un => setUsername(un)}
                />
                <FormField
                    label="Password"
                    value={password}
                    onChange={n => setPassword(n)}
                />
                <div className="login button-container">
                    <Button
                        className="login-button"
                        disabled={!username || !password}
                        width="100%"
                        onClick={() => doLogin()}
                    >
                        Login
                    </Button>
                </div>
                <div className="switch button-container">
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
        </div>
    );
};

export default Login;
