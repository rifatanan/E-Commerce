import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface LoginPayload {
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

const savedUser = typeof window !== 'undefined' ? localStorage.getItem('authUser') : null;
const parsedUser: User | null = savedUser ? JSON.parse(savedUser) : null;

const initialState: AuthState = {
  user: parsedUser,
  loading: false,
  error: null,
};

export const loginUser = createAsyncThunk< User, LoginPayload,
    { rejectValue: string }
    >("auth/loginUser", async (loginData, thunkAPI) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        const data = await response.json();

        if (!response.ok) {
            return thunkAPI.rejectWithValue(data.message || "Login failed");
        }

        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue("Something went wrong");
    }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authUser');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        if (typeof window !== 'undefined') {
          localStorage.setItem('authUser', JSON.stringify(action.payload));
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;