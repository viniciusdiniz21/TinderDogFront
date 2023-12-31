import React from "react";
import Glider from "react-glider";

const Slider = ({ images }) => {
  return (
    <Glider
      className="glider-container"
      draggable
      hasDots
      slidesToShow={1}
      slidesToScroll={images.lenght}
    >
      {images.map((image, index) => (
        <div key={index}>
          <img
            style={{ width: "100%", objectFit: "fill", maxHeight: 250 }}
            src={image}
            alt={`Slide ${index}`}
          />
        </div>
      ))}
    </Glider>
  );
};

export default Slider;
