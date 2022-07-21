import PlanetCard from "./planetCard";

export default function PlanetCards(props) {
  return (
    <div className="card-list">
      {Array.from(props.planet).map((pl, idx) => (
        <div key={idx}>
          <PlanetCard planet={pl} />
        </div>
      ))}
    </div>
  );
}
