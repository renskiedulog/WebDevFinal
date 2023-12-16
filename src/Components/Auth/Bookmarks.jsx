import { Box, CardMedia, Typography, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "../../Utils/request";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
const axios = require("axios");

const Bookmarks = ({ userBookmarks }) => {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(false);

  const deleteBookmark = async (index) => {
    let id = userBookmarks[index].id;
    const deleteReq = await axios.post(
      `http://localhost/api/users?bookmark=delete&id=${id}`
    );
    userBookmarks.splice(index, 1);
    window.location.reload();
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userBookmarks || !Array.isArray(userBookmarks)) {
        return;
      }

      setAnimes([]);
      setLoading(true);

      const promises = userBookmarks.map(async (bookmark) => {
        try {
          const res = await makeRequest(`/info/${bookmark.name}`, "GET");
          return res?.data;
        } catch (error) {
          console.error(`Error fetching data for ${bookmark.name}:`, error);
          return null;
        }
      });

      const results = await Promise.all(promises);
      const filteredAnimes = results.filter((anime) => anime !== null);
      setAnimes(filteredAnimes);
      setLoading(false);
    };

    fetchData();
  }, [userBookmarks]);

  return (
    !loading && (
      <Box sx={{ paddingBottom: "5px" }}>
        <Typography
          sx={{ fontSize: { xs: "15px", md: "20px", padding: "10px 20px" } }}
        >
          {animes.length > 0 ? "Bookmarks:" : "There are no Bookmarks."}
        </Typography>
        <Stack
          flexDirection="row"
          flexWrap="wrap"
          sx={{ padding: "0 20px", gap: 2, textAlign: "center" }}
        >
          {animes?.map((anime, index) => (
            <Box key={index} sx={{ position: "relative" }}>
              <Link className="bookmark-link" to={`/info/${anime.id}`}>
                <CardMedia
                  component="img"
                  image={anime.image}
                  sx={{
                    width: { xs: "120px", md: "150px" },
                    height: { xs: "180px", md: "200px" },
                    borderRadius: "5px",
                  }}
                />
                <Typography
                  sx={{
                    width: { xs: "120px", md: "150px" },
                    height: "20px",
                    overflow: "hidden",
                    margin: "3px 0",
                    color: "#fff",
                    fontSize: { xs: "12px", md: "15px" },
                  }}
                >
                  {anime.title}
                </Typography>
              </Link>
              <a
                className="delete-bookmark-btn"
                onClick={() => deleteBookmark(index)}
              >
                <DeleteForeverIcon />
              </a>
            </Box>
          ))}
        </Stack>
      </Box>
    )
  );
};

export default Bookmarks;
