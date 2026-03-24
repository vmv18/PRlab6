# Лабораторна робота №6
## Кастомні хуки та робота з мережею у React

### 1. Кастомний хук `useFetch.js`
```javascript
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) return;

    const abortController = new AbortController();
    setIsLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: abortController.signal });
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [url]);

  return { data, isLoading, error };
};

export default useFetch;
```

### 2. Компонент `CocktailsFeed.jsx`
```javascript
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
```

### Відповіді на контрольні запитання:
1. **Для чого використовується `AbortController`?**
    `AbortController` використовується для скасування незавершених HTTP-запитів при розмонтуванні компонента, що усуває загрозу витоків пам'яті (memory leaks) та помилок оновлення стану неіснуючого компонента.

2. **Чому важлива "тріада станів" (`loading`, `error`, `data`)?**
    Тріада станів (loading, error, data) гарантує, що користувач завжди розуміє, що відбувається з додатком: він бачить процес завантаження, отримує чітке повідомлення у разі збою та бачить результат при успіху, що є критичним для UX.

3. **Чому функція `fetch` має бути всередині `useEffect`?**
    Функція `fetch` розміщується всередині `useEffect`, щоб побічні ефекти (запити до мережі) не блокували процес рендерингу інтерфейсу і виконувалися лише після того, як компонент з'явиться на екрані.

4. **Які переваги використання `axios` над нативним `fetch`?**
    Переваги `axios` над нативним `fetch` полягають у тому, що `axios` автоматично парсить JSON-відповіді та автоматично відхиляє проміси при статусах помилок (наприклад, 404 або 500), тоді як `fetch` цього не робить (потрібно вручну перевіряти статус відповіді).

5. **Що таке стан гонитви (Race Condition) і як він виникає?**
    Стан гонитви (Race Condition) виникає, коли результати асинхронних запитів повертаються не в тому порядку, в якому вони були відправлені, що може призвести до відображення неактуальних даних на екрані.
