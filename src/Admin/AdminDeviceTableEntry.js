import React from 'react';
import * as Material from '@mui/material';
import axios from 'axios';
import * as Api from '../Requests/Endpoints';

export default function AdminDeviceTableEntry({ device, userMapping })
{   
    const [deviceOwnerState, setDeviceOwnerState] = React.useState(null);
    const [updatePromptOpenState, setUpdatePromptOpenState] = React.useState(false);

    const [updateDeviceNameState, setUpdateDeviceNameState] = React.useState(device["name"]);
    const [updateDeviceAddressState, setUpdateDeviceAddressState] = React.useState(device["address"]);
    const [updateDeviceDescriptionState, setUpdateDeviceDescriptionState] = React.useState(device["description"]);
    const [updateDeviceMaximumConsumptionState, setUpdateDeviceMaximumConsumptionState] = React.useState(device["maximumConsumption"]);
    const [updateDeviceOwnerNameState, setUpdateDeviceOwnerNameState] = React.useState("");

    React.useEffect(
        () => {
            if (device["userReference"] !== null)
            {
                console.log(userMapping);

                const jsonPayload = {
                    "userProfileId": device["userReference"]["id"]
                };
                axios.post(Api.GET_USER_PROFILE_FOR_ID, jsonPayload).then(
                    (response) => {
                        console.log(response.data);
                        if (response.status === 200)
                        {
                            setDeviceOwnerState(response.data);
                            if (deviceOwnerState !== null)
                                setUpdateDeviceOwnerNameState(deviceOwnerState["name"]);
                        }    
                    }
                )}
            }
            , [device]);

    const handleDeleteClick = (event) => {
        event.preventDefault();
        const jsonPayload = {
            "deviceId": device["id"]
        };

        axios.post(Api.DELETE_DEVICE, jsonPayload).then(
            (response) => {
                console.log(response);
            }
        );
    }

    const handleConfirmUpdateClick = (event) => {
        event.preventDefault();
        console.log(updateDeviceOwnerNameState);

        const jsonPayload = {
            "deviceId": device["id"],
            "name": updateDeviceNameState,
            "address": updateDeviceAddressState,
            "description": updateDeviceDescriptionState,
            "maximumConsumption": updateDeviceMaximumConsumptionState,
            "userReferenceId": updateDeviceOwnerNameState
        };

        axios.post(Api.UPDATE_DEVICE, jsonPayload).then(
            (response) => {
                console.log();
            }
        );

        setUpdatePromptOpenState(false);
    }

    return (
        <Material.TableRow>
            <Material.TableCell>{device && device["id"]}</Material.TableCell>
            <Material.TableCell>{device && device["name"]}</Material.TableCell>
            <Material.TableCell>{device && device["address"]}</Material.TableCell>
            <Material.TableCell>{device && device["description"]}</Material.TableCell>
            <Material.TableCell>{device && device["maximumConsumption"]}</Material.TableCell>
            <Material.TableCell>{(deviceOwnerState !== null) ? deviceOwnerState["name"] : "NO OWNER"}</Material.TableCell>
            <Material.TableCell><Material.Button onClick={handleDeleteClick} variant="contained" >Delete device</Material.Button></Material.TableCell>
            <Material.TableCell><Material.Button onClick={(event) =>{ event.preventDefault(); setUpdatePromptOpenState(true);}} variant="contained" >Update device</Material.Button></Material.TableCell>

            <Material.Dialog open={updatePromptOpenState} maxWidth="sm" fullWidth>
                <Material.DialogTitle>{"Device Update - " + device["name"]}</Material.DialogTitle>
                <Material.DialogContent>
                    <Material.TableContainer component={Material.Paper}>
                        <Material.TextField onChange={(event) => {event.preventDefault(); setUpdateDeviceNameState(event.target.value)}} autoFocus margin="dense" id="name" label="Name" fullWidth variant="standard" value={updateDeviceNameState} />
                        <Material.TextField onChange={(event) => {event.preventDefault(); setUpdateDeviceAddressState(event.target.value)}} margin="dense" id="address" label="Address" fullWidth variant="standard" value={updateDeviceAddressState} />
                        <Material.TextField onChange={(event) => {event.preventDefault(); setUpdateDeviceDescriptionState(event.target.value)}} autoFocus margin="dense" id="description" label="Description" fullWidth variant="standard" value={updateDeviceDescriptionState} />
                        <Material.TextField onChange={(event) => {event.preventDefault(); setUpdateDeviceMaximumConsumptionState(event.target.value)}} autoFocus margin="dense" id="maximumConsumption" type="number" label="Maximum Consumption" fullWidth variant="standard" value={updateDeviceMaximumConsumptionState} />
                        <Material.TextField onChange={(event) => {event.preventDefault(); setUpdateDeviceOwnerNameState(event.target.value)}} id="owner" select label="Owner" fullWidth value={updateDeviceOwnerNameState} helperText="Select the owner">
                        {
                            Object.keys(userMapping).map((key) => {
                                return (<Material.MenuItem key={key} value={userMapping[key]}>
                                    {key}
                                </Material.MenuItem>);
                            })
                        }
                        </Material.TextField>
                    </Material.TableContainer>
                </Material.DialogContent>
                <Material.DialogActions>
                    <Material.Button onClick={(event) => {event.preventDefault(); setUpdatePromptOpenState(false); }}>Close</Material.Button>
                    <Material.Button onClick={handleConfirmUpdateClick}>Update User</Material.Button>
                </Material.DialogActions>
            </Material.Dialog>

        </Material.TableRow>


    );
}