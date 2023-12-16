import { Box, Button, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const axios = require("axios");

const Login = () => {
  const [input, setInput] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleChange = (event) => {
    const name = event.target.name,
      value = event.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost/api/user?user=login", input)
      .then((response) => {
        if (response?.data?.status === 0) {
          setError({ error: true, message: response?.data?.error });
        } else {
          const userData = {
            status: response?.data?.status,
            user: {
              id: response.data.user.id,
              email: response?.data?.user?.email,
              firstname: response?.data?.user?.firstname,
            },
          };
          localStorage.setItem("auth", JSON.stringify(userData));
          navigate("/");
        }
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: "80vh",
      }}
    >
      <form className="auth-form" onSubmit={handleSubmit}>
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
            Welcome Back
          </Typography>
          {error.error && (
            <Typography
              variant="subtitle1"
              sx={{ textAlign: "center", color: "#f00" }}
            >
              {error.message}
            </Typography>
          )}
          <div>
            <label htmlFor="email">Email</label>
            <input
              className="log-input"
              type="text"
              id="email"
              onChange={handleChange}
              name="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              className="log-input"
              type="password"
              id="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row !important",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button type="submit" variant="contained" color="secondary">
              Login
            </Button>
            <Typography
              textAlign="right"
              color="#fff"
              sx={{
                fontSize: { xs: "12px", md: "15px" },
                padding: "10px",
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row !important",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{ width: "35%", height: "1px", background: "#fff5" }}
              ></Box>
              <Typography
                className="form-divider"
                sx={{
                  fontSize: { xs: "12px", md: "15px" },
                  color: "#fff",
                  padding: "0 10px",
                  width: "min-content",
                  zIndex: 5,
                  borderRadius: "3px",
                }}
              >
                OR
              </Typography>
              <Box
                sx={{ width: "35%", height: "1px", background: "#fff5" }}
              ></Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row !important",
                justifyContent: "center",
                gap: "5%",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 50 50"
                fill="none"
              >
                <g clipPath="url(#clip0_30_71)">
                  <path
                    d="M50 25C50 11.193 38.807 0 25 0C11.193 0 0 11.1928 0 25C0 37.4781 9.14219 47.8209 21.0938 49.6963V32.2266H14.7461V25H21.0938V19.4922C21.0938 13.2266 24.8262 9.76562 30.5365 9.76562C33.2719 9.76562 36.1328 10.2539 36.1328 10.2539V16.4062H32.9805C29.8746 16.4062 28.9062 18.3334 28.9062 20.3105V25H35.8398L34.7314 32.2266H28.9062V49.6963C40.8578 47.8209 50 37.4783 50 25Z"
                    fill="#1877F2"
                  />
                  <path
                    d="M34.7314 32.2266L35.8398 25H28.9062V20.3105C28.9062 18.3332 29.8748 16.4062 32.9805 16.4062H36.1328V10.2539C36.1328 10.2539 33.2719 9.76562 30.5365 9.76562C24.8262 9.76562 21.0938 13.2266 21.0938 19.4922V25H14.7461V32.2266H21.0938V49.6963C22.386 49.8988 23.692 50.0003 25 50C26.308 50.0004 27.614 49.8988 28.9062 49.6963V32.2266H34.7314Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_30_71">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 50 50"
                fill="none"
              >
                <g clipPath="url(#clip0_30_74)">
                  <path
                    d="M17.418 1.64454C12.4222 3.37762 8.1139 6.66706 5.1258 11.0297C2.1377 15.3923 0.627365 20.5982 0.816626 25.8827C1.00589 31.1671 2.88477 36.2516 6.17731 40.3893C9.46984 44.527 14.0025 47.4999 19.1094 48.8711C23.2498 49.9394 27.5876 49.9864 31.7501 49.0078C35.5208 48.1608 39.007 46.3491 41.8672 43.75C44.8441 40.9623 47.0049 37.4159 48.1172 33.4922C49.3259 29.2252 49.541 24.7381 48.7461 20.375H25.4961V30.0195H38.961C38.6919 31.5578 38.1152 33.0259 37.2655 34.3361C36.4158 35.6462 35.3104 36.7715 34.0157 37.6445C32.3717 38.7326 30.5181 39.4644 28.5743 39.793C26.6248 40.1556 24.6253 40.1556 22.6758 39.793C20.6999 39.3849 18.8307 38.5694 17.1876 37.3984C14.5475 35.5296 12.5652 32.8747 11.5235 29.8125C10.4645 26.6929 10.4645 23.311 11.5235 20.1914C12.265 18.0048 13.4908 16.0138 15.1094 14.3672C16.9617 12.4482 19.3068 11.0766 21.8874 10.4027C24.4679 9.72874 27.1843 9.77864 29.7383 10.5469C31.7336 11.1591 33.5582 12.2292 35.0665 13.6719C36.5847 12.1615 38.1003 10.6471 39.6133 9.12892C40.3946 8.31251 41.2461 7.53516 42.0157 6.69923C39.7131 4.55672 37.0104 2.88948 34.0626 1.79298C28.6942 -0.156282 22.8203 -0.208666 17.418 1.64454Z"
                    fill="white"
                  />
                  <path
                    d="M17.418 1.64455C22.8198 -0.20992 28.6937 -0.158914 34.0625 1.78908C37.0109 2.89303 39.7123 4.5683 42.0117 6.71876C41.2305 7.5547 40.4062 8.33595 39.6094 9.14845C38.0937 10.6615 36.5794 12.1693 35.0664 13.6719C33.5582 12.2292 31.7336 11.1591 29.7383 10.5469C27.1851 9.77596 24.4688 9.72317 21.8876 10.3943C19.3063 11.0655 16.9598 12.4346 15.1055 14.3516C13.4868 15.9982 12.261 17.9891 11.5195 20.1758L3.42188 13.9063C6.32034 8.15846 11.3389 3.76183 17.418 1.64455Z"
                    fill="#E33629"
                  />
                  <path
                    d="M1.27343 20.1172C1.70835 17.96 2.43095 15.8711 3.42186 13.9062L11.5195 20.1914C10.4605 23.311 10.4605 26.6929 11.5195 29.8125C8.8216 31.8958 6.12238 33.9896 3.42186 36.0938C0.941984 31.1575 0.185663 25.5332 1.27343 20.1172Z"
                    fill="#F8BD00"
                  />
                  <path
                    d="M25.4961 20.3711H48.7461C49.541 24.7341 49.3259 29.2213 48.1172 33.4883C47.0049 37.412 44.8441 40.9584 41.8672 43.7461C39.2539 41.707 36.6289 39.6836 34.0157 37.6445C35.3113 36.7706 36.4171 35.6441 37.2669 34.3326C38.1166 33.021 38.6928 31.5513 38.961 30.0117H25.4961C25.4922 26.8008 25.4961 23.5859 25.4961 20.3711Z"
                    fill="#587DBD"
                  />
                  <path
                    d="M3.41797 36.0938C6.11849 34.0104 8.81771 31.9167 11.5156 29.8125C12.5594 32.8758 14.5446 35.5308 17.1875 37.3984C18.8357 38.5639 20.709 39.3728 22.6875 39.7734C24.6369 40.136 26.6365 40.136 28.5859 39.7734C30.5298 39.4449 32.3833 38.713 34.0273 37.625C36.6406 39.6641 39.2656 41.6875 41.8789 43.7266C39.0191 46.3271 35.5329 48.1402 31.7617 48.9883C27.5993 49.9668 23.2614 49.9199 19.1211 48.8516C15.8465 47.9772 12.7878 46.4359 10.1367 44.3242C7.33097 42.0962 5.0392 39.2888 3.41797 36.0938Z"
                    fill="#319F43"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_30_74">
                    <rect width="50" height="50" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </Box>
            <Typography
              sx={{
                fontSize: { xs: "12px", md: "15px" },
                color: "#fff",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              Don't have an account?
              <Link to="/register"> Sign up here</Link>
            </Typography>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
