
import React, { useState, useEffect } from 'react';
import PokeList from './PokeList';
import Pagination from './Pagination';
import axios from 'axios';

function App() {

  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon");
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  let cancel;

  useEffect(() => {
    setLoading(true);
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);
      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      setPokemon(res.data.results.map(p => p.name))
  });

  return () => {
    //cancel();
  }

  }, [currentPageUrl]);
  
  if(loading) {
    return "Loading...";
  }

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }

  return (
    <div>
      <PokeList pokemon={pokemon}/>
      <Pagination goToNextPage={nextPageUrl ? () => goToNextPage() : null} 
                  goToPrevPage= {prevPageUrl ? () => goToPrevPage() : null}/>
    </div>
  );
}

export default App;
