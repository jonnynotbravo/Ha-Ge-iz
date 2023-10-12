import { useParams } from "react-router-dom";

const StudentInfo = () => {
  const { id } = useParams();
  return (
    <div className="student-info">
      <h2>Student Information</h2>
      {/* <p>Name: {student.name}</p>
      <p>Age: {student.age}</p> */}
      {/* Add more information fields as needed */}
    </div>
  );
};

export default StudentInfo;
