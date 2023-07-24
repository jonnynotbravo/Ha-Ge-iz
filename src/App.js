import Home from "./Home";
import SchoolsList from "./SchoolsList";
import GenericNotFound from "./GenericNotFound";
import Form from "./Form";
import About from "./About";
import Contact from "./Contact";
import School from "./School";
import { Routes, Route, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import firestore from "./firebase";

function App() {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await getDocs(collection(firestore, "Schools"));
        const schoolsData = snapshot.docs.map((doc) => doc.data());
        setSchools(schoolsData);
      } catch (error) {
        console.error("Error fetching schools:", error);
      }
    };

    fetchData();
  }, []);

  console.log(schools)

  const handleClick = (id, name, desc, quote) => {
    navigate("/schools/${id}");
    
  };

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route
          path="/schools"
          element={<SchoolsList schools={schools} handleClick={handleClick} />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/schools/${id}" element={<School />} />
        <Route path="/404" element={<GenericNotFound />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
