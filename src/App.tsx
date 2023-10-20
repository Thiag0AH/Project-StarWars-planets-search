import './App.css';
import Table from './components/Table';
import PlanetProvider from './components/PlanetProvider';
import Filter from './components/Filter';
import Sort from './components/Sort';

function App() {
  return (
    <PlanetProvider>
      <Filter />
      <Sort />
      <Table />
    </PlanetProvider>
  );
}

export default App;
