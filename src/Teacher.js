import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Import necessary Firestore functions

const Teacher = ({ setTeacherLoggedIn }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const auth = getAuth(); // Initialize the Auth instance
  const firestore = getFirestore(); // Initialize the Firestore instance
  const navigate = useNavigate();

  // Function to handle the search query input
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle the search button click
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery === "") {
          setSearchResults([]);
          return;
        }

        const studentsRef = collection(firestore, "Students");
        const querySnapshot = await getDocs(studentsRef);

        const results = [];
        querySnapshot.forEach((doc) => {
          const studentData = doc.data();
          if (
            studentData.name.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            results.push(studentData);
          }
        });

        setSearchResults(results);
      } catch (error) {
        console.error("Error searching for students:", error);
      }
    };

    fetchData();
  }, [searchQuery, firestore]);

  // Function to handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setTeacherLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const handleClick = (id) => {
    navigate(`/teacher/${id}`);
  };

  return (
    <div className="teacher-container">
      <div className="left-content">
        <h1 className="header">Teacher Portal</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a student name"
            value={searchQuery}
            onChange={handleSearchInputChange}
            className="search-input"
          />
          {/* <button className="search-button">Search</button> */}
        </div>
      </div>
      <div className="right-content">
        <button onClick={handleLogout} className="logout-button">
          Log Out
        </button>
        <div className="search-results">
          <h2 id="searchh2">Search Results</h2>
          {searchResults.map((student, index) => {
            return (
              <ul
                key={index}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  handleClick(student.id);
                }}
              >
                <li key={index}>{student.name}</li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Teacher;
