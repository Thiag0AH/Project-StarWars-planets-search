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
  numberFilter: (filte: FormFilter) => void,
  nameFilter: (filter: string) => void,
  removeFilter: () => void,
  // removeNumberFilter: (id: number) => void,
  // handleFilterList: (filter: FormFilter) => void,
};
