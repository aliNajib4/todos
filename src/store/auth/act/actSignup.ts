import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

type TUser = {
  email: string;
  password: string;
};

const actSignup = createAsyncThunk(
  "auth/signup",
  async ({ email, password }: TUser) => {
    await createUserWithEmailAndPassword(auth, email, password);
  },
);

export default actSignup;
