import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { URL } from '../url.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        authenticated: false,
        user: null,
        loading: true,
    });

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(URL + "/api/v1/user/status", { withCredentials: true });
                setAuthState({
                    authenticated: true,
                    user: response.data.user,
                    loading: false,
                });
            } catch (error) {
                setAuthState({
                    authenticated: false,
                    user: null,
                    loading: false,
                });
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ authState, setAuthState }}>
            {!authState.loading && children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
