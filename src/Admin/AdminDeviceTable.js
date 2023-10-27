import React from 'react';
import axios from 'axios';
import * as Api from '../Requests/Endpoints';
import * as Material from '@mui/material';

import AdminDeviceTableEntry from './AdminDeviceTableEntry';

export default function AdminDeviceTable(){
    
    const [devices, setDevices] = React.useState([]);
    const [userMapping, setUserMapping] = React.useState({});

    React.useEffect(
        () => {
            axios.get(Api.GET_DEVICES).then(
                (response) => {
                    setDevices(response.data);
                }
            )

            axios.get(Api.GET_USER_PROFILES).then(
                (response) => {
                    let userMappingJson = {};
                    response.data.map((userProfile) => {
                        userMappingJson[userProfile["name"]] = userProfile["id"]
                    });

                    userMappingJson["NO OWNER"] = "";
                    setUserMapping(userMappingJson);
                }
            )

        }, []);

    return (
            <Material.TableContainer component={Material.Paper}>
                <Material.Table>
                    <Material.TableHead>
                        <Material.TableRow>
                            <Material.TableCell>ID</Material.TableCell>
                            <Material.TableCell>Name</Material.TableCell>
                            <Material.TableCell>Address</Material.TableCell>
                            <Material.TableCell>Description</Material.TableCell>
                            <Material.TableCell>Maximum consumption</Material.TableCell>
                            <Material.TableCell>Owner</Material.TableCell>
                            <Material.TableCell>Delete device</Material.TableCell>
                            <Material.TableCell>Update device</Material.TableCell>
                        </Material.TableRow>
                    </Material.TableHead>
                    <Material.TableBody>
                        {devices && devices.map((device, index) => {
                            return <AdminDeviceTableEntry device={device} userMapping={userMapping} key={index} />;
                        })}
                    </Material.TableBody>
                </Material.Table>
            </Material.TableContainer>
    );
    
}