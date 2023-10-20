import { useContext, useEffect, useState } from 'react';
import PlanetContext from './context/PlanetContext';
import { FormFilter } from '../Types';

function Filter() {
  const planetContext = useContext(PlanetContext);
  const { numberFilter, filterList, removeFilter } = planetContext;
  const array = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const [option, setOption] = useState(array);
  const [formFilter, setFormFilter] = useState<FormFilter>({
    category: 'population',
    operator: 'maior que',
    number: '0',
  });
  const [busca, setBusca] = useState('');
  const { nameFilter } = planetContext;
  useEffect(() => {
    setFormFilter({
      category: option[0],
      operator: 'maior que',
      number: '0',
    });
  }, [option]);
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    nameFilter(value);
    setBusca(value);
  };
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormFilter({
      ...formFilter,
      [name]: value,
    });
  }

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleOption(formFilter.category);
    numberFilter(formFilter);
  };
  const handleOption = (category: string) => {
    setOption(option.filter((element) => element !== category));
  };
  const removeNumberFilter = (id: number) => {
    const aux = filterList.filter((element, i) => i !== id);
    const categories = aux.map((element) => element.category);
    removeFilter();
    if (aux.length > 0) {
      aux.map((element) => numberFilter(element));
    }
    setOption(array.filter((element) => !categories.includes(element)));
  };
  return (
    <div>
      <label>
        Filtro por Nome:
        <input
          data-testid="name-filter"
          type="text"
          name="name"
          id="name"
          value={ busca }
          onChange={ (e) => handleName(e) }
        />
      </label>
      <form onSubmit={ handleFilterSubmit } id="Number_Filter">
        <select
          data-testid="column-filter"
          name="category"
          value={ formFilter.category }
          onChange={ (e) => handleChange(e) }
        >
          {option.map((element) => {
            return (
              <option key={ element } value={ element }>{element}</option>
            );
          })}
        </select>
        <select
          data-testid="comparison-filter"
          name="operator"
          onChange={ (e) => handleChange(e) }
          required
        >
          <option value="maior que" selected>
            maior que
          </option>
          <option value="menor que">
            menor que
          </option>
          <option value="igual a">
            igual a
          </option>
        </select>
        <input
          required
          type="number"
          name="number"
          onChange={ (e) => handleChange(e) }
          data-testid="value-filter"
          value={ formFilter.number }
        />
        <button data-testid="button-filter" type="submit">Filtrar</button>
      </form>
      <button
        data-testid="button-remove-filters"
        type="button"
        onClick={ removeFilter }
      >
        Remover Filtros

      </button>
      {filterList.map((element, i) => {
        return (
          <div key={ i } data-testid="filter">
            <p>{ `${element.category}  ${element.operator} ${element.number} ` }</p>
            <button onClick={ () => removeNumberFilter(i) }>Excluir</button>
          </div>
        );
      })}
    </div>
  );
}

export default Filter;
