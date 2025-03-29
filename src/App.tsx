import ClipsAi from "./ClipsAI";
import Login from "./login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/clipsai" element={<ClipsAi />} />
      </Routes>
    </div>
  );
}

export default App;
