import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
    const userJson = sessionStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    const isAdmin = user ? user["admin"] : null;

    return (
        user && isAdmin === false ? children : <Navigate to="/" />
    );
}