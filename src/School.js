import Header from "./Header";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore"; // Use named import for v9 syntax
import { firestore } from "./firebase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bannerImage from "./banner.jpeg";
import Footer from "./Footer";

const School = () => {
  const navigate = useNavigate();

  const { id } = useParams(); // Extract the ID from the URL

  const [schoolData, setSchoolData] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const settings = {
    autoplay: true,
    speed: 2000, // Adjust the speed as needed
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    infinite: true,
  };

  return (
    <div className="school-container">
      <Header />

      <div
        className="banner"
        style={{
          backgroundImage: `url(${bannerImage})`,
          backgroundSize: "cover",
        }}
      >
        <h2 className="banner-title">Welcome to {schoolData.name}</h2>
        <p className="banner-description">
          Discover our educational programs and facilities.
        </p>
        {/* <button className="banner-button" onClick={handleReserveSpot}>
          Reserve a spot
        </button> */}
      </div>

      <div className="school-info">
        <div className="quote-container">
          <div class="article">
            <h1>{schoolData.name}</h1>
            <blockquote>
              <p>{schoolData.quote}</p>
            </blockquote>
          </div>
        </div>
        <div className="about-us">
          <div className="about-us-content ">
            <h2 className="about-us-title">About Us</h2>
            <p className="about-us-text">{schoolData.about}</p>
          </div>
        </div>

        <div className="mission">
          <div className="mission-content">
            <h2 className="mission-title">Mission Statement</h2>
            <p className="mission-text">{schoolData.ms}</p>
          </div>
          <div className="mission-image">
            <img
              src="https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/SHJ4VOCJVMI6TDH4FROQTGOCDY.jpg"
              alt="Mission Statement"
            />
          </div>
        </div>

        <div className="vision">
          <div className="vision-image">
            <img
              src="https://img.freepik.com/free-photo/young-people-studying-using-laptop_23-2147844843.jpg"
              alt="Vision"
            />
          </div>
          <div className="vision-content">
            <h2 className="vision-title">Vision</h2>
            <p className="vision-text">{schoolData.vision}</p>
          </div>
        </div>
      </div>
      <div id="galleries">
        <h2 id="gallery-header">Galleries</h2>
        <div className="img-container">
          <Slider {...settings} className="img-list">
            <div>
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/IUB-SchoolofEducation.jpg" />
            </div>
            <div>
              <img src="https://www.gannett-cdn.com/presto/2022/05/16/PAPN/99a9b13f-17ac-4a91-8877-e6462b8f1255-APC_EdistonSchool_0516220036djp.jpg" />
            </div>
            <div>
              <img src="https://www.providenceschools.org/cms/lib/RI01900003/Centricity/Domain/4/20210413-Bailey-0160-862x530.png" />
            </div>
            <div>
              <img src="https://pbs.twimg.com/media/FqpovHFX0AAP1nJ?format=jpg&name=large" />
            </div>
            <div>
              <img src="https://www.verywellfamily.com/thmb/mi5BR5mruiShD9HnmFwoIu241E4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/high-school-teacher-calling-on-student-in-classroom-595349163-5adf35e6fa6bcc0036b16732.jpg" />
            </div>
            <div>
              <img src="https://img.freepik.com/free-photo/young-people-studying-using-laptop_23-2147844843.jpg" />
            </div>
            <div>
              <img src="https://wallpaper.dog/large/17288149.jpg" />
            </div>
            <div>
              <img src="https://filecabinet10.eschoolview.com/438E0725-245B-495C-9CC3-CF27A457ADBF/71f7d7dd-bcd6-4990-bb75-24176fecd93a.jpg" />
            </div>
            <div>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfgkOSXvagHbyP6aZr28noNfcRut16U4DH2wSd-bo1zmeFxGWZRcV0fqZRKeWJeLHCOCo&usqp=CAU" />
            </div>
          </Slider>
        </div>
      </div>

      <div className="reserve-button">
        <p className="reserve-text">Ready to reserve a spot?</p>
        <button className="reserve-button-primary" onClick={handleReserveSpot}>
          Reserve Now
        </button>
      </div>

      <div className="map">
        <div className="responsive-map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.3213565732023!2d38.74631601527894!3d9.022736288119697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x163fbbf8f401756d%3A0x202dbd36f38eb166!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1637114312042!5m2!1sen!2set"
            width="100%" // Set the width to 100%
            height="450"
            frameBorder="0"
            allowFullScreen
            title="Map of Addis Ababa, Ethiopia"
          ></iframe>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default School;
