import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import SudentPDFDocument from "./StudentPDFDocument";
import Footer from "./Footer";

const Admin = ({ setLoggedIn }) => {
  const auth = getAuth();
  const [userEmail, setUserEmail] = useState(null); // State to store the user's email
  const [studentsData, setStudentsData] = useState([]); // State to store the fetched students data

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userEmail) {
          const firestore = getFirestore();
          const adminCollectionRef = collection(firestore, "Admins");
          const querySnapshot = await getDocs(adminCollectionRef);

          if (!querySnapshot.empty) {
            // Find the document with matching email
            const adminDoc = querySnapshot.docs.find(
              (doc) => doc.id === userEmail
            );

            if (adminDoc) {
              // Fetch data from /Admins/{userEmail}/Students
              const studentsCollectionRef = collection(
                firestore,
                "Admins",
                adminDoc.id,
                "Students"
              );
              const studentsQuerySnapshot = await getDocs(
                studentsCollectionRef
              );
              const studentsData = studentsQuerySnapshot.docs.map((doc) =>
                doc.data()
              );
              setStudentsData(studentsData);
            } else {
              console.log("No matching admin user found for email:", userEmail);
            }
          } else {
            console.log("Admins collection is empty.");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If the user is authenticated, update the 'loggedIn' state to true
        setLoggedIn(true);
        // Set the user's email to the state
        setUserEmail(user.email);
        // Fetch data
        fetchData();
      } else {
        // If the user is not authenticated, update the 'loggedIn' state to false
        setLoggedIn(false);
        // Reset the user's email and students data to null
        setUserEmail(null);
        setStudentsData([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, setLoggedIn, userEmail]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  console.log(studentsData);
  return (
    <div className="admin-container">
      <h1>{userEmail ? `Welcome, ${userEmail}` : "Not signed in"}</h1>
      <button onClick={handleLogout}>Logout</button>
      {studentsData.map((student) => (
        <div key={student.id}>
          {" "}
          {/* Assuming student has a unique 'id' property */}
          <p>First name: {student.firstName}</p>
          <p>Last name: {student.lastName}</p>
          <p>Birthdate: {student.birthDate}</p>
          <p>Gender: {student.gender}</p>
          <p>Grade to be: {student.gradeToBe}</p>
        </div>
      ))}
      {/* <Footer /> */}
    </div>
  );
};

export default Admin;
