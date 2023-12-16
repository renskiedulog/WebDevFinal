import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const axios = require("axios");

const Register = () => {
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name,
      value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    console.log(input);
    e.preventDefault();
    let passwords = document.querySelectorAll('input[type="password"]');
    if (passwords[0].value === passwords[1].value) {
      axios
        .post("http://localhost/api/user?user=register", input)
        .then((res) => {
          if (res?.data?.status === 1) {
            const userData = {
              status: res?.data?.status,
              user: {
                id: res.data.user.id,
                email: res?.data?.user?.email,
                firstname: res?.data?.user?.firstname,
              },
            };
            localStorage.setItem("auth", JSON.stringify(userData));
            navigate("/");
          } else {
            setError({ error: true, message: res?.data?.error });
          }
        });
    } else {
      setError({ error: true, message: "Password Does Not Match." });
      setTimeout(() => {
        setError({ error: false });
      }, 5000);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "90vh",
      }}
    >
      <form className="auth-form" action="#" onSubmit={handleSubmit}>
        <Box
          className="login-form"
          sx={{
            width: { xs: "70%", md: "40%" },
            minHeight: "400px",
            padding: "10px",
          }}
        >
          <Typography
            textAlign="center"
            color="#fff"
            sx={{
              fontSize: { xs: "20px", md: "30px" },
              padding: "10px",
              textAlign: "center",
            }}
          >
            Create An Account
          </Typography>
          {error.error && (
            <Typography
              variant="subtitle1"
              sx={{ textAlign: "center", color: "#f00" }}
            >
              {error.message}
            </Typography>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row !important",
              gap: "10px",
              marginBottom: "0 !important",
              transform: "translateY(10px)",
            }}
          >
            <Box sx={{ width: '100%'}}>
              <label htmlFor="firstname">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstname"
                required
                onChange={handleChange}
              />
            </Box>
            <Box sx={{ width: '100%'}}>
              <label htmlFor="lastname">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                required
                onChange={handleChange}
              />
            </Box>
          </Box>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" />
          </div>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="contained"
              color="secondary"
              sx={{ margin: "10px 30%" }}
              type="submit"
            >
              Register
            </Button>
          </Box>
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "12px", md: "15px" },
                color: "#fff",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Don't have an account?
              <Link to="/login"> Sign in</Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
