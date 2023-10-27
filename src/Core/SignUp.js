import * as React from 'react';
import * as Material from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Api from '../Requests/Endpoints';


export default function SignUp()
{
    const [requestStatus, setRequestStatus] = React.useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const jsonPayload = {
            "username": formData.get('username'),
            "password": formData.get('password'),
            "name": formData.get('name'),
            "description": formData.get('description'),
            "admin": false
        };

        axios.post(Api.CREATE_USER_AND_PROFILE, jsonPayload).then(
            (response) => {
               if( response.status === 200 )
               {
                    setRequestStatus(true);
                    console.log("SUCCESS");
               }
               else
               {
                    setRequestStatus(false);
                    console.log("account creation failure!");
               }
            }
        );
    };

    return (
        <Material.Container component="main" maxWidth="xs">
            <Material.Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                
                <Material.Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Material.Avatar>

                <Material.Typography component="h1" variant="h5">
                    Sign up
                </Material.Typography>

                <Material.Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Material.Grid container spacing={2}>
                        <Material.Grid item xs={12}>
                            <Material.TextField
                                autoComplete="given-name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                inputProps={{ pattern: "[A-Z][A-Za-z ]+" }}
                            />
                        </Material.Grid>
                        <Material.Grid item xs={12}>
                            <Material.TextField
                                required
                                fullWidth
                                name="username"
                                id="userName"
                                label="Username"
                                inputProps={{ pattern: "[A-Za-z0-9!@#$%]+" }}
                            />
                        </Material.Grid>
                        <Material.Grid item xs={12}>
                            <Material.TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                inputProps={{ pattern: "[A-Za-z0-9!@#$%]+" }}
                            />
                        </Material.Grid>
                        <Material.Grid item xs={12}>
                            <Material.TextField
                                required
                                fullWidth
                                name="description"
                                label="Description"
                                id="description"
                                multiline
                                maxRows={4}
                                inputProps={{ pattern: "[a-zA-Z0-9]+" }}
                            />
                        </Material.Grid>
                    </Material.Grid>

                    {requestStatus != null ?
                        (requestStatus === true ? <Material.Alert severity="success">Account created successfully!</Material.Alert>
                            : <Material.Alert severity="error">Invalid information!</Material.Alert>)
                        : null
                    }

                    <Material.Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Material.Button>

                    <Material.Grid item>
                        <Link to="/">
                            Already have an account? Sign in
                        </Link>
                    </Material.Grid>
                </Material.Box>
            </Material.Box>
        </Material.Container>
    ); 
}