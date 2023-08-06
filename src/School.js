import Header from "./Header";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // Use named import for v9 syntax
import { firestore } from "./firebase";

const School = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // Extract the ID from the URL

  const [schoolData, setSchoolData] = useState(null);

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        // Use the ID to fetch data for the specific school
        const docRef = doc(firestore, "Schools", id); // Use doc() instead of collection()
        const docSnapshot = await getDoc(docRef); // Use getDoc() instead of getDocs()
        if (docSnapshot.exists()) {
          setSchoolData(docSnapshot.data());
        } else {
          console.log("School not found!");
          // Navigate to the 404 page if school data is not found
          navigate("/404");
        }
      } catch (error) {
        console.error("Error fetching school data:", error);
      }
    };

    fetchSchoolData();
  }, [id, navigate]);

  if (!schoolData) {
    // Styling for the "Loading..." text
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

  const handleReserveSpot = () => {
    navigate(`/schools/${id}/form`);
    console.log(id);
  };

  return (
    <div className="school-container">
      <Header />
      <div className="banner">
        <h2 className="banner-title">Welcome to {schoolData.name}</h2>
        <p className="banner-description">
          Discover our educational programs and facilities.
        </p>
        <button className="banner-button" onClick={handleReserveSpot}>
          Reserve a spot
        </button>
      </div>
      <div className="school-info">
        <h1 className="school-name">{schoolData.name}</h1>
        <div className="about-us">
          <div className="about-us-image">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/IUB-SchoolofEducation.jpg"
              alt="About Us"
            />
          </div>
          <div className="about-us-content">
            <h2 className="about-us-title">About Us</h2>
            <p className="about-us-text">{schoolData.about}</p>
          </div>
        </div>

        <blockquote className="blockquote">
          <p>Mission Statement: {schoolData.quote}</p>
        </blockquote>
        <blockquote className="blockvision">
          <p>Vision: {schoolData.vision}</p>
        </blockquote>
      </div>
      <div id="galleries">
        <h2 id="gallery-header">Galleries</h2>
        <ul className="img-list">
          <li>
            <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/IUB-SchoolofEducation.jpg" />
          </li>
          <li>
            <img src="https://www.gannett-cdn.com/presto/2022/05/16/PAPN/99a9b13f-17ac-4a91-8877-e6462b8f1255-APC_EdistonSchool_0516220036djp.jpg" />
          </li>
          <li>
            <img src="https://www.providenceschools.org/cms/lib/RI01900003/Centricity/Domain/4/20210413-Bailey-0160-862x530.png" />
          </li>
          <li>
            <img src="https://pbs.twimg.com/media/FqpovHFX0AAP1nJ?format=jpg&name=large" />
          </li>
          <li>
            <img src="https://www.verywellfamily.com/thmb/mi5BR5mruiShD9HnmFwoIu241E4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/high-school-teacher-calling-on-student-in-classroom-595349163-5adf35e6fa6bcc0036b16732.jpg" />
          </li>
          <li>
            <img src="https://img.freepik.com/free-photo/young-people-studying-using-laptop_23-2147844843.jpg" />
          </li>
          <li>
            <img src="https://wallpaper.dog/large/17288149.jpg" />
          </li>
          <li>
            <img src="https://filecabinet10.eschoolview.com/438E0725-245B-495C-9CC3-CF27A457ADBF/71f7d7dd-bcd6-4990-bb75-24176fecd93a.jpg" />
          </li>
          <li>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgkOSXvagHbyP6aZr28noNfcRut16U4DH2wSd-bo1zmeFxGWZRcV0fqZRKeWJeLHCOCo&usqp=CAU" />
          </li>
        </ul>
      </div>

      <div className="reserve-button">
        <button className="reserve" onClick={handleReserveSpot}>
          Reserve a spot
        </button>
      </div>

      <div className="map">
        <img src="https://media.wired.com/photos/59269cd37034dc5f91bec0f1/191:100/w_1280,c_limit/GoogleMapTA.jpg" />
      </div>
    </div>
  );
};

export default School;
