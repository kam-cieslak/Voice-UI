import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth.ts";

export const NavigationBar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const { logout } = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          {token && username && (
            <>
              <Button color="inherit" onClick={() => navigate("/game")}>
                Game
              </Button>
              <Button color="inherit" onClick={() => navigate("/leaderboard")}>
                Leaderboard
              </Button>
              <Typography flexGrow={1} />
              {username && (
                <Typography paddingRight={"20px"}>User: {username}</Typography>
              )}
              <Button color="inherit" onClick={() => logout()}>
                Log out
              </Button>
            </>
          )}
          {!token && (
            <>
              <Typography flexGrow={1} />
              <Button color="inherit" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button color="inherit" onClick={() => navigate("/register")}>
                Register
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
