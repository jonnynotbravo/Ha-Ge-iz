import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
const StudentAttendance = () => {
  const [studentId, setStudentId] = useState(
    localStorage.getItem("studentId") || ""
  );
  const [schoolId, setSchoolId] = useState(
    localStorage.getItem("schoolId") || ""
  );

  const [attendanceRecords, setAttendanceRecords] = useState([]);

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const firestore = getFirestore();

        // Create a reference to the specific "Attendance" collection for the student
        const attendanceRef = collection(
          firestore,
          "Schools",
          schoolId,
          "Students",
          studentId,
          "Attendance" // Correctly specify the path to the "Attendance" collection
        );

        // Query for attendance records for the specific student
        const querySnapshot = await getDocs(attendanceRef);

        const records = [];

        querySnapshot.forEach((doc) => {
          records.push(doc.data());
        });

        // Sort the attendance records by date in ascending order
        records.sort((a, b) => (a.date > b.date ? 1 : -1));

        setAttendanceRecords(records);
      } catch (error) {
        console.error("Error fetching attendance records:", error);
      }
    };

    fetchAttendanceRecords();
  }, [studentId, schoolId]);

  // Group the attendance records by date
  const groupedAttendance = {};
  attendanceRecords.forEach((record) => {
    if (!groupedAttendance[record.date]) {
      groupedAttendance[record.date] = [];
    }
    groupedAttendance[record.date].push(record);
  });

  return (
    <div className="student-attendance-container">
      <h1 className="student-attendance-header">Student Attendance</h1>

      {Object.keys(groupedAttendance).map((date) => (
        <div key={date} className="attendance-section">
          <h2>Attendance Records for {date}</h2>
          <table className="attendance-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {groupedAttendance[date]
                .sort((a, b) => a.period.localeCompare(b.period)) // Sort the records by period in ascending order
                .map((record, index) => (
                  <tr key={index}>
                    <td>{record.period}</td>
                    <td>{record.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default StudentAttendance;
