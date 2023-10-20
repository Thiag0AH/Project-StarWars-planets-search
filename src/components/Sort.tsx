import { useContext, useState } from 'react';
import { SortType } from '../Types';
import PlanetContext from './context/PlanetContext';

function Sort() {
  const option = [
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
  ];
  const planetContext = useContext(PlanetContext);
  const { handleSortPlanets } = planetContext;
  // const [option, setOption] = useState(array);
  const [sortForm, setSortForm] = useState<SortType>({
    order: {
      column: option[0],
      sort: 'ASC',
    },
  });
  function handleChange(event: React.ChangeEvent<HTMLSelectElement>
  | React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    if (value === 'ASC' || value === 'DESC') {
      setSortForm({
        order: {
          column: sortForm.order.column,
          sort: value,
        },
      });
    } else {
      setSortForm({
        order: {
          column: value,
          sort: sortForm.order.sort,
        },
      });
    }
  }
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSortPlanets(sortForm);
  };
  return (
    <form>
      <select data-testid="column-sort" onChange={ (e) => handleChange(e) }>
        {option.map((element) => {
          return (
            <option key={ element } value={ element }>{element}</option>
          );
        })}
      </select>
      <label htmlFor="Asc">Ascendente</label>
      <input
        onChange={ (e) => handleChange(e) }
        data-testid="column-sort-input-asc"
        value="ASC"
        type="radio"
        name="Asc"
        id=""
      />
      <label htmlFor="Desc">Descendente</label>
      <input
        onChange={ (e) => handleChange(e) }
        data-testid="column-sort-input-desc"
        value="DESC"
        type="radio"
        name="Desc"
        id=""
      />
      <button
        onClick={ (e) => handleSubmit(e) }
        data-testid="column-sort-button"
        type="submit"
      >
        Ordenar

      </button>
    </form>
  );
}

export default Sort;
