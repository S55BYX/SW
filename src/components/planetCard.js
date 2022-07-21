import React from "react";
import { Link, Routes, Route, useParams } from "react-router-dom";

const PlanetCard = (props) => {
  const { planet } = props;
  return (
    <Link to={`/${planet.name}`}>
      <div className="card">
        <h2>{planet.name}</h2>
      </div>
    </Link>
  );
};

export default PlanetCard;
