import { Box, Button, Typography, Pagination } from "@mui/material";
import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { makeRequest } from "../../Utils/request";
import { Anime, Header } from "../";

const Home = () => {
  let { page } = useParams();
  page = page
    ? page.replace(
        /^\/?(top&page=|latest-anime&page=|search\/\w+&page=|page=)/,
        ""
      )
    : null;
  page = parseInt(page);

  const { query } = useParams();

  const navigate = useNavigate();
  const [animes, setAnimes] = useState([]);
  const [maxPages, setMaxPages] = useState(page ? page : 1);
  const [type, setType] = useState(1);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const isSearching = location.pathname.includes("/search/");

  const handleChangePage = (event, value) => {
    navigate(
      `${
        location.pathname.startsWith("/top")
          ? "/top&"
          : location.pathname.startsWith("/latest-anime")
          ? "/latest-anime&"
          : location.pathname.startsWith("/search/")
          ? `/search/${query}/`
          : ""
      }page=${value}`
    );
  };

  useEffect(() => {
    setAnimes([]);
    setLoading(true);
    if (
      (!query && location.pathname.startsWith("/top")) ||
      location.pathname.startsWith("/top&page=")
    ) {
      makeRequest(`/top-airing`, "GET", {
        page: page ? page : 1,
        type: type,
      }).then((res) => {
        if (res?.data?.hasNextPage) {
          setMaxPages(maxPages + 1);
        }
        setAnimes(res?.data?.results ? res?.data?.results : []);
        setLoading(false);
      });
    } else if (query) {
      makeRequest(`/${query}`, "GET", {
        page: page ? page : 1,
        type: type,
      }).then((res) => {
        if (res?.data?.hasNextPage) {
          setMaxPages(maxPages + 1);
        }
        setAnimes(res?.data?.results ? res?.data?.results : []);
        setLoading(false);
      });
    } else {
      makeRequest(`/recent-episodes`, "GET", {
        page: page ? page : 1,
        type: type,
      }).then((res) => {
        if (res?.data?.hasNextPage) {
          setMaxPages(maxPages + 1);
        }
        setAnimes(res?.data?.results ? res?.data?.results : []);
        setLoading(false);
      });
    }
  }, [query, location, page, type]);

  return (
    <Box
      sx={{
        background: "#fff1",
        minHeight: "50vh",
        borderRadius: "10px",
        paddingBottom: "5px",
      }}
    >
      <Header isSearching={isSearching} />
      <Box
        sx={{
          display: { xs: "block", md: "flex" },
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "5px",
            justifyContent: { xs: "center" },
            marginTop: "10px",
            marginLeft: { xs: "0", md: "10px" },
            scale: { xs: "0.9" },
          }}
        >
          {location.pathname !== "/top" &&
            !location.pathname.startsWith("/top&page=") &&
            !isSearching && (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setType(1)}
                >
                  JP Sub
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setType(2)}
                >
                  Eng Dub
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => setType(3)}
                >
                  Chinese
                </Button>
              </>
            )}
        </Box>
        {animes.length === (location.pathname.startsWith("/top") ? 10 : 20) && (
          <Pagination
            count={maxPages + 2}
            shape="rounded"
            color="secondary"
            className="pagination-custom"
            onChange={handleChangePage}
            page={page ? page : 1}
          />
        )}
      </Box>
      {!loading && (
        <>
          {animes.length > 1 ? (
            <Anime
              animes={animes}
              isSearch={
                query ||
                location.pathname === "/latest-anime" ||
                location.pathname.startsWith("/latest-anime?page=") ||
                location.pathname === "/top" ||
                location.pathname.startsWith("/top&page=")
                  ? true
                  : false
              }
            />
          ) : (
            <Typography
              variant="h6"
              sx={{
                width: "100%",
                height: "60vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--primary-color)",
              }}
            >
              No results found.
            </Typography>
          )}
          {animes.length ===
            (location.pathname.startsWith("/top") ? 10 : 20) && (
            <Pagination
              count={maxPages + 2}
              shape="rounded"
              color="secondary"
              className="pagination-custom"
              onChange={handleChangePage}
              page={page ? page : 1}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Home;
