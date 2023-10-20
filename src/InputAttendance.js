import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const InputAttendance = ({ setTeacherLoggedIn }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const auth = getAuth(); // Initialize the Auth instance
  const firestore = getFirestore(); // Initialize the Firestore instance
  const navigate = useNavigate();

  const user = auth.currentUser; // Get the current user

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

        // Query the "Schools" collection (similar to your TeacherGrade component)
        const schoolsRef = collection(firestore, "Schools");
        const schoolsQuery = await getDocs(schoolsRef);

        let results = [];

        for (const schoolDoc of schoolsQuery.docs) {
          const schoolData = schoolDoc.data();

          // Check if the teacher's email is in the list of teachers for the school (similar to your TeacherGrade component)
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

  // Add the rendering logic for search results
  return (
    <div className="input-attendance">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a student name"
          value={searchQuery}
          onChange={handleSearchInputChange}
          className="search-input"
        />
      </div>
      <div className="search-results">
        <h2 id="searchh2">Search Results</h2>
        {searchResults.map((student, index) => {
          return (
            <ul
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => {
                // Handle click action for search results (e.g., navigate to student details)
                // You can define your own behavior here.
              }}
            >
              <li key={index}>{student.name}</li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default InputAttendance;
