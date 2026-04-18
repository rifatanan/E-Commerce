import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface RegisterState {
  user: User | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RegisterState = {
  user: null,
  loading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk<
  User,
  RegisterPayload,
  { rejectValue: string }
>("register/registerUser", async (registerData, thunkAPI) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    });

    const data = await response.json();

    if (!response.ok) {
      return thunkAPI.rejectWithValue(data.message || "Registration failed");
    }

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue("Something went wrong");
  }
});

const registerSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    clearRegisterState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
        state.success = false;
      });
  },
});

export const { clearRegisterState } = registerSlice.actions;
export default registerSlice.reducer;