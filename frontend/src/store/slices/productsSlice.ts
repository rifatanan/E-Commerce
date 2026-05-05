import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface Product {
  _id: string;
  name: string;
  description: string;
  brand: { name: string };
  category: { name: string };
  price: number;
  stock: number;
  thumbnail: string;
  images: string[];
  specifications: { key: string; value: string }[];
  ratings: { average: number; count: number };
}

interface ProductsState {
  products: Product[];
  currentProduct: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await fetch('http://localhost:8000/api/product/list');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return await response.json();
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (productId: string) => {
    const response = await fetch(`http://localhost:8000/api/product/single/${productId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const data = await response.json();
    const product = data.data;
    if (!product) {
      throw new Error('Product not found');
    }
    return product;
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch product';
        state.currentProduct = null;
      });
  },
});

export default productsSlice.reducer;