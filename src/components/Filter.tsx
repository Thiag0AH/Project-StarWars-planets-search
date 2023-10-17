import { useContext, useState } from 'react';
import PlanetContext from './context/PlanetContext';

function Filter() {
  const planetContext = useContext(PlanetContext);
  const [busca, setBusca] = useState('');
  const { nameFilter } = planetContext;
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    nameFilter(value);
    setBusca(value);
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
          onChange={ (e) => handleInput(e) }
        />
      </label>

    </div>
  );
}

export default Filter;
