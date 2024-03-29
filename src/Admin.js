import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { collection, getFirestore, getDocs } from "firebase/firestore";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Footer from "./Footer";
import StudentPDF from "./StudentPDF";

const Admin = ({ setLoggedIn }) => {
  const auth = getAuth();
  const [userEmail, setUserEmail] = useState(null);
  const [studentsData, setStudentsData] = useState([]);
  const [currentSchool, setCurrentSchool] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userEmail) {
          const firestore = getFirestore();
          const adminCollectionRef = collection(firestore, "Admins");
          const querySnapshot = await getDocs(adminCollectionRef);

          if (!querySnapshot.empty) {
            const adminDoc = querySnapshot.docs.find(
              (doc) => doc.id === userEmail
            );

            if (adminDoc) {
              const studentsCollectionRef = collection(
                firestore,
                "Admins",
                adminDoc.id,
                "Students"
              );
              const studentsQuerySnapshot = await getDocs(
                studentsCollectionRef
              );

              const studentsData = studentsQuerySnapshot.docs.map((doc) => ({
                ...doc.data(),
                documentId: doc.id,
              }));

              // Sort studentsData in ascending order by timestamp
              const sortedStudentsData = studentsData.sort((a, b) => {
                const dateA = new Date(a.timestamp).getTime();
                const dateB = new Date(b.timestamp).getTime();
                return dateA - dateB;
              });

              setStudentsData(sortedStudentsData);
              setLoading(false);
              setCurrentSchool(sortedStudentsData[0].school);
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
        setLoggedIn(true);
        setUserEmail(user.email);
        fetchData();
      } else {
        setLoggedIn(false);
        setUserEmail(null);
        setStudentsData([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [auth, setLoggedIn, userEmail]);

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

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.toLocaleString("default", { month: "long" });
    const day = String(date.getDate()).padStart(2, "0");
    return `${month} ${day}, ${year}`;
  };

  const uniqueDatesSet = new Set();
  studentsData.forEach((student) => {
    const date = formatDate(student.timestamp);
    uniqueDatesSet.add(date);
  });

  const timestampGroups = Array.from(uniqueDatesSet).map((date) => ({
    date,
    students: [],
  }));

  // Group students with the same timestamp (ignoring the time part)
  studentsData.forEach((student) => {
    const date = formatDate(student.timestamp);
    const groupIndex = timestampGroups.findIndex(
      (group) => group.date === date
    );
    if (groupIndex !== -1) {
      timestampGroups[groupIndex].students.push(student);
    }
  });

  return (
    <div className="admin-container">
      <div className="headerAdmin">
        <h1 className="welcome-message">
          {userEmail ? `Welcome, ${currentSchool}` : "Not signed in"}
        </h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="students-list">
        <div className="mouse">
          <div className="mouse-icon">
            <span className="mouse-wheel"></span>
          </div>
        </div>
        {timestampGroups.map((group, index) => (
          <div key={index} className="timestamp-group">
            <div className="timestamp">{group.date}</div>
            {group.students.map((student) => (
              <div className="student-box" key={student.documentId}>
                <div className="student-info">
                  <p className="student-name">
                    {student.firstName} {student.lastName}
                  </p>
                </div>
                <div className="download-button">
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
              </div>
            ))}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Admin;
