import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utills/pokemon';
import Card from './components/Card/Card'
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [backURL, setBackURL] = useState("");

  useEffect(() => {
      const fetchPokemonData = async () => {
      // get all Pokemon datas
      let res = await getAllPokemon(initialURL);
      // get Pokemon detail data
      loadPokemon(res.results);
      setNextURL(res.next);
      setBackURL(res.previous); // null
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

  const handlePrevPage = async () => {
    if(!backURL) return;
    setLoading(true);
    let data = await getAllPokemon(backURL);
    await loadPokemon(data.results);
    setNextURL(data.next);
    setBackURL(data.previous);
    setLoading(false);
  }

  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextURL)
    await loadPokemon(data.results);
    setNextURL(data.next);
    setBackURL(data.previous);
    setLoading(false);
  }

  return (
    <>
    <Navbar />
      <div className="App">
        {loading ? (
          <h1>loading...</h1>
        ) : (
          <>
            <div className='pokemonCardContainer'>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon}></Card>;
              })}
            </div>
            <div className='btn'>
              <button onClick={handlePrevPage}>Back</button>
              <button onClick={handleNextPage}>Next</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}


export default App;
