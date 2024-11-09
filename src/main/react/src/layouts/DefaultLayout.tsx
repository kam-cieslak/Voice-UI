import { Outlet } from "react-router-dom";

export default function DefaultLayout() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Outlet></Outlet>
    </div>
  );
}
