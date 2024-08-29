import { createSlice } from "@reduxjs/toolkit";
import { TLoading } from "../../types/index";
import actSignUp from "./act/actSignup";
import actSignIn from "./act/actSignin";
import actSignout from "./act/actSignout";

type TInitialState = {
  loading: TLoading;
  error: string | null;
  user: {
    id: string;
    email: string | null;
  } | null;
};

const initialState: TInitialState = {
  loading: "idle",
  error: null,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    cleanUp: (state) => {
      state.loading = "idle";
      state.error = null;
    },
    setUser: (state, action: { payload: TInitialState["user"] }) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    //sign up
    builder
      .addCase(actSignUp.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actSignUp.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actSignUp.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "";
      });

    // sign in
    builder
      .addCase(actSignIn.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actSignIn.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actSignIn.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "";
        console.log(action);
      });

    // sign out
    builder
      .addCase(actSignout.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actSignout.fulfilled, (state) => {
        state.loading = "succeeded";
      })
      .addCase(actSignout.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.error.message ?? "";
      });
  },
});

export { actSignUp, actSignIn, actSignout };
export const { cleanUp, setUser } = authSlice.actions;
export default authSlice.reducer;
