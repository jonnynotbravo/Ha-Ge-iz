import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const InputAttendance = () => {
  const { id, schoolId } = useParams();

  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); // Adjust for time zone
  const initialDate = today.toISOString().split("T")[0];

  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [attendanceStatus, setAttendanceStatus] = useState("present");
  const [attendanceDate, setAttendanceDate] = useState(initialDate);
  const [attendancePeriod, setAttendancePeriod] = useState("1st Period");
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Define a fixed set of 7 periods
  const periods = [
    "1st Period",
    "2nd Period",
    "3rd Period",
    "4th Period",
    "5th Period",
    "6th Period",
    "7th Period",
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Update the date and time every second

    return () => {
      clearInterval(intervalId); // Cleanup on component unmount
    };
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  // Function to handle attendance status change
  const handleAttendanceStatusChange = (e) => {
    setAttendanceStatus(e.target.value);
  };

  // Function to handle date change
  const handleDateChange = (e) => {
    setAttendanceDate(e.target.value);
  };

  // Function to handle period change
  const handlePeriodChange = (e) => {
    setAttendancePeriod(e.target.value);
  };

  // Function to add a new attendance record
 // Function to add a new attendance record
const addAttendanceRecord = async () => {
  try {
    const firestore = getFirestore();
    const studentRef = doc(firestore, "Schools", schoolId, "Students", id);
    const attendanceRef = collection(studentRef, "Attendance");

    const newAttendance = {
      date: attendanceDate,
      period: attendancePeriod,
      status: attendanceStatus,
    };

    // Create a unique document ID using a composite key of date and period
    const documentId = `${attendanceDate}_${attendancePeriod}`;

    // Check if a record with the same date and period already exists
    const existingRecordQuery = query(
      attendanceRef,
      where("date_period", "==", documentId)
    );
    const existingRecordSnapshot = await getDocs(existingRecordQuery);

    if (existingRecordSnapshot.empty) {
      // If no existing record found, add the new attendance record with the calculated document ID
      await setDoc(doc(attendanceRef, documentId), newAttendance);

      // Clear the form after submission
      setAttendanceStatus("present");
      setAttendanceDate(new Date().toISOString().split("T")[0]);
      setAttendancePeriod("1st Period");

      // Refresh attendance records
      fetchAttendanceRecords();
    } else {
      // Handle the case when a duplicate record is detected
      console.log(
        "Attendance record for this date and period already exists."
      );
    }
  } catch (error) {
    console.error("Error adding attendance:", error);
  }
};


  // Function to fetch and display existing attendance records
  const fetchAttendanceRecords = async () => {
    try {
      const firestore = getFirestore();
      const studentRef = doc(firestore, "Schools", schoolId, "Students", id);
      const attendanceRef = collection(studentRef, "Attendance");

      const querySnapshot = await getDocs(attendanceRef);
      const records = [];

      querySnapshot.forEach((doc) => {
        records.push(doc.data());
      });

      // Sort the records by period in ascending order using the predefined 'periods' array
      records.sort((a, b) => {
        return periods.indexOf(a.period) - periods.indexOf(b.period);
      });

      setAttendanceRecords(records);
    } catch (error) {
      console.error("Error fetching attendance records:", error);
    }
  };

  useEffect(() => {
    fetchAttendanceRecords();
  }, [id, schoolId]);

  const deleteAttendanceRecord = async (record) => {
    try {
      const firestore = getFirestore();
      const studentRef = doc(firestore, "Schools", schoolId, "Students", id);
      const attendanceRef = collection(studentRef, "Attendance");

      const querySnapshot = await getDocs(
        query(
          attendanceRef,
          where("date", "==", record.date),
          where("period", "==", record.period)
        )
      );

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      fetchAttendanceRecords();
    } catch (error) {
      console.error("Error deleting attendance:", error);
    }
  };

  //   const formatDateToMonthName = (date) => {
  //     const options = { year: "numeric", month: "long", day: "numeric" };
  //     return new Date(date).toLocaleDateString(undefined, options);
  //   };

  const formatDateToDayName = (date) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true, // Use 12-hour time format
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  const uniqueDates = [
    ...new Set(attendanceRecords.map((record) => record.date)),
  ].sort();

  return (
    <div className="input-attendance">
      <h2 className="input-attendance-header">Input Attendance for Student</h2>
      <div className="current-date-time">
        Current Date and Time: {formatDateToDayName(currentDateTime)}
      </div>
      <button className="input-attendance-add-button" onClick={openModal}>
        Add Attendance Record
      </button>

      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h3 className="modal-title">Add Attendance Record</h3>
        <form className="modal-form">
          <label>Date:</label>
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
          />
          <label>Period:</label>
          <select value={attendancePeriod} onChange={handlePeriodChange}>
            {periods.map((period, index) => (
              <option key={index} value={period}>
                {period}
              </option>
            ))}
          </select>
          <label>Status:</label>
          <select
            value={attendanceStatus}
            onChange={handleAttendanceStatusChange}
          >
            <option value="present">Present</option>
            <option value="absent">Absent</option>
            <option value="late">Late</option>
          </select>
          <button type="button" onClick={addAttendanceRecord}>
            Add Record
          </button>
        </form>
      </Modal>

      <h3 className="input-attendance-record-header">Attendance Records</h3>
      {uniqueDates.map((date) => (
        <div key={date}>
          <h4>{date}</h4>
          <table className="input-attendance-table">
            <thead>
              <tr>
                <th>Period</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {periods.map((period) => {
                const recordsForDateAndPeriod = attendanceRecords.filter(
                  (record) => record.date === date && record.period === period
                );

                return recordsForDateAndPeriod.length > 0
                  ? recordsForDateAndPeriod.map((record, index) => (
                      <tr key={index}>
                        <td>{record.period}</td>
                        <td>{record.status}</td>
                        <td>
                          <button
                            onClick={() => deleteAttendanceRecord(record)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  : null;
              })}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default InputAttendance;
