
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { login as apiLogin, setAuthToken } from '../services/client';

export type UserRole = 'Admin' | 'Owner';

interface User { role: UserRole; token: string; username: string }

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<UserRole>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem('gosid_auth');
        if (stored) {
            const parsed = JSON.parse(stored) as User;
            setUser(parsed);
            setAuthToken(parsed.token);
        }
    }, []);

    const login = async (username: string, password: string) => {
        const { token, role } = await apiLogin(username, password);
        const nextUser: User = { role, token, username };
        setUser(nextUser);
        setAuthToken(token);
        localStorage.setItem('gosid_auth', JSON.stringify(nextUser));
        return role;
    };

    const logout = () => {
        setUser(null);
        setAuthToken(null);
        localStorage.removeItem('gosid_auth');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};