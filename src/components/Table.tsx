import { useContext } from 'react';
import PlanetContext from './context/PlanetContext';

function Table() {
  const planetContext = useContext(PlanetContext);
  const { planets } = planetContext;
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {planets.map((element, i) => {
          return (
            <tr key={ i }>
              <th>{element.name}</th>
              <th>{element.rotation_period}</th>
              <th>{element.orbital_period}</th>
              <th>{element.diameter}</th>
              <th>{element.climate}</th>
              <th>{element.gravity}</th>
              <th>{element.terrain}</th>
              <th>{element.surface_water}</th>
              <th>{element.population}</th>
              <th>
                {element.films.map((film, id) => {
                  return (<p key={ id }>{film}</p>);
                })}

              </th>
              <th>{element.created}</th>
              <th>{element.edited}</th>
              <th>{element.url}</th>
            </tr>
          );
        })}
      </tbody>

    </table>
  );
}

export default Table;
