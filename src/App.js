import Home from "./Home";
import GenericNotFound from "./GenericNotFound";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/404" element={<GenericNotFound />} />
        <Route path="*" element={<Navigate to="404" />} />
      </Routes>
    </div>
  );
}

export default App;
