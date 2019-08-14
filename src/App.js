 import React, {useEffect, useState} from 'react';
import Recipe from "./recipe";
 import './App.css';

const App = () => {
    const APP_ID = "df26813a";
    const APP_KEY = "f69239caec28759fa272b297ab82a9b5	";
  
    const [recipes, setRecipes] = useState([]);
  const [search, setSearch]= useState('');
  const [query, setQuery]= useState('chicken');

    useEffect( () =>{
        getRecipes();
    }, [query]);


    const getRecipes = async () =>{
      const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
      const data =await response. json();
      setRecipes(data.hits);
      console.log(data.hits);
    };

    const updateSearch = e =>{
      setSearch(e.target.value);
    }

    const getSearch = e=> {
      e.preventDefault();
      setQuery(search);
     
    }
  return (
    <div className="App">
   <form className="search-form" onSubmit={getSearch}>
     <input type="text" 
     className="search-bar" 
     value={search} 
     onChange={updateSearch} />
     <button type="submit" className="search-button" > search</button>
   </form>
   <div className="recipes">
   {recipes.map(recipe=>(
     <Recipe 
     key={recipe.recipe.label}
     title={recipe.recipe.label}
       calories={recipe.recipe.calories}
     image={recipe.recipe.image}
     ingredients={recipe.recipe.ingredients }
     />
   ))}

    </div>
    </div>
  );
}

export default App;
