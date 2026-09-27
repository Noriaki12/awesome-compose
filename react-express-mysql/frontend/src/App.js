import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [message, setMessage] = useState();
  const [products, setProducts] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then(res => res.json())
      .then(res => setProducts(res.products))
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("/api/")
      .then(res => res.json())
      .then(res => setMessage(res.message))
      .catch(console.error);
  }, [setMessage]);

  function handleSearch(event) {
    event.preventDefault();

    fetch(`/api/products?name=${encodeURIComponent(searchName)}`)
      .then(res => res.json())
      .then(res => setProducts(res.products))
      .catch(console.error);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{message || "Loading..."}</p>

        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchName}
            onChange={event => setSearchName(event.target.value)}
            placeholder="商品名を入力"
          />
          <button type="submit">検索</button>
        </form>

        {products.map(product => (
          <p key={product.id}>
            {product.name} / {product.price_yen}
          </p>
        ))}

        <p>自動更新テストD.</p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;