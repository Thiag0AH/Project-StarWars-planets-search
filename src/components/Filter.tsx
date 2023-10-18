import { useContext, useState } from 'react';
import PlanetContext from './context/PlanetContext';
import { FormFilter } from '../Types';

function Filter() {
  const planetContext = useContext(PlanetContext);
  const { numberFilter, filterList, removeFilter, filterPlanets } = planetContext;
  const [formFilter, setFormFilter] = useState<FormFilter>({
    category: 'population',
    operator: 'maior que',
    number: '0',
  });
  const [busca, setBusca] = useState('');
  const { nameFilter } = planetContext;
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    nameFilter(value);
    setBusca(value);
  };
  function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = event.target;
    setFormFilter({
      ...formFilter,
      [name]: value,
    });
  }
  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormFilter({
      category: 'population',
      operator: 'maior que',
      number: '0',
    });
    numberFilter(formFilter);
  };
  const handleOption = (category: string) => {
    const categories = filterList.map((list) => list.category);
    return !(categories.includes(category));
  };
  const removeNumberFilter = (id: number) => {
    const aux = filterList.filter((element, i) => i !== id);
    removeFilter();
    console.log(filterPlanets);
    if (aux.length > 0) {
      aux.map((element) => numberFilter(element));
    }
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
          onChange={ (e) => handleChange(e) }
        >
          { handleOption('population')
            && <option value="population">population</option>}
          {handleOption('orbital_period')
            && <option value="orbital_period">orbital_period</option>}
          {handleOption('diameter')
            && <option value="diameter">diameter</option>}
          {handleOption('rotation_period')
            && <option value="rotation_period">rotation_period</option>}
          {handleOption('surface_water')
            && <option value="surface_water">surface_water</option>}
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
            <p>{ `${element.category} ${element.operator} ${element.number}` }</p>
            <button onClick={ () => removeNumberFilter(i) }>Excluir</button>
          </div>
        );
      })}
    </div>
  );
}

export default Filter;
