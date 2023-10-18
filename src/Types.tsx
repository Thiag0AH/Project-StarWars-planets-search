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
  numberFilter: (filter: FormFilter) => void,
  nameFilter: (filter: string) => void,
  filterList: FormFilter[],
  removeFilter: () => void,
  removeNumberFilter: (id: number) => void
};
