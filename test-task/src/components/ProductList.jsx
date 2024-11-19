import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../redux/productsSlice";
import AddEditProductModal from "./AddEditProductModal";

const ProductList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [minCount, setMinCount] = useState(0);
  const [filterCount, setFilterCount] = useState("");
  const [minPrice, setMinPrice] = useState("");  
  const [maxPrice, setMaxPrice] = useState("");  

  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  // Sorting products
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Sorting products by count
  const handleFilterChange = (e) => {
    setFilterCount(e.target.value);
  };

  // Handle price filter changes
  const handlePriceFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "minPrice") setMinPrice(value);
    if (name === "maxPrice") setMaxPrice(value);
  };

  
  const filteredProducts = products.filter((product) => {
    return (
      product.count >= minCount &&
      (filterCount ? product.count === Number(filterCount) : true) &&
      (minPrice ? product.price >= Number(minPrice) : true) &&
      (maxPrice ? product.price <= Number(maxPrice) : true)
    );
  });

  
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.name.localeCompare(b.name) || a.count - b.count;
    } else {
      return b.name.localeCompare(a.name) || b.count - a.count;
    }
  });

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Add Product</button>

      {/* Sort and Filter */}
      <div>
        <label>Sort by:</label>
        <select value={sortOrder} onChange={handleSortChange}>
          <option value="asc">Alphabetical A-Z</option>
          <option value="desc">Alphabetical Z-A</option>
        </select>

        <label>Filter by Count:</label>
        <input
          type="number"
          value={filterCount}
          onChange={handleFilterChange}
          placeholder="Exact count"
        />
        <label>Minimum Count:</label>
        <input
          type="number"
          value={minCount}
          onChange={(e) => setMinCount(Number(e.target.value))}
          placeholder="Min count"
        />

        {/* Price Filter */}
        <label>Min Price:</label>
        <input
          type="number"
          name="minPrice"
          value={minPrice}
          onChange={handlePriceFilterChange}
          placeholder="Min price"
        />
        <label>Max Price:</label>
        <input
          type="number"
          name="maxPrice"
          value={maxPrice}
          onChange={handlePriceFilterChange}
          placeholder="Max price"
        />
      </div>

      {/* Product List */}
      <ul>
        {sortedProducts.map((product) => (
          <li key={product.id}>
            <img
              src={product.imageUrl}
              alt={product.name}
              style={{ width: "50px", height: "50px", objectFit: "cover" }}
            />
            <div>
              <p>
                <strong>Title:</strong> {product.name}
              </p>
              <p>
                <strong>Count:</strong> {product.count}
              </p>
              <p>
                <strong>Price:</strong> ${product.price}
              </p>
            </div>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
            <h4>Comments:</h4>
            <ul>
              {product.comments.map((comment) => (
                <li key={comment.id}>
                  <p>{comment.description}</p>
                  <small>{comment.date}</small>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Modal for adding/editing product */}
      {isModalOpen && (
        <AddEditProductModal
          onClose={() => {
            setModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
        />
      )}
    </div>
  );
};

export default ProductList;
