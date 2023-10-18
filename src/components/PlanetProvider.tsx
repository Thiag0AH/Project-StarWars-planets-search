import { useState, useEffect } from 'react';
import PlanetContext from './context/PlanetContext';
import { FormFilter, PlanetsType } from '../Types';

type PlanetProviderProps = {
  children: React.ReactNode;
};

function PlanetProvider({ children }: PlanetProviderProps) {
  // const [filterList, setFilterList] = useState<PlanetsType[]>([]);
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
  const [filterPlanets, setFilterPlanets] = useState<PlanetsType[]>([{
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
  const nameFilter = (filter: string) => {
    const filteredPlanets = planets
      .filter((element) => {
        const { name } = element;
        const newName = name as string;
        return newName.toLowerCase().includes(filter.toLowerCase());
      });
    setFilterPlanets(filteredPlanets);
  };
  const operatorValidation = (filter: FormFilter) => {
    const { category, number, operator } = filter;
    switch (operator) {
      case 'maior que':
        return (filterPlanets.filter((element) => {
          return (Number(element[category]) > Number(number));
        }));
      case 'menor que':
        return (filterPlanets.filter((element) => {
          return Number(element[category]) < Number(number);
        }));
      case 'igual a':
        return (filterPlanets.filter((element) => {
          return Number(element[category]) === Number(number);
        }));
      default:
        return planets;
    }
  };
  const numberFilter = (filter: FormFilter) => {
    const planetsFilter = operatorValidation(filter);
    const aux = filterPlanets.filter((element) => {
      return (planetsFilter.includes(element) && filterPlanets.includes(element));
    });
    setFilterPlanets(aux);
  };
  // function tooglePlanets(planet: PlanetsType[]) {
  //   setPlanets(planet);
  // }
  useEffect(() => {
    const fetchPlanet = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const { results } = data;
      delete results.residents;
      setPlanets(results);
      setFilterPlanets(results);
    };
    fetchPlanet();
  }, []);
  const values = {
    planets,
    filterPlanets,
    nameFilter,
    numberFilter,
    // tooglePlanets,
  };
  return (
    <PlanetContext.Provider value={ values }>
      { children }
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;
