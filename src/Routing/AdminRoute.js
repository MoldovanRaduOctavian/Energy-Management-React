import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
    const userJson = sessionStorage.getItem("user");
    const user = userJson ? JSON.parse(userJson) : null;
    const isAdmin = user ? user["admin"] : null;

    return (
        user && isAdmin === true ? children : <Navigate to="/" />
    );
}