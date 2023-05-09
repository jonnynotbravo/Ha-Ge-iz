import React, { useState } from "react";

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleAccordionClick = (index) => {
    setActiveIndex(index === activeIndex ? -1 : index);
  };

  const faqItems = [
    {
      id: 1,
      question: "What is Data Structure?",
      answer:
        "Data structure is a fundamental concept of any programming language, essential for algorithmic design.",
    },
    {
      id: 2,
      question: "Benefits of Learning Data Structures",
      answer:
        "Any given problem has constraints on how fast the problem should be solved (time) and how much less resources the problem consumes (space). That is, a problem is constrained by the space and time complexity within which it has to be solved efficiently.",
    },
    {
      id: 3,
      question: "What is an array?",
      answer:
        "An array is a collection of elements, each identified by an index or a key. It is a basic data structure used in programming and is commonly used to store homogeneous values like integers or strings.",
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
