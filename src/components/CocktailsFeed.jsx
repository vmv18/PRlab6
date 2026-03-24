import React from 'react';
import useFetch from '../hooks/useFetch';
import './CocktailsFeed.css';

const CocktailsFeed = () => {
  const { data, isLoading, error } = useFetch(
    'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita'
  );

  return (
    <div className="cocktails-container">
      <h2 className="neon-text">Neon Cocktails</h2>
      
      {isLoading && <div className="loader-container"><div className="loader"></div></div>}
      
      {error && (
        <div className="error-message">
          <p>❌ Error loading cocktails: {error}</p>
        </div>
      )}
      
      {data && data.drinks && (
        <div className="cocktails-grid">
          {data.drinks.map((drink) => (
            <div key={drink.idDrink} className="cocktail-card">
              <div className="image-wrapper">
                <img src={drink.strDrinkThumb} alt={drink.strDrink} loading="lazy" />
              </div>
              <h3 className="neon-accent">{drink.strDrink}</h3>
            </div>
          ))}
        </div>
      )}
      
      {data && !data.drinks && (
        <div className="no-data">
          <p>No cocktails found.</p>
        </div>
      )}
    </div>
  );
};

export default CocktailsFeed;
