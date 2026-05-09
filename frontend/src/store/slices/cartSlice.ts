import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Product {
    _id: string;
    name: string;
    description: string;
    brand:  string ;
    category: string;
    price: number;
    thumbnail: string;
    images: string[];
}

interface CartItem {
    product: Product;
    quantity: number;
    totalPrice?: number;
    _id?: string;
}

interface CartState {
    items: CartItem[];
    loading: boolean;
    error: string | null;
    pendingItem: CartItem | null;
}

const initialState: CartState = {
    items: [],
    loading: false,
    error: null,
    pendingItem: null,
};

export const getUserAllAddToCart = createAsyncThunk(
  'cart/getUserAllAddToCart',
  async (_, { rejectWithValue, getState }) => {
    const state: any = getState();
    const user = state.login.user;
    const userId = user?.user?.id || user?.id || user?._id || user?.userId;
    //console.log('Fetching cart for user:', userId);
    try {
      const res = await fetch(`http://localhost:8000/api/cart/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const resultJson = await res.json();
      //console.log('get user all cart api response status:', resultJson);
      if (!res.ok) return rejectWithValue(resultJson?.message || 'API error');
      return resultJson.data.items || [];
    } catch (err: any) {
      return rejectWithValue(err.message || 'Failed to fetch cart');
    }
  }
);


const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const productId = item.product._id;
      const existingItem = state.items.find(i => i.product._id === productId);
      if (existingItem) {
        existingItem.quantity += item.quantity;
        existingItem.totalPrice = existingItem.product.price * existingItem.quantity;
      } else {
        state.items.push({
          ...item,
          totalPrice: item.product.price * item.quantity,
        });
      }
    },
    clearCart: (state) => {
    state.items = [];
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAllAddToCart.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserAllAddToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getUserAllAddToCart.rejected, (state, action) => {
         state.loading = false;
        const errMsg = (action as any).payload || action.error?.message || 'Failed to fetch products';
        state.error = errMsg;
      });

  },
});

export const { 
    addToCart,
    clearCart
} = cartSlice.actions;
export default cartSlice.reducer;
