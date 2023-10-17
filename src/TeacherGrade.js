import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const TeacherGrade = ({ setTeacherLoggedIn }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const auth = getAuth(); // Initialize the Auth instance
  const firestore = getFirestore(); // Initialize the Firestore instance
  const navigate = useNavigate();

  const user = auth.currentUser; // Get the current user

  console.log(user?.email);

  // Function to handle the search query input
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchQuery === "" || !user) {
          setSearchResults([]);
          return;
        }

        // Get the teacher's email
        const teacherEmail = user.email;

        // Query the "Schools" collection
        const schoolsRef = collection(firestore, "Schools");
        const schoolsQuery = await getDocs(schoolsRef);

        let results = [];

        for (const schoolDoc of schoolsQuery.docs) {
          const schoolData = schoolDoc.data();

          // Check if the teacher's email is in the list of teachers for the school
          const teachersRef = collection(schoolDoc.ref, "Teachers");
          const teachersQuerySnapshot = await getDocs(teachersRef);

          const schoolTeachers = teachersQuerySnapshot.docs.map(
            (doc) => doc.data().email
          );

          if (schoolTeachers.includes(teacherEmail)) {
            const studentsRef = collection(schoolDoc.ref, "Students");
            const studentsQuerySnapshot = await getDocs(studentsRef);

            studentsQuerySnapshot.forEach((doc) => {
              const studentData = doc.data();
              if (
                studentData.name
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              ) {
                results.push(studentData);
              }
            });
          }
        }

        setSearchResults(results);
      } catch (error) {
        console.error("Error searching for students:", error);
      }
    };

    fetchData();
  }, [searchQuery, firestore, auth, user]);

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

  const handleClick = (schoolId, id) => {
    navigate(`/teacher/input-grade/${schoolId}/${id}`);
  };

  const handleMessage = () => {
    navigate("/teacher/messages");
  };

  return (
    <div className="teacher-container">
      <div className="left-content">
        <h1 className="header">Teacher Portal</h1>

        {/* <button onClick={handleMessage}>message</button> */}
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
                  handleClick(student.school, student.id);
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

export default TeacherGrade;
