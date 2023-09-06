import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase";

import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const SchoolsList = () => {
  const navigate = useNavigate();
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(firestore, "Schools"));
        const schoolsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setSchools(schoolsData);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching schools:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    const loadingStyles = {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      fontSize: "36px",
      fontWeight: "bold",
    };
    return <div style={loadingStyles}>Loading...</div>;
  }

  const handleClick = (id) => {
    navigate(`/schools/${id}`);
    console.log(id);
  };

  return (
    <div>
      <Header />
      <main>
        <ul id="cards">
          {schools.map((school) => (
            <li key={school.id} className="card">
              <div className="card__content">
                <div>
                  <h2>{school.name}</h2>
                  <p>{school.quote}</p>

                  <div
                    onClick={() => handleClick(school.id)}
                    className="btn btn--accent"
                  >
                    Read more
                  </div>
                </div>
                <figure>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Todd_Street_school.jpg/640px-Todd_Street_school.jpg"
                    alt="Image description"
                  />
                </figure>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <Footer />
    </div>
  );
};

export default SchoolsList;
