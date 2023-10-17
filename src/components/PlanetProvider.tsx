import { useState, useEffect } from 'react';
import PlanetContext from './context/PlanetContext';
import { PlanetsType } from '../Types';

type PlanetProviderProps = {
  children: React.ReactNode;
};

function PlanetProvider({ children }: PlanetProviderProps) {
  const [planets, setPlanets] = useState<PlanetsType[]>([{
    name: '',
    rotation_period: '',
    orbital_period: '',
    diameter: '',
    climate: '',
    gravity: '',
    terrain: '',
    surface_water: '',
    population: '',
    films: [''],
    created: '',
    edited: '',
    url: '',
  }]);
  function tooglePlanets(planet: PlanetsType[]) {
    setPlanets(planet);
  }
  useEffect(() => {
    const fetchPlanet = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const { results } = data;
      delete results.residents;
      setPlanets(results);
    };
    fetchPlanet();
  }, []);
  const values = {
    planets,
    tooglePlanets,
  };
  return (
    <PlanetContext.Provider value={ values }>
      { children }
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;
