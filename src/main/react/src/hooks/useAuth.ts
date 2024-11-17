import {LoginSchema} from "../pages/login/LoginPage.tsx";
import {RegisterSchema} from "../pages/register/RegisterPage.tsx";
import {apiWithConfig} from "../axios/config.ts";
import {TokenType} from "../types/User.ts";
import {jwtDecode, JwtPayload} from "jwt-decode";
import {useNavigate} from "react-router-dom";

export type CustomJwtPayload = JwtPayload & { authorities: string, username: string };

export const useAuth = () => {

    const navigate = useNavigate();


    const login = async (data: LoginSchema) => {
        try {
            const response = await apiWithConfig.post<TokenType>("/auth/sign-in", data);
            const decodedToken = jwtDecode<CustomJwtPayload>(response.data.token);
            localStorage.setItem("token", response.data.token);
            if (decodedToken.username) {
                localStorage.setItem("username", decodedToken.username);
            }
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    }

    const register = async (data: RegisterSchema) => {
        try {
            const response = await apiWithConfig.post<TokenType>("/auth/sign-up", {
                username: data.username,
                email: data.email,
                password: data.password
            });
            navigate("/login");
        } catch (error) {
            console.error(error);
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/login");
    }

    return {
        login,
        register,
        logout
    }
}