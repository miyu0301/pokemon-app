import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utills/pokemon';
import Card from './components/Card'

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
      const fetchPokemonData = async () => {
      // get all Pokemon datas
      let res = await getAllPokemon(initialURL);
      // get Pokemon detail data
      loadPokemon(res.results);
      setLoading(false);
    }
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    )
    setPokemonData(_pokemonData);
  };
console.log(pokemonData);

  return (
    <div className="App">
      {loading ? (
        <h1>loading...</h1>
      ) : (
        <>
          <div className='pokemonCardContainer'></div>
          {pokemonData.map((pokemon, i) => {
            return <Card key={i} pokemon={pokemon}></Card>;
          })}
        </>
      )}
    </div>
  );
}


export default App;
