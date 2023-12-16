import { useState, useEffect } from "react";
import { Paper, IconButton } from "@mui/material";
import { Search } from "@mui/icons-material";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");

  const handleOnChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  return (
    <Paper
      sx={{
        borderRadius: 1,
        border: "1px solid #23202a",
        pl: 2,
        boxShadow: "none",
        width: { xs: "150px", md: "200px" },
        height: "40px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        background: "transparent",
      }}
    >
      <input
        className="search-bar"
        placeholder="Search..."
        value={search ? search : ""}
        onChange={handleOnChange}
      />
      <Link className="search-query" to={`/search/${search}`}>
        <IconButton>
          <Search />
        </IconButton>
      </Link>
    </Paper>
  );
};

export default SearchBar;
