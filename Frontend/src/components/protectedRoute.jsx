import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ProtectedRoute = () => {
    const { authState } = useAuth();

    return authState.authenticated ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;