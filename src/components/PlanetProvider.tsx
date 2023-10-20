import { useState, useEffect } from 'react';
import PlanetContext from './context/PlanetContext';
import { FormFilter, PlanetsType, SortType } from '../Types';

type PlanetProviderProps = {
  children: React.ReactNode;
};

function PlanetProvider({ children }: PlanetProviderProps) {
  const [filterList, setFilterList] = useState<FormFilter[]>([]);
  const [sortPlanets, setSort] = useState<SortType>({
    order: {
      column: 'population',
      sort: 'ASC',
    },
  });
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
  useEffect(() => {
    const operatorValidation = (element: PlanetsType) => {
      return filterList.every((filter: FormFilter) => {
        const { operator, category, number } = filter;
        switch (operator) {
          case 'maior que':
            return (Number(element[category]) > Number(number));
          case 'menor que':

            return (Number(element[category]) < Number(number));

          case 'igual a':

            return (Number(element[category]) === Number(number));
          default:
            return true;
        }
      });
    };

    const aux = filterPlanets.filter((element) => operatorValidation(element));
    setFilterPlanets(aux);
  }, [filterList]);
  const numberFilter = (filter: FormFilter) => {
    setFilterList((prev) => [...prev, filter]);
  };
  const removeFilter = () => {
    setFilterList([]);
    setFilterPlanets(planets);
  };

  useEffect(() => {
    const sortTable = () => {
      const aux = filterPlanets.toSorted((a, b) => {
        if (a[sortPlanets.order.column] === 'unknown') {
          return 1;
        }
        if (b[sortPlanets.order.column] === 'unknown') {
          return -1;
        }
        const auxA = Number(a[sortPlanets.order.column]);
        const auxB = Number(b[sortPlanets.order.column]);
        if (sortPlanets.order.sort === 'ASC') {
          return auxA - auxB;
        }
        return auxB - auxA;
      });
      setFilterPlanets(aux);
    };
    sortTable();
  }, [sortPlanets]);

  const handleSortPlanets = (sort: SortType) => {
    setSort(sort);
  };
  // const removeNumberFilter = (id: number) => {
  //   const aux = filterList.filter((element, i) => i !== id);
  //   removeFilter();
  //   console.log(filterPlanets);
  //   if (aux.length > 0) {
  //     aux.map((element) => numberFilter(element));
  //   }
  // };
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
    filterPlanets,
    filterList,
    nameFilter,
    numberFilter,
    removeFilter,
    handleSortPlanets,
  };
  return (
    <PlanetContext.Provider value={ values }>
      { children }
    </PlanetContext.Provider>
  );
}

export default PlanetProvider;
