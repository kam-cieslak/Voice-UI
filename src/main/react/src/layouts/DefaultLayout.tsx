import {Outlet} from "react-router-dom";
import {NavigationBar} from "./NavigationBar.tsx";
import {Container} from "@mui/material";
import {useLayoutEffect} from "react";
import {setupInterceptors} from "../axios/config.ts";

export default function DefaultLayout() {

    useLayoutEffect(() => {
        setupInterceptors();
    }, []);

    return (
        <>
            <NavigationBar/>
            <Container
                style={{
                    marginTop: "20px",
                    marginBottom: "20px",
                    width: "100vw",
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <Outlet></Outlet>
            </Container>
        </>
    );
}
