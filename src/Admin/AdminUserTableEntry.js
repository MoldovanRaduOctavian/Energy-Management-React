import React from 'react';
import * as Material from '@mui/material';
import axios from 'axios';
import * as Api from '../Requests/Endpoints';

export default function({ userProfile })
{
    const [updatePromptOpenState, setUpdatePromptOpenState] = React.useState(false);
    const [updateNameState, setUpdateNameState] = React.useState(userProfile["name"]);
    const [updateDescriptionState, setUpdateDescriptionState] = React.useState(userProfile["description"]);

    const handleDeleteClick = () => {

        const jsonPayload = { "userProfileId": userProfile["id"]};
        axios.post(Api.DELETE_USER, jsonPayload).then(
            (response) => {
                console.log(response.data);
            }
        )
    };

    const handleOpenUpdateClick = (event) => {
        event.preventDefault();

        setUpdateNameState(userProfile["name"]);
        setUpdateDescriptionState(userProfile["description"]);
        setUpdatePromptOpenState(true);
    };

    const handleCloseUpdateClick = (event) => {
        event.preventDefault();
        setUpdatePromptOpenState(false);
    };

    const handleConfirmUpdateClick = (event) => {
        event.preventDefault();
        
        const jsonPayload = {
            "userProfileId": userProfile["id"],
            "name": updateNameState,
            "description": updateDescriptionState
        };

        axios.post(Api.UPDATE_USER_PROFILE, jsonPayload).then(
            (response) => {
                console.log(response);
            }
        )

        setUpdatePromptOpenState(false);
    };

    const handleNameChange = (event) => {
        setUpdateNameState(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setUpdateDescriptionState(event.target.value);
    };

    return (
        <Material.TableRow>
            <Material.TableCell>{userProfile && userProfile["id"]}</Material.TableCell>
            <Material.TableCell>{userProfile && userProfile["name"]}</Material.TableCell>
            <Material.TableCell>{userProfile && userProfile["description"]}</Material.TableCell>
            <Material.TableCell><Material.Button variant="contained" onClick={handleDeleteClick}>Delete user</Material.Button></Material.TableCell>
            <Material.TableCell><Material.Button variant="contained" onClick={handleOpenUpdateClick}>Update user</Material.Button></Material.TableCell>

            <Material.Dialog open={updatePromptOpenState} maxWidth="sm" fullWidth>
                <Material.DialogTitle>{"User Profile Update - " + userProfile["name"]}</Material.DialogTitle>
                <Material.DialogContent>
                    <Material.TableContainer component={Material.Paper}>
                        <Material.TextField onChange={handleNameChange} autoFocus margin="dense" id="name" label="Name" fullWidth variant="standard" value={updateNameState} />
                        <Material.TextField onChange={handleDescriptionChange} margin="dense" id="description" label="Description" fullWidth variant="standard" value={updateDescriptionState} />
                    </Material.TableContainer>
                </Material.DialogContent>
                <Material.DialogActions>
                    <Material.Button onClick={handleCloseUpdateClick}>Close</Material.Button>
                    <Material.Button onClick={handleConfirmUpdateClick}>Update User</Material.Button>
                </Material.DialogActions>
            </Material.Dialog>

        </Material.TableRow>
    );
}