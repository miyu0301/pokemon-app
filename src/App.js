import { useEffect } from 'react';
import './App.css';
import { getAllPokemon } from './utills/pokemon';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
      const fetchPokemonData = async () => {
      // get all Pokemon datas
      let res = await getAllPokemon(initialURL);
      console.log(res);
    }
    fetchPokemonData();
  }, []);
  return (
    <div className="App">
    </div>
  );
}

export default App;
