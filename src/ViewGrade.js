import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ViewGrade = () => {
  const [studentId, setStudentId] = useState(
    localStorage.getItem("studentId") || ""
  );
  const [schoolId, setSchoolId] = useState(
    localStorage.getItem("schoolId") || ""
  );

  const [grades, setGrades] = useState([]);

  useEffect(() => {
    const firestore = getFirestore();
    const schoolRef = doc(firestore, "Schools", schoolId);
    const studentsRef = collection(schoolRef, "Students");
    const studentRef = doc(studentsRef, studentId);

    const fetchStudentGrades = async () => {
      try {
        const studentDoc = await getDoc(studentRef);
        if (studentDoc.exists()) {
          const studentData = studentDoc.data();
          const studentGrades = studentData.subjectRows; // Assuming the grades are stored in "subjectRows"
          setGrades(studentGrades);
        } else {
          console.error("Student not found");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentGrades();
  }, [schoolId, studentId]);

  return (
    <div>
      <h2>Student Grades</h2>
      {grades.map((grade, index) => (
        <div key={index}></div>
      ))}
    </div>
  );
};

export default ViewGrade;
