import './App.css';
import Table from './components/Table';
import PlanetProvider from './components/PlanetProvider';

function App() {
  return (
    <PlanetProvider>
      <Table />
    </PlanetProvider>
  );
}

export default App;
