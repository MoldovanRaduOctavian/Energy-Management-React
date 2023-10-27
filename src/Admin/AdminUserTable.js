import React from 'react';
import axios from 'axios';
import * as Api from '../Requests/Endpoints';
import * as Material from '@mui/material';

import AdminUserTableEntry from './AdminUserTableEntry';

export default function AdminUserTable() {
    const [userProfiles, setUserProfiles] = React.useState([]);

    React.useEffect(
        () => {
            axios.get(Api.GET_USER_PROFILES).then(
                (response) => {
                    console.log(response.data);
                    setUserProfiles(response.data)
                }
            )
        }, []);

    return (
        <>
            <Material.TableContainer component={Material.Paper}>
                <Material.Table>
                    <Material.TableHead>
                        <Material.TableRow>
                            <Material.TableCell>ID</Material.TableCell>
                            <Material.TableCell>Name</Material.TableCell>
                            <Material.TableCell>Description</Material.TableCell>
                            <Material.TableCell>Delete account</Material.TableCell>
                            <Material.TableCell>Update account</Material.TableCell>
                        </Material.TableRow>
                    </Material.TableHead>
                    <Material.TableBody>
                        {userProfiles && userProfiles.map((user, index) => {
                            return <AdminUserTableEntry userProfile={user} key={index} />;
                        })}
                    </Material.TableBody>
                </Material.Table>
            </Material.TableContainer>
        </>
    )
}

