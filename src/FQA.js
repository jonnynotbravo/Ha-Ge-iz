import React, { useState } from "react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const faqItems = [
    {
      id: 1,
      question: "What is Ha Ge'iz?",
      answer: (
        <p>
          Ha Ge'iz helps students and parents in Ethiopia find and secure a
          place in partnered schools. It simplifies the school selection and
          registration process, offering a user-friendly platform to browse
          schools, submit applications, and acquire a place hassle-free. We are
          dedicated to supporting students throughout their academic journey.
          For more information, please refer to the{" "}
          <a href="/about" style={{ color: "#007bff", textDecoration: "none" }}>
            About
          </a>{" "}
          page.
        </p>
      ),
    },
    {
      id: 2,
      question: "How do I make a reservation?",
      answer: (
        <div>
          <p>To make a reservation, please follow these steps:</p>
          <ol style={{ marginLeft: "20px", fontSize: "15px" }}>
            <li>
              Navigate to the{" "}
              <a
                href="/schools"
                style={{ color: "#007bff", textDecoration: "none" }}
              >
                Schools
              </a>{" "}
              section.
            </li>
            <li>Explore and find a school that best fits your requirements.</li>
            <li>Click on the "Reserve a Spot" button.</li>
            <li>Fill out the reservation form with your details.</li>
            <li>Submit the form to confirm your reservation.</li>
          </ol>
        </div>
      ),
    },
    {
      id: 3,
      question: "Are there any fees associated with reservations?",
      answer: <p>No! There are no fees associated with reservations</p>,
    },
    {
      id: 4,
      question:
        "How long will it take to hear back after making a reservation?",
      answer: (
        <p>
          After completing the reservation form, you will receive a confirmation
          via email.{" "}
          <strong>
            Within 5 - 10 business days, you can expect a call from the school
            you reserved at to discuss the next steps.
          </strong>
        </p>
      ),
    },
    {
      id: 5,
      question: "Is the reservation guaranteed?",
      answer: (
        <p>
          After making a reservation, the school will contact you to discuss the
          next steps. The school is responsible for guaranteeing the
          reservation.
        </p>
      ),
    },
    {
      id: 6,
      question: "Owners",
      answer: (
        <p>
          All rights for this site are owned by © Dagem Tewodros and Jonny
          Tilahun
        </p>
      ),
    },
  ];

  return (
    <div className="faq">
      <h2>Frequently Asked Questions</h2>
      {faqItems.map((item, index) => (
        <div className="accordion-item" key={item.id}>
          <div
            className={`accordion-header ${
              index === activeIndex ? "active" : ""
            }`}
            onClick={() => handleAccordionClick(index)}
          >
            {item.question}
            <span className="hint"></span>
            <span className="arrow">&#9662;</span>
          </div>
          <div
            className={`accordion-content ${
              index === activeIndex ? "active" : ""
            }`}
          >
            {item.answer}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FAQ;
