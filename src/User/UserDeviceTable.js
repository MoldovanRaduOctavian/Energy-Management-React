import React from 'react';
import axios from 'axios';
import * as Api from '../Requests/Endpoints';
import * as Material from '@mui/material';

import UserDeviceTableEntry from './UserDeviceTableEntry';

export default function UserDeviceTable(){

    const [devices, setDevices] = React.useState([]);

    React.useEffect(
        () => {

            if (JSON.parse(sessionStorage.getItem("user")))
            {
                const userProfileId = JSON.parse(sessionStorage.getItem("user"))["userProfileId"];
                const jsonPayload = {
                    "userReferenceId": userProfileId
                };

                axios.post(Api.GET_DEVICES_FOR_USER, jsonPayload).then(
                    (response) => {
                        console.log(response);
                        if (response.status === 200)
                            setDevices(response.data);
                    }
                );
            }
            
        }
        , []);

    return (
        <Material.TableContainer component={Material.Paper}>
            <Material.Table>
                <Material.TableHead>
                    <Material.TableRow>
                        <Material.TableCell>Name</Material.TableCell>
                        <Material.TableCell>Address</Material.TableCell>
                        <Material.TableCell>Description</Material.TableCell>
                        <Material.TableCell>Maximum consumption</Material.TableCell>
                    </Material.TableRow>
                </Material.TableHead>
                <Material.TableBody>
                    {devices && devices.map((device, index) => {
                        return <UserDeviceTableEntry device={device} key={index} />;
                    })}
                </Material.TableBody>
            </Material.Table>
        </Material.TableContainer>
);

}