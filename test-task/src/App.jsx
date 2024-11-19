import React from 'react';
import ProductList from './components/ProductList';
import "./App.css"

const App = () => {
  return (
    <div className='productBox'>
      <h1>Product Management</h1>
      <ProductList />
    </div>
  );
};

export default App;
