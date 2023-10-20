export type PlanetsType = {
  [key: string]: string | string[]
  films: string[]
};

export type FormFilter = {
  category: string,
  operator: string,
  number: string,
};
export type SortType = {
  order: { column: string, sort: 'ASC' | 'DESC' }
};

export type ContextPlanetsType = {
  filterPlanets: PlanetsType[],
  filterList: FormFilter[],
  numberFilter: (filter: FormFilter) => void,
  nameFilter: (filter: string) => void,
  removeFilter: () => void,
  handleSortPlanets: (sort: SortType) => void

};
