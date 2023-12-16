import { Box, Stack, Typography, Button } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

const Episodes = ({ episodes }) => {
  const { animeId } = useParams();
  const [maxEpisodes, setMaxEpisodes] = useState(99);
  const [minEpisodes, setMinEpisodes] = useState(-1); // Changed minEpisodes to 0
  const itemsPerPage = 99;

  // Calculate the number of buttons needed based on the number of episodes
  const buttonCount = Math.ceil(episodes?.length / itemsPerPage);

  const handleFilter = (min, max) => {
    setMinEpisodes(min);
    setMaxEpisodes(max);
  };

  const filterButtons = Array.from({ length: buttonCount }, (v, index) => {
    const start = index * itemsPerPage;
    const end = Math.min((index + 1) * itemsPerPage - 1, episodes.length - 1);
    const label = `${start + 1} - ${end + 1}`;

    return (
      <Button
        key={`button-${index}`}
        className="anime-link"
        onClick={() => handleFilter(start, end)}
        sx={{ margin: "5px 3px 0 0", width: "100%" }}
      >
        {label}
      </Button>
    );
  });
  return (
    <>
      {episodes?.length > itemsPerPage && (
        <Box
          className="scrollbar-hidden"
          sx={{
            display: "grid",
            justifyContent: "center",
            overflowY: "auto",
            gridTemplateColumns: {
              xs: "30% 30% 30%",
              md: "20% 20% 20% 20% 20%",
            },
            height: "50px",
            padding: "0 30px",
          }}
        >
          {filterButtons}
        </Box>
      )}
      <Stack
        className="scrollbar-hidden"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "30% 30% 30%",
            sm: "20% 20% 20% 20%",
            md: "12.5% 12.5% 12.5% 12.5% 12.5% 12.5% 12.5%",
          },
          gap: 1,
          margin: { xs: "0 0 10px 0", md: "10px 20px" },
          justifyContent: "center",
          maxHeight: { xs: "200px", md: "400px" },
          overflowY: "auto",
          gridAutoColumns: "column-reverse",
        }}
      >
        {episodes?.length === 0 ? (
          <Typography variant="subtitle2" color="#fff">
            There are no episodes found.
          </Typography>
        ) : (
          episodes?.map((episode, index) => {
            if (index >= minEpisodes && index <= maxEpisodes) {
              return (
                <Link
                  key={episode?.number}
                  to={`/${animeId}/watch/${episode.id}`}
                >
                  <Box className="episode-link watch-link">
                    <Typography
                      variant="subtitle2"
                      sx={{ color: "var(--button-color)" }}
                    >
                      Episode {episode.number}
                    </Typography>
                  </Box>
                </Link>
              );
            }
          })
        )}
      </Stack>
    </>
  );
};

export default Episodes;
