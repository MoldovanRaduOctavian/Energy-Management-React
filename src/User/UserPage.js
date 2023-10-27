import React from 'react';
import * as Material from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import UserDeviceTable from './UserDeviceTable';

export default function UserPage()
{
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
                                User Page
                            </Material.Typography>
                        </Material.Toolbar>
                    </Material.AppBar>
                </Material.Box>

            </Material.Grid>

            <Material.Grid item sm={12}>
                <UserDeviceTable />
            </Material.Grid>

        </Material.Grid>

    );
}