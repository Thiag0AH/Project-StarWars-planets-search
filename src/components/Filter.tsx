import { useContext, useState } from 'react';
import PlanetContext from './context/PlanetContext';
import { FormFilter } from '../Types';

function Filter() {
  const planetContext = useContext(PlanetContext);
  const { numberFilter } = planetContext;
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
    numberFilter(formFilter);
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
          required
        >
          <option value="population" selected>
            population
          </option>
          <option value="orbital_period">
            orbital_period
          </option>
          <option value="diameter">
            diameter
          </option>
          <option value="rotation_period">
            rotation_period
          </option>
          <option value="surface_water">
            surface_water
          </option>
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
    </div>
  );
}

export default Filter;
