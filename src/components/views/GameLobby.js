import "styles/_theme.scss";
import React, {useState} from "react";
import FormField from "../ui/GameLobby/FormField";
import 'styles/views/GameLobby.scss';
import {MenuItem} from "@mui/material";
import {booleanSelect, gameModes} from "../../helpers/constants";
import SideBarLobby from "../ui/GameLobby/SideBarLobby";
import {useHistory} from "react-router-dom";
import {api} from "../../helpers/api";
import Game from "../../models/Game";





const GameLobby = () => {



    return (
        <div className="BaseContainer">
            <SideBarLobby/>
            <div className="primary-container">
                <div className="secondary-container">
                    <FormField
                        header="Set Game Room Name"
                        id="outlined-required"
                        label="Game Room Name"
                    />
                    <FormField
                        header="Set Game Mode"
                        id="outlined-select-gameMode"
                        select="select"
                        label="Select"
                        list={gameModes.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    />
                </div>
                <div className="secondary-container">
                    <FormField
                        header="Do you want to play with Power-Ups?"
                        id="outlined-select-gameMode"
                        select="select"
                        label="Select"
                        list={booleanSelect.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    />
                    <FormField
                        header="Do you want to play with Events?"
                        id="outlined-select-gameMode"
                        select="select"
                        label="Select"
                        list={booleanSelect.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    />
                </div>
                <div className="secondary-container">
                    <FormField
                        header="Set Maximum Number of Players"
                        id="outlined-number"
                        label="Maximum Number of Players"
                        type="number"
                    />
                    <FormField
                        header="Set Maximum Number of Rounds"
                        id="outlined-number"
                        label="Maximum Number of Rounds"
                        type="number"
                    />
                </div>
            </div>
        </div>
    );
}

export default GameLobby;