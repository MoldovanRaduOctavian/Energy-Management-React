import React from 'react';
import * as Material from '@mui/material';

export default function UserDeviceTableEntry({ device })
{
    return (
        <Material.TableRow>
            <Material.TableCell>{device && device["name"]}</Material.TableCell>
            <Material.TableCell>{device && device["address"]}</Material.TableCell>
            <Material.TableCell>{device && device["description"]}</Material.TableCell>
            <Material.TableCell>{device && device["maximumConsumption"]}</Material.TableCell>
        </Material.TableRow>
    );
}