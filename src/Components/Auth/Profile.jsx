import { Box, Typography, Avatar, Button, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { Bookmarks } from "../";
const axios = require("axios");

const Profile = () => {
  const [input, setInput] = useState({});
  const [isVisible, setVisible] = useState(false);
  const [message, setMessage] = useState({});

  const toggleVisible = () => {
    setVisible(!isVisible);
  };

  const handleChange = (event) => {
    const name = event.target.name,
      value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    input.email = userDetails.email;
    const req = await axios.post(
      "http://localhost/api/user?user=change",
      input
    );
    setMessage(req?.data);
    document.querySelectorAll(".change-password input").forEach((password) => {
      password.value = "";
    });
  };

  function stringToColor(string) {
    let hash = 0;
    let i;
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
    };
  }

  const [userDetails, setUserDetails] = useState({});
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://localhost/api/user?fetch=user&email=${
          JSON.parse(localStorage.getItem("auth"))?.user?.email
        }`
      )
      .then((res) => setUserDetails(res?.data?.user));
    axios
      .get(
        `http://localhost/api/user?fetch=bookmarks&email=${
          JSON.parse(localStorage.getItem("auth"))?.user?.email
        }`
      )
      .then((res) => setBookmarks(res?.data?.bookmarks));
  }, []);

  return (
    <>
      {/* Change Password Form */}
      {isVisible && (
        <Box
          component="form"
          sx={{
            background: "#fff",
            borderRadius: "5px",
            maxWidth: "50%",
            maxHeight: "80%",
            position: "fixed",
            zIndex: 30,
            left: "50%",
            top: "50%",
            transform: "translate(-50%,-50%)",
            padding: "20px 24px",
          }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" my={2}>
            Change Password
          </Typography>
          {message.status === 1 ? (
            <Typography variant="subtitle2" mb={2} textAlign="center">
              {message.message}
            </Typography>
          ) : (
            <Typography variant="subtitle2" mb={2} textAlign="center">
              {message.message}
            </Typography>
          )}
          <TextField
            className="change-password"
            label="Current Password"
            type="password"
            autoComplete="current-password"
            sx={{ width: "100%", margin: "5px 0" }}
            name="current"
            onChange={handleChange}
          />
          <TextField
            className="change-password"
            label="New Password"
            type="password"
            autoComplete="current-password"
            sx={{ width: "100%", margin: "5px 0" }}
            name="new"
            onChange={handleChange}
          />
          <Button
            type="submit"
            color="secondary"
            variant="contained"
            sx={{ width: "100%", margin: "5px 0" }}
          >
            Change
          </Button>
        </Box>
      )}

      <Box
        sx={{
          background: "#fff1",
          minHeight: "50vh",
          borderRadius: "10px",
          paddingBottom: "5px",
          color: "#fff",
        }}
      >
        <Typography
          sx={{
            fontSize: {
              xs: "18px",
              md: "24px",
              color: "#fff9",
              padding: "5px 12px",
              borderBottom: "1px solid #fff5",
            },
          }}
        >
          Profile
        </Typography>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "5px 12px",
          }}
        >
          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            <Avatar
              {...stringAvatar(
                `${userDetails.firstname} ${userDetails.lastname}`
              )}
            />
            <Box>
              <Typography sx={{ fontSize: { xs: "15px", md: "20px" } }}>
                {userDetails.firstname} {userDetails.lastname}
              </Typography>
              <Typography
                sx={{ fontSize: { xs: "12px", md: "18px", opacity: "0.7" } }}
              >
                {userDetails.email}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={toggleVisible}
            >
              Change Password
            </Button>
          </Box>
        </Box>

        <Bookmarks userBookmarks={bookmarks} />
      </Box>
    </>
  );
};

export default Profile;
