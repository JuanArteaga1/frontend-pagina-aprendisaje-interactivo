import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';

const CategoryBox = ({ title, image, path }) => {
  return (
    <div className="category w-80 h-80 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105 hover:bg-teal-100 duration-200">
      <Link
        to={path}
        className="category w-80 h-80 bg-white shadow-lg rounded-lg flex flex-col items-center justify-center cursor-pointer transition-transform transform hover:scale-105 hover:bg-teal-100 duration-200"
      >
        <img src={image} alt={title} className="w-24 h-auto object-contain mb-2" />
        <span className="font-bold text-center">{title}</span>
      </Link>
    </div>
  );
};

export default CategoryBox;
