import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const StudentInfo = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [editableData, setEditableData] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [subjectRows, setSubjectRows] = useState([]);

  useEffect(() => {
    // Initialize Firestore
    const firestore = getFirestore();
    const studentsRef = collection(firestore, "Students");
    const q = query(studentsRef, where("id", "==", id));

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setStudent(doc.data());
            setEditableData(doc.data());
            if (doc.data().subjectRows) {
              setSubjectRows(doc.data().subjectRows);
            } else {
              setSubjectRows([]);
            }
          });
        } else {
          console.error("Student not found");
        }
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleEdit = () => {
    if (student) {
      setIsEditMode(true);
    }
  };

  const handleSave = async () => {
    const firestore = getFirestore();
    const studentsRef = collection(firestore, "Students");
    const studentRef = doc(studentsRef, id);
    try {
      await setDoc(
        studentRef,
        { ...editableData, subjectRows },
        { merge: true }
      );
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating student data:", error);
    }
  };

  const handleChange = (event, field) => {
    const newValue = event.target.value;
    setEditableData((prevData) => ({
      ...prevData,
      [field]: newValue,
      lastModified: Timestamp.now(),
    }));
  };

  const handleAddRow = () => {
    setSubjectRows([...subjectRows, { subject: "", grades: [] }]);
  };

  const handleDeleteRow = (rowIndex) => {
    setSubjectRows((prevSubjectRows) =>
      prevSubjectRows.filter((_, index) => index !== rowIndex)
    );
  };

  const handleAddColumn = () => {
    setSubjectRows((prevSubjectRows) =>
      prevSubjectRows.map((row) => ({ ...row, grades: [...row.grades, ""] }))
    );
  };

  const handleDeleteColumn = (colIndex) => {
    setSubjectRows((prevSubjectRows) =>
      prevSubjectRows.map((row) => ({
        ...row,
        grades: row.grades.filter((_, index) => index !== colIndex),
      }))
    );
  };

  const handleSubjectChange = (event, rowIndex) => {
    const newSubject = event.target.value;
    setSubjectRows((prevSubjectRows) =>
      prevSubjectRows.map((row, index) =>
        index === rowIndex ? { ...row, subject: newSubject } : row
      )
    );
  };

  const handleGradeChange = (event, rowIndex, colIndex) => {
    const newGrade = event.target.value;
    setSubjectRows((prevSubjectRows) =>
      prevSubjectRows.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              grades: row.grades.map((grade, i) =>
                i === colIndex ? newGrade : grade
              ),
            }
          : row
      )
    );
  };

  const handleDeleteItem = (subjectIndex, activityType, activityIndex) => {
    setSubjectRows((prevSubjectRows) => {
      const updatedSubjectRows = [...prevSubjectRows];
      updatedSubjectRows[subjectIndex][activityType].splice(activityIndex, 1);
      return updatedSubjectRows;
    });
  };

  const handleDiscard = () => {
    // Reset subjectRows to its original value
    if (student && student.subjectRows) {
      setSubjectRows(student.subjectRows);
    } else {
      setSubjectRows([]);
    }

    // Exit edit mode
    setIsEditMode(false);
  };

  // Enhanced table code for subjects and activities
  const handleAddSubject = () => {
    setSubjectRows([
      ...subjectRows,
      {
        subjectName: "",
        assignments: [],
        homeworks: [],
        classworks: [],
        worksheets: [],
        quizzes: [],
        tests: [],
      },
    ]);
  };

  const handleActivityChange = (
    event,
    rowIndex,
    activityType,
    activityIndex,
    field
  ) => {
    const newValue = event.target.value;
    setSubjectRows((prevSubjectRows) =>
      prevSubjectRows.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              [activityType]: row[activityType].map((activity, i) =>
                i === activityIndex
                  ? { ...activity, [field]: newValue }
                  : activity
              ),
            }
          : row
      )
    );
  };

  const handleAddActivity = (activityType, rowIndex) => {
    setSubjectRows((prevSubjectRows) =>
      prevSubjectRows.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              [activityType]: [
                ...row[activityType],
                { activityName: "", activityDate: "", activityScore: "" },
              ],
            }
          : row
      )
    );
  };

  const handleSubjectNameChange = (event, rowIndex) => {
    const newSubjectName = event.target.value;
    setSubjectRows((prevSubjectRows) =>
      prevSubjectRows.map((row, index) =>
        index === rowIndex
          ? {
              ...row,
              subjectName: newSubjectName,
            }
          : row
      )
    );
  };

  return (
    <div className="student-info">
      <h2>Student Information</h2>
      {student ? (
        <div id="student-profile">
          <p>
            <strong>Name:</strong> {student.name}
          </p>
          <p>
            <strong>Id:</strong> {student.id}
          </p>
        </div>
      ) : (
        <p>Loading student information...</p>
      )}

      <div>
        <h2>Subjects and Activities</h2>
        <div className="button-container">
          {student && !isEditMode ? (
            <button onClick={handleEdit}>Edit</button>
          ) : null}

          {isEditMode && (
            <div className="right-buttons">
              <button onClick={handleSave}>Save</button>
              <button style={{ background: "red" }} onClick={handleDiscard}>
                Discard
              </button>
            </div>
          )}
        </div>

        <table className="subject-activity-table">
          <thead>
            <tr>
              <th>Subject</th>
              <th>Assignments</th>
              <th>Homeworks</th>
              <th>Classworks</th>
              <th>Worksheets</th>
              <th>Quizzes</th>
              <th>Tests</th>
            </tr>
          </thead>
          <tbody>
            {subjectRows.map((subject, subjectIndex) => (
              <tr key={subjectIndex}>
                <td>
                  <input
                    type="text"
                    value={subject.subjectName}
                    onChange={(e) => handleSubjectNameChange(e, subjectIndex)}
                    disabled={!isEditMode}
                  />
                </td>
                {[
                  "assignments",
                  "homeworks",
                  "classworks",
                  "worksheets",
                  "quizzes",
                  "tests",
                ].map((activityType) => (
                  <td key={activityType}>
                    {isEditMode && (
                      <button
                        onClick={() =>
                          handleAddActivity(activityType, subjectIndex)
                        }
                      >
                        Add {activityType}
                      </button>
                    )}
                    <ul>
                      {subject[activityType].map((activity, activityIndex) => (
                        <li key={activityIndex}>
                          <input
                            type="text"
                            value={activity.activityName}
                            onChange={(e) =>
                              handleActivityChange(
                                e,
                                subjectIndex,
                                activityType,
                                activityIndex,
                                "activityName"
                              )
                            }
                            placeholder="Name"
                            disabled={!isEditMode}
                          />
                          <input
                            type="date"
                            value={activity.activityDate}
                            onChange={(e) =>
                              handleActivityChange(
                                e,
                                subjectIndex,
                                activityType,
                                activityIndex,
                                "activityDate"
                              )
                            }
                            disabled={!isEditMode}
                          />
                          <input
                            type="text"
                            value={activity.activityScore}
                            onChange={(e) =>
                              handleActivityChange(
                                e,
                                subjectIndex,
                                activityType,
                                activityIndex,
                                "activityScore"
                              )
                            }
                            placeholder="Grade"
                            disabled={!isEditMode}
                          />
                          {isEditMode && (
                            <button
                              onClick={() =>
                                handleDeleteItem(
                                  subjectIndex,
                                  activityType,
                                  activityIndex
                                )
                              }
                            >
                              Delete
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
            ))}
            {isEditMode && (
              <tr>
                <td>
                  <button onClick={handleAddSubject}>Add Subject</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentInfo;