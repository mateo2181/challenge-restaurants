"use client";

import { createContext, useContext, useState } from "react";
import { apiLogin, apiSignup } from "@/api/auth";
import { ApiResponse } from "@/types/api";
import { Maybe } from "@/types/helpers";
import { NewUserCredentials, UserCredentials, UserLogged } from "@/types/user";
import { getItem, removeItem, setItem } from '@/utils/local-storage';

type AuthContextType = {
    user: Maybe<UserLogged>;
    isUserAuthenticated: boolean;
    login: (credentials: UserCredentials) => Promise<UserLogged | Error>;
    signup: (credentials: NewUserCredentials) => Promise<string | Error>;
    logout: () => Promise<boolean>;
    errorLogin: Maybe<string>;
    errorSignUp: Maybe<string>;
    loading: boolean;
}

const AuthContext = createContext<Maybe<AuthContextType>>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Maybe<UserLogged>>(getItem('user') as UserLogged);
    const [errorLogin, setErrorLogin] = useState<Maybe<string>>(null);
    const [errorSignUp, setErrorSignUp] = useState<Maybe<string>>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const login = async (credentials: UserCredentials) => {
        setErrorLogin(null);
        setLoading(true);
        return apiLogin(credentials)
            .then(res => {
                const response = res as ApiResponse<UserLogged>;
                const user = response.data;
                setUser(user);
                setItem({ key: 'user', value: user });
                const token = response.headers.getAuthorization();
                setItem({ key: 'token', value: token });
                return response.data;
            })
            .catch(error => {
                const message = (error as Error).message;
                setErrorLogin(message);
                throw error;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const signup = async (credentials: NewUserCredentials) => {
        setErrorSignUp(null);
        setLoading(true);
        return apiSignup(credentials)
            .then(data => data)
            .catch(error => {
                const message = (error as Error).message;
                setErrorSignUp(message);
                throw error;
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const logout = (): Promise<boolean> => {
        return new Promise(resolve => {
            setUser(null);
            removeItem({ key: 'user' });
            removeItem({ key: 'token' });
            resolve(true);
        });
    };

    const isUserAuthenticated = !!user;

    return (
        <AuthContext.Provider value={{ loading, errorSignUp, errorLogin, login, signup, user, isUserAuthenticated, logout }}>
            {children}
        </AuthContext.Provider>
    );

};

export function useAuthContext() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("AuthContext has to be used within <AuthContext.Provider>");
    }

    return context;
}