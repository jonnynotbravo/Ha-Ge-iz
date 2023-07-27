import React, { useState } from "react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleAccordionClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const faqItems = [
    {
      id: 3,
      question: "What is this website used for?",
      answer:
        "This website is used for booking reservations at various establishments such as hotels, restaurants, and event venues. It provides a user-friendly interface for users to find and book their desired reservations.",
    },
    {
      id: 2,
      question: "Is the reservation guaranteed?",
      answer: "Yes, all reservations made through this website are guaranteed.",
    },
    {
      id: 1,
      question: "Who made this website?",
      answer:
        "This website was developed by a team of skilled web developers from XYZ Company.",
    },
    {
      id: 4,
      question: "How do I make a reservation on the website?",
      answer:
        "To make a reservation, navigate to the 'Reservations' section and select the type of establishment you want to book (e.g., hotel, restaurant, event venue). Then, choose the date, time, and number of guests, and click on the 'Book Now' button. Follow the prompts to complete the reservation.",
    },
    {
      id: 5,
      question: "Are there any fees associated with reservations?",
      answer:
        "No, we are transparent about our fees. The price you see during the reservation process includes all applicable taxes and fees. There are no hidden charges.",
    },
    {
      id: 6,
      question:
        "How long will it take to hear back after making a reservation?",
      answer:
        "After completing the reservation process, you will receive a reservation confirmation via email. Within 5 - 10 business days, you can expect a call from the establishment you reserved at to discuss the next steps.",
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
