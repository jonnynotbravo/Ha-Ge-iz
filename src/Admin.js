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

  console.log(studentsData);

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

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setLoggedIn(false);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  useEffect(() => {
    if (studentsData.length > 0) {
      setCurrentSchool(studentsData[0].school);
    }
  }, [studentsData]);

  const sortedStudentsData = studentsData.sort(
    (a, b) => b.timestamp - a.timestamp
  );

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const timestampGroups = [];
  let currentGroup = null;

  // Group students with the same timestamp (ignoring the time part)
  sortedStudentsData.forEach((student) => {
    const date = formatDate(student.timestamp);
    if (!currentGroup || currentGroup.date !== date) {
      currentGroup = { date, students: [student] };
      timestampGroups.push(currentGroup);
    } else {
      currentGroup.students.push(student);
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
        {timestampGroups.map((group) => (
          <div key={group.date} className="timestamp-group">
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
      {/* <Footer /> */}
    </div>
  );
};

export default Admin;
