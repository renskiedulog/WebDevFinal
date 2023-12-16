import Hls from "hls.js";
import {
  Box,
  Typography,
  CardMedia,
  Button,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "../../Utils/request";
import DownloadIcon from "@mui/icons-material/Download";
import { Episodes, Header } from "../";

const Watch = () => {
  const { episodeId, animeId } = useParams();
  const [episode, setEpisode] = useState([]);
  const currentServer = "vidstreaming";
  const [quality, setQuality] = useState("default");
  const [episodeName, setEpisodeName] = useState("");
  const [episodesList, setEpisodesList] = useState([]);

  useEffect(() => {
    const words = episodeId.split("-").map((word) => {
      if (word.toLowerCase().includes("ii")) {
        return word.toUpperCase();
      } else if (word.toLowerCase().includes("iv")) {
        return word.toUpperCase();
      } else if (word.toLowerCase().includes("vi")) {
        return word.toUpperCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    });
    setEpisodeName(words.join(" "));

    makeRequest(`/watch/${episodeId}`, "GET", { server: currentServer }).then(
      (res) => setEpisode(res?.data)
    );
    makeRequest(`/info/${animeId}`, "GET").then((res) =>
      setEpisodesList(res?.data?.episodes)
    );
  }, [episodeId, animeId]);

  useEffect(() => {
    var url = "";
    episode?.sources?.map((source) => {
      if (source.quality === quality) {
        url = source.url;
      }
    });
    const video = document.querySelector("#video-player");
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = url;
      video.addEventListener("loadedmetadata", () => {
        video.play();
      });
    }
  }, [episode, quality]);

  return (
    <Box
      sx={{
        background: "#fff1",
        minHeight: "60vh",
        borderRadius: "10px",
        paddingBottom: "3px",
      }}
    >
      <Header />
      <Box
        sx={{
          padding: "3px 12px",
          display: { xs: "block", md: "flex" },
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            color: "var(--button-color)",
            fontSize: { xs: "18px", sm: "18px", md: "22px" },
            filter: "brightness(1.3)",
            fontWeight: "500",
            textAlign: "center",
            padding: { xs: "5px 30px", md: "none" },
          }}
        >
          {episodeName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between", md: "start" },
            alignItems: "center",
            maxHeight: { xs: "40px", md: "50px" },
          }}
        >
          <Box>
            <InputLabel
              variant="filled"
              htmlFor="uncontrolled-native"
              sx={{
                color: "var(--primary-color)",
                fontSize: { xs: "8px", md: "10px" },
              }}
            >
              Quality
            </InputLabel>
            <Select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="quality-select"
              sx={{ color: "#fff", fontSize: { xs: "12px", md: "15px" } }}
            >
              {episode?.sources?.map((source) => {
                return (
                  <MenuItem value={source.quality}>{source?.quality}</MenuItem>
                );
              })}
            </Select>
          </Box>
          <Button
            target="blank"
            href={episode?.download}
            startIcon={<DownloadIcon />}
            variant="contained"
            color="secondary"
            sx={{
              fontSize: { xs: "10px", md: "12px" },
              height: "40px",
              scale: { xs: ".7", md: "1" },
            }}
          >
            Download
          </Button>
        </Box>
      </Box>
      <CardMedia
        component="video"
        controls
        autoPlay
        height="auto"
        key={`${episodeId}-${quality}`}
        id="video-player"
      />
      <Box>
        <Typography
          sx={{
            fontWeight: 400,
            color: "var(--primary-color)",
            fontSize: { xs: "15px", sm: "18px", md: "20px" },
            margin: { xs: "5px", md: "0 10px" },
          }}
        >
          Episodes: <br />
        </Typography>
        <Episodes episodes={episodesList} />
      </Box>
    </Box>
  );
};

export default Watch;
