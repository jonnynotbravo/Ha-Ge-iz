import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ViewGrade = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState(
    localStorage.getItem("studentId") || ""
  );
  const [schoolId, setSchoolId] = useState(
    localStorage.getItem("schoolId") || ""
  );

  console.log(studentId, schoolId);

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
          setName(studentData.name);
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

  const handleGoBack = () => {
    navigate("/student");
  };

  // ...

  return (
    <div id="viewgrade">
      <div id="gobackcontainer">
        <button id="goback" onClick={handleGoBack}>
          Go back
        </button>
      </div>

      <h2>{name}'s Grades</h2>
      {grades.map((subject, index) => (
        <div key={index}>
          <h3>Subject: {subject.subjectName}</h3>
          <table>
            <thead>
              <tr>
                <th>Activity Type</th>
                <th>Activity Name</th>
                <th>Activity Date</th>
                <th>Activity Score</th>
              </tr>
            </thead>
            <tbody>
              {subject.assignments.map((assignment, i) => (
                <tr key={i}>
                  <td>Assignment</td>
                  <td>{assignment.activityName}</td>
                  <td>{assignment.activityDate}</td>
                  <td>{assignment.activityScore}</td>
                </tr>
              ))}
            </tbody>
            <tbody>
              {subject.worksheets.map((assignment, i) => (
                <tr key={i}>
                  <td>Assignment</td>
                  <td>{assignment.activityName}</td>
                  <td>{assignment.activityDate}</td>
                  <td>{assignment.activityScore}</td>
                </tr>
              ))}
              {subject.tests.map((test, i) => (
                <tr key={i}>
                  <td>Test</td>
                  <td>{test.activityName}</td>
                  <td>{test.activityDate}</td>
                  <td>{test.activityScore}</td>
                </tr>
              ))}
              {subject.quizzes.map((quiz, i) => (
                <tr key={i}>
                  <td>Quiz</td>
                  <td>{quiz.activityName}</td>
                  <td>{quiz.activityDate}</td>
                  <td>{quiz.activityScore}</td>
                </tr>
              ))}
              {subject.homeworks.map((homework, i) => (
                <tr key={i}>
                  <td>Homework</td>
                  <td>{homework.activityName}</td>
                  <td>{homework.activityDate}</td>
                  <td>{homework.activityScore}</td>
                </tr>
              ))}
              {subject.classworks.map((classwork, i) => (
                <tr key={i}>
                  <td>Classwork</td>
                  <td>{classwork.activityName}</td>
                  <td>{classwork.activityDate}</td>
                  <td>{classwork.activityScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default ViewGrade;
