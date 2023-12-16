import { Stack, Box, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Anime = ({ animes, isSearch }) => {
  return (
    <Stack
      className="scrollbar-hidden"
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "47% 47%",
          sm: "20% 20% 20% 20%",
          md: "18% 18% 18% 18% 18%",
        },
        gap: { xs: 1, md: 2 },
        margin: { xs: "0 0 10px 0", md: "10px 20px" },
        justifyContent: "center",
        gridAutoColumns: "column-reverse",
      }}
    >
      {animes.map((anime, index) => (
        <Box key={index} sx={{ display: "flex", flexDirection: "column" }}>
          <Link
            to={`/info/${anime.id}`}
            title={anime.title}
            className="anime-link"
          >
            <CardMedia
              component="img"
              image={anime.image}
              alt={anime.title}
              sx={{
                width: "100%",
                height: "210px",
                borderRadius: "5px",
              }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                width: "100%",
                wordWrap: "break-word",
                textAlign: "center",
                margin: "5px 0",
                height: "20px",
                overflow: "hidden",
              }}
            >
              {anime.title}
            </Typography>
          </Link>
          {!isSearch && (
            <Link
              to={`/${anime.id}/watch/${anime.episodeId}`}
              className="episode-link"
            >
              <Typography
                variant="subtitle2"
                sx={{
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Episode {anime.episodeNumber}
              </Typography>
            </Link>
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default Anime;
