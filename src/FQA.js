import React, { useState } from "react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const faqItems = [
    {
      id: 1,
      question: "What is this website used for?",
      answer:
        "blah blah blah blah blahblah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah blah",
    },
    {
      id: 2,
      question: "is the reservation guaranteed?",
      answer: "NO!!!",
    },
    {
      id: 3,
      question: "Who made this ?",
      answer: "Me",
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
