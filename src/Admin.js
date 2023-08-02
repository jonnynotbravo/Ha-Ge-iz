import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Footer from "./Footer";
import StudentPDF from "./StudentPDF";

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

              // Update studentsData with the fetched data and use Firebase's document ID as the key
              const studentsData = studentsQuerySnapshot.docs.map((doc) => ({
                ...doc.data(),
                documentId: doc.id, // Add the Firebase document ID to each student object
              }));
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

  const handleOpenPDF = (student) => {
    const pdfBlob = new Blob([<StudentPDF student={student} />], {
      type: "application/pdf",
    });
    const pdfUrl = URL.createObjectURL(pdfBlob);
    window.open(pdfUrl, "_blank");
  };

  const generateLogo = (firstName, lastName) => {
    // Customize the logo with any text and styles you want
    return (
      <div style={{ backgroundColor: "#1861e0", color: "#ffffff", padding: 8 }}>
        {firstName.charAt(0)}
        {lastName.charAt(0)}
      </div>
    );
  };

  return (
    <div className="admin-container">
      <h1>{userEmail ? `Welcome, ${userEmail}` : "Not signed in"}</h1>
      <button onClick={handleLogout}>Logout</button>
      {studentsData.map((student) => (
        <div key={student.documentId} className="student-box">
          <p>
            {student.firstName} {student.lastName}
          </p>
          <PDFDownloadLink
            document={<StudentPDF student={student} />}
            fileName={`${student.firstName}_${student.lastName}_${student.timestamp}.pdf`}
          >
            {({ loading }) =>
              loading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-file-download"></i>
              )
            }
          </PDFDownloadLink>
        </div>
      ))}
      {/* <Footer /> */}
    </div>
  );
};

export default Admin;
