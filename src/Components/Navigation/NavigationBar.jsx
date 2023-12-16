import { Box, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { SearchBar } from "../";
import LogoutIcon from "@mui/icons-material/Logout";

const NavigationBar = () => {
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("auth");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "0 20px",
        alignItems: "center",
        height: "60px",
        width: "100%",
      }}
    >
      <Link to="/">
        <Typography
          variant="h6"
          sx={{ color: "var(--primary-color)", fontWeight: 550 }}
        >
          AnimeSensei
        </Typography>
      </Link>
      {location.pathname !== "/login" && location.pathname !== "/register" && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <SearchBar />
          {JSON.parse(localStorage.getItem("auth"))?.status === 1 ? (
            <>
              <Link to="/profile">
                <Button sx={{ color: "#fff" }}>
                  {JSON.parse(localStorage.getItem("auth"))?.user?.firstname}
                </Button>
              </Link>
              <Link to="/" onClick={logout}>
                <LogoutIcon sx={{ color: "#fff" }} />
              </Link>
            </>
          ) : (
            <Link to="/login">
              <Button variant="contained" color="secondary">
                Login
              </Button>
            </Link>
          )}
        </Box>
      )}
    </Box>
  );
};

export default NavigationBar;
