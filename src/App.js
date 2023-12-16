import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, NavigationBar, AnimeInfo, Footer, Watch, Login, Register, Profile } from "./Components";
import "./index.css";

function App() {
  return (
    <BrowserRouter basename="/AnimeSensei">
      <NavigationBar />
      <Routes>
        <Route path="/login" exact element={<Login />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/profile" exact element={<Profile />} />

        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
          <Route path="/:page" element={<Home />} />
          <Route path="/top" element={<Home />} />
          <Route path="/top&:page" element={<Home />} />
          <Route path="/search/:query" element={<Home />} />
          <Route path="/search/:query/:page" element={<Home />} />
        </Route>
        <Route path="/info/:animeId" exact element={<AnimeInfo />} />
        <Route path="/:animeId/watch/:episodeId" exact element={<Watch />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
