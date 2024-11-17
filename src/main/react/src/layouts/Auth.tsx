import {Navigate, Outlet} from "react-router-dom";

const Auth = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to={"/login"}></Navigate>
    }

    return (
        <Outlet></Outlet>
    );
};

export default Auth;