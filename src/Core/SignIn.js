import * as React from 'react';
import * as Material from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { Link, useNavigate} from 'react-router-dom';
import * as Api from '../Requests/Endpoints';
import axios from 'axios';

export default function SignIn()
{   
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.clear();

        const formData = new FormData(event.currentTarget);
        const jsonPayload = {
            "username": formData.get('username'),
            "password": formData.get('password')
        };

        axios.post(Api.AUTH_USER, jsonPayload).then (
            (response) => {
                if (response.status === 200)
                {    
                    const userData = response.data;
                    console.log('STAU BINE PE CARICEPS');
                    sessionStorage.setItem("user", JSON.stringify(userData));

                    userData["admin"] === true ? navigate("/admin") : navigate("/user");

                }
            },
            (error) => {
                console.log('authentication failed');
                console.log(error);
            }
        );

    };


    return (
        
            <Material.Grid container component="main" sx={{ height: '100vh' }}>
                <Material.CssBaseline />
                <Material.Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://previews.123rf.com/images/nexusby/nexusby1802/nexusby180200181/95211084-electric-plug-electricity-icon.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Material.Grid item xs={12} sm={8} md={5} component={Material.Paper} elevation={6} square>
                    <Material.Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Material.Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Material.Avatar>
                        <Material.Typography component="h1" variant="h5">
                            Sign in
                        </Material.Typography>
                        <Material.Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Material.TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                autoFocus
                                inputProps={{ pattern: "[a-zA-Z0-9]+" }}
                            />
                            <Material.TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                inputProps={{ pattern: "[a-zA-Z0-9!@#$%]+" }}
                            />
                            <Material.Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Sign In
                            </Material.Button>

                            <Link to="/signup">
                                {"Don't have an account? Sign Up"}
                            </Link>

                        </Material.Box>
                    </Material.Box>
                </Material.Grid>
            </Material.Grid>
    );
}