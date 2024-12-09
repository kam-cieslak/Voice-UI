import { Outlet, useActionData, useNavigate } from "react-router-dom";
import { NavigationBar } from "./NavigationBar.tsx";
import { Container } from "@mui/material";
import { useEffect, useLayoutEffect } from "react";
import { setupInterceptors } from "../axios/config.ts";
import { useRecognition } from "../hooks/RecognitionContext.tsx";
import { useAuth } from "../hooks/useAuth.ts";

export default function DefaultLayout() {
  const {setup, start} = useRecognition();
  const {logout} = useAuth();
  const navigate = useNavigate();
  useLayoutEffect(() => {
    setupInterceptors();
  }, []);

  useEffect(() => setup(navigate, logout), []);

  start();

  return (
    <>
      <NavigationBar />
      <Container
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          width: "100vw",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet></Outlet>
      </Container>
    </>
  );
}
