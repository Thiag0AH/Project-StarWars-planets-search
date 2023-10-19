export type PlanetsType = {
  [key: string]: string | string[]
  films: string[]
};

export type FormFilter = {
  category: string,
  operator: string,
  number: string,
};

export type ContextPlanetsType = {
  planets: PlanetsType[],
  filterPlanets: PlanetsType[],
  filterList: FormFilter[],
  setFilterPlanets: (value: React.SetStateAction<PlanetsType[]>) => void
  numberFilter: (filte: FormFilter []) => [],
  nameFilter: (filter: string) => void,
  removeFilter: () => void,
  // removeNumberFilter: (id: number) => void,
  // handleFilterList: (filter: FormFilter) => void,
};
