import Home from "./Home";
import SchoolsList from "./SchoolsList";
import GenericNotFound from "./GenericNotFound";
import Form from "./Form";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/schools" element={<SchoolsList />} />
        <Route path="/404" element={<GenericNotFound />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
