import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CategoryBox = ({ title, image, path }) => {
  return (
    <Link to={path} className="category"> {/* Se mantiene la clase 'category' */}
      <img src={image} alt={title} />
      <p>{title}</p>
    </Link>
  );
};

export default CategoryBox;
