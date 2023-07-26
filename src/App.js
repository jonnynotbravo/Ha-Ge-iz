import Home from "./Home";
import SchoolsList from "./SchoolsList";
import GenericNotFound from "./GenericNotFound";
import Form from "./Form";
import About from "./About";
import Contact from "./Contact";
import School from "./School";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import firestore from "./firebase";
import { useNavigate } from "react-router-dom";

function App() {
  

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route
          path="/schools"
          element={<SchoolsList />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/schools/:id" element={<School />} />
        <Route path="/404" element={<GenericNotFound />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
