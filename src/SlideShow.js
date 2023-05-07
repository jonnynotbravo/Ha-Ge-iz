import { useState, useEffect } from "react";
// import './SlideShow.css';
// https://i.pinimg.com/originals/7b/aa/62/7baa622282bf30064b525ac78d296491.jpg

const SlideShow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/a/a3/Addis_ababa_night_skyline.jpg",
    },
    {
      imageUrl:
        "https://www.connectionsacademy.com/content/dam/pvs/ca/resource-hub/headers/CA-RH-struggling-online-schol.jpg",
    },
    {
      imageUrl: "https://images2.alphacoders.com/747/747506.jpg",
    },
    {
      imageUrl:
        "https://149420097.v2.pressablecdn.com/wp-content/uploads/2018/10/St_Joe_Addis_Banner.jpg",
    },
    {
      imageUrl:
        "https://live.staticflickr.com/3823/10870651493_1b52c65e9b_b.jpg",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((currentSlide) =>
        currentSlide === slides.length - 1 ? 0 : currentSlide + 1
      );
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="slideshow-container">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={index === currentSlide ? "slide active" : "slide inactive"}
        >
          <img src={slide.imageUrl} alt={slide.caption} />
          <div className="caption">{slide.caption}</div>
        </div>
      ))}
      <div className="dots">
        {slides.map((slide, index) => (
          <span
            key={index}
            className={index === currentSlide ? "dot active" : "dot"}
            onClick={() => setCurrentSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default SlideShow;
