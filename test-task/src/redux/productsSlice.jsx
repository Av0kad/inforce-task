import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex((p) => p.id === action.payload.id);
      if (index >= 0) {
        state.products[index] = action.payload;
      }
    },
    addComment: (state, action) => {
      const { productId, comment } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.comments.push(comment);
      }
    },
    removeComment: (state, action) => {
      const { productId, commentId } = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.comments = product.comments.filter((c) => c.id !== commentId);
      }
    },
    
  },
});

export const {
  addProduct,
  removeProduct,
  updateProduct,
  addComment,
  removeComment,
} = productsSlice.actions;
export default productsSlice.reducer;
