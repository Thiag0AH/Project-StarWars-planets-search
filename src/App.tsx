import './App.css';
import Table from './components/Table';
import PlanetProvider from './components/PlanetProvider';
import Filter from './components/Filter';

function App() {
  return (
    <PlanetProvider>
      <Filter />
      <Table />
    </PlanetProvider>
  );
}

export default App;
