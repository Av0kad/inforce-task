import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../redux/productsSlice";

const AddEditProductModal = ({ onClose, product }) => {
  const [name, setName] = useState(product?.name || "");
  const [count, setCount] = useState(product?.count || 0);
  const [price, setPrice] = useState(product?.price || 0);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [comments, setComments] = useState(product?.comments || []);
  const [newCommentDescription, setNewCommentDescription] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!name.trim() || !imageUrl.trim()) {
      alert("Name and Image URL are required!");
      return;
    }

    const productData = {
      id: product?.id || Date.now(),
      name,
      count,
      price,
      imageUrl,
      comments,
    };

    if (product) {
      dispatch(updateProduct(productData));
    } else {
      dispatch(addProduct(productData));
    }

    onClose();
  };

  const handleAddComment = () => {
    if (newCommentDescription.trim()) {
      const newComment = {
        id: Date.now(),
        productId: product?.id || Date.now(),
        description: newCommentDescription,
        date: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setNewCommentDescription("");
    } else {
      alert("Comment cannot be empty!");
    }
  };

  const handleDeleteComment = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  return (
    <div>
      <h2>{product ? "Edit Product" : "Add Product"}</h2>
      <div>
        <label>Title:</label>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label>Count:</label>
        <input
          type="number"
          placeholder="Count"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Image URL:</label>
        <input
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Product Preview"
          style={{ width: "100px", height: "100px", objectFit: "cover" }}
          onError={(e) => (e.target.style.display = "none")}
        />
      )}
      <h3>Comments</h3>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.description}</p>
            <small>{comment.date}</small>
            <button onClick={() => handleDeleteComment(comment.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
      <input
        placeholder="Add a comment"
        value={newCommentDescription}
        onChange={(e) => setNewCommentDescription(e.target.value)}
      />
      <button onClick={handleAddComment}>Add Comment</button>
      <button onClick={handleSubmit}>Confirm</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default AddEditProductModal;
