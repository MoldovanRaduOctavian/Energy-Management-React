import React from 'react';
import * as Material from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AdminUserTable from './AdminUserTable';
import AdminDeviceTable from './AdminDeviceTable';
import axios from 'axios';
import * as Api from '../Requests/Endpoints';

export default function AdminPage(){

    const [createUserOpenState, setCreateUserOpenState] = React.useState(false); 
    const [createUserUsernameState, setCreateUserUsernameState] = React.useState("");
    const [createUserPasswordState, setCreateUserPasswordState] = React.useState("");
    const [createUserNameState, setCreateUserNameState] = React.useState("");
    const [createUserDescriptionState, setCreateUserDescriptionState] = React.useState("");
    const [createUserAdminState, setCreateUserAdminState] = React.useState(false);

    const [createDeviceOpenState, setCreateDeviceOpenState] = React.useState(false);
    const [createDeviceNameState, setCreateDeviceNameState] = React.useState("");
    const [createDeviceAddressState, setCreateDeviceAddressState] = React.useState("");
    const [createDeviceDescriptionState, setCreateDeviceDescriptionState] = React.useState("");
    const [createDeviceMaximumConsumptionState, setCreateDeviceMaximumConsumptionState] = React.useState(0);

    const handleCloseCreateUserClick = (event) => {
        event.preventDefault();
        setCreateUserOpenState(false);
    };

    const handleConfirmCreateUserClick = (event) => {
        event.preventDefault();
        const jsonPayload = {
            "username": createUserUsernameState,
            "password": createUserPasswordState,
            "name": createUserNameState,
            "description": createUserDescriptionState,
            "admin": createUserAdminState
        };

        axios.post(Api.CREATE_USER_AND_PROFILE, jsonPayload).then(
            (response) => {
                console.log(response);
            }
        );

        setCreateUserOpenState(false);
    };

    const handleConfirmCreateDeviceClick = (event) => {
        event.preventDefault();
        const jsonPayload = {
            "name": createDeviceNameState,
            "address": createDeviceAddressState,
            "description": createDeviceDescriptionState,
            "maximumConsumption": createDeviceMaximumConsumptionState
        };

        axios.post(Api.CREATE_DEVICE, jsonPayload).then(
            (response) => {
                console.log(response);
            }
        );

        setCreateDeviceOpenState(false);
    };


    return (

        <Material.Grid container spacing={1}>

            <Material.Grid item sm={12}>

                <Material.Box sx={{ flexGrow: 1 }}>
                    <Material.AppBar position="static">
                        <Material.Toolbar>
                            <Material.IconButton
                                size="large"
                                edge="start"
                                color="inherit"
                                aria-label="menu"
                                sx={{ mr: 2 }}
                            >
                                <MenuIcon />
                            </Material.IconButton>
                            <Material.Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                                Admin Page
                            </Material.Typography>
                        </Material.Toolbar>
                    </Material.AppBar>
                </Material.Box>

            </Material.Grid>

            <Material.Grid item sm={12} >
                <Material.Grid container spacing={1}>
                    <Material.Grid item sm={3}>
                        <Material.Button onClick={(event) => {event.preventDefault(); setCreateUserOpenState(true)}} variant="contained">Create a New User</Material.Button>
                    </Material.Grid>
                    <Material.Grid item sm={3}>
                        <Material.Button onClick={(event) => {event.preventDefault(); setCreateDeviceOpenState(true)}} variant="contained">Create a New Device</Material.Button>
                    </Material.Grid>
                </Material.Grid>
            </Material.Grid>

            <Material.Dialog open={createUserOpenState} maxWidth="sm" fullWidth>
                <Material.DialogTitle>{"Create a new user"}</Material.DialogTitle>
                <Material.DialogContent>
                    <Material.TableContainer component={Material.Paper}>
                        <Material.TextField onChange={(event) => {event.preventDefault(); setCreateUserUsernameState(event.target.value)}} margin="dense" id="username" label="Username" fullWidth variant="standard"  autoFocus value={createUserUsernameState} />
                        <Material.TextField onChange={(event) => {event.preventDefault(); setCreateUserPasswordState(event.target.value)}} margin="dense" id="password" label="Password" type="password" fullWidth variant="standard" value={createUserPasswordState}/>
                        <Material.TextField onChange={(event) => {event.preventDefault(); setCreateUserNameState(event.target.value)}} margin="dense" id="name" label="Name" fullWidth variant="standard" value={createUserNameState}/>
                        <Material.TextField onChange={(event) => {event.preventDefault(); setCreateUserDescriptionState(event.target.value)}} margin="dense" id="description" label="Description" fullWidth variant="standard" value={createUserDescriptionState}/>
                    </Material.TableContainer>
                </Material.DialogContent>
                <Material.DialogActions>
                    <Material.Button onClick={(event) => {event.preventDefault(); setCreateUserOpenState(false)}}>Close</Material.Button>
                    <Material.Button onClick={handleConfirmCreateUserClick} >Create User</Material.Button>
                </Material.DialogActions>
            </Material.Dialog>

            
            <Material.Dialog open={createDeviceOpenState} maxWidth="sm" fullWidth>
                <Material.DialogTitle>{"Create a new device"}</Material.DialogTitle>
                <Material.DialogContent>
                    <Material.TableContainer component={Material.Paper}>
                        <Material.TextField onChange={(event) => {event.preventDefault(); setCreateDeviceNameState(event.target.value)}} margin="dense" id="name" label="Name" fullWidth variant="standard"  autoFocus value={createDeviceNameState} />
                        <Material.TextField onChange={(event) => {event.preventDefault(); setCreateDeviceAddressState(event.target.value)}} margin="dense" id="address" label="Address" fullWidth variant="standard" value={createDeviceAddressState}/>
                        <Material.TextField onChange={(event) => {event.preventDefault(); setCreateDeviceDescriptionState(event.target.value)}} margin="dense" id="description" label="Description" fullWidth variant="standard" value={createDeviceDescriptionState}/>
                        <Material.TextField onChange={(event) => {event.preventDefault(); setCreateDeviceMaximumConsumptionState(event.target.value)}} margin="dense" id="maximumConsumption" label="Maximum Consumption" type="number" fullWidth variant="standard" value={createDeviceMaximumConsumptionState}/>
                    </Material.TableContainer>
                </Material.DialogContent>
                <Material.DialogActions>
                    <Material.Button onClick={(event) => {event.preventDefault(); setCreateDeviceOpenState(false)}}>Close</Material.Button>
                    <Material.Button onClick={handleConfirmCreateDeviceClick} >Create Device</Material.Button>
                </Material.DialogActions>
            </Material.Dialog>


            <Material.Grid item sm={12}>
                <AdminUserTable />
            </Material.Grid>

            <Material.Grid item sm={12}>
                <AdminDeviceTable />
            </Material.Grid>

        </Material.Grid>

        
    );
}