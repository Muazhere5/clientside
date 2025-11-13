import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import LoadingSpinner from './SharedUI/LoadingSpinner'; // Assuming this component exists

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // 1. Handle Loading State: If state is loading, show spinner.
    if (loading) {
        return <LoadingSpinner />;
    }

    // 2. Handle Logged-In User: If user exists, allow access.
    if (user) {
        return children;
    }

    // 3. Handle Not Logged In: Redirect to login page.
    // Pass the current location via 'state' so the user is redirected 
    // back here after successfully logging in (fulfilling the assignment requirement).
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;