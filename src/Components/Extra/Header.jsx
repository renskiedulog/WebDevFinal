import { Box, Typography, Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import EmailIcon from "@mui/icons-material/Email";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({ isSearching, isInfo }) => {
  const location = useLocation();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #fff1",
        padding: { xs: "3px 10px", md: "10px" },
      }}
    >
      {isSearching && (
        <Typography
          variant="subtitle2"
          sx={{
            color: "var(--primary-color)",
            textTransform: "uppercase",
            fontWeight: "500",
            width: { xs: "50px", md: "auto" },
            textAlign: { xs: "center" },
          }}
        >
          Search Result
        </Typography>
      )}
      {isInfo && (
        <Typography
          variant="subtitle2"
          sx={{
            color: "var(--primary-color)",
            textTransform: "uppercase",
            fontWeight: "500",
            letterSpacing: "1px",
            margin: "0 10px",
            width: { xs: "50px", md: "auto" },
            textAlign: { xs: "center" },
          }}
        >
          Anime Info
        </Typography>
      )}
      <Box>
        <Link
          className={`anime-link ${
            location.pathname === "/" || location.pathname.startsWith("/page=")
              ? `active`
              : ``
          }`}
          to="/"
        >
          Recents
        </Link>
        <Link
          className={`anime-link ${
            location.pathname === "/top" ||
            location.pathname.startsWith("/top&page=")
              ? `active`
              : ``
          }`}
          to="/top"
          sx={{ fontSize: { Xs: "" } }}
        >
          Top
        </Link>
      </Box>
      <Box
        sx={{
          display: { xs: "grid", md: "flex" },
          gridTemplateColumns: "50% 50%",
        }}
      >
        <Button className="social-link" startIcon={<FacebookIcon />} />
        <Button className="social-link" startIcon={<GitHubIcon />} />
        <Button className="social-link" startIcon={<EmailIcon />} />
        <Button className="social-link" startIcon={<TwitterIcon />} />
      </Box>
    </Box>
  );
};

export default Header;
