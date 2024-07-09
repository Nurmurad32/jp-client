import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('/profile')
            .then(({ data }) => {
                setUser(data);
            })
            .catch(() => {
                setUser(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const authInfo = {
        user, setUser, loading, setLoading
    };

    return (
        <UserContext.Provider value={authInfo}>
            {children}
        </UserContext.Provider>
    );
}
