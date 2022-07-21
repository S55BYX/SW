import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PlanetPage = (props) => {
  const { planetName } = useParams();
  const { planets } = props;

  const navigate = useNavigate();

  const [state, setState] = useState({
    currentResidents: [],
  });

  const currentPlanet = Array.from(planets).find(
    (planet) => planet.name === planetName
  );

  const fetchData = useCallback((fetchUrl) => {
    const res = fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) =>
        setState((s) => ({
          currentResidents: [...s.currentResidents, data],
        }))
      );
  }, []);

  useEffect(() => {
    const getAllResidents = () => {
      currentPlanet.residents.map((residentUrl) => {
        fetchData(residentUrl);
      });
    };
    getAllResidents();
  }, [fetchData, currentPlanet]);

  return (
    <div className="card-list">
      <button onClick={() => navigate(-1)}>Back to Home</button>
      <h1>Residents of {currentPlanet.name}</h1>
      <ul>
        {state.currentResidents ? (
          state.currentResidents.map((resident, idx) => {
            return (
              <div key={idx} className="card-noClick">
                <h2>{resident.name}</h2>
              </div>
            );
          })
        ) : (
          <h1>no Resident</h1>
        )}
      </ul>
    </div>
  );
};

export default PlanetPage;
